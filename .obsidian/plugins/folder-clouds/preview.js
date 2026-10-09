#!/usr/bin/env node
// Draw the bundle view outside Obsidian, from the vault on disk, as an SVG file.
// Used to check layout and physics changes without reloading the app; see README.md.
//
//   node .obsidian/plugins/folder-clouds/preview.js [out.svg] [--mode circles|wheel] [--still]
//        [--style smooth|bundled] [--forces '{"ring":0.5}']
//
// Run it from the vault root. It reads the same notes the view does (subfolders of the root folder,
// "stack" by default) and the plugin's saved settings in data.json, so the drawing matches what the
// view shows. --still draws the circles without physics. Turn the SVG into a PNG on macOS with
//   qlmanage -t -s 1600 -o . out.svg
'use strict';
const fs = require('fs');
const path = require('path');
const Module = require('module');

// main.js requires 'obsidian'; outside the app, empty stand-ins are enough for the layout functions.
const load = Module._load;
Module._load = function (request, ...rest) {
  if (request === 'obsidian') {
    const Stub = class {};
    return { Plugin: Stub, PluginSettingTab: Stub, Setting: Stub, Notice: Stub, ItemView: Stub, setIcon() {} };
  }
  return load.call(this, request, ...rest);
};
const FC = require(path.join(__dirname, 'main.js'));

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i < 0 ? undefined : args[i + 1];
};
const out = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && args[i - 1] !== '--still')) || 'bundle-preview.svg';
let saved = {};
try {
  saved = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
} catch (e) {
  // No saved settings: the defaults.
}
const mode = flag('--mode') || saved.bundleMode || 'circles';
const physics = mode === 'circles' && !args.includes('--still') && saved.bundlePhysics !== false;
const style = flag('--style') || saved.bundleStyle || 'smooth';
const forces = Object.assign({}, FC.FORCES, saved.bundleForces, flag('--forces') ? JSON.parse(flag('--forces')) : {});
const beta = saved.bundleBeta ?? 0.85;
const pull = saved.bundleMiddle ?? 0.35;
const run = saved.bundleRun ?? 50;
const hold = saved.bundleHold ?? 0;
const root = (saved.bundleRoot || 'stack').replace(/^\/+|\/+$/g, '');

// The notes, as the view's data() reads them from Obsidian.
const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.md')) files.push(p.split(path.sep).join('/'));
  }
};
walk(root);
const groups = new Map();
for (const f of files) {
  const rest = f.slice(root.length + 1).split('/');
  if (rest.length < 2) continue;
  const text = fs.readFileSync(f, 'utf8');
  const prop = (k) => (text.match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) || [])[1];
  if (!groups.has(rest[0])) groups.set(rest[0], { name: rest[0], notes: [] });
  groups.get(rest[0]).notes.push({
    path: f,
    name: (prop('title') || path.basename(f, '.md')).replace(/^"|"$/g, ''),
    status: prop('status'),
  });
}
const list = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
for (const g of list) g.notes.sort((a, b) => a.name.localeCompare(b.name));
const inside = new Set(list.flatMap((g) => g.notes.map((n) => n.path)));
const links = [];
const loose = new Set();
for (const s of inside) {
  const text = fs.readFileSync(s, 'utf8');
  const works = (text.match(/^works_with:\s*\[(.*)\]$/m) || [])[1] || '';
  for (const m of text.matchAll(/\[\[([^\]|#]+)/g)) {
    const t = m[1].trim() + '.md';
    if (t === s || !inside.has(t)) continue;
    links.push([s, t]);
    if (works.includes(`[[${m[1]}`)) loose.add(`${s}\n${t}`);
  }
}

// Lay it out the way the view does.
let chart;
let model = null;
if (mode === 'circles') {
  model = FC.circlesModel(list, saved.bundleMin ?? 3, links, physics, forces);
  if (physics) FC.settle(model);
  FC.orient(model);
  if (physics) FC.settleNotes(model);
  chart = Object.assign(FC.place(model), { box: FC.fitBox(model) });
} else {
  chart = FC.wheelChart(list);
}
const groupOf = new Map(list.flatMap((g) => g.notes.map((n) => [n.path, g.name])));
const len = (p) => [...list.flatMap((g) => g.notes)].find((n) => n.path === p).name.length * 5.6;
const linkD = (s, t) => {
  const gs = groupOf.get(s);
  const gt = groupOf.get(t);
  if (mode === 'circles' && gs !== gt && style !== 'bundled') return chart.curve(s, t, len, pull, run, beta);
  const keep = mode === 'circles' && gs !== gt ? (run > 0 ? 2 : 1) : 0;
  return FC.bundlePath(chart.route(s, t, gs, gt, len, pull, run, 1), beta, keep, hold);
};

const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const [bx, by, bw, bh] = chart.box;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bx} ${by} ${bw} ${bh}" width="1600" height="${Math.round((1600 * bh) / bw)}" style="background:#fff;font-family:-apple-system,sans-serif">`;
svg += '<g fill="none">';
for (const [s, t] of links) svg += `<path d="${linkD(s, t)}" stroke="#999" stroke-opacity="${loose.has(`${s}\n${t}`) ? 0.2 : 0.45}"/>`;
svg += '</g>';
const fade = { using: 1, trying: 0.85, dropped: 0.4, deprecated: 0.22 };
for (const g of list) {
  const [x, y] = chart.groupLabels.get(g.name);
  svg += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="600" fill="#aaa">${esc(g.name)}</text>`;
  for (const n of g.notes) {
    const { cx, cy, a, r } = chart.leaves.get(n.path);
    const flip = a >= Math.PI;
    const opacity = fade[n.status] ?? 0.65;
    svg += `<g transform="translate(${cx},${cy}) rotate(${(a * 180) / Math.PI - 90}) translate(${r},0)"><text dy="0.31em" x="${flip ? -6 : 6}" text-anchor="${flip ? 'end' : 'start'}"${flip ? ' transform="rotate(180)"' : ''} font-size="10" opacity="${opacity}">${esc(n.name)}</text></g>`;
  }
}
fs.writeFileSync(out, svg + '</svg>');
console.log(`${out}: ${inside.size} notes, ${links.length} links (${loose.size} works_with), ${mode}${physics ? ' with physics' : ''}, ${style}`);
