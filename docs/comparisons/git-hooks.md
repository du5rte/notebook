---
title: "Git hook managers"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: []
tags: [comparison]
libraries: ["[[docs/libraries/husky]]", "[[docs/libraries/simple-git-hooks]]", "[[docs/libraries/lefthook]]"]
source: https://app.notion.com/p/33a8a849aa7e80cb9e98f89c89943e0f
status: draft
---
# Git hook managers

## Options considered

Husky, simple-git-hooks, Lefthook

## Decision

Lefthook: Go binary with no Node dependency, parallel pre-commit (lint, tsc, jest), one YAML file. Husky is slow and broke in v9; simple-git-hooks gives too little control.

The full write-up, with code and the feature matrix, is still in Notion (ADR database). Port it here when this comparison is published.
