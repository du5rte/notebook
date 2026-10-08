---
title: "AI - Claude Code"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [ai, tools]
---
# AI - Claude Code

Claude Code is Anthropic's coding agent. It runs in your terminal, inside your project, and can read files, edit them and run commands, asking your permission as it goes. Think of it as a very fast teammate sitting at your keyboard: you say what you want, it does the work, you review. This lesson is how I set up a project with it and the few settings that make it pleasant to live with.

## Start a project: brief first, code later

The best results come from giving the agent a clear picture before it writes a line. My flow:

**1. Make the folder.** This is the base of the project. Open it in your editor.

```sh
mkdir coffee-tracker && cd coffee-tracker
```

**2. Init Git and make an empty first commit.** Now every change the agent makes has something to diff against, and you can always roll back.

```sh
git init
git commit --allow-empty -m "Insert epic first commit message"
```

**3. Write a product brief by talking.** Chat with Claude naturally. Don't try to structure it upfront: the back and forth is the point. At the end, ask for a clean `PRODUCT_BRIEF.md`.

```
Help me plan a product brief with the goal of being used for Claude Code
to generate a project and reference for designing with Figma.
```

**4. Hand it to Claude Code in plan mode.** Drop the brief in `.claude/`, start a session in the project and say:

```
Read PRODUCT_BRIEF.md and then enter plan mode
```

In **plan mode** Claude reads and proposes a plan but doesn't touch files. You agree on the plan, then let it build. Toggle it with `Shift+Tab`.

## Two commands to know

- `Shift+Tab`: cycle into plan mode. Plan before any change bigger than a few lines.
- `/clear`: start fresh. Do it **every time you start a new task**, otherwise the old conversation stays in the context window and you burn tokens on stuff that no longer matters.

## Settings: three scopes

Claude Code reads settings from three places. The closer to you, the more it wins.

| File | Scope | In git? | Use it for |
|---|---|---|---|
| `~/.claude/settings.json` | User: all your projects | ❌ | Your personal defaults |
| `.claude/settings.json` | Project, shared | ✅ | Rules the whole team (and every agent) should follow |
| `.claude/settings.local.json` | Project, just you | ❌ gitignored | Personal overrides for this repo |

Gotcha: when you approve a permission mid-session, Claude writes it to `settings.local.json` by default. If it should apply to everyone on the project, move it to `settings.json` yourself.

## Permissions: allow, ask, deny

Permissions decide what Claude can do without stopping to ask. Allow the boring, safe stuff so you're not clicking "yes" all day, and fence off the dangerous stuff.

```json
{
  "permissions": {
    "allow": ["Read", "Edit", "Bash(git status *)", "Bash(pnpm *)", "mcp__convex__*"],
    "ask": ["Bash(rm -rf *)", "Bash(git push --force *)"],
    "deny": ["Read(.env)", "Read(.env.production)"]
  }
}
```

- `allow`: runs without a prompt. Reading, editing, your package manager, read-only git.
- `ask`: always prompts, even if something broader is allowed. Anything you can't undo.
- `deny`: never. Secrets live here: the agent has no reason to read `.env`.

## MCP servers

MCP (Model Context Protocol) servers are plug-ins that give the agent new tools: talk to your database, read your error tracker, look up a component library. Add one with `claude mcp add`:

```sh
claude mcp add --scope user convex -- convex mcp start
```

Everything after `--` is the command that starts the server. `--scope user` installs it for all your projects, which I prefer for servers I use everywhere: it's set up once and starts faster.

⚠️ Don't hand-add servers under `mcpServers` in `settings.json`; that didn't work for me. Use `claude mcp add`, which writes to the right file for the scope you pick (`--scope project` gives you a shared config to commit, see [[docs/agentic-workflow|AI - Working With Agents]]).

## Hooks: make it automatic

A **hook** is a shell command Claude Code runs at a set moment, like a Git hook for the agent. The agent doesn't have to remember to do it: the harness does it every time.

Format after every edit, so the agent never leaves messy code behind:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "pnpm format" }]
      }
    ]
  }
}
```

`PostToolUse` fires after a tool runs; `matcher` limits it to the `Edit` and `Write` tools.

Get a macOS notification when Claude needs you, so you can walk away while it works:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

An empty `matcher` means "every time". Put team hooks (like formatting) in the project's `settings.json` so they're committed; personal ones (like notifications) in your user settings.

## Remote control

Remote Control lets you send tasks from the Claude app on your phone to Claude Code running on your Mac, with full access to your local dev environment and files. Your Mac needs to stay awake and the desktop app must stay open. In your project:

```sh
claude remote-control
```

You'll forget to turn it on before stepping away. Enable it for every session instead: run `/config` in Claude Code and set "Enable Remote Control for all sessions" to `true`.

## Common mistakes

- Never running `/clear`. One endless session gets slower, pricier and more confused.
- Approving permissions one by one and wondering why teammates still get prompted. They went to `settings.local.json`.
- Allowing everything. Keep destructive commands in `ask` and secrets in `deny`.
- Skipping plan mode on big changes, then reviewing a 40-file diff you never agreed to.

## Try it

1. Bootstrap an empty project with the four steps above and stop after the plan. Was the plan what you pictured?
2. Add the `pnpm format` hook to a project, ask Claude to edit a file, and check the diff is formatted.
3. Write a `permissions` block for a repo: what goes in `allow`, `ask` and `deny`?

## Related
- [[docs/ml|AI - How Models Learn]]
- [[docs/agentic-workflow|AI - Working With Agents]]
- [[docs/git/git|Git - Basics]]
