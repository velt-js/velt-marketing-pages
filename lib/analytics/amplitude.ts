import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

/** Prefix for all Amplitude-related console diagnostics. */
const LOG_PREFIX = "[Analytics]";

/** Default fraction of sessions to record when the env var is unset. */
const DEFAULT_SESSION_REPLAY_SAMPLE_RATE = 1;

/**
 * Amplitude Browser SDK key. Client-side by design (browser keys ship in the
 * bundle, unlike a backend secret) but read from env so prod/staging/dev can
 * differ and nothing is hardcoded. Prefixed with NEXT_PUBLIC_ so Next.js
 * inlines it into the client bundle at build time.
 */
const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

/**
 * Only initialize on production-like builds. `next build` / `next start`
 * (production and staging deploys) run with NODE_ENV === "production", while
 * local `next dev` runs as "development" and is skipped so local testing
 * never pollutes analytics or burns Session Replay quota.
 */
const IS_PROD_LIKE_ENV = process.env.NODE_ENV === "production";

/**
 * Resolves the Session Replay sample rate from the environment, clamped to
 * the valid 0–1 range. Returns 0 (recording disabled) for any missing or
 * unparseable value so a bad env value can never accidentally record 100%.
 *
 * @returns {number} Fraction (0–1) of sessions to record with Session Replay.
 */
function resolveSessionReplaySampleRate(): number {
  try {
    const rawSampleRate =
      process.env.NEXT_PUBLIC_AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE;

    if (rawSampleRate === undefined || rawSampleRate === "") {
      return DEFAULT_SESSION_REPLAY_SAMPLE_RATE;
    }

    const parsedSampleRate = Number(rawSampleRate);
    if (Number.isNaN(parsedSampleRate)) {
      return 0;
    }

    return Math.min(Math.max(parsedSampleRate, 0), 1);
  } catch (error) {
    console.error(
      `${LOG_PREFIX} Failed to resolve Session Replay sample rate:`,
      error,
    );
    return 0;
  }
}

/**
 * Initializes the Amplitude Browser SDK plus the Session Replay plugin.
 *
 * Safe to call exactly once at app bootstrap (see instrumentation-client.ts).
 * No-ops when the API key is missing or the current build is not
 * production-like, so local dev never emits real analytics traffic.
 *
 * @returns {void}
 */
export function initAmplitude(): void {
  try {
    if (!IS_PROD_LIKE_ENV || !AMPLITUDE_API_KEY) {
      return;
    }

    const sampleRate = resolveSessionReplaySampleRate();
    if (sampleRate > 0) {
      const sessionReplayTracking = sessionReplayPlugin({
        sampleRate,
        trackServerUrl:
          process.env.NEXT_PUBLIC_AMPLITUDE_SESSION_REPLAY_TRACK_PROXY_URL ||
          undefined,
        configServerUrl:
          process.env.NEXT_PUBLIC_AMPLITUDE_SESSION_REPLAY_CONFIG_PROXY_URL ||
          undefined,
      });
      amplitude.add(sessionReplayTracking);
    }

    amplitude.init(AMPLITUDE_API_KEY, {
      autocapture: {
        attribution: true,
        // Auto-track page views. We do not track pages manually (no custom
        // per-page properties are needed), so let Amplitude capture them.
        pageViews: true,
        sessions: true,
        formInteractions: false,
        fileDownloads: false,
        elementInteractions: false,
        frustrationInteractions: true,
        webVitals: true,
        networkTracking: {
          captureRules: [{ statusCodeRange: "400-599" }],
          ignoreAmplitudeRequests: true,
        },
      },
      serverUrl:
        process.env.NEXT_PUBLIC_AMPLITUDE_EVENT_PROXY_URL || undefined,
    });

    // Preserve the pre-existing `window.amplitude?.track(...)` call sites
    // (e.g. components/home-new/Problem.tsx) that relied on the previous
    // script-tag integration exposing this global. The npm SDK does not set
    // it on its own, so we mirror it here to avoid regressing those events.
    (window as unknown as { amplitude?: typeof amplitude }).amplitude =
      amplitude;
  } catch (error) {
    console.error(`${LOG_PREFIX} Failed to initialize Amplitude:`, error);
  }
}
