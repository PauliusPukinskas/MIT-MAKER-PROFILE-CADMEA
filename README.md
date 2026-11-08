# CADMEA

**Help a city compare where to build, repair or investigate sports infrastructure.**

Our team built CADMEA around a practical planning problem: facilities, community requests and demand indicators do not arrive with the same coverage or reliability. I led the team and worked on the backend and decision algorithms alongside another backend contributor.

**Paulius Pukinskas · Team lead / CEO · Backend and algorithms · 2026**

[Explore the application](https://cadmeamap.com/) · [Backend case studies](docs/BACKEND_CASE_STUDIES.md) · [My contribution](docs/MY_BACKEND_AND_ALGORITHM_WORK.md) · [Team credits](docs/CONTRIBUTIONS_AND_EVIDENCE.md)

[![CADMEA public infrastructure overview in English](assets/live-screenshots/2026-11-07/cadmea-overview.jpg)](https://cadmeamap.com/)

*Working public application, captured November 7, 2026. Select EN on a first visit. The frontend is team built; my technical focus was the backend and algorithms.*

## My backend work

| Problem | My contribution | Concrete behavior |
| :--- | :--- | :--- |
| An incomplete record can look like a high priority | Decision logic that keeps score, coverage and missing information separate | **80 points with 30% coverage** gives a possible complete score of **24 to 94** |
| Repeated or unrelated requests can inflate demand | District and sport matching, terminology normalization and duplicate signal handling | A source fixture reduces overlapping participation records to **four distinct identifiers** |
| A supplied source can be stale or unverified | Provenance, freshness and explicit human review in the evaluator | Old observations do not count as fresh documented coverage |
| A single policy vector can hide a fragile ranking | Local weight sensitivity across thirteen deterministic scenarios | A change in demand versus access emphasis can exchange the top two candidates |
| Geographic retrieval can fail | Backend integration and source workflows with snapshot fallback | The data layer remains distinct from the decision calculation |

[Follow the original evaluator's inputs, failure cases and test evidence](docs/BACKEND_CASE_STUDIES.md).

## Product views

| Facility portfolio | Demand radar |
| :---: | :---: |
| [![CADMEA facilities and type breakdown](assets/live-screenshots/2026-11-07/cadmea-facilities.jpg)](https://cadmeamap.com/objektai) | [![CADMEA demand and shortage indices](assets/live-screenshots/2026-11-07/cadmea-demand.jpg)](https://cadmeamap.com/paklausa) |
| Managed and planned facilities retain type and status. | Planning indices remain separate from verified demand measurements. |

[![CADMEA OSM category filter](assets/live-screenshots/2026-11-07/cadmea-category-filter.jpg)](https://cadmeamap.com/mini-infrastruktura)

The captured OSM layer contains 2,036 waste, recycling, litter bin and clothing records. Filtering to Clothing leaves 141. This demonstrates geographic ingestion and filtering; it is a separate layer from the sports inventory.

[Six image walkthrough](docs/PRODUCT_WALKTHROUGH.md) · [Architecture and scoring explanation](docs/ENGINEERING.md)

## A backend calculation worth inspecting

| Only available input | Conditional score | Weighted coverage | Possible complete score |
| :--- | ---: | ---: | ---: |
| Demand pressure 80/100, weight 30% | 80 | 30% | 24 to 94 |

The wide range exposes the missing 70% of policy weight. An observed zero and an absent measurement have different meanings. The bounds describe missing information under the indicator scale; they are not a statistical confidence interval.

The [archived original source suite](docs/REVIEW_CHECKS.md) was rerun on November 8: **12 tests passed**. A separate [public teaching implementation](public-reproduction/README.md) has **10 passing tests** and can be run with Node 18 or newer:

```bash
cd public-reproduction
npm test
```

The original collaborative application remains private. The teaching implementation explains the mathematics; it does not establish which implementation is deployed.

## Team and development

CADMEA began at Make It Real in Vilnius in May 2026, winning the Active Vilnius challenge and receiving FIRSTPICK investor category recognition. I contributed backend and algorithm work alongside Motiejus Augustas Barauskas. Karolis Beliavskij developed the frontend, Martynas Toločka handled QA and operations, and Rokas Vengraitis worked on marketing and communication. Development also used AI coding tools.

Later work replaced midpoint substitutions for missing indicators with explicit coverage, evidence provenance and review requirements. Municipal pilot discussions remain work in progress.

[Build history](docs/BUILD_HISTORY.md) · [Contribution record](docs/CONTRIBUTIONS_AND_EVIDENCE.md) · [Media provenance](docs/DEMO_AND_MEDIA_STATUS.md)

