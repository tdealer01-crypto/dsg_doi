# T3N Agent Build Challenge — Submission Draft

## Project

**T3N Governed Enterprise Agent**

A small enterprise-agent pattern that combines Terminal 3 authenticated identity with explicit, inspectable task-readiness checks before business operations proceed.

## Why this is useful

Enterprise teams often want agent autonomy but still need clear boundaries around what the agent is doing, who reviewed it, whether a fallback exists, and what evidence is retained. This project keeps those checks visible and maintainable instead of hiding them in an opaque prompt.

## Terminal 3 integration

- SDK: `@terminal3/t3n-sdk` (current npm `latest`; local lock resolved `5.15.2`)
- SDK environment: `testnet`, matching the current official Terminal 3 Quickstart
- Authentication: `handshake()` + `authenticate(createEthAuthInput(...))`
- Usage proof: `getUsage()` is wired to report the available test-credit balance after authentication
- Claimed DID: `did:t3n:52792383fdfe132a31b9b34d1ff57675ee890ddc`
- Onboarding evidence: Terminal 3 confirmed the DID was created and sandbox/test credits were generated.

## Public repository

https://github.com/tdealer01-crypto/dsg_doi/tree/main/t3n-governed-agent

## Verified validation evidence

Latest successful GitHub Actions run:
https://github.com/tdealer01-crypto/dsg_doi/actions/runs/34739621451

Verified commit: `8cf2e3f74058c3da7223708d7dce94fd6c0c3415`

Verified on GitHub-hosted Ubuntu / Node 22:

- dependency installation — PASS
- strict TypeScript compile — PASS
- deterministic readiness checks — PASS
- positive readiness case returns `GO`
- incomplete-review case returns `REVIEW` and identifies the missing check

## Live validation status

The DID and local credential are prepared. The first Termux live attempt did not reach T3N authentication because the local `tsx` launcher used a `#!/usr/bin/env node` shebang and Termux does not provide `/usr/bin/env`. The project scripts were changed to invoke the launcher through Node directly. A non-secret local diagnostic now reaches the expected `T3N_API_KEY is required` boundary, proving the TypeScript entrypoint loads correctly on the Android/Termux runner.

The final live rerun will record only non-secret outputs: authenticated DID, available test credits, timestamp, SDK version, readiness result, and screenshots. The API key is never committed or printed.

## Bugs / friction found

### 1. Sandbox terminology vs SDK environment name

The product page describes the developer environment as the T3N sandbox, while the current official SDK Quickstart uses `setEnvironment("testnet")` and documents `testnet | production`. This is understandable product terminology, but it can cause builders to assume `sandbox` is the SDK environment value. This project follows the Quickstart and uses `testnet`.

### 2. Current Quickstart snippet omits a field required by the installed SDK type

The current Quickstart constructs `new T3nClient({ wasmComponent, handlers })`. With `@terminal3/t3n-sdk` 5.15.2, strict TypeScript compilation reports that `T3nClientConfig` requires `trustAnchor`.

Reproduction from CI before the fix:

```text
error TS2741: Property 'trustAnchor' is missing ... but required in type 'T3nClientConfig'.
```

For testnet validation this project makes the test-only choice explicit:

```ts
const trustAnchor = { unsafe_trust_server: true } as const;
```

and passes it to `T3nClient`. This is deliberately visible rather than silently weakening trust behavior.

### 3. Node typings in a minimal strict TypeScript project

The first strict compile failed on `process` until `@types/node` and `types: ["node"]` were added. Including those in a minimal TypeScript quickstart would make copy/paste projects more reliable.

### 4. Termux launcher portability

On Android/Termux, the installed `tsx` launcher is executable but its `#!/usr/bin/env node` shebang cannot resolve because `/usr/bin/env` does not exist in the Termux filesystem. Calling the launcher with Node directly works:

```text
node node_modules/.bin/tsx src/index.ts
```

The package scripts now use that form, which still passes CI on GitHub-hosted Linux.

## Maintenance / handover

The implementation is intentionally small: one T3N entrypoint, a deterministic readiness module, a sanity-check script, strict TypeScript config, and GitHub Actions verification. It can be maintained as a standalone example or handed over with reproducible CI evidence.

## Current status

**DID_CLAIMED / STATIC_VERIFIED / LIVE_AUTH_RERUN_REQUIRED** — identity onboarding is confirmed, CI is green, and the Termux runner issue is diagnosed and fixed. The remaining step is one live authenticated testnet run and evidence capture before the submission is described as end-to-end complete.
