# Engineering case study: a ranking that admits uncertainty

> **Pilot municipal decision support, not an official investment allocation or predictive model.**

This page explains concrete behavior verified in the CADMEA source archive without releasing jointly owned implementation.

[Backend case studies](BACKEND_CASE_STUDIES.md) connect the original source fixtures to my backend contribution. The [November 8 verification record](REVIEW_CHECKS.md) separates 12 passing original archive tests from 10 passing public teaching tests.

## The inputs

The evaluator accepts candidate proposals with a district, sport, proposed action and six possible indicator measurements. Each present measurement names a source and provenance label. Documented evidence requires an observation timestamp; community and proxy inputs may omit it and are then treated as stale.

- **Documented:** a source and observation timestamp are supplied; the program does not independently authenticate the source.
- **Community:** self-selected platform input, not representative polling.
- **Proxy:** an estimate or derived planning signal, not verified unmet demand.

The six categories have configurable weights. For the illustrative default: demand pressure **30%**, access gap **25%**, facility pressure **15%**, resident input **10%**, asset condition **10%**, and value for money **10%**.

The current archived example does **not** have verified municipal travel-time access, asset condition or project cost data sufficient to approve a spending decision.

![Six criteria, with hypothetical weights](../assets/02-criteria.svg)

## The decision calculation

The algorithm calculates a **conditional screening index** from the indicators that are actually available. A distinct **coverage** value records how much of the intended policy weight was observed.

The important design choice is to keep **missing different from zero**. A numeric zero is a genuine possible reading; missing means no usable measurement was supplied.

When indicators are absent, the engine also constructs an **ignorance range**: how low or high the *complete* weighted score could be if all missing inputs lay anywhere from 0 to 100. This is a mathematical bound under the assumed scale, **not a statistical confidence interval**.

### A real unit test with synthetic numbers

The source test supplies only demand pressure = 80, with weight 0.30.

| Quantity | Result |
| :--- | ---: |
| Conditional index from the known input | **80 / 100** |
| Weighted data coverage | **30%** |
| Lower possible complete weighted score | **24** |
| Upper possible complete weighted score | **94** |

![Why missing evidence matters](../assets/03-unknowns.svg)

The result **80** must not be presented as an established city investment priority. The wide **24–94** bound reveals the 70% of weighted information that is missing.

## Rankings that can change with policy

A single weight vector is a policy choice, not a law of nature. The evaluator therefore runs **13 deterministic configurations**: the baseline plus a −25% and +25% perturbation of each of six weights, renormalized to total 100%.

The output records how a candidate's rank changes and its top-three frequency across these scenarios. This is **local weight sensitivity**, not probabilistic forecast uncertainty or Monte Carlo sampling.

![How rankings can change](../assets/04-sensitivity.svg)

A saved synthetic fixture shows that the first two candidates can exchange rank under these perturbations. That is precisely the kind of ambiguity a reviewer should see before treating an ordering as certain.

## Backend and reliability boundaries

The recovered project contains:

| Area | Purpose |
| :--- | :--- |
| TypeScript/Express API | Map and analysis endpoints, input handling, protected municipal views |
| Data adapters | OpenStreetMap/Overpass, local snapshots, and source retrieval |
| Decision evaluator | Deterministic criteria, evidence classification, missing-data handling, sensitivity checks |
| Community evidence logic | Matching participation to appropriate district/sport and deduplication |
| React interface | Map views, demand analysis, candidate shortlist, source explanations |
| Relational data layer | Schemas/migrations for structured platform state |

The source documentation describes caching and fallback when Overpass providers fail. An archived public mini-infrastructure snapshot had **2,036 tagged objects**, but they were waste/recycling infrastructure, **not sports sites**. This layer is a useful demonstration of geographic ingestion, not evidence of a complete city sports inventory.

## Verification performed for this portfolio

I extracted the three files necessary to run the archived decision-model tests, then ran the native Node test suite on **November 2, 2026**.

**Result: 12 tests passed, 0 failed.**

The tests covered: weight normalization, missing values, valid zero, absence of invented scores, freshness, readiness requiring human review, 13 ranking scenarios, invalid/future/duplicate input rejection, Lithuanian sport matching, resident-signal deduplication and monotonic normalization.

This is a **focused unit test**, not a full production deployment, security review or city-calibration study.

## What I would do next

The next genuinely useful phase is a permissioned district pilot with municipal experts: agree a complete candidate list, define access thresholds, ingest validated population and facility data, collect verified cost and condition inputs, and review the effect of different policy weights.

The engine should support human judgment by explaining uncertainty, never conceal it behind a confident score.

[History](BUILD_HISTORY.md) · [Contributions and evidence](CONTRIBUTIONS_AND_EVIDENCE.md)

