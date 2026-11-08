# Build history

*A source-grounded retrospective, not a rewritten Git history.*

CADMEA began as a collaborative project at the **May 14–16, 2026 Make It Real hackathon** in Vilnius. Its earlier work and later October revisions were preserved in project archives. The public repository contains **curated documentation**, not copied private commits, so the dates below describe real phases of work without manufacturing commit timestamps.

## May 2026 · From a civic question to a prototype

**Question:** How can Vilnius compare where sports facilities exist with where residents might need more access?

Our team designed a geographic experience that lets users inspect existing and planned facilities, see demand indicators and present candidate areas in a common interface. The software was built by several people with distinct responsibilities. I led the team and contributed backend and algorithm work, translating the planning problem into a technical system.

**External result:** Our project won the **Active Vilnius challenge** at Make It Real and was recognized in the FIRSTPICK investor category. This recognition belongs to the whole team.

**Limit:** A hackathon prototype is not a validated municipal planning system.

## After the hackathon · Making the project useful beyond the pitch

The product expanded beyond its original sports-infrastructure mapping concept toward a broader municipal analytics workspace. We discussed possible data integration with Vilnius representatives and a limited district pilot, subject to data access and protection requirements.

The archived application includes a React frontend, a TypeScript/Express API, database schemas, map components, source ingestion adapters, and analysis services.

**Engineering tradeoff:** joining diverse public and community information is valuable, but the sources do not share the same reliability or measurement meaning. The UI needed to distinguish an observed facility from a forecast, proxy or self-selected citizen request.

## October 8 · Rewriting the ranking logic

The archived municipal decision model describes a consequential change from earlier heuristic scoring:

- Prior drafts mixed static demand proxies, request/petition counts, estimated occupancy and sparse reviews into one rank.
- Some missing scores were replaced with an arbitrary midpoint, creating false precision.
- Resident requests from unrelated sports could influence the wrong project.

The revised deterministic model explicitly preserves absent values, requires sources and timestamps for supplied indicators, keeps modeled occupancy out of measured evidence, matches resident signals to **district and sport**, and deduplicates community identifiers.

It also returns **data coverage, ignorance bounds, readiness status, caveats and weight-sensitivity results**.

**Why I care:** an algorithm that looks decisive despite missing data is more dangerous than a report that admits uncertainty.

## October 9 · Geographic ingestion and reviewer access

Later archived versions added or refined OpenStreetMap/Overpass retrieval, caching, fallback behavior, source status and a lower-friction reviewer demo. These changes made the map more usable during a network failure or short presentation.

A later restricted viewer flow was implemented, while source README notes warn that local Vite development mode does not enforce all production asset boundaries. That caveat is part of the record; this public portfolio does not claim a security certification.

## October 15 · Recorded OSM snapshot

A bundled snapshot dated **October 15, 2026** contains **2,036 mini-infrastructure objects**, specifically 1,309 recycling records, 614 waste baskets and 113 waste disposal records.

This is an independent map layer for small city infrastructure, **not** a count of sports facilities and **not** a verified municipal asset register. The source is tagged OpenStreetMap data and can be stale relative to the live map.

## November 1–2 · Turning the work into inspectable evidence

The source ZIP and a 23.8-second genuine product recording were supplied for the portfolio. The archive identifies the decision-model implementation and associated unit tests.

On **November 2, 2026**, I reran the **12 decision-model tests** locally from the recovered source with Node 22. All **12 passed**, including tests for missing evidence, invalid inputs, duplicate community signals, time freshness, configurable weights and 13 ranking scenarios.

The checks are evidence of deterministic behavior on test cases; they do **not** establish real-world model accuracy or that the currently deployed site matches the archived snapshot.

## November 8 · Inspecting the original backend again

The archived `municipal-screening-v1.0` evaluator, resident evidence module and original test file were checked together in isolation. All **12 original tests passed** on Node v24.22.1. The [backend cases](BACKEND_CASE_STUDIES.md) record exact file fingerprints and explain missing evidence, community matching and validation using synthetic source fixtures.

The separate public teaching implementation received regression checks for candidates without evidence, tied indices, overflowing weights and actual weight sensitivity. Its suite now has **10 passing tests**. Those teaching code changes do not modify the original archive or the live application.

## Key iteration lesson

We moved from *“give every project a compelling number”* toward *“show which numbers can be defended, which cannot, and what data is needed next.”*

That architectural and product decision is the center of this maker project.

[Overview](../README.md) · [Engineering](ENGINEERING.md) · [Contributions](CONTRIBUTIONS_AND_EVIDENCE.md)

