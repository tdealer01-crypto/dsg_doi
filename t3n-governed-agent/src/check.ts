import { evaluateReadiness } from "./readiness.js";

const ready = evaluateReadiness({
  scopeClear: true,
  ownerKnown: true,
  reviewed: true,
  fallbackReady: true,
  evidenceReady: true,
});

if (ready.status !== "GO" || ready.missing.length !== 0) {
  throw new Error("positive readiness check failed");
}

const incomplete = evaluateReadiness({
  scopeClear: true,
  ownerKnown: true,
  reviewed: false,
  fallbackReady: true,
  evidenceReady: true,
});

if (incomplete.status !== "REVIEW" || !incomplete.missing.includes("reviewed")) {
  throw new Error("negative readiness check failed");
}

console.log(JSON.stringify({ positive: ready, negative: incomplete }, null, 2));
