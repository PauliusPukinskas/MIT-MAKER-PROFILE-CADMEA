# My backend and algorithm work

**Paulius Pukinskas · Team lead / CEO, backend contributor and decision algorithm developer**

I led CADMEA's product direction and worked on translating geographic and community data into reviewable planning outputs. Backend development was shared with Motiejus Augustas Barauskas; the frontend, QA and communication have separate [team credits](CONTRIBUTIONS_AND_EVIDENCE.md).

## Technical responsibilities

| Area I worked on | Engineering question | Supporting case |
| :--- | :--- | :--- |
| Decision evaluator | How should a candidate be scored when most inputs are unknown? | [Score, coverage and missingness](BACKEND_CASE_STUDIES.md#1-missing-data-is-part-of-the-result) |
| Resident evidence | Which requests are relevant, and which repeat an existing signal? | [Matching and deduplication](BACKEND_CASE_STUDIES.md#2-community-signals-need-context) |
| Source handling | Which supplied observations are usable, documented and current? | [Validation and provenance](BACKEND_CASE_STUDIES.md#3-validation-and-evidence-lineage) |
| Ranking | Does a candidate remain near the top under different policy weights? | [Weight sensitivity](BACKEND_CASE_STUDIES.md#4-rank-sensitivity-without-false-certainty) |
| Backend integration | How do source retrieval, snapshots and analysis fit together? | [Engineering boundaries](ENGINEERING.md#backend-and-reliability-boundaries) |

The original archived implementation is identified by `artifacts/api-server/src/lib/decision-model.ts` and `resident-evidence.ts`. The [case studies](BACKEND_CASE_STUDIES.md) include synthetic source fixtures, verification results and artifact fingerprints. These paths identify shared team artifacts rather than exclusive authorship of every line.

## What changed through development

Earlier heuristics could assign a midpoint to absent observations and let unrelated resident requests affect a project. I worked on the backend and algorithm layer as the evaluator moved toward explicit missing indicators, district and sport relevance, provenance and policy sensitivity.

The useful outcome is a result whose limitations can be inspected: what was measured, how much policy weight it covers, which inputs remain missing and what a reviewer needs next.

## Scope and assistance

The working interface demonstrates the collaborative product. The public mathematical reproduction is a later teaching implementation, separate from the archived original source. The [verification record](REVIEW_CHECKS.md) keeps their test runs distinct.

AI coding tools supported development. This is a contribution and responsibility account, not an audited line by line authorship record. Municipal policy approval and validation against real investment outcomes remain outside the evidence presented here.

[Overview](../README.md) · [Backend cases](BACKEND_CASE_STUDIES.md) · [Team credits](CONTRIBUTIONS_AND_EVIDENCE.md)

