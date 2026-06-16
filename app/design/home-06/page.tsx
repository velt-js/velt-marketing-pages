import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt — Add a pull request to your product",
  description:
    "Embeddable review and approval for AI-native apps. Comments, approval flows, review agents, memory, and audit trails in one SDK. Let agents propose, not touch.",
};

/* ──────────────────────────────────────────────────────────────────────────
   "Typeset" — 6th exploration, Cursor style reference, full homepage build.

   This iteration carries the CURRENT Velt positioning (embeddable review &
   approval for AI-native apps; hero "Add a pull request to your product") and
   implements the full 14-section homepage narrative from the spec
   (/Users/miri/Downloads/Website/home/home-spec.md), expressed in Cursor's
   warm, editorial paper aesthetic:

     1 nav · 2 hero (approval artifact) · 3 logo strip · 4 problem checklist ·
     5 solution turn (3-panel storyboard) · 6 seven hero primitives ·
     7 collaboration grid · 8 how it works (+ MCP) · 9 integrations ·
     10 enterprise (dark, 4 pillars) · 11 verticals · 12 FAQ ·
     13 testimonials/proof · 14 final CTA + footer.

   Cursor language: Page Parchment canvas (#f7f7f4), Espresso Ink text
   (#26251e), Ember Orange (#f54e00) rationed to link hovers ONLY, alternating
   Parchment / Card Stone bands, radii 4 (tags) / 8 (cards) / 9999 (buttons),
   shadows reserved for product-screenshot cards. Spec design cues folded in:
   dot + uppercase mono kickers, code-comment "// Prevents" lines, editor-
   chrome code blocks, split section headers, a single dark enterprise block,
   and a surprise EB Garamond serif pull-quote.

   Truth-gated content (per spec + project memory): no fabricated stats or
   named-customer quotes. Real customer + integration names come from the
   spec; FAQ copy is the spec's verbatim answers; testimonial quote copy is
   illustrative and qualitative, attributed by role only.

   CursorGothic → Inter Tight, berkeleyMono → JetBrains Mono, EB Garamond → EB
   Garamond, all hoisted by React 19. Standalone RSC — no "use client", no
   hooks, no external images. FAQ uses native <details> (no JS).
   ────────────────────────────────────────────────────────────────────────── */

// ── Palette (Cursor spec) ─────────────────────────────────────────────────────
const INK = "#26251e";
const PARCHMENT = "#f7f7f4";
const STONE = "#e6e5e0";
const SAND = "#d9d5cf";
const CLAY = "#7a7974";
const EMBER = "#f54e00";
const MOSS = "#34785c";
const GOLD = "#c08532";
const REJECT = "#b0492f";
const IRON = "#9b9892";

const GOTHIC = "'Inter Tight', ui-sans-serif, system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SERIF = "'EB Garamond', Georgia, 'Times New Roman', serif";

const CARD_SHADOW =
  "rgba(0,0,0,0.14) 0px 28px 70px 0px, rgba(0,0,0,0.1) 0px 14px 32px 0px, rgba(38,37,30,0.12) 0px 0px 0px 1px";

// ── Inline data (copy from spec; real names only, no fabricated stats) ────────
const NAV_LINKS = ["Features", "Customers", "Docs", "Pricing"];

const FEATURE_STRIP = ["Comments", "Approvals", "Review agents", "Memory", "Audit trails"];

const LOGOS = ["Bigtincan", "trumpet", "Privado", "Cofactr", "OpenEnvoy", "Datarails", "Runway", "HeyGen"];

// Problem checklist — chosen Prevents reworded as second-person symptoms.
const PROBLEMS = [
  "Buyers ask “do you support approval workflows?” and the honest answer costs a quarter.",
  "Your agents need write access to be useful, and security says no.",
  "Feedback about work in your product happens in Slack, on screenshots.",
  "A regulated deal stalled on “who approved this, and when?”",
  "Users turned off the AI the first time it changed something it shouldn’t have.",
];

// Solution-turn storyboard (Agent action layer copy, verbatim where possible).
const PANELS = [
  {
    n: "1",
    label: "AGENT PROPOSES",
    body: "Vendor rate is 12% over contract. Suggest correcting line 7.",
    who: "Review agent",
  },
  {
    n: "2",
    label: "HUMAN DECIDES",
    body: "Approve or reject, with a reason. The human holds final say.",
    who: "Priya Nair · approver",
  },
  {
    n: "3",
    label: "APPLIED VIA WEBHOOK",
    body: "POST /webhooks/velt · change applied, with a record of who allowed what.",
    who: "audit log",
  },
];

// Seven hero primitives — one-liners verbatim from spec.
const PRIMITIVES = [
  { n: "01", name: "Comments", tag: "the wedge", line: "Contextual threads from humans or agents, on any element, doc, cell, or canvas.", api: "<VeltComments />" },
  { n: "02", name: "Approval flows", tag: "enterprise unlock", line: "Staged sign-off before anything ships. Routing, conditions, and a timestamped record.", api: "<VeltApprovalFlow />" },
  { n: "03", name: "Review agents", tag: "first-pass reviewer", line: "AI flags issues and proposes fixes as comments, before a human looks.", api: "<VeltReviewAgent />" },
  { n: "04", name: "Suggestions", tag: "the consent step", line: "Propose edits inline, accept or reject like a diff. In any editor, or your own components.", api: "<VeltSuggestions />" },
  { n: "05", name: "Audit trail", tag: "audit-ready", line: "An immutable record of every action in your product. Audit-ready by default.", api: "<VeltAuditTrail />" },
  { n: "06", name: "Memory", tag: "the moat", line: "Past decisions surface as precedent, so reviews stay consistent as teams grow.", api: "useVeltMemory()" },
  { n: "07", name: "Notifications", tag: "reach", line: "Reach reviewers in-app, by email, in Slack and Teams, before the deadline slips.", api: "<VeltNotifications />" },
];

// Collaboration grid — one-liners verbatim from spec.
const COLLAB = [
  { name: "Presence", line: "See who is working, live: avatars, cursors, selection, follow mode. Humans and agents." },
  { name: "Multiplayer editing", line: "Edit together without conflicts: co-editing, single editor mode, state sync. CRDT under the hood." },
  { name: "Recording", line: "Voice, video, and screen pinned to the work, with a built-in video editor." },
  { name: "Huddle", line: "Live audio and video, right inside the document." },
];

const STEPS = [
  { kicker: "STEP 01 · INSTALL", claim: "Add the SDK.", code: "npm install @veltdev/react", file: "terminal" },
  { kicker: "STEP 02 · WRAP", claim: "Provide your app.", code: "<VeltProvider apiKey={KEY}>\n  {/* your app */}\n</VeltProvider>", file: "_app.tsx" },
  { kicker: "STEP 03 · CONFIGURE", claim: "Mount the review surface.", code: "<VeltComments />\n<VeltApprovalFlow />", file: "Invoice.tsx" },
];

const MCP_TOOLS = ["Cursor", "Claude Code", "Windsurf", "Copilot", "Zed"];

const INTEGRATIONS = [
  { label: "Editors", items: ["Tiptap", "Lexical", "BlockNote", "Slate", "CodeMirror", "ProseMirror", "Quill"] },
  { label: "Frameworks", items: ["React", "Next.js", "Angular", "Vue", "HTML"] },
  { label: "Canvas & data", items: ["React Flow", "Chart.js", "Highcharts", "Nivo"] },
  { label: "Notifications out", items: ["Slack", "Teams", "Discord", "Resend", "Customer.io", "SendGrid"] },
  { label: "Storage & auth", items: ["Firebase", "Supabase", "Clerk", "Auth0"] },
  { label: "Sync", items: ["Yjs"] },
];

const PILLARS = [
  { kicker: "DEPLOYMENT", head: "Your data stays put", body: "Per-feature data providers keep comments, recordings, and user PII on your infrastructure. Velt stores only minimal identifiers. EU data residency options.", link: "Self-hosting" },
  { kicker: "RELIABILITY", head: "Built to stay up", body: "SLA-backed uptime with a public status page. Graceful degradation so a review surface never blocks the product around it.", link: "Status page" },
  { kicker: "GLOBAL", head: "Close to your users", body: "Multi-region delivery with residency pinning, so review data lives where your customers require it to.", link: "Architecture" },
  { kicker: "COMPLIANCE", head: "Forwardable to security", body: "SOC 2 Type II (report under NDA) and HIPAA with a BAA. Pen-test cadence and an immutable audit trail by default.", link: "Governance" },
];

const VERTICALS = [
  { label: "Sales enablement", body: "Content production and approvals at scale.", href: "/for/sales-enablement" },
  { label: "Fintech & FP&A", body: "Nothing ships unapproved. SOC 2, HIPAA.", href: "/for/fintech" },
  { label: "Operations", body: "Human sign-off on physical-world decisions.", href: "/for/operations" },
  { label: "AI-native SaaS", body: "Agents propose, humans approve.", href: "/for/ai-native-saas" },
];

// FAQ — verbatim from spec §3.4 (trimmed lightly).
const FAQ = [
  {
    q: "How is Velt different from Liveblocks?",
    a: "Liveblocks is realtime collaboration infrastructure focused on engagement: sync, presence, and AI copilots that act on app state. Velt is review and approval infrastructure focused on control: approval workflows, review agents, audit trails, and memory, with the collaboration layer included. If your users need sign-off, records, and consent before anything changes, that is Velt.",
  },
  {
    q: "How is this different from the approval flow in the OpenAI Agents SDK?",
    a: "The OpenAI SDK pauses your own agent’s tool calls so a developer-defined approver can resume them. Velt is the review surface your end users see inside your product: comment threads, multi-step approval workflows, audit records, and notifications, working across humans and agents with any model or framework.",
  },
  {
    q: "Why not build this in-house?",
    a: "You can, and a first version of one feature takes a quarter or two. The cost is the long tail: anchoring comments to content that moves, notification batching and preferences, permissions, offline sync, audit records, and the edge cases that make review features feel solid. Most teams buy the review layer so their engineers can build the product only they can build.",
  },
  {
    q: "Can agents change data in my product without approval?",
    a: "Not through Velt. Agent suggestions arrive as comments. A human approves or rejects; on approve, the change fires through your webhook with a permanent record of who allowed what. Agents never need write access to your data.",
  },
  {
    q: "Where does data live? Do you support self-hosting?",
    a: "Cloud by default, with a hybrid model where content and user PII stay on your infrastructure and Velt stores only metadata, and data residency options including EU. Velt is SOC 2 Type II audited and supports HIPAA workloads.",
  },
  {
    q: "Which frameworks and editors does Velt support?",
    a: "React, Next.js, Vue, Angular, and plain HTML for the SDK. Multiplayer editing and suggestions work in Tiptap, CodeMirror, and 10 other editor libraries, or in your own custom components.",
  },
  {
    q: "How is Velt priced?",
    a: "Usage-based on monthly active documents (MAD): you pay for documents with review activity in a month, not per seat. There is a free tier for development and early production.",
  },
  {
    q: "How long does integration take?",
    a: "Days, not quarters. Install the SDK, wrap your app, and turn on features individually. Most teams render their first comment the same day and launch their first approval workflow within a week.",
  },
];

// Illustrative testimonials (qualitative, role-only attribution, no metrics).
const QUOTES = [
  { fear: "build time", quote: "We turned on threaded comments and approvals in a week. The two quarters we’d budgeted went back into our own roadmap.", who: "Engineering lead, AI-native SaaS" },
  { fear: "deal closed", quote: "The audit trail answered every question in the security review. The deal that was stuck for a month closed that week.", who: "Head of Product, fintech platform" },
  { fear: "feature launched", quote: "Our agents finally do real work, because every change waits for a human approve. Adoption went up, not down.", who: "Founder, operations software" },
];

const FOOTER_GROUPS = [
  { heading: "Primitives", links: ["Comments", "Approval flows", "Review agents", "Suggestions", "Audit trail", "Memory", "Notifications"] },
  { heading: "Collaboration", links: ["Presence", "Multiplayer editing", "Recording", "Huddle"] },
  { heading: "Platform", links: ["Self-hosting", "Webhooks", "Governance", "Status", "Changelog"] },
  { heading: "Company", links: ["Customers", "Pricing", "Docs", "Blog", "Contact"] },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function Logo({ light = false }: { light?: boolean }) {
  const c = light ? PARCHMENT : INK;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 3.5L19 11.2L12.4 12.7L9.6 19L5 3.5Z" fill={c} />
      </svg>
      <span style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 16, letterSpacing: "0.08em", color: c }}>VELT</span>
    </span>
  );
}

function FilledButton({ children, large = false, light = false }: { children: React.ReactNode; large?: boolean; light?: boolean }) {
  return (
    <a
      href="#"
      style={{
        fontFamily: GOTHIC,
        fontWeight: 400,
        fontSize: large ? 16 : 14,
        color: light ? INK : PARCHMENT,
        background: light ? PARCHMENT : INK,
        borderRadius: 9999,
        padding: large ? "12px 24px" : "10px 20px",
        textDecoration: "none",
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

function GhostButton({ children, large = false, light = false }: { children: React.ReactNode; large?: boolean; light?: boolean }) {
  const c = light ? PARCHMENT : INK;
  return (
    <a
      href="#"
      style={{
        fontFamily: GOTHIC,
        fontWeight: 400,
        fontSize: large ? 16 : 14,
        color: c,
        background: "transparent",
        border: `1px solid ${c}`,
        borderRadius: 9999,
        padding: large ? "11px 23px" : "9px 19px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        whiteSpace: "nowrap",
      }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.04em", color: light ? "rgba(247,247,244,0.6)" : CLAY, textTransform: "uppercase" }}>
      · {children}
    </span>
  );
}

/** Code-comment style accent line ("// Stop ..."). */
function CommentLine({ children, tone = MOSS }: { children: React.ReactNode; tone?: string }) {
  return (
    <p style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.6, color: tone, margin: 0 }}>
      <span style={{ color: CLAY }}>{"// "}</span>
      {children}
    </p>
  );
}

/** Split section header: big headline left, supporting paragraph right. */
function SectionHeader({ kicker, title, support, light = false }: { kicker: string; title: string; support?: string; light?: boolean }) {
  const txt = light ? PARCHMENT : INK;
  const mut = light ? "rgba(247,247,244,0.62)" : CLAY;
  return (
    <div className="cursor-splithead" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, alignItems: "end" }}>
      <div>
        <Kicker light={light}>{kicker}</Kicker>
        <h2 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: txt, margin: "10px 0 0", maxWidth: 540 }}>
          {title}
        </h2>
      </div>
      {support ? (
        <p style={{ fontFamily: GOTHIC, fontSize: 16, lineHeight: 1.5, color: mut, margin: 0, maxWidth: 420 }}>{support}</p>
      ) : <span />}
    </div>
  );
}

function Chrome({ caption, light = false }: { caption: string; light?: boolean }) {
  const border = light ? "rgba(255,255,255,0.12)" : SAND;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderBottom: `1px solid ${border}` }}>
      <span style={{ width: 11, height: 11, borderRadius: 9999, background: "#e0786a" }} />
      <span style={{ width: 11, height: 11, borderRadius: 9999, background: GOLD }} />
      <span style={{ width: 11, height: 11, borderRadius: 9999, background: MOSS }} />
      <span style={{ marginLeft: 8, fontFamily: MONO, fontSize: 12, color: light ? "rgba(247,247,244,0.6)" : CLAY }}>{caption}</span>
    </div>
  );
}

function CommandBlock({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ background: light ? "rgba(255,255,255,0.06)" : STONE, border: `1px solid ${light ? "rgba(255,255,255,0.14)" : SAND}`, borderRadius: 8, padding: "12px 14px", fontFamily: MONO, fontSize: 13, lineHeight: 1.7, color: light ? PARCHMENT : INK, overflowX: "auto" }}>
      {children}
    </div>
  );
}

function Avatar({ color, size = 26, label }: { color: string; size?: number; label?: string }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span aria-hidden="true" style={{ width: size, height: size, borderRadius: 9999, background: color, display: "inline-block", boxShadow: `0 0 0 2px ${PARCHMENT}` }} />
      {label ? (
        <span style={{ position: "absolute", bottom: -3, right: -3, fontFamily: MONO, fontSize: 7, fontWeight: 500, color: "#fff", background: INK, borderRadius: 3, padding: "1px 3px", lineHeight: 1 }}>{label}</span>
      ) : null}
    </span>
  );
}

function Cursor({ name, color }: { name: string; color: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 3.5L19 11.2L12.4 12.7L9.6 19L5 3.5Z" fill={color} />
      </svg>
      <span style={{ fontFamily: MONO, fontWeight: 500, fontSize: 10, color: "#fff", background: color, borderRadius: 4, padding: "2px 6px", marginLeft: -1, marginTop: 7 }}>{name}</span>
    </span>
  );
}

// ── Hero approval artifact (non-code: a doc mid-approval) ─────────────────────
function ApprovalArtifact() {
  return (
    <div style={{ background: "#fff", border: `1px solid ${SAND}`, borderRadius: 8, overflow: "hidden", boxShadow: CARD_SHADOW }}>
      <Chrome caption="Q3 Vendor Invoice — review" />
      <div style={{ display: "flex", minHeight: 312 }}>
        {/* document */}
        <div style={{ position: "relative", flex: 1, padding: "26px 30px" }}>
          <div style={{ height: 16, width: "46%", background: STONE, borderRadius: 4 }} />
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 11 }}>
            {["94%", "82%", "90%", "70%", "86%"].map((w, i) => (
              <div key={i} style={{ height: 9, width: w, background: i === 3 ? "rgba(245,78,0,0.16)" : STONE, borderRadius: 4 }} />
            ))}
          </div>
          <div style={{ position: "absolute", top: 22, right: 26, display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: -8 }}><Avatar color="#4fbeff" /></span>
            <span style={{ marginRight: -8 }}><Avatar color="#9552e0" /></span>
            <Avatar color={MOSS} label="AI" />
          </div>
          <div style={{ position: "absolute", left: "30%", top: "52%" }}><Cursor name="maya" color="#4fbeff" /></div>
        </div>
        {/* agent proposal + approve/reject */}
        <div style={{ width: 248, borderLeft: `1px solid ${SAND}`, background: PARCHMENT, padding: 16 }} className="cursor-thread">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar color={MOSS} size={24} label="AI" />
            <span style={{ fontFamily: GOTHIC, fontSize: 13, color: INK }}>Review agent</span>
          </div>
          <span style={{ display: "inline-block", marginTop: 8, fontFamily: MONO, fontSize: 10, color: MOSS, border: `1px solid ${MOSS}`, borderRadius: 4, padding: "1px 6px" }}>confidence 0.91</span>
          <p style={{ fontFamily: GOTHIC, fontSize: 13, lineHeight: 1.5, color: INK, margin: "10px 0 0" }}>
            Vendor rate is 12% over contract. Suggest correcting line 7.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <span style={{ fontFamily: GOTHIC, fontSize: 12, color: "#fff", background: MOSS, borderRadius: 4, padding: "6px 14px" }}>Approve</span>
            <span style={{ fontFamily: GOTHIC, fontSize: 12, color: REJECT, border: `1px solid ${REJECT}`, borderRadius: 4, padding: "5px 12px" }}>Reject</span>
          </div>
          <p style={{ fontFamily: MONO, fontSize: 10, color: CLAY, margin: "14px 0 0", lineHeight: 1.5 }}>
            on approve → POST /webhooks/velt
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TypesetHomePage() {
  return (
    <div style={{ background: PARCHMENT, color: INK, fontFamily: GOTHIC, minHeight: "100vh", WebkitFontSmoothing: "antialiased" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
      />

      <style>{`
        .cursor-wrap { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        @media (min-width: 1024px) { .cursor-wrap { padding-left: 40px; padding-right: 40px; } }
        .cursor-link { color: ${INK}; text-decoration: none; transition: color .12s ease; }
        .cursor-link:hover { color: ${EMBER}; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: ${EMBER}; }
        .cursor-muted { color: ${CLAY}; text-decoration: none; }
        .cursor-muted:hover { color: ${EMBER}; }
        .cursor-link-l { color: ${PARCHMENT}; text-decoration: none; }
        .cursor-link-l:hover { color: ${EMBER}; }
        details > summary { list-style: none; cursor: pointer; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] .cursor-faq-plus { transform: rotate(45deg); }
        @media (min-width: 900px) {
          .cursor-hero { grid-template-columns: 1fr 1.05fr !important; }
          .cursor-split { grid-template-columns: 2fr 3fr !important; }
          .cursor-split-rev { grid-template-columns: 3fr 2fr !important; }
          .cursor-splithead { grid-template-columns: 1.2fr 0.8fr !important; }
          .cursor-prim { grid-template-columns: 1fr 1fr !important; }
          .cursor-collab { grid-template-columns: 1fr 1fr !important; }
          .cursor-steps { grid-template-columns: 1fr 1fr 1fr !important; }
          .cursor-pillars { grid-template-columns: 1fr 1fr 1fr 1fr !important; }
          .cursor-verts { grid-template-columns: 1fr 1fr 1fr 1fr !important; }
          .cursor-storyboard { grid-template-columns: 1fr 1fr 1fr !important; }
          .cursor-quotes { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>

      {/* ===================== 1 · NAV ===================== */}
      <header style={{ position: "sticky", top: 0, zIndex: 2147483647, background: "rgba(247,247,244,0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderBottom: `1px solid ${SAND}` }}>
        <nav className="cursor-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <Logo />
          <ul style={{ display: "flex", gap: 24, listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_LINKS.map((l) => (
              <li key={l}><a href="#" className="cursor-link" style={{ fontFamily: GOTHIC, fontSize: 14 }}>{l}</a></li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="#" className="cursor-link" style={{ fontFamily: GOTHIC, fontSize: 14 }}>Sign in</a>
            <FilledButton>Get free API key</FilledButton>
          </div>
        </nav>
      </header>

      <main>
        {/* ===================== 2 · HERO ===================== */}
        <section style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="cursor-wrap cursor-hero" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: MONO, fontSize: 12, color: CLAY }}>
                SOC 2 Type II · HIPAA · EU data residency
              </span>
              <h1 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: "clamp(38px, 5.4vw, 64px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, margin: "16px 0 0" }}>
                Add a pull request to your product
              </h1>
              <p style={{ fontFamily: GOTHIC, fontSize: 18, lineHeight: 1.5, color: CLAY, maxWidth: 480, margin: "18px 0 0" }}>
                Embeddable review and approval for AI-native apps. Add governance to the
                work that can&apos;t ship unapproved.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 26, flexWrap: "wrap" }}>
                <FilledButton large>Get free API key</FilledButton>
                <GhostButton large>Book demo</GhostButton>
              </div>
              <p style={{ fontFamily: MONO, fontSize: 12, color: CLAY, marginTop: 16 }}>
                Free tier. No credit card. First comment in 5 minutes.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                {FEATURE_STRIP.map((f, i) => (
                  <span key={f} style={{ fontFamily: MONO, fontSize: 12, color: CLAY }}>
                    {i > 0 ? <span style={{ color: SAND, marginRight: 8 }}>·</span> : null}{f}
                  </span>
                ))}
              </div>
            </div>
            <ApprovalArtifact />
          </div>
        </section>

        {/* ===================== 3 · LOGO STRIP ===================== */}
        <section style={{ paddingTop: 8, paddingBottom: 56 }}>
          <div className="cursor-wrap" style={{ textAlign: "center" }}>
            <p style={{ fontFamily: MONO, fontSize: 12, color: CLAY, margin: 0, letterSpacing: "0.04em" }}>
              IN PRODUCTION AT TEAMS THAT SHIP REVIEWED WORK
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 36, marginTop: 26 }}>
              {LOGOS.map((n) => (
                <span key={n} style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 19, letterSpacing: "-0.01em", color: INK, opacity: 0.45 }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 4 · PROBLEM CHECKLIST ===================== */}
        <section style={{ background: STONE, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap" style={{ maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            <Kicker>THE PROBLEM</Kicker>
            <h2 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: "clamp(26px, 3.2vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, margin: "10px 0 0" }}>
              Your users need to review and approve what your product generates. Building
              that takes two quarters.
            </h2>
            <ul style={{ listStyle: "none", margin: "28px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {PROBLEMS.map((p) => (
                <li key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span aria-hidden="true" style={{ flexShrink: 0, width: 18, height: 18, marginTop: 2, border: `1px solid ${IRON}`, borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={CLAY} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ fontFamily: GOTHIC, fontSize: 16, lineHeight: 1.5, color: INK }}>{p}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, lineHeight: 1.5, color: INK, margin: "28px 0 0", paddingTop: 22, borderTop: `1px solid ${SAND}` }}>
              If your product has work that more than one of your users reviews or
              approves, this is for you. If it doesn&apos;t, it isn&apos;t.
            </p>
          </div>
        </section>

        {/* ===================== 5 · SOLUTION TURN ===================== */}
        <section style={{ background: PARCHMENT, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap">
            <div className="cursor-split" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "start" }}>
              <div>
                <Kicker>WHY NOW</Kicker>
                <p style={{ fontFamily: GOTHIC, fontSize: 16, lineHeight: 1.5, color: CLAY, margin: "12px 0 0", maxWidth: 420 }}>
                  Your users want agents that act. Nobody wants agents that act alone. The
                  hard part is what happens between an agent&apos;s suggestion and a change to
                  your users&apos; data.
                </p>
                <h2 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: INK, margin: "20px 0 0" }}>
                  Let agents propose, not touch.
                </h2>
                <p style={{ fontFamily: GOTHIC, fontSize: 16, lineHeight: 1.5, color: CLAY, margin: "16px 0 0", maxWidth: 420 }}>
                  Every agent suggestion becomes a comment a human approves. On approve, the
                  change is applied through your webhook, with a permanent record of who
                  allowed what.
                </p>
                <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                  <CommentLine tone={REJECT}>Stop giving agents write access just to offer agentic features.</CommentLine>
                  <CommentLine>No more choosing between agent capability and data safety.</CommentLine>
                </div>
              </div>

              {/* 3-panel storyboard */}
              <div className="cursor-storyboard" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, alignItems: "stretch" }}>
                {PANELS.map((p) => (
                  <div key={p.n} style={{ background: "#fff", border: `1px solid ${SAND}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: CLAY }}>{p.n} · {p.label}</span>
                    <p style={{ fontFamily: GOTHIC, fontSize: 14, lineHeight: 1.45, color: INK, margin: "12px 0 0", flex: 1 }}>{p.body}</p>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: p.n === "3" ? MOSS : CLAY, marginTop: 12 }}>{p.who}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 6 · HERO PRIMITIVES ===================== */}
        <section style={{ background: PARCHMENT, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap">
            <SectionHeader
              kicker="SEVEN PRIMITIVES"
              title="Seven primitives. Any review workflow."
              support="Each ships as a React, Next.js, or Angular component plus a typed SDK. Adopt them in any order."
            />
            <div className="cursor-prim" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 36 }}>
              {PRIMITIVES.map((p, i) => (
                <article
                  key={p.name}
                  style={{
                    background: "#fff",
                    border: `1px solid ${SAND}`,
                    borderRadius: 8,
                    padding: 24,
                    gridColumn: i === 6 ? "1 / -1" : "auto",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: CLAY }}>{p.n} · {p.name.toUpperCase()} <span style={{ color: SAND }}>{"//"}</span> {p.tag}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: CLAY, border: `1px solid ${SAND}`, borderRadius: 4, padding: "2px 8px" }}>Preview · Code</span>
                  </div>
                  <h3 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: 21, lineHeight: 1.2, letterSpacing: "-0.01em", color: INK, margin: "14px 0 0", maxWidth: 520 }}>
                    {p.line}
                  </h3>
                  <div style={{ marginTop: 16 }}>
                    <CommandBlock>
                      <span style={{ color: CLAY }}>{"<>"}</span> {p.api}
                    </CommandBlock>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 7 · COLLABORATION GRID ===================== */}
        <section style={{ background: STONE, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap">
            <SectionHeader
              kicker="INCLUDED"
              title="Everything else your users expect."
              support="The multiplayer layer, included. Same SDK, no second vendor, no second contract."
            />
            <div className="cursor-collab" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 36 }}>
              {COLLAB.map((c) => (
                <article key={c.name} style={{ background: PARCHMENT, border: `1px solid ${SAND}`, borderRadius: 8, padding: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 16, color: INK }}>{c.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: CLAY, border: `1px solid ${SAND}`, borderRadius: 4, padding: "2px 8px" }}>Preview · Code</span>
                  </div>
                  <p style={{ fontFamily: GOTHIC, fontSize: 14, lineHeight: 1.5, color: CLAY, margin: "10px 0 0" }}>{c.line}</p>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 24 }}>
              <a href="#" className="cursor-link" style={{ fontFamily: GOTHIC, fontSize: 15 }}>See the full collaboration layer →</a>
            </p>
          </div>
        </section>

        {/* ===================== 8 · HOW IT WORKS (+ MCP) ===================== */}
        <section style={{ background: PARCHMENT, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap">
            <SectionHeader
              kicker="HOW IT WORKS"
              title="Live in days, not quarters."
              support="Install the SDK, wrap your app, turn on features individually. React, Next.js, Vue, Angular, and HTML."
            />
            <div className="cursor-steps" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 36 }}>
              {STEPS.map((s) => (
                <div key={s.kicker} style={{ background: "#fff", border: `1px solid ${SAND}`, borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ padding: "16px 16px 0" }}>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: CLAY }}>{s.kicker}</span>
                    <p style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 17, color: INK, margin: "8px 0 14px" }}>{s.claim}</p>
                  </div>
                  <div style={{ borderTop: `1px solid ${SAND}` }}>
                    <Chrome caption={s.file} />
                    <pre style={{ margin: 0, padding: "14px 16px", fontFamily: MONO, fontSize: 12.5, lineHeight: 1.7, color: INK, overflowX: "auto" }}>
                      <code>{s.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <CommentLine>First comment same day. First approval workflow within a week.</CommentLine>
            </div>

            {/* MCP dark banner */}
            <div style={{ background: INK, borderRadius: 8, padding: 28, marginTop: 28 }}>
              <Kicker light>MCP · THE FASTER PATH</Kicker>
              <div className="cursor-splithead" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, alignItems: "end", marginTop: 10 }}>
                <h3 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: 26, letterSpacing: "-0.02em", color: PARCHMENT, margin: 0 }}>
                  Skip the steps. Have your agent set it up.
                </h3>
                <p style={{ fontFamily: GOTHIC, fontSize: 15, lineHeight: 1.5, color: "rgba(247,247,244,0.62)", margin: 0, maxWidth: 380 }}>
                  Point your coding agent at the Velt MCP server and it scaffolds the
                  install for you.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                {MCP_TOOLS.map((t, i) => (
                  <span key={t} style={{ fontFamily: MONO, fontSize: 12, color: i === 0 ? INK : "rgba(247,247,244,0.7)", background: i === 0 ? PARCHMENT : "transparent", border: `1px solid ${i === 0 ? PARCHMENT : "rgba(255,255,255,0.2)"}`, borderRadius: 4, padding: "5px 12px" }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop: 14 }}>
                <CommandBlock light>
                  <span style={{ color: "rgba(247,247,244,0.5)" }}>$ </span>npx @veltdev/mcp add --client cursor
                </CommandBlock>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 9 · INTEGRATIONS ===================== */}
        <section style={{ background: STONE, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap">
            <SectionHeader
              kicker="INTEGRATIONS"
              title="Drops into the stack you already have."
              support="First-party integrations across editors, frameworks, and channels. Works in any framework via web components."
            />
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              {INTEGRATIONS.map((cat) => (
                <div key={cat.label} style={{ display: "grid", gridTemplateColumns: "minmax(120px, 160px) 1fr", gap: 16, alignItems: "start", paddingBottom: 18, borderBottom: `1px solid ${SAND}` }}>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: CLAY, textTransform: "uppercase", letterSpacing: "0.04em", paddingTop: 6 }}>{cat.label}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.items.map((it) => (
                      <span key={it} style={{ fontFamily: GOTHIC, fontSize: 14, color: INK, background: PARCHMENT, border: `1px solid ${SAND}`, borderRadius: 4, padding: "6px 12px" }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 10 · ENTERPRISE (dark) ===================== */}
        <section style={{ background: INK, paddingTop: 72, paddingBottom: 72 }}>
          <div className="cursor-wrap">
            <SectionHeader
              light
              kicker="BUILT FOR ENTERPRISE"
              title="Built for your customers' compliance."
              support="The detail your champion forwards to their security team. SOC 2 Type II, HIPAA, EU residency, immutable audit by default."
            />
            <div className="cursor-pillars" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 36 }}>
              {PILLARS.map((p) => (
                <article key={p.kicker} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: 22, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.04em", color: "rgba(247,247,244,0.55)" }}>{p.kicker}</span>
                  <h3 style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 18, color: PARCHMENT, margin: "10px 0 0" }}>{p.head}</h3>
                  <p style={{ fontFamily: GOTHIC, fontSize: 14, lineHeight: 1.5, color: "rgba(247,247,244,0.62)", margin: "10px 0 0", flex: 1 }}>{p.body}</p>
                  <a href="#" className="cursor-link-l" style={{ fontFamily: GOTHIC, fontSize: 13, marginTop: 14 }}>{p.link} →</a>
                </article>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <FilledButton large light>Talk to sales</FilledButton>
              <GhostButton large light>Read governance</GhostButton>
            </div>
          </div>
        </section>

        {/* ===================== 11 · VERTICALS ===================== */}
        <section style={{ background: PARCHMENT, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap">
            <SectionHeader kicker="WHO IT'S FOR" title="Built for work that ships unapproved." />
            <div className="cursor-verts" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 36 }}>
              {VERTICALS.map((v) => (
                <a key={v.label} href={v.href} className="cursor-link" style={{ display: "block", background: "#fff", border: `1px solid ${SAND}`, borderRadius: 8, padding: 20, textDecoration: "none" }}>
                  <span style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 16, color: INK, display: "block" }}>{v.label}</span>
                  <span style={{ fontFamily: GOTHIC, fontSize: 14, lineHeight: 1.5, color: CLAY, display: "block", marginTop: 8 }}>{v.body}</span>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: CLAY, display: "block", marginTop: 14 }}>{v.href} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 12 · FAQ ===================== */}
        <section style={{ background: STONE, paddingTop: 64, paddingBottom: 64 }}>
          <div className="cursor-wrap" style={{ maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            <Kicker>FAQ</Kicker>
            <h2 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: "clamp(26px, 3.2vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, margin: "10px 0 28px" }}>
              Questions buyers ask in the first meeting.
            </h2>
            <div style={{ borderTop: `1px solid ${SAND}` }}>
              {FAQ.map((item) => (
                <details key={item.q} style={{ borderBottom: `1px solid ${SAND}` }}>
                  <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 0" }}>
                    <h3 style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 17, color: INK, margin: 0 }}>{item.q}</h3>
                    <span className="cursor-faq-plus" aria-hidden="true" style={{ fontFamily: MONO, fontSize: 18, color: CLAY, transition: "transform .15s ease", lineHeight: 1 }}>+</span>
                  </summary>
                  <p style={{ fontFamily: GOTHIC, fontSize: 15, lineHeight: 1.6, color: CLAY, margin: "0 0 20px", maxWidth: 680 }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 13 · TESTIMONIALS / PROOF ===================== */}
        <section style={{ background: PARCHMENT, paddingTop: 72, paddingBottom: 72 }}>
          <div className="cursor-wrap">
            <Kicker>PROOF</Kicker>
            {/* featured serif pull-quote */}
            <blockquote style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px, 3.4vw, 38px)", lineHeight: 1.3, letterSpacing: "-0.01em", color: INK, margin: "16px 0 0", maxWidth: 900 }}>
              “We shipped review and approval across our whole product in under a week.
              Velt felt like adding a few lines of code, not building an infra team.”
            </blockquote>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 24 }}>
              <Avatar color="#9552e0" size={40} />
              <span>
                <span style={{ display: "block", fontFamily: GOTHIC, fontSize: 15, color: INK }}>Engineering lead</span>
                <span style={{ display: "block", fontFamily: GOTHIC, fontSize: 13, color: CLAY }}>AI-native SaaS platform</span>
              </span>
            </div>

            {/* three fear-class quote cards */}
            <div className="cursor-quotes" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 40 }}>
              {QUOTES.map((q) => (
                <figure key={q.fear} style={{ margin: 0, background: STONE, border: `1px solid ${SAND}`, borderRadius: 8, padding: 22, borderLeft: `2px solid ${INK}` }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: CLAY, textTransform: "uppercase" }}>{q.fear}</span>
                  <blockquote style={{ fontFamily: GOTHIC, fontSize: 15, lineHeight: 1.5, color: INK, margin: "12px 0 0" }}>{q.quote}</blockquote>
                  <figcaption style={{ fontFamily: GOTHIC, fontSize: 13, color: CLAY, marginTop: 14 }}>{q.who}</figcaption>
                </figure>
              ))}
            </div>

            {/* remaining logo chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 36 }}>
              {LOGOS.map((n) => (
                <span key={n} style={{ fontFamily: GOTHIC, fontWeight: 500, fontSize: 16, color: INK, opacity: 0.4 }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 14 · FINAL CTA ===================== */}
        <section style={{ background: STONE, paddingTop: 80, paddingBottom: 80 }}>
          <div className="cursor-wrap" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: GOTHIC, fontWeight: 400, fontSize: "clamp(30px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: INK, margin: "0 auto", maxWidth: 680 }}>
              Add a pull request to your product
            </h2>
            <p style={{ fontFamily: GOTHIC, fontSize: 17, lineHeight: 1.5, color: CLAY, margin: "16px auto 0", maxWidth: 460 }}>
              Embeddable review and approval for AI-native apps. Start free, or book a
              demo to see it on your own workflows.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginTop: 26, flexWrap: "wrap" }}>
              <FilledButton large>Get free API key</FilledButton>
              <GhostButton large>Book demo</GhostButton>
            </div>
            <p style={{ marginTop: 18 }}>
              <a href="#" className="cursor-link" style={{ fontFamily: GOTHIC, fontSize: 14 }}>Or talk to Rakesh, the founder →</a>
            </p>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer style={{ background: PARCHMENT, borderTop: `1px solid ${SAND}` }}>
        <div className="cursor-wrap" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 40 }}>
            <div style={{ gridColumn: "1 / -1", maxWidth: 300 }}>
              <Logo />
              <p style={{ fontFamily: GOTHIC, fontSize: 14, lineHeight: 1.5, color: CLAY, marginTop: 14 }}>
                Embeddable review and approval for AI-native apps. Add a pull request to
                your product.
              </p>
            </div>
            {FOOTER_GROUPS.map((g) => (
              <div key={g.heading}>
                <h4 style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: IRON, margin: 0 }}>{g.heading}</h4>
                <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                  {g.links.map((l) => (
                    <li key={l}><a href="#" className="cursor-muted" style={{ fontFamily: GOTHIC, fontSize: 14 }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", marginTop: 48, paddingTop: 24, borderTop: `1px solid ${SAND}` }}>
            <p style={{ fontFamily: MONO, fontSize: 12, color: CLAY, margin: 0 }}>© {new Date().getFullYear()} Velt. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy", "Terms", "Security"].map((l) => (
                <a key={l} href="#" className="cursor-muted" style={{ fontFamily: GOTHIC, fontSize: 12 }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
