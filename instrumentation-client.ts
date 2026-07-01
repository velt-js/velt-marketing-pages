import { initAmplitude } from "./lib/analytics/amplitude";

// Runs after the HTML document loads and before React hydration, which makes
// it the idiomatic place to bootstrap analytics so Session Replay and
// autocapture start as early as possible. initAmplitude() is a no-op outside
// production-like builds and already wraps its own work in try/catch, but we
// guard here too so an unexpected failure can never block hydration.
try {
  initAmplitude();
} catch (error) {
  console.error("[Analytics] instrumentation-client bootstrap failed:", error);
}
