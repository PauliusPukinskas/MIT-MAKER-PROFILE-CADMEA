/*
 * Independent teaching reproduction of the *publicly documented* CADMEA
 * six-criterion screening example, written for this portfolio.
 * NOT the original CADMEA team's application source or production algorithm.
 * All data in its tests are synthetic. No municipal validation is implied.
 */
export const CRITERIA = Object.freeze([
  "demandPressure",
  "accessGap",
  "facilityPressure",
  "residentInput",
  "assetCondition",
  "valueForMoney"
]);

export const EXAMPLE_WEIGHTS = Object.freeze({
  demandPressure: 0.30,
  accessGap: 0.25,
  facilityPressure: 0.15,
  residentInput: 0.10,
  assetCondition: 0.10,
  valueForMoney: 0.10
});

function normalizedWeights(weights) {
  if (!weights || Object.keys(weights).length !== CRITERIA.length) {
    throw new TypeError("Supply all six criterion weights");
  }
  let total = 0;
  for (const key of CRITERIA) {
    const value = weights[key];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      throw new RangeError("Weights must be finite, nonnegative numbers");
    }
    total += value;
  }
  if (!Number.isFinite(total) || total <= 0) {
    throw new RangeError("Total weight must be finite and positive");
  }
  return Object.fromEntries(CRITERIA.map(key => [key, weights[key] / total]));
}

/** A conditional screening index, plus a bound showing missing information. */
export function evaluateIllustrativeCandidate(indicators, weights = EXAMPLE_WEIGHTS) {
  const w = normalizedWeights(weights);
  let knownWeightedTotal = 0;
  let knownWeight = 0;
  for (const key of CRITERIA) {
    const value = indicators?.[key] ?? null;
    if (value === null) continue; // unknown, not zero
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) {
      throw new RangeError(key + " must be 0..100 or null");
    }
    knownWeight += w[key];
    knownWeightedTotal += w[key] * value;
  }
  const clean = n => Number(n.toFixed(6));
  return {
    conditionalIndex: knownWeight > 0 ? clean(knownWeightedTotal / knownWeight) : null,
    dataCoveragePercent: clean(100 * knownWeight),
    possibleTotalLower: clean(knownWeightedTotal),
    possibleTotalUpper: clean(knownWeightedTotal + 100 * (1 - knownWeight)),
    hasMissingInformation: knownWeight < 1 - 1e-12,
    warning: "Illustrative policy screening only. Not a municipal investment decision or probability interval."
  };
}

/** Baseline plus minus/plus 25% of each weight, renormalized: 13 scenarios. */
export function makeIllustrativeWeightScenarios(base = EXAMPLE_WEIGHTS) {
  const w = normalizedWeights(base);
  const scenarios = [{ name: "baseline", weights: w }];
  for (const key of CRITERIA) {
    for (const factor of [0.75, 1.25]) {
      const changed = { ...w, [key]: w[key] * factor };
      scenarios.push({ name: key + " x " + factor, weights: normalizedWeights(changed) });
    }
  }
  return scenarios;
}

/** Rankings are descriptive sensitivity checks, not confidence estimates. */
export function inspectIllustrativeRankSensitivity(candidates, base = EXAMPLE_WEIGHTS) {
  if (!Array.isArray(candidates) || !candidates.length) throw new TypeError("Candidates required");
  const ids = candidates.map(x => x.id);
  if (ids.some(x => typeof x !== "string") || new Set(ids).size !== ids.length) {
    throw new TypeError("Each candidate needs a unique string id");
  }
  const result = new Map(ids.map(id => [id, []]));
  const scenarios = makeIllustrativeWeightScenarios(base);
  for (const scenario of scenarios) {
    const ordered = candidates.map(c => ({
      id: c.id,
      value: evaluateIllustrativeCandidate(c.indicators, scenario.weights).conditionalIndex
    })).filter(entry => entry.value !== null)
      .sort((a, b) => b.value - a.value || a.id.localeCompare(b.id));
    let rank = 0;
    ordered.forEach((entry, idx) => {
      // Equal indices share competition rank; IDs only stabilize display order.
      if (idx === 0 || entry.value !== ordered[idx - 1].value) rank = idx + 1;
      result.get(entry.id).push(rank);
    });
  }
  return {
    scenarios: scenarios.length,
    candidates: ids.map(id => {
      const ranks = result.get(id);
      return {
        id,
        bestRank: ranks.length ? Math.min(...ranks) : null,
        worstRank: ranks.length ? Math.max(...ranks) : null,
        rankedScenarios: ranks.length,
        topThreeCount: ranks.filter(rank => rank <= 3).length
      };
    }),
    note: "Derived from synthetic inputs and chosen policy weights, not measured accuracy."
  };
}

