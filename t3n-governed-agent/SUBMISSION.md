# T3N Agent Build Challenge — Submission Draft

## Project

**T3N Governed Enterprise Agent**

A small enterprise-agent pattern that combines Terminal 3 authenticated identity with explicit, inspectable task-readiness checks before business operations proceed.

## Why this is useful

Enterprise teams often want agent autonomy but still need clear boundaries around what the agent is doing, who reviewed it, and what evidence is retained. This project keeps those checks visible and maintainable instead of hiding them in an opaque prompt.

## Terminal 3 integration

- SDK: `@terminal3/t3n-sdk` (installed from the current npm `latest` tag in CI)
- Environment: `sandbox`, aligned with the current Terminal 3 Agent Developer Kit sandbox page
- Authentication: `handshake()` + `authenticate(createEthAuthInput(...))`
- Usage proof: `getUsage()` is wired to return the available sandbox-credit balance after authentication
- Tenant DID: **PENDING LIVE RUN**

## Public repository

https://github.com/tdealer01-crypto/dsg_doi/tree/main/t3n-governed-agent

## Verified validation evidence

GitHub Actions run: https://github.com/tdealer01-crypto/dsg_doi/actions/runs/34738519638

Commit: `47463cd93e880790c18fce1afc2f23148ac2e3ee`

Verified on GitHub-hosted Ubuntu / Node 22:

- `npm install` — PASS, 0 reported vulnerabilities
- `npx tsc --noEmit` — PASS under strict TypeScript settings
- `npm run check` — PASS
- positive readiness case returns `GO`
- incomplete-review case returns `REVIEW` and identifies the missing check

## Live validation still required

The sandbox credential must be supplied only through `T3N_API_KEY` at runtime. After the Termux runner is reachable again, run the live entrypoint and record only non-secret outputs: authenticated DID, available sandbox credits, timestamp, SDK version, and screenshot/evidence. Never commit or print the API key.

## Bugs / friction found

### 1. Environment-name drift across examples

Older/reference T3N examples use `setEnvironment("testnet")`, while the current Terminal 3 Agent Developer Kit sandbox page instructs developers to use `setEnvironment("sandbox")`. The project now follows the current sandbox page and records the distinction because it can confuse builders following older material.

### 2. Current quickstart snippet omits a field required by the installed SDK type

The current sandbox page shows `new T3nClient({ wasmComponent, handlers })`. With the current npm `latest` package, strict TypeScript compilation reports that `T3nClientConfig` requires `trustAnchor`.

Reproduction from CI before the fix:

```text
src/index.ts(...): error TS2741: Property 'trustAnchor' is missing ... but required in type 'T3nClientConfig'.
```

For sandbox validation this project makes the test-only choice explicit:

```ts
const trustAnchor = { unsafe_trust_server: true } as const;
```

and passes it to `T3nClient`. This is deliberately visible rather than silently weakening trust behavior.

### 3. Node typings are not implied by the minimal TypeScript setup

The first strict compile also failed on `process` until `@types/node` and `types: ["node"]` were added. This is minor, but including it in a minimal quickstart would make copy/paste TypeScript projects work more reliably.

## Maintenance / handover

The implementation is intentionally small: one T3N entrypoint, a deterministic readiness module, a sanity-check script, strict TypeScript config, and GitHub Actions verification. It can be maintained as a standalone example or handed over with reproducible CI evidence.

## Current status

**STATIC_VERIFIED / LIVE_PENDING** — source, dependencies, strict type-check, and deterministic positive/negative checks pass in CI. Live Terminal 3 authentication remains the only required validation step before submission is described as end-to-end complete.
