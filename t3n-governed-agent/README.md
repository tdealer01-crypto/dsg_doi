# T3N Governed Enterprise Agent

Submission scaffold for the Superteam Earn T3N Agent Build Challenge.

## Goal

Build a small enterprise agent that combines Terminal 3 identity/authentication with a simple, inspectable readiness workflow before a business task is allowed to proceed.

The design is intentionally maintainable: Terminal 3 provides the authenticated identity/session layer, while the application keeps its decision checks explicit and testable rather than hiding them inside a prompt.

## Current state

- Public repository path created.
- Node/TypeScript project scaffolded.
- `@terminal3/t3n-sdk` wired to the official testnet quickstart flow.
- Secrets are environment-only and are not committed.
- Live T3N authentication is pending a user-created T3N API key from the official claim page.

## Setup

```bash
npm install
export T3N_API_KEY="<your testnet key>"
npm start
```

A successful run should print the authenticated tenant DID returned by Terminal 3.

## Planned challenge deliverable

1. Authenticate to Terminal 3 testnet and record the real tenant DID from the session.
2. Add a small enterprise task-readiness layer with explicit scope, review, and record checks.
3. Demonstrate one allowed path and one review-required path.
4. Capture screenshots and exact run evidence.
5. Publish a short public submission document with setup, findings, bugs, and maintenance notes.

## Security notes

- Never commit `T3N_API_KEY` or `AGENT_KEY`.
- Do not reuse the tenant key as the agent credential.
- Keep the environment on `testnet` while building and validating the challenge entry.
- Treat authentication and authorization as separate concerns, following the Terminal 3 Agent Auth documentation.

## Challenge

Superteam Earn: T3N Agent Build Challenge — Global.

This folder is a work-in-progress challenge artifact and does not claim a completed T3N submission until live authentication and evidence have been verified.
