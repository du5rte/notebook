---
title: "Utility libraries"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: []
tags: [comparison]
libraries: ["[[docs/libraries/lodash]]", "[[docs/libraries/remeda]]", "[[docs/libraries/just]]"]
source: https://app.notion.com/p/1d68a849aa7e80d2a8c2d62080e6b99d
status: draft
---
# Utility libraries

## Options considered

Lodash, Lodash/fp, Remeda, just, rambda, Zod utils, Ramda

## Decision

Remeda for type-safe composable code, just for one-function packages, Zod utils for schema-based projects. Lodash dropped for bundle size and mutating functions.

The full write-up, with code and the feature matrix, is still in Notion (ADR database). Port it here when this comparison is published.
