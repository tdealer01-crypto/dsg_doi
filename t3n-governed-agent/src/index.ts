import {
  T3nClient,
  setEnvironment,
  loadWasmComponent,
  eth_get_address,
  metamask_sign,
  createEthAuthInput,
} from "@terminal3/t3n-sdk";

setEnvironment("testnet");

const apiKey = process.env.T3N_API_KEY;
if (!apiKey) throw new Error("T3N_API_KEY is required");

const wasmComponent = await loadWasmComponent();
const address = eth_get_address(apiKey);
const client = new T3nClient({
  wasmComponent,
  handlers: { EthSign: metamask_sign(address, undefined, apiKey) },
});

await client.handshake();
const result = await client.authenticate(createEthAuthInput(address));
console.log(JSON.stringify({ connected: true, tenantDid: result.value }, null, 2));
