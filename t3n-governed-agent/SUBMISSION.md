# T3N Agent Build Challenge — Submission Draft

## Project

**T3N Governed Enterprise Agent**

A small enterprise-agent pattern that combines Terminal 3 authenticated identity with explicit, inspectable task-readiness checks before business operations proceed.

## Why this is useful

Enterprise teams often want agent autonomy but still need clear boundaries around what the agent is doing, who reviewed it, and what evidence is retained. This project keeps those checks visible and maintainable instead of hiding them in an opaque prompt.

## Terminal 3 integration

- SDK: `@terminal3/t3n-sdk`
- Environment: **PENDING LIVE VERIFICATION** because the current docs disagree on the environment name
- Authentication: official handshake + authenticate flow
- Tenant DID: **PENDING LIVE RUN**
- Agent DID / delegated capability: **PENDING LIVE RUN**

## Public repository

https://github.com/tdealer01-crypto/dsg_doi/tree/main/t3n-governed-agent

## Validation evidence

### Positive path

**PENDING** — run after obtaining the T3N sandbox credential. Record the exact command, returned DID, timestamp, environment value, and screenshot.

### Review-required path

**PENDING** — demonstrate a task with an incomplete readiness check and record the deterministic result.

## Bugs / friction found

### Documentation environment mismatch

The current Terminal 3 ADK Quickstart says to call `setEnvironment("testnet")` and explains that the SDK accepts `testnet | production`. The current Terminal 3 Agent Developer Kit sandbox/claim page shows `setEnvironment("sandbox")` in its example. These two official surfaces therefore give different environment values for the same starter flow.

Planned verification: run the smallest plain Node/tsx authentication example against the credential issued by the current claim page, record which environment value actually works, and report the exact SDK/package version with the result.

### Bundler guidance

If the SDK hits a WASM/bundler issue, reproduce first with the plain Node/tsx entrypoint before changing framework configuration, matching the official quickstart guidance.

## Maintenance / handover

The implementation is intentionally small: a TypeScript entrypoint, environment-only credentials, and explicit readiness logic. It can be maintained as a standalone example or handed over to Terminal 3 with setup notes and evidence.

## Current status

Scaffold complete. Live Terminal 3 authentication and evidence are still required before this document is treated as a completed challenge submission.
