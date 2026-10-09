'use strict';
// Every folder a cloud around a hidden centre.
const { Plugin, PluginSettingTab, Setting, Notice, ItemView } = require('obsidian');

const DEFAULTS = { enabled: true, depth: 2, centre: 1, inside: true, cross: false, group: false, min: 2, labels: false, bundleRoot: 'stack', bundleBeta: 0.85, bundleMode: 'wheel', bundleMin: 3 };

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
// The first and last `keep` points stay put, so a link can leave a name in a straight line; then the
// straightening fades in toward the middle, so links from one note share a trunk before they fan out.
function bundlePath(points, beta, keep = 0) {
  const n = points.length - 1;
  const [x0, y0] = points[0];
  const [xn, yn] = points[n];
  const ps = points.map(([x, y], i) => {
    if (i < keep || i > n - keep) return [x, y];
    const t = n ? i / n : 0;
    const b = keep ? 1 - (1 - beta) * Math.sin(Math.PI * t) : beta;
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
  const route = (s, t, gs, gt) => {
    const pts = [[leaves.get(s).x, leaves.get(s).y], inner.get(gs)];
    if (gs !== gt) pts.push([0, 0], inner.get(gt));
    pts.push([leaves.get(t).x, leaves.get(t).y]);
    return pts;
  };
  return { box: [-half, -half, 2 * half, 2 * half], leaves, groupLabels, route };
}

// Spots on a circle for its notes, so each note faces where its links pull: toward the middle of the
// chart, where links between circles gather, leaning toward the circles it links to. The most linked
// notes choose first; notes without links fill the rest in name order.
function facingOrder(notes, centre, centres, groupOf, links) {
  const [cx, cy] = centre;
  const unit = ([x, y]) => {
    const d = Math.hypot(x - cx, y - cy);
    return d ? [(x - cx) / d, (y - cy) / d] : [0, 0];
  };
  const pull = new Map(notes.map((n) => [n.path, { x: 0, y: 0, links: 0 }]));
  const own = groupOf.get(notes[0].path);
  for (const [s, t] of links) {
    for (const [a, b] of [[s, t], [t, s]]) {
      const p = pull.get(a);
      if (!p) continue;
      // Every link heads for the middle first; links to another circle lean toward it too.
      const [mx, my] = unit([0, 0]);
      const [ux, uy] = groupOf.get(b) === own ? [0, 0] : unit(centres.get(groupOf.get(b)));
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
  // Like a compass: links leave a circle toward the middle of the chart, so the circle turns until its
  // most linked note points straight at the middle. The other linked notes sit beside it, each on the
  // side of the circle it links to.
  const [mx, my] = unit([0, 0]);
  const turn = linked.length ? Math.atan2(mx, -my) : 0;
  const slot = (i) => turn + (2 * Math.PI * i) / n;
  const free = new Set(notes.map((_, i) => i));
  const angleOf = new Map();
  if (linked.length) {
    free.delete(0);
    angleOf.set(linked[0].path, slot(0));
  }
  for (const note of linked.slice(1)) {
    const w = want(note);
    let best = -1;
    for (const i of free) if (best < 0 || gap(slot(i), w) < gap(slot(best), w)) best = i;
    free.delete(best);
    angleOf.set(note.path, slot(best));
  }
  const rest = [...free].sort((a, b) => a - b);
  notes.filter((note) => !angleOf.has(note.path)).forEach((note, i) => angleOf.set(note.path, slot(rest[i])));
  // Angles in [0, 2π), so labels on the left half flip to read the right way up.
  for (const [k, a] of angleOf) angleOf.set(k, ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
  return angleOf;
}

// Circles: a circle per folder of at least `min` notes, a short column for smaller ones, all on one ring.
// Links inside a folder bundle through its centre; links between folders run centre to centre.
function circlesChart(groups, min, links = []) {
  const STEP = 16; // room along a circle for one label
  const PAD = 130; // room for labels outside a circle
  const shapes = groups.map((g) => {
    const n = g.notes.length;
    const circle = n >= Math.max(1, min);
    const r = circle ? Math.max(55, (n * STEP) / (2 * Math.PI)) : 0;
    const reach = circle ? r + PAD : Math.max(PAD, (n * STEP) / 2);
    return { g, circle, r, reach };
  });
  const total = shapes.reduce((sum, sh) => sum + 2 * sh.reach, 0);
  const R = shapes.length > 1 ? (total / (2 * Math.PI)) * 1.1 : 0;
  const centres = new Map();
  let a = -Math.PI / 2;
  for (const sh of shapes) {
    const share = R ? (2 * sh.reach) / R : 0;
    const mid = a + share / 2;
    centres.set(sh.g.name, R ? [R * Math.cos(mid), R * Math.sin(mid)] : [0, 0]);
    a += share;
  }
  const leaves = new Map();
  const groupLabels = new Map();
  const groupOf = new Map(groups.flatMap((g) => g.notes.map((note) => [note.path, g.name])));
  for (const sh of shapes) {
    const [cx, cy] = centres.get(sh.g.name);
    const n = sh.g.notes.length;
    const angles = sh.circle ? facingOrder(sh.g.notes, [cx, cy], centres, groupOf, links) : null;
    sh.g.notes.forEach((note, i) => {
      if (sh.circle) {
        const t = angles.get(note.path);
        const [x, y] = polar(t, sh.r);
        leaves.set(note.path, { x: cx + x, y: cy + y, cx, cy, a: t, r: sh.r });
      } else {
        const y = cy + (i - (n - 1) / 2) * STEP;
        leaves.set(note.path, { x: cx, y, cx, cy: y, a: Math.PI / 2, r: 0 });
      }
    });
    groupLabels.set(sh.g.name, sh.circle ? [cx, cy] : [cx, cy - ((n + 1) / 2) * STEP - 6]);
  }
  const reachOf = new Map(shapes.map((sh) => [sh.g.name, sh.circle ? sh.r + PAD : PAD]));
  // A point beyond the outer end of a note's name, given its length, along the name's direction.
  const outer = (path, len, beyond = 0) => {
    const { cx, cy, a, r } = leaves.get(path);
    const [x, y] = polar(a, r + 6 + len + 2 + beyond);
    return [cx + x, cy + y];
  };
  const MOMENTUM = 50; // how far a link runs straight out of a name before it turns
  // Just outside a circle's labels, on the side facing the middle of the chart.
  const gate = (g) => {
    const [cx, cy] = centres.get(g);
    const d = Math.hypot(cx, cy) || 1;
    const k = reachOf.get(g);
    return [cx - (cx / d) * k, cy - (cy / d) * k];
  };
  // Inside a circle: from the notes on the circle through its centre.
  // Between circles: straight out of the names, through each circle's gate and the middle of the chart,
  // so links gather in the middle as in the wheel.
  const route = (s, t, gs, gt, len = () => 0) => {
    if (gs === gt) return [[leaves.get(s).x, leaves.get(s).y], centres.get(gs), [leaves.get(t).x, leaves.get(t).y]];
    return [
      outer(s, len(s)),
      outer(s, len(s), MOMENTUM),
      gate(gs),
      [0, 0],
      gate(gt),
      outer(t, len(t), MOMENTUM),
      outer(t, len(t)),
    ];
  };
  // Fit the view to the circles, not to the whole ring.
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const sh of shapes) {
    const [cx, cy] = centres.get(sh.g.name);
    x0 = Math.min(x0, cx - sh.reach);
    y0 = Math.min(y0, cy - sh.reach);
    x1 = Math.max(x1, cx + sh.reach);
    y1 = Math.max(y1, cy + sh.reach);
  }
  return { box: [x0 - 20, y0 - 20, x1 - x0 + 40, y1 - y0 + 40], leaves, groupLabels, route };
}

class BundleView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.timer = null;
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
  }

  later() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.draw(), 500);
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
    const el = this.contentEl;
    el.empty();
    el.addClass('folder-clouds-bundle');
    const { groups, links } = this.data();
    if (!groups.length) {
      el.createEl('p', { text: `No notes in subfolders of "${this.plugin.settings.bundleRoot}". Set the root folder in Folder Clouds settings.` });
      return;
    }
    const settings = this.plugin.settings;
    const circles = settings.bundleMode === 'circles';
    const chart = circles ? circlesChart(groups, settings.bundleMin, links) : wheelChart(groups);
    const groupOf = new Map(groups.flatMap((g) => g.notes.map((n) => [n.path, g.name])));
    const beta = settings.bundleBeta;
    if (this.switcher) this.switcher.setAttribute('aria-label', circles ? 'Show as one wheel' : 'Show as circles');

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', chart.box.join(' '));
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    el.appendChild(svg);
    const make = (parent, tag, attrs) => {
      const node = document.createElementNS(SVG_NS, tag);
      for (const k in attrs) node.setAttribute(k, attrs[k]);
      parent.appendChild(node);
      return node;
    };

    // Links go under the names; they are filled in once the names can be measured.
    const linkLayer = make(svg, 'g', { class: 'fcb-links', fill: 'none' });
    const outgoing = new Map();
    const incoming = new Map();

    // Group names, faint.
    const groupLayer = make(svg, 'g', { class: 'fcb-groups' });
    for (const g of groups) {
      const [x, y] = chart.groupLabels.get(g.name);
      const label = make(groupLayer, 'text', { x, y, 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'fcb-group' });
      label.textContent = g.name;
    }

    // Note names pointing out of their circle, as in the notebook.
    const texts = new Map();
    const nodeLayer = make(svg, 'g', { class: 'fcb-nodes' });
    for (const g of groups) {
      for (const n of g.notes) {
        const { cx, cy, a, r } = chart.leaves.get(n.path);
        const flip = a >= Math.PI;
        const holder = make(nodeLayer, 'g', { transform: `translate(${cx},${cy}) rotate(${(a * 180) / Math.PI - 90}) translate(${r},0)` });
        const text = make(holder, 'text', {
          dy: '0.31em',
          x: flip ? -6 : 6,
          'text-anchor': flip ? 'end' : 'start',
          transform: flip ? 'rotate(180)' : '',
          class: 'fcb-node',
        });
        text.textContent = n.name;
        texts.set(n.path, text);
        text.addEventListener('mouseenter', () => this.mark(n.path, true, texts, outgoing, incoming, svg));
        text.addEventListener('mouseleave', () => this.mark(n.path, false, texts, outgoing, incoming, svg));
        text.addEventListener('click', (e) => this.app.workspace.getLeaf(e.metaKey || e.ctrlKey).openFile(n.file));
      }
    }

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
    for (const [s, t] of links) {
      const gs = groupOf.get(s);
      const gt = groupOf.get(t);
      const pts = chart.route(s, t, gs, gt, (p) => lengths.get(p));
      // Between circles keep the straight run out of the name and the circle's gate at each end,
      // so a note's links share one trunk to the gate and spread only toward the middle.
      const keep = circles && gs !== gt ? 3 : 0;
      const path = make(linkLayer, 'path', { d: bundlePath(pts, beta, keep), class: 'fcb-link' });
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
.folder-clouds-bundle { padding: 0; overflow: hidden; }
.folder-clouds-bundle svg { display: block; font-family: var(--font-interface); }
.folder-clouds-bundle .fcb-link { stroke: var(--text-faint); stroke-opacity: 0.45; }
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
