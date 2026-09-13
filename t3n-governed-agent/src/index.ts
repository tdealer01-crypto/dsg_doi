import {
  T3nClient,
  setEnvironment,
  loadWasmComponent,
  eth_get_address,
  metamask_sign,
  createEthAuthInput,
} from "@terminal3/t3n-sdk";
import { evaluateReadiness } from "./readiness.js";

setEnvironment("sandbox");

const readiness = evaluateReadiness({
  scopeClear: true,
  ownerKnown: true,
  reviewed: true,
  fallbackReady: true,
  evidenceReady: true,
});

if (readiness.status !== "GO") {
  console.log(JSON.stringify({ connected: false, readiness }, null, 2));
  process.exit(2);
}

const apiKey = process.env.T3N_API_KEY;
if (!apiKey) throw new Error("T3N_API_KEY is required");

const wasmComponent = await loadWasmComponent();
const address = eth_get_address(apiKey);
const client = new T3nClient({
  wasmComponent,
  handlers: { EthSign: metamask_sign(address, undefined, apiKey) },
});

await client.handshake();
const auth = await client.authenticate(createEthAuthInput(address));
const usage = await client.getUsage();

console.log(JSON.stringify({
  connected: true,
  environment: "sandbox",
  tenantDid: auth.value,
  creditsAvailable: usage.balance.available,
  readiness,
}, null, 2));
