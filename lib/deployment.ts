// Single source of truth for Velt's deployment story: where Velt runs, which
// clouds are shipped, the three models named by where the data lives, and the
// trust badges that sit beside them.
//
// Every marketing surface imports from here. No page hardcodes a cloud name, a
// cloud's availability, a model description, or a badge label. When a cloud
// moves from private beta to available, change CLOUD_STATUS below and every
// page that renders the status line updates with it.
//
// Copy rules for anything added to this file:
//   - Short sentences. No em dashes.
//   - Never claim Velt holds a FedRAMP authorization. See FEDRAMP_NOTE.
//   - Never name a government cloud until one is actually deployed.

/** The clouds Velt can be deployed into. */
export type CloudId = "gcp" | "aws" | "azure";

/** How far along a cloud is. Drives the public status line. */
export type CloudAvailability = "available" | "private beta";

/**
 * Display names for each cloud. Declaration order is the order clouds are
 * announced in the status line, so shipped clouds are listed first.
 */
export const CLOUD_LABELS: Record<CloudId, string> = {
  gcp: "GCP",
  aws: "AWS",
  azure: "Azure",
};

/**
 * Current availability per cloud. This is the value to edit when a cloud
 * ships. Nothing else needs to change.
 */
export const CLOUD_STATUS: Record<CloudId, CloudAvailability> = {
  gcp: "available",
  aws: "private beta",
  azure: "private beta",
};

/** Order the availability tiers are announced in. Shipped clouds lead. */
const AVAILABILITY_ORDER: CloudAvailability[] = ["available", "private beta"];

/**
 * Join labels into readable prose: "A", "A and B", "A, B and C".
 * @param {string[]} items The labels to join.
 * @returns {string} The joined list.
 */
function formatList(items: string[]): string {
  try {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
  } catch (error) {
    console.error("formatList failed", error);
    return items.join(", ");
  }
}

/**
 * Build the public cloud status line from CLOUD_STATUS, grouping clouds that
 * share an availability. With the current data this reads
 * "GCP: available. AWS and Azure: private beta."
 * @param {Record<CloudId, CloudAvailability>} status Availability per cloud.
 * @returns {string} The rendered status line.
 */
export function buildCloudStatusLine(
  status: Record<CloudId, CloudAvailability> = CLOUD_STATUS,
): string {
  try {
    const ids = Object.keys(CLOUD_LABELS) as CloudId[];
    const clauses: string[] = [];

    for (const availability of AVAILABILITY_ORDER) {
      const labels = ids
        .filter((id) => status[id] === availability)
        .map((id) => CLOUD_LABELS[id]);
      if (labels.length === 0) continue;
      clauses.push(`${formatList(labels)}: ${availability}.`);
    }

    return clauses.join(" ");
  } catch (error) {
    console.error("buildCloudStatusLine failed", error);
    return "";
  }
}

/** The rendered status line. Pages render this, never their own cloud names. */
export const CLOUD_STATUS_LINE = buildCloudStatusLine();

/** True while at least one cloud is still in private beta. Gates the beta CTA. */
export const HAS_PRIVATE_BETA_CLOUD = (
  Object.keys(CLOUD_LABELS) as CloudId[]
).some((id) => CLOUD_STATUS[id] === "private beta");

/** CTA rendered beside the status line while a cloud is in private beta. */
export const DEPLOYMENT_BETA_CTA = {
  label: "Request beta access",
  href: "/book-demo",
} as const;

/** Section eyebrow. CSS uppercases it, so it is authored in sentence case. */
export const DEPLOYMENT_EYEBROW = "Deployment";

/** Section heading for the deployment story. */
export const DEPLOYMENT_HEADING = "Run all of Velt inside your own cloud.";

/**
 * Supporting copy under DEPLOYMENT_HEADING.
 *
 * This describes one option ("Your cloud") only, so it opens by saying so.
 * Without that, a reader hits "Velt never sees the data" and then a card that
 * says "We run it" with nothing explaining that these are alternatives. Keep
 * it self-contained: it renders under headings other than DEPLOYMENT_HEADING
 * (e.g. the /enterprise hero), so it cannot refer back to the heading above it.
 */
export const DEPLOYMENT_BODY =
  "One of three ways to run Velt. In this one, Velt runs in your own cloud account. Nothing leaves it. Your keys, your logs, your network. Velt is never a subprocessor, because Velt never sees the data.";

/** Heading that introduces the model cards. States the count explicitly. */
export const DEPLOYMENT_MODELS_HEADING = "Three deployment options";

/** Support line under DEPLOYMENT_MODELS_HEADING. */
export const DEPLOYMENT_MODELS_SUPPORT =
  "Named by where the data lives. Pick one per customer.";

/** One deployment model, named by where the customer's data lives. */
export type DeploymentModel = {
  id: "velt-cloud" | "your-database" | "your-cloud";
  name: string;
  body: string;
};

/**
 * The three deployment models, ordered from fully managed to fully
 * self-hosted. Named by where the data lives, not by what Velt calls the tier.
 */
export const DEPLOYMENT_MODELS: DeploymentModel[] = [
  {
    id: "velt-cloud",
    name: "Velt Cloud",
    body: "We run it. 42 regions. SOC 2 Type II. HIPAA, BAA available.",
  },
  {
    id: "your-database",
    name: "Your database",
    body: "We run the service. Comments, files and user details stay in your database. We hold IDs only.",
  },
  {
    id: "your-cloud",
    name: "Your cloud",
    body: "Everything runs in your account. Nothing comes back to us.",
  },
];

/**
 * Mono label for a model card, e.g. "OPTION 01 OF 03". Derived from the list
 * so the count cannot fall out of step with it.
 * @param {number} index Zero-based position in DEPLOYMENT_MODELS.
 * @returns {string} The label.
 */
export function deploymentOptionLabel(index: number): string {
  const total = String(DEPLOYMENT_MODELS.length).padStart(2, "0");
  return `Option ${String(index + 1).padStart(2, "0")} of ${total}`;
}

/** Trust badges rendered on every surface that carries the deployment story. */
export const DEPLOYMENT_BADGES: string[] = [
  "Self-hosted",
  "SOC 2 Type II",
  "HIPAA, BAA available",
];

/**
 * Data residency badge. Kept alongside DEPLOYMENT_BADGES on the homepage hero
 * rather than replaced by them.
 */
export const EU_RESIDENCY_BADGE = "EU data residency";

/**
 * FedRAMP line. One sentence, and only on /enterprise and /self-hosting.
 *
 * Velt holds no FedRAMP authorization. This says Velt can run inside a
 * customer's boundary and nothing more. It never claims Velt is compliant,
 * certified or authorized, it carries no badge, and it names no government
 * cloud. Do not reuse it on other pages.
 */
export const FEDRAMP_NOTE =
  "Built to run inside a FedRAMP High boundary. If that's you, talk to us.";
