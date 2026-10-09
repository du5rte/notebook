'use strict';
// Every folder a cloud around a hidden centre.
const { Plugin, PluginSettingTab, Setting, Notice, ItemView, setIcon } = require('obsidian');

const DEFAULTS = { enabled: true, depth: 2, centre: 1, inside: true, cross: false, group: false, min: 2, labels: false, bundleRoot: 'stack', bundleBeta: 0.85, bundleMode: 'wheel', bundleMin: 3, bundlePhysics: true, bundleForces: {}, bundlePanel: false, bundleMiddle: 1, bundleRun: 50, bundleHold: 0 };

// Nodes without a folder of their own.
const FOLLOWERS = new Set(['tag', 'unresolved', 'attachment']);

// Hidden centres: the graph worker lays them out, the graph never draws them.
const CENTRE = 'folder-clouds:';

function folderOf(id, depth) {
  const parts = id.split('/');
  parts.pop();
  return parts.slice(0, depth).join('/');
}

// Folders that get a cloud, and their notes.
function foldersOf(nodes, depth) {
  const members = new Map();
  for (const n of nodes) {
    if (FOLLOWERS.has(n.type || '')) continue;
    const f = folderOf(n.id, depth);
    if (!f) continue;
    if (!members.has(f)) members.set(f, []);
    members.get(f).push(n.id);
  }
  return members;
}

// Folders big enough for a centre.
function cloudsOf(nodes, o) {
  const clouds = new Map();
  for (const [f, ids] of foldersOf(nodes, o.depth)) if (ids.length >= Math.max(1, o.min)) clouds.set(f, ids);
  return clouds;
}

// Parent folders that hold more than one cloud, for group pull.
function groupsOf(clouds) {
  const groups = new Map();
  for (const f of clouds.keys()) {
    const i = f.lastIndexOf('/');
    if (i < 0) continue;
    const g = f.slice(0, i);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(f);
  }
  for (const [g, fs] of groups) if (fs.length < 2) groups.delete(g);
  return groups;
}

// The links the physics sees, by setting: your links inside a folder, your links between folders,
// tags and missing pages that belong to one folder, every note to its folder's hidden centre
// (`centre` copies, so more copies pull harder), and each centre to its parent's centre.
// Every link is still drawn.
function physics(pairs, nodes, o) {
  const depth = o.depth;
  const type = new Map(nodes.map((n) => [n.id, n.type || '']));
  const follows = (id) => FOLLOWERS.has(type.get(id) || '');
  const folder = (id) => folderOf(id, depth);

  // A tag or missing page pulls only if all its links come from one folder.
  const homes = new Map();
  for (const [a, b] of pairs) {
    const [f, other] = follows(a) && !follows(b) ? [a, b] : follows(b) && !follows(a) ? [b, a] : [null, null];
    if (!f) continue;
    if (!homes.has(f)) homes.set(f, new Set());
    homes.get(f).add(folder(other));
  }

  const out = [];
  for (const [a, b] of pairs) {
    if (follows(a) && follows(b)) out.push([a, b]);
    else if (follows(a)) homes.get(a).size === 1 && out.push([a, b]);
    else if (follows(b)) homes.get(b).size === 1 && out.push([a, b]);
    else if (folder(a) === folder(b) ? o.inside : o.cross) out.push([a, b]);
  }

  const clouds = cloudsOf(nodes, o);
  for (const [f, ids] of clouds) {
    for (const id of ids) for (let k = 0; k < o.centre; k++) out.push([id, CENTRE + f]);
  }
  if (o.group && o.centre > 0) {
    for (const [g, fs] of groupsOf(clouds)) for (const f of fs) out.push([CENTRE + f, CENTRE + g]);
  }
  return out;
}

// The node list the worker keeps, with a hidden centre per folder. A new centre starts at its notes' middle.
function withCentres(message, renderer, o) {
  const nodes = Object.assign({}, message.nodes);
  if (o.centre < 1) {
    renderer.centres = new Set();
    return nodes;
  }
  const byId = new Map(renderer.nodes.map((n) => [n.id, n]));
  const clouds = cloudsOf(renderer.nodes, o);
  const all = new Map(clouds);
  if (o.group) for (const [g, fs] of groupsOf(clouds)) all.set(g, fs.flatMap((f) => clouds.get(f)));
  for (const [f, ids] of all) {
    const id = CENTRE + f;
    if (renderer.centres && renderer.centres.has(id)) {
      nodes[id] = false;
      continue;
    }
    let x = 0;
    let y = 0;
    let k = 0;
    for (const m of ids) {
      const n = byId.get(m);
      if (n && n.x != null && n.y != null) {
        x += n.x;
        y += n.y;
        k++;
      }
    }
    // A little off the middle: a centre on top of a note makes a zero-length link, which breaks the layout.
    const a = Math.random() * 2 * Math.PI;
    nodes[id] = k ? [x / k + 10 * Math.cos(a), y / k + 10 * Math.sin(a)] : [10 * Math.cos(a), 10 * Math.sin(a)];
  }
  renderer.centres = new Set(Object.keys(nodes).filter((id) => id.startsWith(CENTRE)));
  return nodes;
}


// Bundle view: the bilevel edge bundling chart (observablehq.com/@du5rte/bilevel-edge-bundling)
// drawn from the vault. Notes sit on a circle grouped by folder; links curve through their group.

const BUNDLE_VIEW = 'folder-clouds-bundle';
const SVG_NS = 'http://www.w3.org/2000/svg';

// Leaves on a circle, as d3.cluster lays out a two-level tree: a gap of two steps between groups.
function bundleLayout(groups, radius) {
  const steps = groups.reduce((n, g, i) => n + g.notes.length - 1 + (i ? 2 : 0), 0) + 2;
  const step = (2 * Math.PI) / Math.max(steps, 1);
  const at = new Map();
  const groupAt = new Map();
  let a = step;
  groups.forEach((g, i) => {
    if (i) a += 2 * step;
    const first = a;
    g.notes.forEach((n, j) => {
      if (j) a += step;
      at.set(n.path, a);
    });
    groupAt.set(g.name, (first + a) / 2);
  });
  return { at, groupAt, leaf: radius, inner: radius / 2 };
}

// d3.lineRadial: angle 0 at twelve o'clock, clockwise.
function polar(angle, r) {
  return [r * Math.sin(angle), -r * Math.cos(angle)];
}

// d3.curveBundle.beta: straighten toward the chord, then a B-spline (d3.curveBasis) through the points.
// The first and last `keep` points stay put, so a link can leave a name in a straight line; the points
// right after them (a circle's gate) give way only as much as `hold` lets them: 1 keeps them put too.
function bundlePath(points, beta, keep = 0, hold = 0) {
  const n = points.length - 1;
  const [x0, y0] = points[0];
  const [xn, yn] = points[n];
  const ps = points.map(([x, y], i) => {
    if (i < keep || i > n - keep) return [x, y];
    const t = n ? i / n : 0;
    const b = keep && (i === keep || i === n - keep) ? beta + (1 - beta) * hold : beta;
    return [b * x + (1 - b) * (x0 + t * (xn - x0)), b * y + (1 - b) * (y0 + t * (yn - y0))];
  });
  const f = (v) => v.toFixed(1);
  let d = `M${f(ps[0][0])},${f(ps[0][1])}`;
  if (ps.length === 2) return d + `L${f(ps[1][0])},${f(ps[1][1])}`;
  let [ax, ay] = ps[0];
  let [bx, by] = ps[1];
  d += `L${f((5 * ax + bx) / 6)},${f((5 * ay + by) / 6)}`;
  const curve = (x, y) => {
    d += `C${f((2 * ax + bx) / 3)},${f((2 * ay + by) / 3)} ${f((ax + 2 * bx) / 3)},${f((ay + 2 * by) / 3)} ${f((ax + 4 * bx + x) / 6)},${f((ay + 4 * by + y) / 6)}`;
    [ax, ay, bx, by] = [bx, by, x, y];
  };
  for (let i = 2; i < ps.length; i++) curve(ps[i][0], ps[i][1]);
  curve(bx, by);
  return d + `L${f(bx)},${f(by)}`;
}


// A laid-out chart: every note's spot and label direction, group label spots, and the route of a link.
// A note's label sits at translate(cx,cy) rotate(a) translate(r,0), so it points away from its circle.

// Wheel: one circle for every note, as in the notebook.
function wheelChart(groups) {
  const half = 477;
  const radius = half - 120;
  const L = bundleLayout(groups, radius);
  const leaves = new Map();
  for (const [path, a] of L.at) {
    const [x, y] = polar(a, radius);
    leaves.set(path, { x, y, cx: 0, cy: 0, a, r: radius });
  }
  const groupLabels = new Map(groups.map((g) => [g.name, polar(L.groupAt.get(g.name), radius - 24)]));
  const inner = new Map(groups.map((g) => [g.name, polar(L.groupAt.get(g.name), L.inner)]));
  const route = (s, t, gs, gt, len, pull = 1) => {
    const pts = [[leaves.get(s).x, leaves.get(s).y], inner.get(gs)];
    if (gs !== gt) pts.push(between(inner.get(gs), inner.get(gt), [0, 0], pull), inner.get(gt));
    pts.push([leaves.get(t).x, leaves.get(t).y]);
    return pts;
  };
  return { box: [-half, -half, 2 * half, 2 * half], leaves, groupLabels, route };
}

// Where a link between two groups bends: through the middle at `pull` 1; at 0, halfway between the two
// ends, so the link runs straight across; anything between loosens the knot in the middle.
function between(a, b, middle, pull) {
  const hx = (a[0] + b[0]) / 2;
  const hy = (a[1] + b[1]) / 2;
  return [hx + (middle[0] - hx) * pull, hy + (middle[1] - hy) * pull];
}

// An angle in [0, 2π), so labels on the left half flip to read the right way up.
function norm(a) {
  return ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

// Spots on a circle for its notes, so each note faces where its links pull: toward the middle of the
// chart, where links between circles gather, leaning toward the circles it links to. A note linked only
// to notes in its own circle faces away from the middle instead, leaving that side to the links that
// leave. Notes with links to other circles choose first, most linked first; then notes with links
// inside the circle. Notes without links go between the two groups, split over both sides.
// Returns each note's angle, and `turn`: the way the circle faces, so the angles can turn with it.
function facingOrder(notes, centre, centres, groupOf, links, middle = [0, 0]) {
  const [cx, cy] = centre;
  const unit = ([x, y]) => {
    const d = Math.hypot(x - cx, y - cy);
    return d ? [(x - cx) / d, (y - cy) / d] : [0, 0];
  };
  const pull = new Map(notes.map((n) => [n.path, { x: 0, y: 0, links: 0, inner: 0 }]));
  const own = groupOf.get(notes[0].path);
  const [mx, my] = unit(middle);
  for (const [s, t] of links) {
    for (const [a, b] of [[s, t], [t, s]]) {
      const p = pull.get(a);
      if (!p) continue;
      if (groupOf.get(b) === own) {
        // A link inside the circle points away from the middle.
        p.x -= mx;
        p.y -= my;
        p.inner++;
        continue;
      }
      // A link to another circle heads for the middle first, leaning toward that circle.
      const [ux, uy] = unit(centres.get(groupOf.get(b)));
      p.x += mx + 0.5 * ux;
      p.y += my + 0.5 * uy;
      p.links++;
    }
  }
  const n = notes.length;
  const gap = (a, b) => Math.abs(((a - b + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
  // polar() puts angle 0 at twelve o'clock, clockwise.
  const want = (note) => {
    const p = pull.get(note.path);
    return p.x || p.y ? Math.atan2(p.x, -p.y) : 0;
  };
  const linked = notes.filter((note) => pull.get(note.path).links > 0);
  linked.sort((a, b) => pull.get(b.path).links - pull.get(a.path).links || a.name.localeCompare(b.name));
  const inward = notes.filter((note) => !pull.get(note.path).links && pull.get(note.path).inner > 0);
  inward.sort((a, b) => pull.get(b.path).inner - pull.get(a.path).inner || a.name.localeCompare(b.name));
  // Like a compass: links leave a circle toward the middle of the chart, so the circle turns until its
  // most linked note points straight at the middle. The other linked notes sit beside it, each on the
  // side of the circle it links to.
  const turn = mx || my ? Math.atan2(mx, -my) : 0;
  const slot = (i) => turn + (2 * Math.PI * i) / n;
  const free = new Set(notes.map((_, i) => i));
  const angleOf = new Map();
  if (linked.length) {
    free.delete(0);
    angleOf.set(linked[0].path, slot(0));
  }
  for (const note of [...linked.slice(1), ...inward]) {
    const w = want(note);
    let best = -1;
    for (const i of free) if (best < 0 || gap(slot(i), w) < gap(slot(best), w)) best = i;
    free.delete(best);
    angleOf.set(note.path, slot(best));
  }
  // Lay the circle out as one sequence, clockwise: the notes with links out (centred on the middle,
  // keeping the order they chose), half of the notes without links, the notes linked only inside, the
  // other half. Each block stays together, so with physics the notes without links can slide up against
  // whichever block is bigger without passing anyone.
  const rel = (path, centre) => turnBetween(centre, angleOf.get(path));
  const outBlock = linked.map((note) => note.path).sort((p, q) => rel(p, turn) - rel(q, turn));
  const inBlock = inward.map((note) => note.path).sort((p, q) => rel(p, turn + Math.PI) - rel(q, turn + Math.PI));
  const loose = notes.filter((note) => !angleOf.has(note.path)).map((note) => note.path);
  const half = Math.ceil(loose.length / 2);
  // With the inside block bigger, the loose notes hug it; otherwise they hug the block with links out.
  const hugIn = inward.length > linked.length;
  const before = hugIn ? loose.slice(0, half) : loose.slice(half).reverse();
  const after = hugIn ? loose.slice(half).reverse() : loose.slice(0, half);
  const sequence = [...outBlock, ...(hugIn ? before : after), ...inBlock, ...(hugIn ? after : before)];
  const step = (2 * Math.PI) / n;
  const start = turn - ((Math.max(1, outBlock.length) - 1) / 2) * step;
  sequence.forEach((path, i) => angleOf.set(path, start + i * step));
  return { angleOf, turn, spins: true };
}

// Circles: a circle per folder of at least `min` notes, a short column for smaller ones.
// Links inside a folder bundle through its centre. Links between folders leave the outer end of a
// name in a straight line, share one trunk to the circle's gate and gather in the middle of the chart.
const STEP = 16; // room along a circle for one label
const PAD = 130; // room for labels outside a circle
// The forces of the physics, adjustable from the panel in the view.
const FORCES = {
  gravity: 0.03, // pull of every circle toward the middle
  spacing: 20, // the least room between two circles
  linkForce: 0.4, // how hard linked circles pull together
  linkDistance: 60, // how far apart linked circles rest
  hole: 0, // an empty space in the middle, where links gather, that circles keep out of
  ring: 0, // how firmly circles hold to a chain around the middle, each touching an inner circle
  gather: 0.12, // how hard notes slide toward where their links go
  side: 0.05, // how hard other notes move beside the linked ones, or to the far side
  nameGap: 12, // the closest two names on a circle may come
  groupGap: 24, // extra room between notes with links out, notes without links, and notes linked inside
  room: 1.4, // extra room along a circle, so notes can gather
};

// Every folder as a body: where it is, how big, how it moves. Bodies start on one ring.
// With `floating`, circles get room so their notes can move along them.
function circlesModel(groups, min, links = [], floating = false, forces = FORCES) {
  const bodies = new Map();
  for (const g of groups) {
    const n = g.notes.length;
    const circle = n >= Math.max(1, min);
    const r = circle ? Math.max(55, (n * STEP * (floating ? forces.room : 1)) / (2 * Math.PI)) : 0;
    const reach = circle ? r + PAD : Math.max(PAD, (n * STEP) / 2);
    bodies.set(g.name, { name: g.name, notes: g.notes, circle, r, reach, x: 0, y: 0, vx: 0, vy: 0, fx: null, fy: null, cross: 0, spins: false });
  }
  const all = [...bodies.values()];
  const total = all.reduce((sum, b) => sum + 2 * b.reach, 0);
  const R = all.length > 1 ? (total / (2 * Math.PI)) * 1.1 : 0;
  let a = -Math.PI / 2;
  for (const b of all) {
    const share = R ? (2 * b.reach) / R : 0;
    const mid = a + share / 2;
    b.x = R * Math.cos(mid);
    b.y = R * Math.sin(mid);
    a += share;
  }
  const groupOf = new Map(groups.flatMap((g) => g.notes.map((note) => [note.path, g.name])));
  // One spring per pair of circles, as strong as the links between them.
  const pairs = new Map();
  // For every note, the circles its links go to, once per link; and how many of its links stay inside.
  const away = new Map();
  const inner = new Map();
  for (const [s, t] of links) {
    const gs = groupOf.get(s);
    const gt = groupOf.get(t);
    if (gs === gt) {
      inner.set(s, (inner.get(s) || 0) + 1);
      inner.set(t, (inner.get(t) || 0) + 1);
      continue;
    }
    if (!away.has(s)) away.set(s, []);
    if (!away.has(t)) away.set(t, []);
    away.get(s).push(gt);
    away.get(t).push(gs);
    const key = gs < gt ? `${gs}\n${gt}` : `${gt}\n${gs}`;
    pairs.set(key, (pairs.get(key) || 0) + 1);
    bodies.get(gs).cross++;
    bodies.get(gt).cross++;
  }
  const springs = [...pairs].map(([key, count]) => {
    const [ga, gb] = key.split('\n');
    return { a: bodies.get(ga), b: bodies.get(gb), count };
  });
  return { bodies, springs, groupOf, links, away, inner, forces, offsets: new Map(), angles: new Map(), spin: new Map(), floating };
}

// Where links between circles gather. On the ring: the middle of the chart. With physics: the centre
// of the circles, weighted by their links, so the bundles follow the circles around.
function middleOf(model) {
  // On the still ring, or with ring pull holding the circles around a fixed centre: the middle of the chart.
  if (!model.floating || model.forces.ring > 0) return [0, 0];
  let x = 0;
  let y = 0;
  let w = 0;
  for (const b of model.bodies.values()) {
    x += b.x * b.cross;
    y += b.y * b.cross;
    w += b.cross;
  }
  return w ? [x / w, y / w] : [0, 0];
}

// Each note's spot on its circle, kept relative to the way the circle faces, so the circle can turn.
function orient(model) {
  const middle = middleOf(model);
  const centres = new Map([...model.bodies].map(([k, b]) => [k, [b.x, b.y]]));
  for (const b of model.bodies.values()) {
    if (!b.circle) continue;
    const { angleOf, turn, spins } = facingOrder(b.notes, [b.x, b.y], centres, model.groupOf, model.links, middle);
    b.spins = spins;
    for (const [path, angle] of angleOf) model.offsets.set(path, angle - turn);
    if (!model.floating) continue;
    // With physics the notes slide along the circle from here, in this order around it. Angles stay
    // unwrapped and increasing around the circle, so every gap between neighbours is a plain difference.
    for (const [path, angle] of angleOf) {
      model.angles.set(path, norm(angle));
      model.spin.set(path, 0);
    }
    b.order = b.notes.map((note) => note.path).sort((p, q) => model.angles.get(p) - model.angles.get(q));
  }
  spaceNames(model);
}

// The closest two names on each circle may come.
function spaceNames(model) {
  for (const b of model.bodies.values()) {
    if (b.circle) b.gap = Math.min(model.forces.nameGap / b.r, (0.95 * 2 * Math.PI) / b.notes.length);
  }
}

// The difference between two angles, in (-π, π].
function turnBetween(from, to) {
  return Math.PI - (((Math.PI - (to - from)) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

// Physics on a circle: notes are beads on a ring. A note with links to other circles slides toward
// where they go (the middle, leaning toward the circle at the other end), so they gather on the side the
// links leave from. In such a circle, notes linked only inside it take the far side, and notes without
// links pack in, after a small gap, beside whichever of the two groups is bigger; a circle without links to other circles keeps its notes
// evenly spaced. Names never come closer than `gap`,
// and the order around the circle never changes.
function simulateNotes(model, alpha) {
  const middle = middleOf(model);
  for (const b of model.bodies.values()) {
    if (!b.circle || !b.order) continue;
    const unit = (x, y) => {
      const d = Math.hypot(x - b.x, y - b.y);
      return d > 1e-6 ? [(x - b.x) / d, (y - b.y) / d] : [0, 0];
    };
    const [mx, my] = unit(middle[0], middle[1]);
    const toMiddle = Math.atan2(mx, -my);
    const order = b.order;
    const n = order.length;
    const gathers = mx || my;
    // Which group is bigger: notes with links out, on the side facing the middle, or notes linked only
    // inside, on the far side. Notes without links join the bigger group.
    let outward = 0;
    let inward = 0;
    for (const path of order) {
      if (model.away.has(path)) outward++;
      else if (model.inner.has(path)) inward++;
    }
    const busiest = inward > outward ? toMiddle + Math.PI : toMiddle;
    for (const path of order) {
      const others = model.away.get(path);
      if (!others) {
        if (!gathers) continue;
        const a = model.angles.get(path);
        let want;
        if (!b.cross) {
          // A circle with no links out still faces the middle: all its notes gather toward it.
          want = toMiddle;
        } else if (model.inner.has(path)) {
          // Linked only inside the circle: the far side, away from the middle.
          want = toMiddle + Math.PI;
        } else {
          // Not linked at all: toward the bigger group, packing in beside it.
          want = busiest;
        }
        model.spin.set(path, model.spin.get(path) + turnBetween(a, want) * model.forces.side * alpha);
        continue;
      }
      let wx = 0;
      let wy = 0;
      for (const g of others) {
        const o = model.bodies.get(g);
        const [ux, uy] = unit(o.x, o.y);
        wx += mx + 0.5 * ux;
        wy += my + 0.5 * uy;
      }
      if (!wx && !wy) continue;
      const want = Math.atan2(wx, -wy);
      const pull = model.forces.gather * Math.min(1, others.length / 3);
      model.spin.set(path, model.spin.get(path) + turnBetween(model.angles.get(path), want) * pull * alpha);
    }
    // The gap after the i-th note; the last gap closes the circle.
    const gapAfter = (i) =>
      i < n - 1 ? model.angles.get(order[i + 1]) - model.angles.get(order[i]) : model.angles.get(order[0]) + 2 * Math.PI - model.angles.get(order[n - 1]);
    const even = (2 * Math.PI) / n;
    for (let i = 0; !gathers && i < n; i++) {
      const p = order[i];
      const q = order[(i + 1) % n];
      const f = (gapAfter(i) - even) * 0.03 * alpha;
      model.spin.set(p, model.spin.get(p) + f / 2);
      model.spin.set(q, model.spin.get(q) - f / 2);
    }
    for (const p of order) {
      const v = model.spin.get(p) * 0.6;
      model.spin.set(p, v);
      model.angles.set(p, model.angles.get(p) + v);
    }
    // Names keep their distance and their order, with a little more room where one kind of note ends and
    // the next begins (links out, no links, links inside): push apart any neighbours that came too close,
    // pass after pass (alternating direction, so a push travels along a packed arc) until none are.
    const kind = (p) => (model.away.has(p) ? 0 : model.inner.has(p) ? 2 : 1);
    const changes = order.filter((p, i) => kind(p) !== kind(order[(i + 1) % n])).length;
    const spare = 0.98 * 2 * Math.PI - n * b.gap;
    const extra = changes ? Math.max(0, Math.min(model.forces.groupGap / b.r, spare / changes)) : 0;
    const need = order.map((p, i) => b.gap + (kind(p) !== kind(order[(i + 1) % n]) ? extra : 0));
    for (let pass = 0; pass < 200; pass++) {
      let worst = 0;
      for (let k = 0; k < n; k++) {
        const i = pass % 2 ? n - 1 - k : k;
        const gap = gapAfter(i);
        if (gap >= need[i]) continue;
        worst = Math.max(worst, need[i] - gap);
        const fix = (need[i] - gap) / 2;
        const p = order[i];
        const q = order[(i + 1) % n];
        model.angles.set(p, model.angles.get(p) - fix);
        model.angles.set(q, model.angles.get(q) + fix);
      }
      if (worst < 1e-6) break;
    }
  }
}

// Let the notes slide until they come to rest.
function settleNotes(model) {
  for (let alpha = 1; alpha >= ALPHA_MIN; alpha -= alpha * ALPHA_DECAY) simulateNotes(model, alpha);
}

// The chart for where the bodies are now: circles that link elsewhere face the middle.
function place(model) {
  const middle = middleOf(model);
  const leaves = new Map();
  const groupLabels = new Map();
  const gates = new Map();
  for (const b of model.bodies.values()) {
    const dx = middle[0] - b.x;
    const dy = middle[1] - b.y;
    const d = Math.hypot(dx, dy);
    const [ux, uy] = d > 1e-6 ? [dx / d, dy / d] : [0, -1];
    // Just outside a circle's labels, on the side facing the middle.
    gates.set(b.name, [b.x + ux * b.reach, b.y + uy * b.reach]);
    const n = b.notes.length;
    if (b.circle) {
      const turn = b.spins ? Math.atan2(ux, -uy) : 0;
      for (const note of b.notes) {
        const a = norm(model.floating ? model.angles.get(note.path) : turn + model.offsets.get(note.path));
        const [x, y] = polar(a, b.r);
        leaves.set(note.path, { x: b.x + x, y: b.y + y, cx: b.x, cy: b.y, a, r: b.r });
      }
      groupLabels.set(b.name, [b.x, b.y]);
    } else {
      // Too few notes for a circle: a short row, side by side, every name pointing at the middle, and
      // the folder name just behind it.
      const a = norm(Math.atan2(ux, -uy));
      b.notes.forEach((note, i) => {
        const k = (i - (n - 1) / 2) * STEP;
        const x = b.x - uy * k;
        const y = b.y + ux * k;
        leaves.set(note.path, { x, y, cx: x, cy: y, a, r: 0 });
      });
      groupLabels.set(b.name, [b.x - ux * 24, b.y - uy * 24]);
    }
  }
  // A point beyond the outer end of a note's name, given its length, along the name's direction.
  const outer = (path, len, beyond = 0) => {
    const { cx, cy, a, r } = leaves.get(path);
    const [x, y] = polar(a, r + 6 + len + 2 + beyond);
    return [cx + x, cy + y];
  };
  // A link between circles leaves the outer end of a name in a straight line `run` long, then heads for
  // the circle's gate, as a link inside heads for the circle's centre, and on through the middle.
  const route = (s, t, gs, gt, len = () => 0, pull = 1, run = 0) => {
    if (gs === gt) {
      const b = model.bodies.get(gs);
      return [[leaves.get(s).x, leaves.get(s).y], [b.x, b.y], [leaves.get(t).x, leaves.get(t).y]];
    }
    const across = [gates.get(gs), between(gates.get(gs), gates.get(gt), middle, pull), gates.get(gt)];
    if (!run) return [outer(s, len(s)), ...across, outer(t, len(t))];
    return [outer(s, len(s)), outer(s, len(s), run), ...across, outer(t, len(t), run), outer(t, len(t))];
  };
  return { leaves, groupLabels, route };
}

// The view around the circles.
function fitBox(model) {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const b of model.bodies.values()) {
    x0 = Math.min(x0, b.x - b.reach);
    y0 = Math.min(y0, b.y - b.reach);
    x1 = Math.max(x1, b.x + b.reach);
    y1 = Math.max(y1, b.y + b.reach);
  }
  return [x0 - 20, y0 - 20, x1 - x0 + 40, y1 - y0 + 40];
}

// The circles chart, standing still on its ring.
function circlesChart(groups, min, links = []) {
  const model = circlesModel(groups, min, links);
  orient(model);
  return Object.assign(place(model), { box: fitBox(model) });
}

// Physics for the circles, after d3-force: one tick. Springs pull linked circles together (d3's link
// force), circles never overlap (forceCollide), and a weak pull keeps them near the middle (forceX/Y).
// A dragged circle is held at fx, fy.
const ALPHA_MIN = 0.001;
const ALPHA_DECAY = 1 - Math.pow(ALPHA_MIN, 1 / 300);

function simulate(model, alpha) {
  const bodies = [...model.bodies.values()];
  const f = model.forces;
  for (const { a, b, count } of model.springs) {
    let dx = b.x + b.vx - a.x - a.vx;
    let dy = b.y + b.vy - a.y - a.vy;
    const d = Math.hypot(dx, dy) || 1e-6;
    const rest = a.reach + b.reach + f.linkDistance;
    const l = ((d - rest) / d) * alpha * ((f.linkForce * count) / (count + 3));
    dx *= l;
    dy *= l;
    // The lighter circle moves more.
    const ma = a.notes.length;
    const mb = b.notes.length;
    b.vx -= (dx * ma) / (ma + mb);
    b.vy -= (dy * ma) / (ma + mb);
    a.vx += (dx * mb) / (ma + mb);
    a.vy += (dy * mb) / (ma + mb);
  }
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      let dx = b.x + b.vx - a.x - a.vx;
      let dy = b.y + b.vy - a.y - a.vy;
      let d = Math.hypot(dx, dy);
      if (d < 1e-6) {
        dx = (Math.random() - 0.5) * 1e-3;
        dy = (Math.random() - 0.5) * 1e-3;
        d = Math.hypot(dx, dy);
      }
      const min = a.reach + b.reach + f.spacing;
      if (d >= min) continue;
      const push = ((min - d) / d) * 0.7;
      const ra = a.reach * a.reach;
      const rb = b.reach * b.reach;
      b.vx += (dx * push * ra) / (ra + rb);
      b.vy += (dy * push * ra) / (ra + rb);
      a.vx -= (dx * push * rb) / (ra + rb);
      a.vy -= (dy * push * rb) / (ra + rb);
    }
  }
  for (const b of bodies) {
    b.vx -= b.x * f.gravity * alpha;
    b.vy -= b.y * f.gravity * alpha;
  }
  // Ring: every circle gets its spot on a chain around the middle, its edge touching an inner circle and
  // its sides touching its neighbours, and is pulled there. The order around the chain is the order the
  // circles are in now, so dragging one past another swaps them.
  if (f.ring > 0 && bodies.length > 1) ringTargets(model, bodies);
  // Keep the middle clear: a circle and its names stay outside the empty space there.
  else if (f.hole > 0) {
    const [mx, my] = middleOf(model);
    for (const b of bodies) {
      let dx = b.x + b.vx - mx;
      let dy = b.y + b.vy - my;
      let d = Math.hypot(dx, dy);
      if (d < 1e-6) {
        dx = Math.random() - 0.5;
        dy = Math.random() - 0.5;
        d = Math.hypot(dx, dy);
      }
      const min = f.hole + b.reach;
      if (d >= min) continue;
      const push = ((min - d) / d) * 0.5;
      b.vx += dx * push;
      b.vy += dy * push;
    }
  }
  for (const b of bodies) {
    if (b.fx != null) {
      b.x = b.fx;
      b.y = b.fy;
      b.vx = 0;
      b.vy = 0;
      continue;
    }
    b.vx *= 0.6;
    b.vy *= 0.6;
    b.x += b.vx;
    b.y += b.vy;
  }
}

// The chain around the middle: the inner radius is the smallest (at least Middle space) at which every
// circle fits around it touching its neighbours; the room left over is shared out between them.
function ringTargets(model, bodies) {
  const f = model.forces;
  const [mx, my] = middleOf(model);
  const around = bodies
    .map((b) => ({ b, at: Math.atan2(b.y - my, b.x - mx) }))
    .sort((p, q) => p.at - q.at);
  // The angle a circle takes up on a ring of inner radius h, with half the spacing on each side.
  const span = (b, h) => 2 * Math.asin(Math.min(1, (b.reach + f.spacing / 2) / (h + b.reach)));
  const total = (h) => around.reduce((sum, { b }) => sum + span(b, h), 0);
  let lo = Math.max(0, f.hole);
  let hi = lo;
  if (total(lo) > 2 * Math.PI) {
    hi = lo + 100;
    while (total(hi) > 2 * Math.PI) hi *= 2;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (total(mid) > 2 * Math.PI) lo = mid;
      else hi = mid;
    }
  }
  const h = hi;
  const spare = (2 * Math.PI - total(h)) / around.length;
  // Where each circle's spot is along the chain, before turning the chain to where the circles are.
  let at = 0;
  const slots = around.map(({ b }) => {
    const w = span(b, h) + spare;
    const centre = at + w / 2;
    at += w;
    return centre;
  });
  // Turn the chain to match the circles now, so it does not spin.
  let sx = 0;
  let sy = 0;
  around.forEach(({ at: now }, i) => {
    sx += Math.cos(now - slots[i]);
    sy += Math.sin(now - slots[i]);
  });
  const turn = Math.atan2(sy, sx);
  around.forEach(({ b }, i) => {
    const a = slots[i] + turn;
    const r = h + b.reach;
    // Not faded by alpha like the other forces: the chain is where the circles end up.
    b.vx += (mx + r * Math.cos(a) - b.x) * f.ring * 0.3;
    b.vy += (my + r * Math.sin(a) - b.y) * f.ring * 0.3;
  });
}

// Run the physics until the circles come to rest.
function settle(model) {
  for (let alpha = 1; alpha >= ALPHA_MIN; alpha -= alpha * ALPHA_DECAY) simulate(model, alpha);
}

class BundleView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.timer = null;
    this.frame = 0;
  }

  getViewType() {
    return BUNDLE_VIEW;
  }

  getDisplayText() {
    return 'Bundle';
  }

  getIcon() {
    return 'orbit';
  }

  async onOpen() {
    this.switcher = this.addAction('circle-dot', 'Switch between wheel and circles', async () => {
      const s = this.plugin.settings;
      s.bundleMode = s.bundleMode === 'circles' ? 'wheel' : 'circles';
      await this.plugin.saveData(s);
      this.plugin.redrawBundles();
    });
    this.registerEvent(this.app.metadataCache.on('resolved', () => this.later()));
    this.registerEvent(this.app.vault.on('rename', () => this.later()));
    this.registerEvent(this.app.vault.on('delete', () => this.later()));
    this.draw();
  }

  async onClose() {
    if (this.timer) window.clearTimeout(this.timer);
    this.stop();
  }

  later() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.draw(), 500);
  }

  stop() {
    if (this.frame) (this.contentEl.win || window).cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  // Notes under the root folder, grouped by the folder below it: stack/web/react.md is in "web".
  data() {
    const root = this.plugin.settings.bundleRoot.replace(/^\/+|\/+$/g, '');
    const prefix = root ? root + '/' : '';
    const groups = new Map();
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (!file.path.startsWith(prefix)) continue;
      const rest = file.path.slice(prefix.length).split('/');
      if (rest.length < 2) continue;
      const name = rest[0];
      const fm = (this.app.metadataCache.getFileCache(file) || {}).frontmatter || {};
      if (!groups.has(name)) groups.set(name, { name, notes: [] });
      groups.get(name).notes.push({ path: file.path, name: String(fm.title || file.basename), file });
    }
    const list = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
    for (const g of list) g.notes.sort((a, b) => a.name.localeCompare(b.name));
    const inside = new Set(list.flatMap((g) => g.notes.map((n) => n.path)));
    const links = [];
    const resolved = this.app.metadataCache.resolvedLinks;
    for (const source of inside) {
      for (const target of Object.keys(resolved[source] || {})) {
        if (target !== source && inside.has(target)) links.push([source, target]);
      }
    }
    return { groups: list, links };
  }

  draw() {
    this.stop();
    const el = this.contentEl;
    const win = el.win || window;
    el.empty();
    el.addClass('folder-clouds-bundle');
    const { groups, links } = this.data();
    if (!groups.length) {
      el.createEl('p', { text: `No notes in subfolders of "${this.plugin.settings.bundleRoot}". Set the root folder in Folder Clouds settings.` });
      return;
    }
    const settings = this.plugin.settings;
    const circles = settings.bundleMode === 'circles';
    const physics = circles && settings.bundlePhysics;
    let model = null;
    let chart;
    if (circles) {
      model = circlesModel(groups, settings.bundleMin, links, physics, this.forces());
      if (physics) settle(model);
      orient(model);
      if (physics) settleNotes(model);
      chart = Object.assign(place(model), { box: fitBox(model) });
    } else {
      chart = wheelChart(groups);
    }
    const groupOf = new Map(groups.flatMap((g) => g.notes.map((n) => [n.path, g.name])));
    if (this.switcher) this.switcher.setAttribute('aria-label', circles ? 'Show as one wheel' : 'Show as circles');

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    el.appendChild(svg);
    const home = chart.box.slice();
    let view = home.slice();
    const setView = () => svg.setAttribute('viewBox', view.map((v) => v.toFixed(1)).join(' '));
    setView();
    const make = (parent, tag, attrs) => {
      const node = document.createElementNS(SVG_NS, tag);
      for (const k in attrs) node.setAttribute(k, attrs[k]);
      parent.appendChild(node);
      return node;
    };
    const f = (v) => v.toFixed(1);
    // What a press lands on: a note, or a circle to drag.
    const hits = new Map();

    // With physics, a handle on every circle to drag it by.
    const bodyLayer = make(svg, 'g', { class: 'fcb-bodies' });
    const handles = new Map();
    if (physics) {
      for (const b of model.bodies.values()) {
        const size = b.circle ? b.r : Math.max(20, (b.notes.length * STEP) / 2);
        const handle = make(bodyLayer, 'circle', { r: f(size), class: 'fcb-body' });
        handles.set(b.name, handle);
        hits.set(handle, { body: b });
      }
    }

    // Links go under the names; they are filled in once the names can be measured.
    const linkLayer = make(svg, 'g', { class: 'fcb-links', fill: 'none' });
    const outgoing = new Map();
    const incoming = new Map();

    // Group names, faint.
    const groupLayer = make(svg, 'g', { class: 'fcb-groups' });
    const groupTexts = new Map();
    for (const g of groups) {
      const label = make(groupLayer, 'text', { 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'fcb-group' });
      label.textContent = g.name;
      groupTexts.set(g.name, label);
    }

    // Note names pointing out of their circle, as in the notebook.
    const texts = new Map();
    const holders = new Map();
    const flips = new Map();
    const nodeLayer = make(svg, 'g', { class: 'fcb-nodes' });
    for (const g of groups) {
      for (const n of g.notes) {
        const holder = make(nodeLayer, 'g', {});
        const text = make(holder, 'text', { dy: '0.31em', class: 'fcb-node' });
        text.textContent = n.name;
        texts.set(n.path, text);
        holders.set(n.path, holder);
        hits.set(text, { note: n, body: physics ? model.bodies.get(g.name) : null });
        text.addEventListener('mouseenter', () => this.mark(n.path, true, texts, outgoing, incoming, svg));
        text.addEventListener('mouseleave', () => this.mark(n.path, false, texts, outgoing, incoming, svg));
      }
    }

    // Move every name, group name and handle to where the chart says.
    const lay = (c) => {
      for (const [path, holder] of holders) {
        const { cx, cy, a, r } = c.leaves.get(path);
        holder.setAttribute('transform', `translate(${f(cx)},${f(cy)}) rotate(${f((a * 180) / Math.PI - 90)}) translate(${f(r)},0)`);
        const flip = a >= Math.PI;
        if (flips.get(path) === flip) continue;
        flips.set(path, flip);
        const text = texts.get(path);
        text.setAttribute('x', flip ? -6 : 6);
        text.setAttribute('text-anchor', flip ? 'end' : 'start');
        text.setAttribute('transform', flip ? 'rotate(180)' : '');
      }
      for (const [name, label] of groupTexts) {
        const [x, y] = c.groupLabels.get(name);
        label.setAttribute('x', f(x));
        label.setAttribute('y', f(y));
      }
      for (const [name, handle] of handles) {
        const b = model.bodies.get(name);
        handle.setAttribute('cx', f(b.x));
        handle.setAttribute('cy', f(b.y));
      }
    };
    lay(chart);

    // Name lengths, measured; an estimate while the view is hidden and measures nothing.
    const lengths = new Map();
    for (const [path, text] of texts) {
      let len = 0;
      try {
        len = text.getComputedTextLength();
      } catch (e) {
        // Not laid out yet.
      }
      lengths.set(path, len > 0 ? len : text.textContent.length * 5.6);
    }
    const lenOf = (p) => lengths.get(p);
    // A link's path with the settings as they are now. A link between circles keeps its straight run out
    // of the name at each end; the gates and the middle bundle like a circle's centre does for links inside.
    const linkD = (c, s, t, gs, gt) => {
      const run = settings.bundleRun;
      const keep = circles && gs !== gt ? (run > 0 ? 2 : 1) : 0;
      return bundlePath(c.route(s, t, gs, gt, lenOf, settings.bundleMiddle, run), settings.bundleBeta, keep, settings.bundleHold);
    };
    const paths = [];
    for (const [s, t] of links) {
      const gs = groupOf.get(s);
      const gt = groupOf.get(t);
      const path = make(linkLayer, 'path', { d: linkD(chart, s, t, gs, gt), class: 'fcb-link' });
      paths.push({ s, t, gs, gt, path });
      if (!outgoing.has(s)) outgoing.set(s, []);
      if (!incoming.has(t)) incoming.set(t, []);
      outgoing.get(s).push({ path, other: t });
      incoming.get(t).push({ path, other: s });
    }
    for (const [path, text] of texts) {
      const out = (outgoing.get(path) || []).length;
      const inc = (incoming.get(path) || []).length;
      make(text, 'title', {}).textContent = `${path}\n${out} outgoing\n${inc} incoming`;
    }

    // Physics: one tick a frame while the circles move, then rest.
    const sim = { alpha: 0, target: 0 };
    const frame = () => {
      simulate(model, sim.alpha);
      simulateNotes(model, sim.alpha);
      sim.alpha += (sim.target - sim.alpha) * ALPHA_DECAY;
      const c = place(model);
      lay(c);
      for (const p of paths) p.path.setAttribute('d', linkD(c, p.s, p.t, p.gs, p.gt));
      this.frame = sim.alpha < ALPHA_MIN && sim.target === 0 ? 0 : win.requestAnimationFrame(frame);
    };
    const wake = (alpha) => {
      sim.alpha = Math.max(sim.alpha, alpha);
      if (!this.frame) this.frame = win.requestAnimationFrame(frame);
    };
    const redrawLinks = () => {
      const c = physics ? place(model) : chart;
      for (const p of paths) p.path.setAttribute('d', linkD(c, p.s, p.t, p.gs, p.gt));
    };
    this.panel(el, physics, model, () => wake(0.3), redrawLinks);

    // Press a circle or a name to drag the circle; press the background to pan. A press on a name
    // that does not move opens the note. The wheel zooms; a double click on the background fits it all.
    const toChart = (e) => {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    };
    let press = null;
    svg.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const hit = hits.get(e.target) || {};
      const at = toChart(e);
      press = { id: e.pointerId, x: e.clientX, y: e.clientY, view: view.slice(), moved: false, note: hit.note, body: hit.body };
      if (press.body) press.grab = [at.x - press.body.x, at.y - press.body.y];
      svg.setPointerCapture(e.pointerId);
    });
    svg.addEventListener('pointermove', (e) => {
      if (!press || e.pointerId !== press.id) return;
      if (!press.moved && Math.hypot(e.clientX - press.x, e.clientY - press.y) < 4) return;
      press.moved = true;
      if (press.body) {
        const at = toChart(e);
        press.body.fx = at.x - press.grab[0];
        press.body.fy = at.y - press.grab[1];
        sim.target = 0.3;
        wake(0.3);
        svg.addClass('fcb-dragging');
      } else {
        const k = Math.max(press.view[2] / svg.clientWidth, press.view[3] / svg.clientHeight);
        view = [press.view[0] - (e.clientX - press.x) * k, press.view[1] - (e.clientY - press.y) * k, press.view[2], press.view[3]];
        setView();
      }
    });
    const release = (e) => {
      if (!press || e.pointerId !== press.id) return;
      if (press.body && press.moved) {
        press.body.fx = null;
        press.body.fy = null;
        sim.target = 0;
        svg.removeClass('fcb-dragging');
      } else if (!press.moved && press.note && e.type === 'pointerup') {
        this.app.workspace.getLeaf(e.metaKey || e.ctrlKey).openFile(press.note.file);
      }
      if (svg.hasPointerCapture(e.pointerId)) svg.releasePointerCapture(e.pointerId);
      press = null;
    };
    svg.addEventListener('pointerup', release);
    svg.addEventListener('pointercancel', release);
    svg.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const at = toChart(e);
        const z = Math.exp(Math.max(-0.5, Math.min(0.5, e.deltaY * 0.002)));
        view = [at.x - (at.x - view[0]) * z, at.y - (at.y - view[1]) * z, view[2] * z, view[3] * z];
        setView();
      },
      { passive: false }
    );
    svg.addEventListener('dblclick', (e) => {
      if (e.target !== svg) return;
      view = (physics ? fitBox(model) : home).slice();
      setView();
    });
  }

  // The saved forces, over the defaults.
  forces() {
    return Object.assign({}, FORCES, this.plugin.settings.bundleForces);
  }

  // Save soon, not on every step of a slider.
  saveSoon() {
    if (this.saving) window.clearTimeout(this.saving);
    this.saving = window.setTimeout(() => this.plugin.saveData(this.plugin.settings), 400);
  }

  // A panel of forces in the corner, like the graph view's: a gear opens it, sliders act at once.
  panel(el, physics, model, reheat, redrawLinks) {
    const settings = this.plugin.settings;
    const box = el.createDiv({ cls: 'fcb-controls' });
    const render = () => {
      box.empty();
      box.toggleClass('is-open', settings.bundlePanel);
      if (!settings.bundlePanel) {
        const open = box.createDiv({ cls: 'clickable-icon fcb-controls-open', attr: { 'aria-label': 'Forces' } });
        setIcon(open, 'settings');
        open.addEventListener('click', () => {
          settings.bundlePanel = true;
          this.saveSoon();
          render();
        });
        return;
      }
      const top = box.createDiv({ cls: 'fcb-controls-top' });
      top.createDiv({ cls: 'fcb-controls-title', text: 'Forces' });
      const close = top.createDiv({ cls: 'clickable-icon', attr: { 'aria-label': 'Close' } });
      setIcon(close, 'x');
      close.addEventListener('click', () => {
        settings.bundlePanel = false;
        this.saveSoon();
        render();
      });
      const section = (name) => box.createDiv({ cls: 'fcb-controls-section', text: name });
      const slider = (name, min, max, step, get, set, instant = true) =>
        new Setting(box).setName(name).addSlider((s) => {
          s.setLimits(min, max, step).setValue(get()).setDynamicTooltip();
          if (instant && typeof s.setInstant === 'function') s.setInstant(true);
          s.onChange((v) => set(v));
        });
      const force = (name, key, min, max, step, after) =>
        slider(
          name,
          min,
          max,
          step,
          () => model.forces[key],
          (v) => {
            model.forces[key] = v;
            settings.bundleForces = Object.assign({}, settings.bundleForces, { [key]: v });
            this.saveSoon();
            if (after) after();
            reheat();
          }
        );

      section('Links');
      slider('Bundle tension', 0, 100, 5, () => Math.round(settings.bundleBeta * 100), (v) => {
        settings.bundleBeta = v / 100;
        this.saveSoon();
        redrawLinks();
      });
      slider('Middle pull', 0, 100, 5, () => Math.round(settings.bundleMiddle * 100), (v) => {
        settings.bundleMiddle = v / 100;
        this.saveSoon();
        redrawLinks();
      });
      slider('Straight run', 0, 100, 5, () => settings.bundleRun, (v) => {
        settings.bundleRun = v;
        this.saveSoon();
        redrawLinks();
      });
      slider('Gate hold', 0, 100, 5, () => Math.round(settings.bundleHold * 100), (v) => {
        settings.bundleHold = v / 100;
        this.saveSoon();
        redrawLinks();
      });
      if (!physics) {
        box.createDiv({ cls: 'fcb-controls-note', text: 'Turn on Circles and Physics for the other forces.' });
        return;
      }
      section('Circles');
      force('Center force', 'gravity', 0, 0.2, 0.005);
      force('Repel', 'spacing', 0, 300, 5);
      force('Link force', 'linkForce', 0, 1, 0.02);
      force('Link distance', 'linkDistance', 0, 400, 5);
      force('Middle space', 'hole', 0, 600, 10);
      force('Ring pull', 'ring', 0, 1, 0.05);
      section('Notes');
      force('Gather', 'gather', 0, 0.5, 0.01);
      force('Others pull', 'side', 0, 0.3, 0.01);
      force('Name spacing', 'nameGap', 8, 30, 1, () => spaceNames(model));
      force('Group gap', 'groupGap', 0, 80, 2);
      // Room changes the size of the circles: draw again when the slider is let go.
      slider('Room', 100, 250, 10, () => Math.round(model.forces.room * 100), (v) => {
        settings.bundleForces = Object.assign({}, settings.bundleForces, { room: v / 100 });
        this.plugin.saveData(settings).then(() => this.draw());
      }, false);
      new Setting(box).addButton((b) =>
        b.setButtonText('Restore defaults').onClick(async () => {
          settings.bundleForces = {};
          settings.bundleBeta = DEFAULTS.bundleBeta;
          settings.bundleMiddle = DEFAULTS.bundleMiddle;
          settings.bundleRun = DEFAULTS.bundleRun;
          settings.bundleHold = DEFAULTS.bundleHold;
          await this.plugin.saveData(settings);
          this.draw();
        })
      );
    };
    render();
  }

  // Hover: links into the note in blue, out of it in red, as in the notebook.
  mark(path, on, texts, outgoing, incoming, svg) {
    svg.toggleClass('fcb-hover', on);
    texts.get(path).toggleClass('fcb-self', on);
    for (const { path: p, other } of incoming.get(path) || []) {
      p.toggleClass('fcb-in', on);
      if (on) p.parentNode.appendChild(p);
      texts.get(other).toggleClass('fcb-in', on);
    }
    for (const { path: p, other } of outgoing.get(path) || []) {
      p.toggleClass('fcb-out', on);
      if (on) p.parentNode.appendChild(p);
      texts.get(other).toggleClass('fcb-out', on);
    }
  }
}

const BUNDLE_CSS = `
.folder-clouds-bundle { padding: 0; overflow: hidden; position: relative; }
.folder-clouds-bundle .fcb-controls { position: absolute; top: 8px; right: 8px; z-index: 2; }
.folder-clouds-bundle .fcb-controls.is-open { width: 260px; max-height: calc(100% - 16px); overflow-y: auto; padding: 4px 12px 8px; background: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: var(--radius-m); box-shadow: var(--shadow-s); }
.folder-clouds-bundle .fcb-controls-top { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; }
.folder-clouds-bundle .fcb-controls-title { font-weight: var(--font-semibold); font-size: var(--font-ui-small); }
.folder-clouds-bundle .fcb-controls-section { margin-top: 10px; font-size: var(--font-ui-smaller); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.folder-clouds-bundle .fcb-controls-note { margin-top: 8px; font-size: var(--font-ui-smaller); color: var(--text-muted); }
.folder-clouds-bundle .fcb-controls .setting-item { padding: 6px 0; border: none; flex-direction: column; align-items: stretch; gap: 4px; }
.folder-clouds-bundle .fcb-controls .setting-item-name { font-size: var(--font-ui-small); }
.folder-clouds-bundle .fcb-controls .setting-item-control { justify-content: stretch; }
.folder-clouds-bundle .fcb-controls .setting-item-control input[type=range] { width: 100%; }
.folder-clouds-bundle svg { display: block; font-family: var(--font-interface); touch-action: none; user-select: none; }
.folder-clouds-bundle .fcb-body { fill: transparent; cursor: grab; }
.folder-clouds-bundle svg.fcb-dragging, .folder-clouds-bundle svg.fcb-dragging * { cursor: grabbing; }
.folder-clouds-bundle .fcb-link { stroke: var(--text-faint); stroke-opacity: 0.45; pointer-events: none; }
.folder-clouds-bundle .fcb-link.fcb-in { stroke: var(--color-blue); stroke-opacity: 1; }
.folder-clouds-bundle .fcb-link.fcb-out { stroke: var(--color-red); stroke-opacity: 1; }
.folder-clouds-bundle svg.fcb-hover .fcb-link:not(.fcb-in):not(.fcb-out) { stroke-opacity: 0.15; }
.folder-clouds-bundle .fcb-node { font-size: 10px; fill: var(--text-normal); cursor: pointer; }
.folder-clouds-bundle .fcb-node.fcb-self { font-weight: 700; }
.folder-clouds-bundle .fcb-node.fcb-in { fill: var(--color-blue); font-weight: 700; }
.folder-clouds-bundle .fcb-node.fcb-out { fill: var(--color-red); font-weight: 700; }
.folder-clouds-bundle .fcb-group { font-size: 13px; font-weight: 600; fill: var(--text-faint); opacity: 0.6; pointer-events: none; }
`;

class FolderClouds extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULTS, await this.loadData());
    this.hooks = [];
    this.warned = false;
    this.reported = new WeakSet();
    this.addSettingTab(new FolderCloudsSettingTab(this.app, this));
    this.addCommand({
      id: 'toggle',
      name: 'Toggle folder clouds',
      callback: async () => {
        this.settings.enabled = !this.settings.enabled;
        await this.save();
        new Notice(this.settings.enabled ? 'Folder clouds on.' : 'Folder clouds off.');
      },
    });
    this.addCommand({ id: 'restart', name: 'Restart folder clouds', callback: () => this.restart() });
    this.registerView(BUNDLE_VIEW, (leaf) => new BundleView(leaf, this));
    this.addCommand({ id: 'open-bundle', name: 'Open bundle view', callback: () => this.openBundle() });
    this.addRibbonIcon('orbit', 'Open bundle view', () => this.openBundle());
    this.style = document.head.createEl('style', { text: BUNDLE_CSS });
    this.app.workspace.onLayoutReady(() => this.scan());
    this.registerEvent(this.app.workspace.on('layout-change', () => this.scan()));
    this.registerEvent(this.app.workspace.on('active-leaf-change', () => this.scan()));
  }

  async openBundle() {
    const open = this.app.workspace.getLeavesOfType(BUNDLE_VIEW);
    const leaf = open.length ? open[0] : this.app.workspace.getLeaf('tab');
    if (!open.length) await leaf.setViewState({ type: BUNDLE_VIEW, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  redrawBundles() {
    for (const leaf of this.app.workspace.getLeavesOfType(BUNDLE_VIEW)) if (leaf.view instanceof BundleView) leaf.view.draw();
  }

  onunload() {
    if (this.style) this.style.remove();
    for (const hook of this.hooks) this.detach(hook);
    this.hooks = [];
  }

  async save() {
    await this.saveData(this.settings);
    // Obsidian may have replaced the graph's worker since: hook the current one first.
    this.scan();
    for (const hook of this.hooks) this.send(hook);
  }

  // Unhook every graph and hook it again from scratch.
  restart() {
    for (const hook of this.hooks) this.detach(hook);
    this.hooks = [];
    this.scan();
    new Notice('Folder Clouds restarted.');
  }

  // Only the global graph.
  scan() {
    const alive = new Set();
    for (const leaf of this.app.workspace.getLeavesOfType('graph')) {
      const renderer = leaf.view && leaf.view.renderer;
      if (!renderer) continue;
      alive.add(renderer);
      this.attach(renderer);
    }
    this.hooks = this.hooks.filter((h) => alive.has(h.renderer));
  }

  attach(renderer) {
    const known = this.hooks.find((h) => h.renderer === renderer);
    if (known && known.worker === renderer.worker) return;
    if (known) this.hooks = this.hooks.filter((h) => h !== known);
    const worker = renderer.worker;
    if (!worker || typeof worker.postMessage !== 'function' || !Array.isArray(renderer.links)) {
      if (!this.warned) new Notice('Folder Clouds does not recognize this graph view, so it changes nothing.', 8000);
      this.warned = true;
      return;
    }
    const original = worker.postMessage;
    const hook = { renderer, worker, original };
    const plugin = this;
    worker.postMessage = function (message, ...rest) {
      if (plugin.settings.enabled && message && (message.nodes || Array.isArray(message.links))) {
        const o = plugin.settings;
        message = Object.assign({}, message);
        // Nodes go first: the worker drops links to nodes it does not know.
        if (message.nodes) message.nodes = withCentres(message, renderer, o);
        if (Array.isArray(message.links)) {
          message.links = physics(message.links, renderer.nodes, o);
          plugin.report(renderer);
        }
      }
      return original.call(worker, message, ...rest);
    };
    // The worker reports every node it lays out, hidden centres included: keep where they are.
    hook.onmessage = worker.onmessage;
    worker.onmessage = function (e) {
      const out = hook.onmessage ? hook.onmessage.call(this, e) : undefined;
      try {
        plugin.track(hook, e.data);
      } catch (err) {
        // Labels never break the graph.
      }
      return out;
    };
    hook.labels = new Map();
    this.hooks.push(hook);
    if (renderer.links.length) this.send(hook);
  }

  // A notice when the graph opens, so it is clear the plugin runs.
  report(renderer) {
    if (this.reported.has(renderer)) return;
    this.reported.add(renderer);
    new Notice(`Folder Clouds: ${cloudsOf(renderer.nodes, this.settings).size} clouds.`, 5000);
  }

  // Resend every node and link through the filter. false keeps a node where it is.
  send({ renderer, worker }) {
    const nodes = {};
    for (const n of renderer.nodes) nodes[n.id] = false;
    const links = renderer.links.map((l) => [l.source.id, l.target.id]);
    worker.postMessage({ nodes, links, alpha: 1, run: true });
  }

  // Cloud names at the hidden centres, while Show clouds is on.
  track(hook, data) {
    if (!data || data.ignore || !data.id || !data.buffer) return;
    const { renderer } = hook;
    const hanger = renderer.hanger;
    if (!this.settings.enabled || !this.settings.labels || !hanger || typeof PIXI === 'undefined') {
      this.clearLabels(hook);
      return;
    }
    const pos = new Float32Array(data.buffer);
    const seen = new Set();
    const zoom = renderer.scale || 1;
    for (let i = 0; i < data.id.length; i++) {
      const id = data.id[i];
      if (typeof id !== 'string' || !id.startsWith(CENTRE)) continue;
      seen.add(id);
      let label = hook.labels.get(id);
      if (!label || label.destroyed) {
        label = new PIXI.Text(id.slice(CENTRE.length), {
          fontSize: 32,
          fontWeight: '600',
          fill: renderer.colors && renderer.colors.text ? renderer.colors.text.rgb : 0x888888,
          fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        });
        label.eventMode = 'none';
        label.anchor.set(0.5, 0.5);
        label.resolution = 2;
        label.zIndex = 0;
        label.alpha = 0.35;
        hook.labels.set(id, label);
      }
      if (label.parent !== hanger) hanger.addChild(label);
      label.x = pos[2 * i];
      label.y = pos[2 * i + 1];
      label.scale.x = label.scale.y = 1 / Math.max(zoom, 0.25);
    }
    for (const [id, label] of hook.labels) {
      if (seen.has(id)) continue;
      if (label.parent) label.parent.removeChild(label);
      label.destroy();
      hook.labels.delete(id);
    }
  }

  clearLabels(hook) {
    if (!hook.labels) return;
    for (const label of hook.labels.values()) {
      if (label.parent) label.parent.removeChild(label);
      if (!label.destroyed) label.destroy();
    }
    hook.labels.clear();
    if (typeof hook.renderer.changed === 'function') hook.renderer.changed();
  }

  // Back to the plain graph: no centres, no labels, the original links.
  detach(hook) {
    const { renderer, worker, original } = hook;
    this.clearLabels(hook);
    if (hook.onmessage && worker.onmessage !== hook.onmessage) worker.onmessage = hook.onmessage;
    if (worker.postMessage !== original) delete worker.postMessage;
    try {
      const nodes = {};
      for (const n of renderer.nodes) nodes[n.id] = false;
      const links = renderer.links.map((l) => [l.source.id, l.target.id]);
      original.call(worker, { nodes, links, alpha: 1, run: true });
      renderer.centres = null;
    } catch (e) {
      // The view is already closed.
    }
  }
}

class FolderCloudsSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    new Setting(containerEl)
      .setName('Folder clouds')
      .setDesc('Every folder pulls toward its own hidden centre, so its notes gather into a cloud without a centre note. Links between folders are drawn as usual but do not pull. Link distance in the graph settings sets the size of each cloud.')
      .addToggle((t) =>
        t.setValue(this.plugin.settings.enabled).onChange(async (v) => {
          this.plugin.settings.enabled = v;
          await this.plugin.save();
        })
      );
    new Setting(containerEl)
      .setName('Folder depth')
      .setDesc('1 makes a cloud of every top-level folder, 2 of every subfolder (stack/web, docs/git), 3 one deeper.')
      .addSlider((s) =>
        s
          .setLimits(1, 3, 1)
          .setValue(this.plugin.settings.depth)
          .setDynamicTooltip()
          .onChange(async (v) => {
            this.plugin.settings.depth = v;
            await this.plugin.save();
          })
      );
    this.slider('centre', 'Centre pull', 'How hard each note is pulled toward its folder\'s hidden centre: the number of hidden links to it. 0 turns the centres off.', 0, 5);
    this.slider('min', 'Smallest cloud', 'Folders with fewer notes than this get no centre and float free.', 1, 10);
    this.toggle('inside', 'Links inside a folder pull', 'On is the native graph. Off leaves only the centre holding a folder together.');
    this.toggle('cross', 'Links between folders pull', 'On is the native graph, and clouds drift into each other. Off keeps them apart; the links are still drawn.');
    this.toggle('labels', 'Show clouds', 'Write each cloud\'s folder name, faintly, at its hidden centre, to see which folders the plugin groups.');
    this.toggle('group', 'Group pull', 'Each cloud\'s centre is pulled toward a hidden centre of its parent folder, so stack/web, stack/mobile and the rest sit together.');
    new Setting(this.containerEl).setName('Bundle view').setHeading();
    new Setting(this.containerEl)
      .setName('Root folder')
      .setDesc('The bundle view shows notes under this folder, grouped by the folder below it: stack/web/react.md is in "web".')
      .addText((t) =>
        t.setValue(this.plugin.settings.bundleRoot).onChange(async (v) => {
          this.plugin.settings.bundleRoot = v.trim();
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.redrawBundles();
        })
      );
    new Setting(this.containerEl)
      .setName('Layout')
      .setDesc('Wheel puts every note on one circle. Circles gives every folder its own circle. The button at the top of the view switches too.')
      .addDropdown((d) =>
        d
          .addOption('wheel', 'Wheel')
          .addOption('circles', 'Circles')
          .setValue(this.plugin.settings.bundleMode)
          .onChange(async (v) => {
            this.plugin.settings.bundleMode = v;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.redrawBundles();
          })
      );
    new Setting(this.containerEl)
      .setName('Physics')
      .setDesc('In Circles, drag a circle by its middle or by a name and the others make room, like the graph view. Off keeps the circles still on one ring.')
      .addToggle((t) =>
        t.setValue(this.plugin.settings.bundlePhysics).onChange(async (v) => {
          this.plugin.settings.bundlePhysics = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.redrawBundles();
        })
      );
    new Setting(this.containerEl)
      .setName('Smallest circle')
      .setDesc('In Circles, a folder needs this many notes to get a circle. Smaller folders become a short column.')
      .addSlider((s) =>
        s
          .setLimits(1, 10, 1)
          .setValue(this.plugin.settings.bundleMin)
          .setDynamicTooltip()
          .onChange(async (v) => {
            this.plugin.settings.bundleMin = v;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.redrawBundles();
          })
      );
    new Setting(this.containerEl)
      .setName('Bundle tension')
      .setDesc('How tightly links bundle through their group: 0 is straight lines, 100 hugs the groups. The notebook uses 85.')
      .addSlider((s) =>
        s
          .setLimits(0, 100, 5)
          .setValue(Math.round(this.plugin.settings.bundleBeta * 100))
          .setDynamicTooltip()
          .onChange(async (v) => {
            this.plugin.settings.bundleBeta = v / 100;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.redrawBundles();
          })
      );
  }

  slider(key, name, desc, min, max) {
    new Setting(this.containerEl)
      .setName(name)
      .setDesc(desc)
      .addSlider((s) =>
        s
          .setLimits(min, max, 1)
          .setValue(this.plugin.settings[key])
          .setDynamicTooltip()
          .onChange(async (v) => {
            this.plugin.settings[key] = v;
            await this.plugin.save();
          })
      );
  }

  toggle(key, name, desc) {
    new Setting(this.containerEl)
      .setName(name)
      .setDesc(desc)
      .addToggle((t) =>
        t.setValue(this.plugin.settings[key]).onChange(async (v) => {
          this.plugin.settings[key] = v;
          await this.plugin.save();
        })
      );
  }
}

module.exports = FolderClouds;
module.exports.physics = physics;
module.exports.folderOf = folderOf;
module.exports.withCentres = withCentres;
module.exports.bundleLayout = bundleLayout;
module.exports.bundlePath = bundlePath;
module.exports.wheelChart = wheelChart;
module.exports.circlesChart = circlesChart;
module.exports.circlesModel = circlesModel;
module.exports.orient = orient;
module.exports.place = place;
module.exports.simulate = simulate;
module.exports.settle = settle;
module.exports.simulateNotes = simulateNotes;
module.exports.settleNotes = settleNotes;
module.exports.FORCES = FORCES;
module.exports.between = between;
module.exports.fitBox = fitBox;
