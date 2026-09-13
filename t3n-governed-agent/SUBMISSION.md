# T3N Agent Build Challenge — Submission

## Project

**T3N Governed Enterprise Agent**

A small enterprise-agent pattern that combines Terminal 3 authenticated identity with explicit, inspectable task-readiness checks before business operations proceed.

## Why this is useful

Enterprise teams often want agent autonomy but still need clear boundaries around what the agent is doing, who reviewed it, whether a fallback exists, and what evidence is retained. This project keeps those checks visible and maintainable instead of hiding them in an opaque prompt.

## Terminal 3 integration

- SDK: `@terminal3/t3n-sdk` (current npm `latest`; local lock resolved `5.15.2`)
- SDK environment: `testnet`, matching the current official Terminal 3 Quickstart
- Authentication: `handshake()` + `authenticate(createEthAuthInput(...))`
- Usage proof: `getUsage()` reports the available test-credit balance after authentication
- Verified DID: `did:t3n:52792383fdfe132a31b9b34d1ff57675ee890ddc`
- Terminal 3 onboarding confirmed the DID and test credits were created.

## Public repository

https://github.com/tdealer01-crypto/dsg_doi/tree/main/t3n-governed-agent

## Verified CI evidence

Latest successful GitHub Actions run:
https://github.com/tdealer01-crypto/dsg_doi/actions/runs/34739621451

Verified commit: `8cf2e3f74058c3da7223708d7dce94fd6c0c3415`

Verified on GitHub-hosted Ubuntu / Node 22:

- dependency installation — PASS
- strict TypeScript compile — PASS
- deterministic readiness checks — PASS
- positive readiness case returns `GO`
- incomplete-review case returns `REVIEW` and identifies the missing check

## Live testnet evidence

The final Android/Termux live run completed successfully after syncing the latest source and loading the T3N credential only from the local device.

Observed non-secret result:

```json
{
  "connected": true,
  "environment": "testnet",
  "tenantDid": "did:t3n:52792383fdfe132a31b9b34d1ff57675ee890ddc",
  "creditsAvailable": 20000000000,
  "readiness": {
    "status": "GO",
    "missing": []
  }
}
```

This proves the end-to-end path reached Terminal 3 successfully, authenticated as the claimed DID, read the available test-credit balance, and passed the deterministic readiness gate. The API key was not committed or printed.

## Bugs / friction found

### 1. Sandbox terminology vs SDK environment name

The product page describes the developer environment as the T3N sandbox, while the current official SDK Quickstart uses `setEnvironment("testnet")` and documents `testnet | production`. This can cause builders to assume `sandbox` is the SDK environment value. This project follows the Quickstart and uses `testnet`.

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

**LIVE_VERIFIED / END_TO_END_COMPLETE** — identity onboarding is confirmed, CI is green, the Android/Termux portability issue is fixed, Terminal 3 authentication succeeded on testnet, the verified DID matches onboarding, available test credits were read, and the readiness gate returned `GO`.
