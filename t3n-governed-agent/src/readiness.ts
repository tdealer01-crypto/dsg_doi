export type ReadinessInput = {
  scopeClear: boolean;
  ownerKnown: boolean;
  reviewed: boolean;
  fallbackReady: boolean;
  evidenceReady: boolean;
};

export type ReadinessResult = {
  status: "GO" | "REVIEW";
  missing: string[];
};

export function evaluateReadiness(input: ReadinessInput): ReadinessResult {
  const checks: Array<[string, boolean]> = [
    ["scopeClear", input.scopeClear],
    ["ownerKnown", input.ownerKnown],
    ["reviewed", input.reviewed],
    ["fallbackReady", input.fallbackReady],
    ["evidenceReady", input.evidenceReady],
  ];

  const missing = checks.filter(([, ok]) => !ok).map(([name]) => name);
  return { status: missing.length === 0 ? "GO" : "REVIEW", missing };
}
