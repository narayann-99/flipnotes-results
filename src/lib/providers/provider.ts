import { ResultProvider } from "./types";
import { MockProvider } from "./mockProvider";
import { SimulatedProvider } from "./simulatedProvider";
import { FutureProvider } from "./futureProvider";
import { HttpApiProvider } from "./httpProvider";

export * from "./types";
export { MockProvider } from "./mockProvider";
export { SimulatedProvider } from "./simulatedProvider";
export { FutureProvider } from "./futureProvider";
export { HttpApiProvider } from "./httpProvider";

export type ProviderType = "mock" | "simulated" | "future" | "http";

export function getProvider(overrideType?: ProviderType): ResultProvider {
  const providerType = (overrideType || process.env.RESULT_PROVIDER_TYPE || "mock").toLowerCase();

  switch (providerType) {
    case "simulated":
    case "chaos":
    case "fake":
      return new SimulatedProvider();

    case "future":
    case "placeholder":
      return new FutureProvider();

    case "http":
    case "api":
    case "live":
      return new HttpApiProvider();

    case "mock":
    default:
      return new MockProvider();
  }
}
