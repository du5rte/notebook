'use strict';
// Every folder a cloud around a hidden centre.
const { Plugin, PluginSettingTab, Setting, Notice } = require('obsidian');

const DEFAULTS = { enabled: true, depth: 2, centre: 1, inside: true, cross: false, group: false, min: 2, labels: false };

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
    this.app.workspace.onLayoutReady(() => this.scan());
    this.registerEvent(this.app.workspace.on('layout-change', () => this.scan()));
    this.registerEvent(this.app.workspace.on('active-leaf-change', () => this.scan()));
  }

  onunload() {
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
