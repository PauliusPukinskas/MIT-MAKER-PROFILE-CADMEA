# Inspect the CADMEA mathematics

This is a later teaching implementation of the documented scoring model. **It is separate from the original team application's source and does not prove that the deployed application uses this implementation.** The original source remains private.

The code uses six configurable weights, keeps unknown values distinct from measured zero, exposes missing information bounds and tests thirteen local policy weight scenarios. All examples are synthetic.

## Run it

Node 18 or newer; no installation, credentials or network access required:

```bash
cd public-reproduction
npm test
```

**10 tests pass.** They include the 80 point, 30% coverage example with complete score bounds of 24 to 94, and a four candidate fixture where the leading two candidates exchange ranks under changed policy weights.

## Reading rank outputs

| Field | Meaning |
| :--- | :--- |
| `bestRank`, `worstRank` | Extrema over scenarios with usable indicators; null when unevaluable |
| `rankedScenarios` | Number of scenarios in which the candidate received a rank |
| `topThreeCount` | Number of scenarios with rank at most three, including shared ranks |

Candidates without usable indicators are excluded from ranking. Equal conditional indices share a competition rank: 1, 1, 3. Top three counts include ties and can therefore include more than three candidates. An ID stabilizes display order without resolving a numerical tie.

Rank sensitivity compares conditional indices under fixed inputs. Candidates with different missing information patterns can still have different coverage; these rankings are provisional. The scenario counts are not probabilities or forecast accuracy.

## Original versus teaching evidence

The [backend cases](../docs/BACKEND_CASE_STUDIES.md) explain the original evaluator and resident evidence logic using inspected source fixtures. The [verification record](../docs/REVIEW_CHECKS.md) records the separate original archive run: 12 passing tests.

This folder makes the mathematics executable. It does not verify city data, municipal adoption or the deployed backend. [Team contributions](../docs/CONTRIBUTIONS_AND_EVIDENCE.md) identify responsibilities in the collaborative project.

