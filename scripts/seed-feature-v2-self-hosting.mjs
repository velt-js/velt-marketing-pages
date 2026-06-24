#!/usr/bin/env node
/**
 * Seed the featurePageV2-self-hosting document in Sanity so it renders at
 * /new-features/self-hosting via app/new-features/[slug]/page.tsx.
 *
 * Self-hosting is a deployment/governance capability: the page describes the
 * shipped per-feature data-provider model only (content and PII on your
 * infrastructure, minimal identifiers on Velt). It never claims full-stack
 * self-hosting, VPC deployment, BYOK, or Helm.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-self-hosting.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-v2-self-hosting.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-self-hosting.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 *
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/self-hosting.tsx.
 */

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const client = DRY_RUN
  ? null
  : createClient({
      projectId: "fk9mezqa",
      dataset: "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

let keyCounter = 0;
/**
 * Add a stable _key (and optional _type) to each item in an array, as Sanity
 * requires for array members.
 * @param {Array<object>} arr Array of plain objects.
 * @param {string} [type] Optional _type to stamp on each item.
 * @returns {Array<object>} The keyed array.
 */
function keyed(arr, type) {
  return arr.map((item) => ({
    _key: `k${keyCounter++}`,
    ...(type ? { _type: type } : {}),
    ...item,
  }));
}

/**
 * Build a ctaLink object literal.
 * @param {string} label Link label.
 * @param {string} href Link href.
 * @param {boolean} [newTab] Open in new tab.
 * @returns {object} A ctaLink object.
 */
function cta(label, href, newTab) {
  return { _type: "ctaLink", label, href, ...(newTab ? { newTab: true } : {}) };
}

const STEP_INSTALL = `npm install @veltdev/react
# backend, for endpoint mode:
npm install @veltdev/node`;
const STEP_PROVIDER = `// providers.ts \u2014 callbacks or endpoint URLs
const comment = {
  get, save, delete, // your store
};`;
const STEP_MOUNT = `<VeltProvider
  apiKey={VELT_API_KEY}
  dataProviders={{ comment, recorder, user }}>
  <YourApp />
</VeltProvider>`;

const doc = {
  _id: "featurePageV2-self-hosting",
  _type: "featurePageV2",
  title: "Self-Hosting",
  slug: { _type: "slug", current: "self-hosting" },
  beta: false,
  breadcrumbLabel: "Self-Hosting",
  metaTitle: "Self-Hosting | Add Velt without moving your data | Velt",
  metaDescription:
    "Per-feature data providers keep comments, recordings, and user PII on your infrastructure. Velt stores only minimal identifiers.",

  hero: {
    kicker: "Self-hosted data",
    title: "Add Velt without moving your data.",
    secondary:
      "Per-feature data providers keep comments, recordings, notifications, attachments, and user PII on your infrastructure; Velt stores only minimal identifiers. Node and Python backend SDKs.",
    accent: "No more enterprise deals stalled on \u201Cwhere does our data live?\u201D",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "architecture", label: "Architecture", demoPreset: "self-hosting/hero/architecture" },
        { id: "data-flow", label: "Data flow", demoPreset: "self-hosting/hero/data-flow" },
        { id: "field-inventory", label: "Field inventory", demoPreset: "self-hosting/hero/field-inventory" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Self-hosted data running inside products at",
    migration: {
      label: "Migrating from an in-house residency layer?",
      links: keyed(
        [cta("Compare", "/compare/self-hosting"), cta("Migration guide", "https://docs.velt.dev/self-host-data/overview", true)],
      ),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "Your content stays home. Both actors.",
    body: "Velt self-hosted data keeps user-generated content and PII on your own infrastructure; Velt stores only minimal structural identifiers. You register per-feature data providers for comments, recordings, notifications, activity, attachments, and users; content is stripped from every write on the device and merged back on read, so the UI renders exactly as a Velt-hosted setup. Humans and agents write through the same providers, and the agent comment keeps its Approve and Reject buttons when the thread merges back together.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/self-host-data/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "self-hosting/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to data on your infrastructure.",
    support:
      "Install the SDKs, implement a provider as callbacks or endpoint URLs, and pass dataProviders to VeltProvider before identify runs. Every key is optional; register only the features you want self-hosted.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDKs.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Implement", title: "Register data providers.", filename: "providers.ts", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Wrap", title: "Pass dataProviders.", filename: "_app.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "Velt uses a strip-on-write, merge-on-read model. On write, PII is stripped on the device; only the structural remainder goes to Velt while your provider persists the content. Writes hit your database first, and Velt applies the change on its side only after your success response. On read, Velt fetches the content back from your provider and merges it into the structural record. Each operation is a frontend callback or an HTTP endpoint Velt calls for you, and the two styles mix per operation. Timeouts, retries, and rollback on failure are configurable per provider; if your backend is unreachable Velt degrades instead of dropping, rendering the structural record without the content.",
      microcopy: "// strip-on-write \u00b7 merge-on-read \u00b7 your database first",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "a per-feature split of structural fields versus content",
        "strip-on-write and merge-on-read sync",
        "your-database-first write ordering with rollback",
        "retry and timeout policies per operation",
        "a multipart contract for binary files",
        "email-to-user identity resolution for mentions",
        "graceful rendering when your backend is down",
        "a field-level inventory your buyer's security team will accept",
      ],
      close:
        "Teams that build this build it per feature and re-litigate it per deal. The providers above carry that whole contract as configuration; the field inventory doc is the security-review artifact, already written.",
    },
    mcp: {
      heading: "MCP: the faster path.",
      sub: "Skip the steps. Have your agent set it up.",
      tabs: keyed(
        [
          { id: "cursor", label: "Cursor", command: "npx @veltdev/mcp add --client cursor" },
          { id: "claude", label: "Claude Code", command: "claude mcp add velt -- npx @veltdev/mcp" },
          { id: "windsurf", label: "Windsurf", command: "npx @veltdev/mcp add --client windsurf" },
          { id: "copilot", label: "Copilot", command: "npx @veltdev/mcp add --client vscode" },
          { id: "zed", label: "Zed", command: "npx @veltdev/mcp add --client zed" },
        ],
        "vfpMcpTab",
      ),
    },
    integrations: keyed(
      [
        {
          label: "SDK frameworks",
          chips: keyed(
            [
              { label: "React", href: "https://docs.velt.dev/quickstart/react", newTab: true, icon: "/images/home/nav-icons/react.svg" },
              { label: "Next.js", href: "https://docs.velt.dev/quickstart/nextjs", newTab: true, icon: "/images/home/nav-icons/nextdotjs.svg" },
              { label: "Angular", href: "https://docs.velt.dev/quickstart/angular", newTab: true, icon: "/images/home/nav-icons/angular.svg" },
              { label: "Vue", href: "https://docs.velt.dev/quickstart/vue", newTab: true, icon: "/images/home/nav-icons/vuedotjs.svg" },
              { label: "HTML", href: "https://docs.velt.dev/quickstart/html", newTab: true, icon: "/images/home/nav-icons/html5.svg" },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "Databases and storage",
          chips: keyed(
            [
              { label: "MongoDB", href: "https://docs.velt.dev/self-host-data/overview", newTab: true, icon: "/images/home/nav-icons/mongodb.svg" },
              { label: "PostgreSQL", href: "https://docs.velt.dev/self-host-data/comments", newTab: true, icon: "/images/home/nav-icons/postgresql.svg" },
              { label: "AWS S3", href: "https://docs.velt.dev/self-host-data/overview", newTab: true, icon: "/images/home/nav-icons/amazons3.svg" },
              { label: "MinIO", href: "https://docs.velt.dev/self-host-data/overview", newTab: true, icon: "/images/home/nav-icons/minio.svg" },
              { label: "Google Cloud Storage", href: "https://docs.velt.dev/self-host-data/attachments", newTab: true, icon: "/images/home/nav-icons/googlecloud.svg" },
              { label: "Azure Blob", href: "https://docs.velt.dev/self-host-data/attachments", newTab: true, icon: "/images/home/nav-icons/microsoftazure.svg" },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "Backend SDKs",
          chips: keyed(
            [
              { label: "Node SDK", href: "https://docs.velt.dev/backend-sdks/node", newTab: true, icon: "/images/home/nav-icons/nodedotjs.svg" },
              { label: "Python SDK", href: "https://docs.velt.dev/backend-sdks/python", newTab: true, icon: "/images/home/nav-icons/python.svg" },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch self-hosted data this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Your data stays yours.",
    support: "Each card shows the real mechanics. Toggle to Code for the exact snippet behind it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Comment content on your database",
          codeKicker: "// comments",
          headline:
            "The comment provider's get, save, and delete run against your store; Velt keeps thread structure only. The clause debate, the filing note, the counterparty reply never leave your infrastructure.",
          preview: "self-hosting/showcase/comments",
          code: "// comment provider runs against your store\nconst comment = { get, save, delete };",
        },
        {
          num: "02",
          name: "Recording files in your bucket",
          codeKicker: "// recordings",
          headline:
            "Velt uploads each recording to the storage you provide and skips its own server-side encoding and transcription. The client call and the screen capture exist only where you put them.",
          preview: "self-hosting/showcase/recordings",
          code: "// uploaded to your bucket\n// no server-side encoding or transcription",
        },
        {
          num: "03",
          name: "Notification content on your side",
          codeKicker: "// notifications",
          headline:
            "Custom notification content resolves from your database at render; comment notifications build client-side from your self-hosted comment data. Reviewers get the full inbox, Velt never holds the message text.",
          preview: "self-hosting/showcase/notifications",
          code: "// custom content resolved from your DB\n// comment notifications built client-side",
        },
        {
          num: "04",
          name: "Append-only activity logs",
          codeKicker: "// activity",
          headline:
            "The activity provider saves log content, entity snapshots, and custom fields to your store; there is no delete. The record your auditor reads lives on infrastructure you control.",
          preview: "self-hosting/showcase/activity",
          code: "// append-only \u2014 no delete\nconst activity = { get, save };",
        },
        {
          num: "05",
          name: "Attachments straight to your storage",
          codeKicker: "// attachments",
          headline:
            "Velt hands your provider the raw file; you upload to S3, GCS, or Azure Blob and return a URL. Velt never touches the bytes.",
          preview: "self-hosting/showcase/attachments",
          code: "// you upload, you return a URL\nconst attachment = { save, delete };",
        },
        {
          num: "06",
          name: "User PII reduced to an ID",
          codeKicker: "// users",
          headline:
            "Velt stores only the userId; the user provider resolves names, emails, and avatars from your directory at render. Employee and client identities never enter a vendor database.",
          preview: "self-hosting/showcase/users",
          code: "// Velt stores only userId\nconst user = { get }; // name, email, avatar",
        },
        {
          num: "07",
          name: "The complete field inventory",
          codeKicker: "// inventory",
          headline:
            "Every persisted field documented with types, examples, and strip rules: Velt's database versus yours. Hand it to the security reviewer instead of scheduling a call.",
          preview: "self-hosting/showcase/field-inventory",
          code: "// docs.velt.dev/self-host-data/field-inventory",
        },
        {
          num: "08",
          name: "Node and Python backend SDKs",
          codeKicker: "// backend",
          headline:
            "sdk.selfHosting.* answers every resolver request against MongoDB and AWS S3; sdk.api.* calls Velt's REST APIs with no database. Your endpoints become pass-throughs, not projects.",
          preview: "self-hosting/showcase/backend-sdks",
          code: "sdk.selfHosting.getComments(req); // Node + Python",
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/self-host-data/overview", true),
      cta("View Examples", "/examples"),
    ]),
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only; every line traces to the self-host-data or backend SDK docs. This is the part of an in-house residency layer that never ends.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Per-feature providers: comment, reaction, recorder, notification, activity, attachment, user, anonymousUser" },
        { label: "Mix and match: register only the providers you want; unregistered features stay fully Velt-hosted" },
        { label: "Strip-on-write, merge-on-read: PII is stripped on the device and never leaves it for Velt, in transit or at rest" },
        { label: "Your-database-first writes: Velt applies a save or delete only after your success response" },
        { label: "Callback functions or endpoint URLs per operation, mixable within one provider" },
        { label: "Configurable resolveTimeout (default 60s), retryCount, retryDelay, and revertOnFailure rollback" },
        { label: "Degrade, don't drop: on resolver failure Velt renders the structural record without the content" },
        { label: "fieldsToRemove moves custom fields out of Velt's database; additionalFields copies them to your backend" },
        { label: "Delete requests minimized to apiKey, documentId, organizationId, and folderId" },
        { label: "Provider metadata carries your documentId and organizationId, not Velt's internal hashed IDs" },
        { label: "Separate storage scopes: dataProviders.attachment and dataProviders.recorder.storage" },
        { label: "Binary uploads use a multipart contract; JSON everywhere else" },
        { label: "Recording uploads skip Velt's server-side encoding and transcription" },
        { label: "Anonymous user resolution: @mention by email maps to your userId; the raw email is dropped" },
        { label: "In-app comment notification content is generated client-side from your self-hosted comment data" },
        { label: "Documented email path is webhooks plus your own email provider when comment content is self-hosted" },
        { label: "Notification provider applies to custom notifications only; read-only enrichment (get and delete)" },
        { label: "Activity is append-only and resolves through user, comment, reaction, recorder, then activity providers" },
        { label: "Cross-organization For You notifications call your endpoints with each entry's organizationId" },
        { label: "Runs on AWS, GCP, Azure, or any custom infrastructure" },
        { label: "MongoDB and PostgreSQL backend endpoint examples in the docs" },
        { label: "Node SDK (@veltdev/node): sdk.selfHosting.* against MongoDB 6+ and S3; MinIO via custom S3 endpoint" },
        { label: "Python SDK (velt-py): sdk.selfHosting.* with MongoDB and S3; sdk.api.* REST parity with Node" },
        { label: "REST-API comment writes interoperate via isCommentResolverUsed and isCommentTextAvailable" },
        { label: "Debug: subscribe to dataProvider events with a moduleName; Velt Chrome DevTools extension" },
        { label: "Providers must be set before identify; compatible with the setDocuments method" },
        { label: "GDPR REST APIs: get, delete, and check deletion status for a user's data stored in Velt" },
        { label: "Scope boundary: cursors, presence, huddle, and live selection have no resolver and stay Velt-hosted" },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your providers, your privacy posture.",
    support:
      "Per-provider timeouts, retries, and rollback for the fast path; custom fields, callback-versus-endpoint styles, and a debug event stream underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Configure",
          body: "Per-provider resolveTimeout, retry policies, and revertOnFailure; resolveUsersConfig to scope user fetches to organization, folder, or document; custom collection names in the Python SDK.",
          preview: "self-hosting/make-it-yours/look",
          code: "const comment = {\n  resolveTimeout: 60_000,\n  retryCount: 2, revertOnFailure: true,\n};",
        },
        {
          iconKey: "shield",
          title: "Extend",
          body: "fieldsToRemove and additionalFields for your own custom fields; callback versus endpoint style per operation; the dataProvider debug event stream piped into your observability stack.",
          preview: "self-hosting/make-it-yours/behavior",
          code: 'velt.on("dataProvider", { moduleName: "comment" });\n// fieldsToRemove · additionalFields',
        },
      ],
      "vfpMakeItYoursCard",
    ),
  },

  inProduction: {
    kicker: "In production",
    heading: "Self-hosted data, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "self-hosting/in-production/sales",
          caption:
            "Brand and legal feedback on decks and emails persists to your database; attachments land in your bucket. The client's content policy is satisfied without a second architecture.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "self-hosting/in-production/fintech",
          caption:
            "Comment threads on filings and forecasts persist to your database; Velt holds identifiers and timestamps. The vendor security review gets a field-level inventory instead of a promise.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "self-hosting/in-production/ops",
          caption:
            "Order disputes, shipment notes, and field photos write through your providers to your storage. Cross-organization review without handing a second vendor the counterparty's operational data.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "self-hosting/in-production/ai",
          caption:
            "Agent findings written as comments persist through the same provider as human replies. One residency story covers generated work and human review alike.",
          link: cta("For AI-native SaaS", "/for/ai-native-saas"),
        },
      ],
      "vfpProdTab",
    ),
    whereItFits: {
      label: "Where it fits:",
      links: keyed([
        cta("Sales enablement", "/for/sales-enablement"),
        cta("Fintech and FP&A", "/for/fintech"),
        cta("Operations", "/for/operations"),
        cta("AI-native SaaS", "/for/ai-native-saas"),
      ]),
    },
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
  },

  related: {
    kicker: "Related primitives",
    heading: "The content the providers keep home.",
    support: "Comments, the audit record, and notifications all run against the same data providers.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Comments",
          body: "The content the providers keep home; thread structure on Velt, the text on your database.",
          visual: "self-hosting/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
        {
          iconKey: "shield",
          title: "Audit trail",
          body: "The record that has to satisfy the same reviewer; the activity provider keeps log content on your infrastructure.",
          visual: "self-hosting/related/audit-trail",
          link: cta("Explore Audit trail", "/audit-trail"),
        },
        {
          iconKey: "velt",
          title: "Notifications",
          body: "Webhook-driven email is the documented path when comment content is self-hosted.",
          visual: "self-hosting/related/notifications",
          link: cta("Explore Notifications", "/notifications"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Field-level inventory"],
    line: "Comments, recordings, notifications, activity, attachments, and user PII can live on your own infrastructure through per-feature data providers, with Velt keeping only minimal structural identifiers. The Complete Field Inventory documents every persisted field on both sides, with types, examples, and strip rules. SOC 2 Type II, HIPAA, and EU data residency options back the cloud that runs the sync and rendering.",
    links: keyed([cta("field inventory", "https://docs.velt.dev/self-host-data/field-inventory", true), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  // Proof / testimonial wall intentionally left empty: anonymous testimonials
  // removed; TestimonialWall renders nothing when there are no cards.
  testimonials: {
    kicker: "Proof",
    heading: "The residency question, answered.",
    support: "\u201CWhere does our data live?\u201D stopped stalling our deals.",
    cards: keyed([], "vfpTestimonialCard"),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about self-hosted data.",
    items: keyed(
      [
        {
          question: "Where does Velt data live?",
          answer:
            "By default, in Velt's managed backend. Register data providers and the content and PII for comments, reactions, recordings, notifications, activity, attachments, and users live on your infrastructure instead, with Velt keeping only structural identifiers. You choose per feature; anything without a provider stays Velt-hosted. Realtime features like cursors and presence have no stored content split and remain Velt-hosted.",
        },
        {
          question: "What exactly does Velt store when we self-host our data?",
          answer:
            "Minimal identifiers: IDs, document and organization references, locations and targets, statuses, timestamps, and relationships, which is what Velt needs to position pins, thread comments, and drive real-time sync. Content is stripped on the device before any request to Velt is made. The Complete Field Inventory documents every persisted field on both sides, with types, examples, and strip rules; it is the proof, not this paragraph.",
        },
        {
          question: "Is this full self-hosting? Can we run Velt in our VPC?",
          answer:
            "No. What is live today is the data-provider model on this page: your content and PII on your infrastructure, Velt's cloud running the sync and rendering against minimal identifiers. We would rather show you exactly where that boundary sits, in the field inventory, than imply a deployment model that does not exist today. If your requirement is different, book a demo and bring your security team.",
        },
        {
          question: "How do I set up self-hosted data in Node?",
          answer:
            "Install @veltdev/node, initialize VeltSDK with your MongoDB connection (and S3 credentials if you self-host attachments), and expose endpoints that pass the raw resolver request to sdk.selfHosting methods like getComments, then return the response as-is. On the frontend, point each provider's getConfig, saveConfig, and deleteConfig at those endpoints.",
        },
        {
          question: "Which features support self-hosted data?",
          answer:
            "Comments (thread level), reactions, recordings including the files themselves, custom notifications, activity logs, comment attachments, user PII, and anonymous user resolution for email mentions. You can self-host some and leave the rest Velt-hosted.",
        },
        {
          question: "What happens if our backend goes down?",
          answer:
            "Velt degrades instead of dropping: reads time out (60 seconds by default, configurable) and the UI renders the structural record without the content, then recovers on the next successful fetch. Writes go to your database first, so Velt never persists a change your side rejected; retries and rollback are configurable per provider.",
        },
        {
          question: "Does self-hosted data cost extra?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, with a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add Velt without moving your data.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    microcopies: [
      "Free tier. No credit card. First comment in 5 minutes.",
      "30 minutes, with an engineer, not a sales deck.",
    ],
  },
};

async function main() {
  if (DRY_RUN) {
    console.log("DRY RUN \u2014 document shape:");
    console.log(JSON.stringify(doc, null, 2));
    return;
  }
  await client.createOrReplace(doc);
  console.log(`\nDone! Upserted ${doc._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
