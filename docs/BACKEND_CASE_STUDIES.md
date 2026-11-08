# Backend decision and evidence cases

CADMEA's backend work connects geographic inputs, resident participation and policy choices. My contribution was in the backend and decision algorithm layer, shared with another backend developer.

These cases were checked against the archived original `municipal-screening-v1.0` evaluator and its tests on **November 8, 2026**. The original source stays private. All fixture values and identifiers below are synthetic.

## 1. Missing data is part of the result

### The failure and my work

Earlier scoring drafts could replace missing information with a midpoint. That gave a complete looking number even when access, condition or costs had not been measured.

I worked on the decision logic as it moved to explicit indicators with separate score, coverage and missing information bounds. An observed zero is a measurement; an absent indicator is unknown.

### A fixture from the original tests

Only demand pressure is present: 80/100 with policy weight 0.30.

| Quantity | Calculation | Result |
| :--- | :--- | ---: |
| Known weighted contribution | 0.30 × 80 | 24 |
| Conditional score | 24 / 0.30 | 80 |
| Weighted coverage | Available policy weight | 30% |
| Lower complete score | Remaining indicators all zero | 24 |
| Upper complete score | 24 + 0.70 × 100 | 94 |

The source test also supplies a genuine zero. Its score stays zero with 30% coverage and bounds of 0 to 70. With no indicators, the score stays null, coverage is zero and the complete score bounds are 0 to 100.

**Tradeoff:** candidates with different missing indicators are not equally informed simply because both have a conditional score. The bounds show missingness under a chosen scale, not a probability distribution.

## 2. Community signals need context

### The failure and my work

Raw petition totals can count one identifier repeatedly, combine unrelated sports or include resolved requests. I worked on backend relevance and duplicate handling so community evidence could be associated with an appropriate proposal.

### A fixture from the original tests

The candidate concerns swimming in Pilaitė.

| Supplied record | Interpretation |
| :--- | :--- |
| Open swimming petition with A, B, C and repeated C | Count distinct relevant identifiers |
| Forwarded swimming petition overlapping B and C, adding D | Retain D; avoid counting overlap twice |
| Open swimming request by D | One request; D is already in the combined identifier set |
| Basketball petition in the same district | Exclude from this swimming candidate |
| Swimming petition in another district | Exclude from this candidate |
| Rejected swimming petition | Exclude from open participation |

The original test expects **one open request, four petition supporters and four distinct participation identifiers**.

The terminology layer recognizes relevant Lithuanian and English sport names. This makes “Plaukimas” relevant to “Swimming / Plaukimas” while excluding “Krepšinis.”

**Tradeoff:** deduplicated fingerprints are not verified people, and platform participation is self selected. This prevents some double counting; it does not turn submissions into representative polling.

## 3. Validation and evidence lineage

### The failure and my work

A value needs a source context. A documented label alone cannot establish that a source is authentic or recent.

I worked on the backend as the evaluator made provenance and review requirements explicit. The original model separates documented, community and proxy inputs. Coverage records how much of the policy is observed; fresh documented coverage is a different quantity.

| Original test case | Required behavior |
| :--- | :--- |
| Negative, nonfinite or above scale indicator | Reject the input |
| Unrecognized indicator or duplicate candidate identifier | Reject the input |
| Missing provenance or a future observation date | Reject the invalid record |
| Old documented observation | Exclude it from fresh documented coverage |
| Complete referenced indicators | Allow technical review while retaining mandatory human review |
| Incomplete or inconsistent policy weights | Reject the policy instead of silently changing its meaning |

A source fixture with complete, recent referenced inputs reaches technical review. It still returns `requiresHumanReview: true`. The program checks supplied metadata; source authenticity and municipal investment approval require people.

**Tradeoff:** structured validation and provenance increase the input work. They let a result explain where its evidence came from and what it cannot support.

## 4. Rank sensitivity without false certainty

### The question and my work

Weights express policy priorities. I worked on the decision layer as it made the effect of those choices inspectable through a baseline and twelve local perturbations: decrease or increase each of six weights by 25%, then renormalize.

The original archived suite checks thirteen deterministic scenarios. The separate public teaching suite now also asserts a specific rank exchange:

| Teaching fixture candidate | Inputs | Best rank | Worst rank |
| :--- | :--- | ---: | ---: |
| Alpha | Demand 70, access 30, other indicators 50 | 1 | 2 |
| Beta | Demand 30, access 70, other indicators 50 | 1 | 2 |
| Gamma | All indicators 20 | 3 | 3 |
| Delta | All indicators 10 | 4 | 4 |

Alpha and Beta swap order when the emphasis changes. Delta stays outside the top three. Those assertions would catch a teaching implementation that ignored the policy perturbations.

The teaching implementation also withholds a rank from a candidate without usable indicators and gives equal indices a shared competition rank. For example, two equal leaders share rank 1 and the next candidate is rank 3. Top three counts include ties, so more than three candidates can qualify in a tied scenario.

**Scope:** those teaching implementation changes were made November 8. They do not claim to change the archived evaluator or the deployed application.

**Tradeoff:** this is local policy sensitivity. It holds data fixed and does not measure future success, sampling bias, an incomplete candidate universe or the authenticity of inputs.

## Original source evidence

The archive's original Node suite was rerun with Node v24.22.1:

```bash
node --experimental-strip-types --test tests/decision-model.test.mjs
```

**12 tests passed, 0 failed.** Only the original evaluator, resident evidence module and test file were needed for this isolated check. The archive and its source files are not republished.

| Original artifact | SHA256 of inspected file |
| :--- | :--- |
| `artifacts/api-server/src/lib/decision-model.ts` | `82f5f04173adc35c5099948dbac9d61e0f00502bc3e7ac1d0f6c0c50fc54e988` |
| `artifacts/api-server/src/lib/resident-evidence.ts` | `358b77be1600bbdf0286b166217b43263d11f8bd4ad1780d1980e051731f8086` |
| `tests/decision-model.test.mjs` | `542bff5bfc4afd1fb0e07a635f49fe0a1e34252b589ccad97876294e70a6fc3e` |

These fingerprints identify the archive used for verification. They do not establish exclusive authorship or make the source publicly accessible. [Current checks](REVIEW_CHECKS.md) distinguish this original suite from the ten public teaching tests.

[My contribution](MY_BACKEND_AND_ALGORITHM_WORK.md) · [Engineering](ENGINEERING.md) · [Overview](../README.md)

