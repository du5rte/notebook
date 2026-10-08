---
title: "AI - Working With Agents"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["Agentic Workflow"]
tags: [ai, engineering]
---
# AI - Working With Agents

A coding agent is only as good as what it knows about your project. Every session it starts from zero: it hasn't seen your last chat, your team's habits or why you picked that library. So the trick isn't a clever prompt, it's **setting up the repo** so any agent that opens it finds the rules, the tools and a clear task. Think of onboarding a new hire who forgets everything every morning: you'd write things down. That's this whole lesson.

## Write the conventions down: CLAUDE.md and AGENTS.md

Put a `CLAUDE.md` (or `AGENTS.md`, the name other agents look for) at the root of every repo. The agent reads it at the start of a session, so it's the cheapest way to make it follow your rules.

```md
# Coffee Tracker

Expo app, TypeScript strict, pnpm workspaces.

## Rules
- Run `pnpm typecheck` and `pnpm test` before saying a task is done.
- Conventional Commits. Don't commit unless asked.
- Files in lowercase kebab-case.
```

What goes in: the stack in one line, the commands to check work, the rules people keep breaking. What stays out: anything the agent can read from the code itself. Keep it short; every line costs context on every task.

Why: if a convention only lives in your head, the agent will break it every single time and you'll fix it by hand every single time. Written down once, it's followed forever.

## A VOICE.md for how you write

`CLAUDE.md` is the project's rules. A `VOICE.md` is **you**: how you write, explain and like to work, so docs, commit messages and replies sound like you instead of like a generic assistant.

```md
## Writing
- Lead with the answer, then the why.
- Short sentences. No filler. British spelling.
```

Why: agents default to a polished, wordy, samey tone. A page of examples of your voice fixes that faster than correcting every reply.

## Committed hooks: don't ask, enforce

A rule in `CLAUDE.md` is a request. A hook is a guarantee. Commit `.claude/settings.json` with hooks, and the harness runs them whether the agent remembers or not.

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "pnpm format" }] }
    ]
  }
}
```

Why: formatting, linting and similar chores should never depend on the agent "remembering". Rule of thumb: if you'd be annoyed to remind it twice, make it a hook. More on hooks in [[docs/claude-code|AI - Claude Code]].

## Project MCP servers

MCP servers give the agent tools for your actual stack: your backend, your error tracker, your component library, up-to-date library docs. My repos use servers like Convex, Sentry, HeroUI, context7 and Neon. Commit the project's MCP config so everyone (and every agent) gets the same tools.

```sh
claude mcp add --scope project convex -- convex mcp start
```

Why: an agent that can query the real database schema or read the real error doesn't have to guess. Guessing is where hallucinations come from.

⚠️ Never commit API keys in MCP config. Pass them through environment variables.

## Vendored skills

A **skill** is a packaged set of instructions for one kind of task: a review checklist, a "grill me on this plan" routine, a release flow. You can pull skills from other people's repos into yours. I vendor them (copy them into the repo) and pin what I took in a lockfile (`skills-lock.json`).

Why: same reason you lock npm packages. The skill your agent used last month is the one it uses today, and changing it is a reviewed diff, not a surprise.

## One ticket per agent task

Give each agent one ticket, written like you'd write it for a person: the goal, where to look, how you'll know it's done.

```md
Add a "favourite" toggle to the coffee detail screen.
- Store it in the existing `favourites` table.
- Done when: toggle persists after a reload, tests pass.
```

Then label tickets by how hard they are, and match the **model tier** to the label: a small fast model for mechanical changes (rename, copy tweak), a mid model for everyday features, the biggest model and more effort for architecture, tricky algorithms or security review.

Why: small, well-scoped tasks are where agents shine and where review is easy. Labelling difficulty stops you paying top-model prices for a typo fix, and stops a small model muddling through a hard problem. Model choice is manual, so I even put this in `CLAUDE.md`:

```md
# Model / effort escalation
On tasks that warrant more (deep architecture, tricky algorithms, security review,
large refactors), don't silently muddle through on current settings. Suggest
switching model or raising effort.
```

## Worktrees: agents in parallel

Two agents editing the same folder will trip over each other. A Git **worktree** is a second (or tenth) checkout of the same repo in its own folder, on its own branch, sharing one history.

```sh
git worktree add ../coffee-tracker-favourites -b feat/favourites
git worktree list   # main checkout + the new one
git worktree remove ../coffee-tracker-favourites
```

One ticket, one branch, one worktree, one agent. I use tools like Linear for the tickets and Superset to run agents in worktrees, but plain `git worktree` is the idea underneath.

Why: each agent gets a clean, isolated workspace, and each one ends as a normal branch you review and merge.

## Common mistakes

- A 500-line `CLAUDE.md`. The agent skims it like you would. Keep the rules that matter.
- Relying on "please always run the formatter" in prose. Make it a hook.
- Vague tickets ("improve the settings screen"). You'll get a vague result.
- Secrets in committed MCP config or settings. Use env vars and `deny` `.env` reads.
- Running parallel agents in one folder instead of worktrees.

## Try it

1. Write a `CLAUDE.md` for a project you know, in under 30 lines. What did you leave out, and why?
2. Pick a rule you keep repeating to an agent and turn it into a hook.
3. Take a feature, split it into three agent tickets, and label each with the model tier you'd use.

## Related
- [[docs/claude-code|AI - Claude Code]]
- [[docs/ml|AI - How Models Learn]]
- [[docs/commits|Engineering - Commits]]
- [[docs/principles|Engineering - Principles]]
- [[docs/git/git-branching|Git - Branching]]
