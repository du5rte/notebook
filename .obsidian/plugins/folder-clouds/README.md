# Folder Clouds

A plugin for this vault only. It does two things:

1. **Graph clouds.** In Obsidian's own graph view, every folder (at a chosen depth) gathers into a cloud around a hidden centre, and links between folders are drawn but do not pull.
2. **Bundle view.** A view of its own (the orbit icon, or the command *Open bundle view*) that draws the `stack/` records as hierarchical edge bundling, after [observablehq.com/@du5rte/bilevel-edge-bundling](https://observablehq.com/@du5rte/bilevel-edge-bundling), in two layouts: **Wheel** (every note on one circle) and **Circles** (a circle per area folder, with physics).

Everything is in `main.js`, one file of plain JavaScript, no build step. `data.json` holds the saved settings. `preview.js` draws the bundle view from the vault on disk, outside Obsidian.

## What the bundle view reads

The notes under the root folder (`stack` by default), grouped by the folder below it: `stack/web/react.md` is in **web**. From each note:

| Field | Used for |
|---|---|
| `title` | the name drawn |
| `built_with` | links: what the note is directly built with. Chains of these are what hovering follows. |
| `works_with` | weak links: a tool used with something it is not built with. Drawn fainter; chains stop at them. |
| any other `[[stack/...]]` link in the note | a link too (e.g. GraphQL's reference implementation line) |
| `status` | ranking and fading: using, trying, watching / legacy / none, dropped, deprecated (the faintest, below dropped) |

The conventions for writing these are in the vault's `CLAUDE.md`.

## The code, top to bottom

| Part | What it is |
|---|---|
| `DEFAULTS` | every setting and its default |
| `folderOf` … `withCentres` | **graph clouds**: hooks Obsidian's graph worker (`renderer.worker.postMessage`), replaces the links it simulates and adds hidden centre nodes. Uses Obsidian internals, not the plugin API: an Obsidian update can break it. |
| `bundleLayout`, `polar`, `bundlePath` | d3's cluster layout and `curveBundle` (straighten toward the chord, then a B-spline), rewritten small |
| `wheelChart` | the Wheel layout |
| `facingOrder` | each circle's starting order: links out facing the middle (most linked in the centre of the group), notes linked only inside on the far side, notes without links between them, joining the bigger group |
| `STATUS_RANK`, `rankOf` | how actively a note is used, for ordering and fading |
| `FORCES` | every physics force and its default (also the forces panel) |
| `circlesModel` | the circles as bodies: size, starting ring, springs, which links stay inside |
| `middleOf`, `orient`, `spaceNames` | where links gather; each note's place; name spacing |
| `simulateNotes` | physics along a circle: notes are beads on a ring |
| `releaseHeld`, `simulateFree` | dragging single notes |
| `place` | from the model to positions: every name, group label, gate, and the routes and curves of links |
| `simulate`, `ringTargets`, `settle` | physics of the circles themselves |
| `BundleView` | the view: reading the vault, drawing the SVG, the animation loop, pointer handling, the forces panel, hover highlights |
| `BUNDLE_CSS` | styles, including the accent-colour shades |
| `FolderClouds`, `FolderCloudsSettingTab` | the plugin and its settings tab |

## Circles: how the physics works

**Circles** (`simulate`, after d3-force). Each folder is a body. Springs pull linked circles together (*Link force*, *Link distance*), circles never overlap (*Repel*), and a weak pull keeps them near the middle (*Center force*). With *Ring pull* above 0, `ringTargets` instead places every circle on a chain round the middle, each touching an inner circle (at least *Middle space* across) and its neighbours; the order round the chain is the order the circles are in, so dragging one past another swaps them. Forces fade as the simulation cools (alpha, as in d3), except the ring pull. The whole layout is settled before the first draw.

**Notes** (`simulateNotes`). Notes slide along their circle like beads, never passing each other and never closer than *Name spacing*, with *Group gap* more room between kinds of note. Notes with links out are pulled toward where their links go (*Gather*); in a circle with such links, notes linked only inside go to the far side and notes without links join the bigger group (*Others pull*). Angles are kept unwrapped and increasing round the circle so every gap is a plain difference.

**Opening.** The layout is settled before the first frame. Then, with *Animate on open* (plugin settings, on by default), the circles start at 30% of their distance from the middle and each follows a point sliding to where it settled (`model.opening`, paced by `model.grow`), and the names appear one at a time (`model.reveal`, `shown()`): the ones I use most and with the most links first, each fading in and growing out from its circle's centre, with a link fading in once both its names show. Collisions use the size the circles have grown to, and the ring pull waits until the opening ends, so it always ends in the planned layout. All names are out in about 2 s. `OPEN_GROW` and `OPEN_PULL` pace the circles; `REVEAL_SPREAD` (frames over which names start) and `REVEAL_EACH` (frames each takes) pace the names.

**Small folders** (fewer than *Smallest circle* notes) are a short row pointing at the middle instead of a circle.

**Where links gather.** With physics, the middle is the centre of the circles weighted by their links out; with *Ring pull* on, the middle of the chart.

## Dragging

| Press on | Drags |
|---|---|
| a name | that note only (physics on) |
| a circle's middle, or its folder name | the whole circle |
| the background | pans the view |

A dragged note (`model.free`, `simulateFree`) follows the pointer and keeps its highlight. Over its circle (within `OVER_CIRCLE` of the ring) the names either side lean apart to make room (`model.shift`, fading over `LEAN_REACH` names), so names slide past it; away from the circle the gap closes, because the circle's physics runs without it. Its own circle leans after it a little (`CIRCLE_LEAN`). Let go and it springs back (*Snap back*) to its **rank**, which never changes: status and links decide it.

## Links

**Inside a circle:** from the note on the circle through the circle's centre.

**Between circles, Smooth** (`curve` in `place`): out of the outer end of the name along its direction (*Straight run*), then two cubic pieces meeting at a point bent toward the middle by *Centre pull*. Every joint keeps its direction, so there are no corners. Above 35% the turn through the centre tightens so links meet there; *Bundle tension* sets how far each end carries before turning.

**Between circles, Bundled** (`route` + `bundlePath`): through each circle's gate (just outside its names, facing the middle) and the middle, bundled with *Bundle tension*; *Gate hold* fixes the bend at the gates.

**Wheel:** leaf, its group, the centre (only between groups), the other group, the other leaf, as in the notebook.

## Hover

Hovering a name follows its chain up to four steps each way: what it is **built with** in the accent colour, what **uses** it in a lighter shade, each step fainter. Weak (`works_with`) links are fainter still, drawn in the palest shade on hover, and the chain stops at them. A legend shows while hovering. All highlight colours are shades of the theme accent (`--fcb-*` in `BUNDLE_CSS`).

Names also fade by status (using 100%, trying 85%, watching / legacy / none 65%, dropped 40%, deprecated 22%), unless they are part of a hovered chain.

## Settings

**Plugin settings tab** (graph clouds, and the bundle view's root folder, layout, physics, smallest circle, tension).

**Forces panel** in the bundle view (gear, top right), saved as you go:

| Section | Slider | Setting | Default |
|---|---|---|---|
| Links | Link style | `bundleStyle` | Smooth |
| | Bundle tension | `bundleBeta` | 0.85 |
| | Centre pull | `bundleMiddle` | 0.35 |
| | Straight run | `bundleRun` | 50 |
| | Gate hold (Bundled) | `bundleHold` | 0 |
| Opening | Animate on open | `bundleAnimate` | on |
| | Opening speed | `bundleOpenSpeed` | 1× |
| | Replay opening (button) | | |
| Circles | Center force | `gravity` | 0.03 |
| | Repel | `spacing` | 20 |
| | Link force | `linkForce` | 0.4 |
| | Link distance | `linkDistance` | 60 |
| | Middle space | `hole` | 0 |
| | Ring pull | `ring` | 0 |
| Notes | Gather | `gather` | 0.12 |
| | Others pull | `side` | 0.05 |
| | Name spacing | `nameGap` | 12 |
| | Group gap | `groupGap` | 24 |
| | Snap back | `snap` | 0.01 |
| | Room (redraws on release) | `room` | 1.4 |

Forces are saved in `data.json` under `bundleForces`, only the ones changed from the default. *Restore defaults* clears them.

## Gotchas

- **Reload after editing files by hand.** Obsidian reads `main.js` and `data.json` only when the plugin loads: run *Reload app without saving*. Touching a setting before reloading writes the in-memory settings back over a hand-edited `data.json`.
- **Graph search filter.** The vault's graph filter hides files with "index" in the name, so a note that must show in the graph cannot have "index" in its name.
- **A note named like its circle reads as a duplicate** (a "Web" note in the web circle). Name such notes differently (Browser), or put them in another folder (Motion is in `web/`, not `motion/`).
- **The graph clouds hook Obsidian internals** (`renderer.worker`, `renderer.links`, `sim.js` messages). If an update breaks them, the plugin shows a notice and changes nothing; *Restart folder clouds* re-hooks open graphs.
- **`works_with` is read from `cache.frontmatterLinks`**, whose keys look like `works_with` or `works_with.0`.

## Checking a change

Draw the bundle view from the vault, with the saved settings, outside Obsidian:

```bash
node .obsidian/plugins/folder-clouds/preview.js /tmp/bundle.svg
```

`--mode wheel`, `--still` (no physics), `--style bundled` and `--forces '{"ring":0.5}'` override the saved settings. On macOS, `qlmanage -t -s 1600 -o /tmp /tmp/bundle.svg` turns it into a PNG to look at.

The layout and physics functions are exported from `main.js` (`circlesModel`, `settle`, `orient`, `settleNotes`, `place`, `simulate`, `simulateNotes`, `simulateFree`, `releaseHeld`, `bundlePath`, `wheelChart`, `FORCES`), so a few lines of Node can also test behaviour directly: settle a model, move a note, run frames, and measure. `preview.js` shows how to load `main.js` outside Obsidian.
