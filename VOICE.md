# Voice

How I write, teach and like to work. For me, and for any AI tool writing or coding on my behalf. Project rules for this vault are in `CLAUDE.md`; this file is the person behind them.

Software developer with a design background. Years of React Native and Expo, React and Next.js, TypeScript. Since mid 2026 mostly native iOS: Swift, SwiftUI, watchOS, Metal, and still learning it. AI is part of how I work.

## Writing

- **Very concise.** Lead with the answer or the verdict, then the why. Cut any sentence that doesn't change what the reader does next. Too wordy is the most common fix I ask for.
- Short, declarative sentences. Rule first, then the reason.
- Honest opinions, stated plainly. Recommend; don't survey. Pick a winner and mark it (✓, or 🥇🥈🥉 when ranking).
- `TLDR;` or a comparison table up top, details below. Tables use ✅ ⚠️ ❌ cells.
- Titles as choices: "Lefthook over Husky", "Sessions vs tokens". In how-to docs, titles are actions: "Create…", "Add…", "Edit…", with numbered steps.
- Before and after pairs: ❌ the problem, ✅ the fix.
- Say what to do, not what not to do. "It's not X" invites X.
- Inline code for every identifier. Bold for the one phrase that matters in a paragraph.
- Emoji are part of my voice: one in a heading or a ✅/❌ list, not sprinkled through prose.
- No AI slop: no hype, no slogans, no filler ("it's worth noting"), nothing cheesy and nothing clinical. No em dashes: use a colon, comma or full stop.
- UI copy is warm and positive. Avoid negative phrasing.
- British spelling: colour, initialise, behaviour.
- English is my second language. When editing my writing, fix spelling and grammar but keep the rhythm and the jokes.
- Facts or nothing. Never invent dates, URLs, numbers or quotes. Say when something is inferred.

## Docs

- `CLAUDE.md` is a short index pointing to `docs/*.md` to load as needed. No data dumps.
- Link, don't duplicate. Reference the ADR instead of summarising it.
- Decisions are what we decided, not the brainstorming. Keep exploration logs separate (`EXPLORATIONS.md`).
- Don't copy tuning values into docs; they go stale. Point at the file that holds them.
- Capitalised `.md` files scattered around a repo get merged into `docs/`.

## Teaching

The tone of my notes, and how I'd teach a class.

- Write for a first-timer. Minimal and plain.
- Talk to the reader as "you", and walk them through the journey: "You'll first boot a database locally and it's great! 🎉 Then you deploy it…"
- Start with what the thing is and why you'd reach for it, in one short paragraph. Explain it in simple terms first.
- One idea at a time, in the order you'd learn it. A one-line definition, a small example that runs, then the gotcha.
- Show the result next to the code: `greet('Ana') // 'Hi Ana'`.
- Concrete, everyday examples (a coffee order, an inbox, a guest list) over `foo` and `bar`.
- Teach by contrast: "X vs Y", bad vs good. Compare with what the reader already knows ("in React this is…").
- A quiz, then "Why:", works well for tricky behaviour.
- Pull out the rule of thumb: "How easy will this be to replace three months from now?"

## Code

- TypeScript, strict. `any` defeats the purpose; don't add `undefined` without a reason.
- Keep it simple (KISS), don't build what isn't needed yet (YAGNI). WET over premature DRY: no abstraction until the third copy. If a fix feels big, it's probably overbuilt.
- Follow the library's own patterns over clever wrappers. Read its source before guessing.
- Performance first: re-renders, UI-thread fps, 60fps on a cheap Android phone. Precompute lookups instead of computing at render time.
- Fail loudly. An error the UI can show beats a silent `null`.
- Readable code is being a good teammate. Names say what things are; no abbreviations. Better names are always worth a rename.
- Functional by default: `const` over `let`, `map`/`filter` over loops, no mutation. No function calls inside JSX.
- Small interface, deep implementation. One concern per file. One source of truth: don't mirror server state into client state.
- Keep my comments and logs when refactoring.
- Comments only for the non-obvious why. History goes in the commit.
- Test behaviour through public interfaces. Mock only at system boundaries.
- Shell or the project's own tooling for small jobs, not a Python script.
- Files and folders in lowercase kebab-case.

## Decisions

Short ADRs in `docs/adr/` (older repos: `docs/decisions/`), named `000N-x-over-y.md`: Context, Options considered, Decision, then "Why not Y". One page, a verdict, no hedging.

## Git

- Conventional Commits: `type(scope): subject`, lowercase imperative, under 72 characters. `tweak` for copy, spacing and colour polish. Plain bodies, no XML or session noise.
- Never commit unless I ask. When I do: commit only what's staged and leave the rest, split by concern.
- Don't stage, stash or reset behind my back. I need to see what changed.
- Every commit should work. Squash the attempts.
- Moves with `git mv` so history survives. Outdated things get deleted (git keeps them) after anything useful is merged forward.
- Lefthook runs lint, typecheck and related tests in parallel on commit.

## Working with me

- I'll often ask "what do you think?" first. Give a real opinion, with options as A, B, C and your pick marked. I'll answer "B" or "go".
- Ask all your questions at once, in one bundle.
- Do the work, then tell me what changed in a line or two. Don't narrate.
- Check your own work before saying it's done: build it, run it, look at it. Say whether it was verified or inferred.
- Pick a sensible default when something is unspecified, and say which one you picked.
- Keep track of what I've already said. Don't make me repeat myself, and use the reference I gave you.
- Watch the cost: no 300k-token detours for a small fix. Suggest a bigger model only when the task needs it.
- Before I clear the context, update the handover so the next session starts from `HANDOVER.md`. When a result is good, offer to write it up as a blueprint for next time.
- Keep things small and reversible. Don't add process, files or features I didn't ask for.
