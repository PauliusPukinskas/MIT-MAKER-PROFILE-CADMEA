# Verification record

Updated **November 8, 2026**, using **Node v24.22.1**.

## Original archived application: executed locally

The archived evaluator and resident evidence module were tested with their original suite:

```bash
node --experimental-strip-types --test tests/decision-model.test.mjs
```

**12 tests passed, 0 failed.** The run used an isolated copy of three original files. Their SHA256 fingerprints are recorded in the [backend case studies](BACKEND_CASE_STUDIES.md#original-source-evidence).

| Original check | Observed behavior |
| :--- | :--- |
| Partial evidence | Score 80, coverage 30%, complete score bounds 24 to 94 |
| Measured zero | Zero stays observed; missing stays unknown |
| No indicators | Score remains null; bounds remain 0 to 100 |
| Freshness | Old evidence does not become fresh documented coverage |
| Review status | Complete referenced inputs still require human review |
| Validation | Invalid values, provenance, dates, policy weights and duplicate IDs are rejected |
| Community relevance | Sport aliases match; unrelated district/sport records are excluded |
| Repeated identifiers | One request, four petition supporters, four combined identifiers in the synthetic fixture |
| Sensitivity | Thirteen deterministic policy scenarios |
| Normalization | Community normalization is monotonic and bounded |

The earlier November 2 run also reported 12 passing original tests. The November 8 run verifies the inspected archive again, not the deployed application or a municipal dataset.

## Public teaching implementation: executed locally

```bash
cd public-reproduction
npm test
```

**10 tests passed, 0 failed.** Four cases were added to the original six. Three first failed against the previous teaching implementation and passed after correction:

| Case | Verified result |
| :--- | :--- |
| Candidate with no indicators | No rank and zero ranked scenarios |
| Equal conditional indices | Shared competition rank rather than ID based rank |
| Finite weights whose sum overflows | Reject invalid aggregate weights |
| Four candidate weight sensitivity | Leading candidates each span ranks 1 to 2; the fourth stays rank 4 |

The fourth case strengthens coverage of the existing sensitivity behavior. It does not claim that behavior was previously broken.

These ten public tests and twelve archived original tests are separate suites. The reproduction remains a later educational implementation.

## Product and documentation

The retained November 7 English [product walkthrough](PRODUCT_WALKTHROUGH.md) shows six public views. Its [capture metadata](../assets/live-screenshots/2026-11-07/CAPTURE_INFO.json) records URLs, timestamps and image hashes.

The documentation update checks local links and image references against repository inventories. Screenshots demonstrate the collaborative product. Original unit tests establish behavior on synthetic fixtures; neither establishes citywide adoption, official investment policy or real outcome accuracy.

[Overview](../README.md) · [Backend cases](BACKEND_CASE_STUDIES.md) · [Public teaching code](../public-reproduction/README.md)
