---
title: "Databases and data layers"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: []
tags: [comparison]
libraries: ["[[docs/libraries/mongodb]]", "[[docs/libraries/firebase]]", "[[docs/libraries/convex]]", "[[docs/libraries/trpc]]", "[[docs/libraries/instantdb]]", "[[docs/libraries/apollo-client]]"]
source: https://app.notion.com/p/1bb8a849aa7e805bb070ccdfa419a656
status: draft
---
# Databases and data layers

## Options considered

Self-hosted SQL/NoSQL, managed MongoDB Atlas, GraphQL with Apollo, Firebase, BaaS with Drizzle-style schemas, Convex, tRPC, InstantDB

## Decision

Convex: reactive queries, schema and functions in the client codebase, no separate server, caching handled internally. Written up in Notion as "The pain of wiring databases".

The full write-up, with code and the feature matrix, is still in Notion (ADR database). Port it here when this comparison is published.
