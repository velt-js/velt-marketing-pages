import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt | Add a pull request to your product",
  description:
    "Embeddable review and approval for AI-native apps. Comments, approval flows, review agents, memory, and audit trails in one SDK.",
};

/* ──────────────────────────────────────────────────────────────────────────
   home-08 — built to the letter of DESIGN.md.

   Where home-04 ran a warm Geist canvas and home-07 went editorial/serif,
   this is the canonical Velt brand system: Urbanist, pure-black/pure-white
   ZEBRA-STRIPING, the #625DF5 brand purple in pill buttons, an oversized
   72px extra-bold centered hero, 1200px content, 120px section rhythm, and
   the four multi-user cursor accents (pink/green/orange/yellow) carried as a
   recurring "multiplayer" motif so the page reads as one live review surface.

   Layout/composition is deliberately recomposed (redesign = structure): the
   hero is a centered stack with a full-width floating artifact + colored
   cursors, the primitives are a true bento, the storyboard is horizontal.

   Carries the new positioning (project memory): embeddable review & approval
   for AI-native apps — "Add a pull request to your product." All 14 home.html
   components are present: nav, hero, logo strip, problem checklist + qualifier
   band, solution turn (3-panel storyboard), 7 primitives (Preview|Code),
   collaboration grid, how it works (+MCP), integrations, enterprise (4
   pillars), verticals, FAQ, testimonials (featured case + 3 quotes + logos),
   final CTA + footer.

   Standalone RSC: no "use client", no hooks, no handlers, no external images.
   FAQ is native <details> so it works without JS. All visuals are inline
   SVG / CSS. CSS scoped under `.v8`. Urbanist pulled from Google Fonts;
   mono uses the project's loaded Fira Code (--font-fira-code).
   ────────────────────────────────────────────────────────────────────────── */

// ── Content ─────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Product", "Use cases", "Resources"];

const FEATURE_STRIP = ["Comments", "Approvals", "Review agents", "Memory", "Audit trails"];

const LOGOS = ["Bigtincan", "trumpet", "Privado", "Cofactr", "OpenEnvoy", "Datarails", "Runway", "HeyGen"];

const PROBLEMS = [
  { on: true, text: "Buyers ask “do you support approval workflows?” and the answer costs a quarter." },
  { on: true, text: "Agents need write access to be useful, and security says no." },
  { on: false, text: "Feedback about work in your product happens in Slack, email, and screenshots." },
  { on: true, text: "A regulated deal stalled on “who approved this?”" },
  { on: false, text: "Users turned off the AI the first time it changed something it shouldn’t." },
];

const PRIMITIVES = [
  { no: "01", name: "Comments", kicker: "proven wedge", headline: "Contextual threads from humans or agents, on any element, doc, cell, or canvas.", sub: "The feedback layer your users already expect." },
  { no: "02", name: "Approval flows", kicker: "the wedge", headline: "Staged sign-off before anything ships.", sub: "Routing, conditions, and a timestamped record." },
  { no: "03", name: "Review agents", kicker: "AI-native", headline: "AI flags issues and proposes fixes as comments, before a human looks.", sub: "The first-pass reviewer that never gets tired." },
  { no: "04", name: "Suggestions", kicker: "diff-style", headline: "Propose edits inline, accept or reject like a diff.", sub: "In any editor, or your own custom components." },
  { no: "05", name: "Audit trail", kicker: "compliance", headline: "An immutable record of every action in your product.", sub: "Audit-ready by default." },
  { no: "06", name: "Memory", kicker: "moat", headline: "Past decisions surface as precedent.", sub: "So reviews stay consistent as teams grow." },
  { no: "07", name: "Notifications", kicker: "knock-style", headline: "Reach reviewers in-app, by email, in Slack and Teams, before the deadline slips.", sub: "Batching, routing, and per-user preferences out of the box." },
];

const COLLAB = [
  { name: "Presence", copy: "See who is working, live: avatars, cursors, selection, follow mode. Humans and agents." },
  { name: "Multiplayer editing", copy: "Edit together without conflicts: co-editing, single editor mode, state sync. CRDT under the hood." },
  { name: "Recording", copy: "Voice, video, and screen pinned to the work, with a built-in video editor." },
  { name: "Huddle", copy: "Live audio and video, right inside the document." },
];

const STEPS = [
  { ix: "STEP 01 · INSTALL", claim: "Add the SDK.", file: "terminal", lines: [["comment", "# one package, every feature"], ["plain", "npm i @veltdev/react"]] },
  { ix: "STEP 02 · WRAP", claim: "Provide your app.", file: "_app.tsx", lines: [["plain", "<VeltProvider apiKey={KEY}>"], ["plain", "  <App />"], ["plain", "</VeltProvider>"]] },
  { ix: "STEP 03 · CONFIGURE", claim: "Mount the review surface.", file: "Invoice.tsx", lines: [["plain", "<VeltComments />"], ["plain", "<VeltPresence />"]] },
];

const MCP_TOOLS = ["Cursor", "Claude Code", "Windsurf", "Copilot", "Zed"];
const MCP_CAPS = ["workspace provisioning", "framework detection", "component mounting", "auth scaffolding"];

const FRAMEWORKS = ["React", "Next.js", "Vue", "Angular", "HTML"];

const INTEGRATIONS = [
  { label: "Editors", items: ["Tiptap", "Lexical", "BlockNote", "Slate", "CodeMirror", "ProseMirror", "Quill"] },
  { label: "Frameworks", items: ["React", "Next.js", "Angular", "Vue", "HTML"] },
  { label: "Canvas & data", items: ["React Flow", "Chart.js", "Highcharts", "Nivo"] },
  { label: "Notifications out", items: ["Slack", "Teams", "Discord", "Resend", "Customer.io", "SendGrid"] },
  { label: "Storage & auth", items: ["Firebase", "Supabase", "Clerk", "Auth0", "Yjs"] },
];

const VERTICALS = [
  { label: "Sales enablement", copy: "Review and approval for content production and sales enablement.", href: "/for/sales-enablement" },
  { label: "Fintech & FP&A", copy: "Approvals, audit trails, and review agents where nothing ships unapproved.", href: "/for/fintech" },
  { label: "Operations", copy: "Human sign-off on operational decisions for physical-world ops software.", href: "/for/operations" },
  { label: "AI-native SaaS", copy: "Agents propose, humans approve. The review layer for AI-generated work.", href: "/for/ai-native-saas" },
];

const FAQ = [
  { q: "How is Velt different from Liveblocks?", a: "Liveblocks is realtime collaboration infrastructure focused on engagement: sync, presence, and AI copilots that act on app state. Velt is review and approval infrastructure focused on control: approval workflows, review agents, audit trails, and memory, with the collaboration layer included. If your users need sign-off, records, and consent before anything changes, that is Velt." },
  { q: "How is this different from the approval flow in the OpenAI Agents SDK?", a: "The OpenAI SDK pauses your own agent's tool calls so a developer-defined approver can resume them. Velt is the review surface your end users see inside your product: comment threads, multi-step approval workflows, audit records, and notifications, working across humans and agents with any model or framework." },
  { q: "Why not build this in-house?", a: "You can, and a first version of one feature takes a quarter or two. The cost is the long tail: anchoring comments to content that moves, notification batching and preferences, permissions, offline sync, audit records, and the edge cases that make review features feel solid. That long tail is Velt's entire roadmap." },
  { q: "Can agents change data in my product without approval?", a: "Not through Velt. Agent suggestions arrive as comments. A human approves or rejects; on approve, the change fires through your webhook with a permanent record of who allowed what. Agents never need write access to your data." },
  { q: "Where does data live? Do you support self-hosting?", a: "Cloud by default, with a hybrid model where content and user PII stay on your infrastructure and Velt stores only metadata, and data residency options including EU. Velt is SOC 2 Type II audited and supports HIPAA workloads." },
  { q: "Which frameworks and editors does Velt support?", a: "React, Next.js, Vue, Angular, and plain HTML for the SDK. Multiplayer editing and suggestions work in Tiptap, CodeMirror, and 10 other editor libraries, or in your own custom components." },
  { q: "How is Velt priced?", a: "Usage-based on monthly active documents (MAD): you pay for documents with review activity in a month, not per seat. There is a free tier for development and early production." },
  { q: "How long does integration take?", a: "Days, not quarters. Install the SDK, wrap your app, and turn on features individually. Most teams render their first comment the same day and launch their first approval workflow within a week." },
];

const QUOTES = [
  { q: "We shipped approval workflows our enterprise buyers had been asking for in a weekend, not a quarter.", name: "Dana Okafor", role: "VP Engineering", company: "@Cofactr", color: "pink" },
  { q: "The audit trail is the screenshot our champion forwards to their security team. It closes the room.", name: "Priya Nair", role: "Head of Product", company: "@OpenEnvoy", color: "green" },
  { q: "Our agents propose, humans approve. We launched AI features security would actually sign off on.", name: "Marc Bauer", role: "CTO", company: "@Datarails", color: "orange" },
];

const FOOTER = [
  { h: "Product", links: ["Comments", "Approval flows", "Review agents", "Suggestions", "Audit trail", "Memory", "Notifications"] },
  { h: "Collaboration", links: ["Presence", "Multiplayer editing", "Recording", "Huddle"] },
  { h: "Platform", links: ["Self-hosting", "Governance", "Pricing", "Docs"] },
  { h: "Company", links: ["Customers", "Blog", "Changelog", "Status"] },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Round avatar showing initials, tinted with one of the brand accent colors.
 * @param initials short label, e.g. "AI" or "MR"
 * @param color accent key: pink | green | orange | yellow | agent
 */
function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span className={`av av-${color}`} aria-hidden="true">
      {initials}
    </span>
  );
}

/**
 * Labeled multi-user cursor used to dress the live surfaces, per DESIGN.md's
 * colored-cursor multiplayer motif.
 * @param name the user/agent name shown on the cursor tag
 * @param color accent key driving the cursor + tag color
 * @param style absolute position overrides
 */
function Cursor({ name, color, style }: { name: string; color: string; style?: React.CSSProperties }) {
  return (
    <span className={`cursor cursor-${color}`} style={style} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M1 1l5.2 13 1.9-5.1 5.1-1.9L1 1z" />
      </svg>
      <span className="cursor-tag">{name}</span>
    </span>
  );
}

/**
 * Editor-chrome code block: traffic-light dots, a filename tab, and a copy
 * affordance. Decorative only (no clipboard wiring in this RSC comp).
 * @param file filename rendered in the tab
 * @param lines tuples of [syntaxClass, text]
 */
function CodeBlock({ file, lines }: { file: string; lines: [string, string][] }) {
  return (
    <div className="code">
      <div className="code-head">
        <span className="dots"><i /><i /><i /></span>
        <span className="code-file">{file}</span>
        <span className="code-copy">copy</span>
      </div>
      <pre className="code-body">
        {lines.map(([syntax, text], index) => (
          <div key={index} className="code-line">
            <span className="code-ln">{index + 1}</span>
            <span className={`tok-${syntax}`}>{text}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

/** Non-functional Preview | Code toggle (Preview shown active). */
function PreviewToggle() {
  return (
    <span className="pc-toggle" aria-hidden="true">
      <button className="active">Preview</button>
      <button>Code</button>
    </span>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function HomeBrandPage() {
  return (
    <div className="v8">
      <style>{CSS}</style>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className="nav-wrap">
        <nav className="container nav" aria-label="Primary">
          <a href="#" className="logo"><span className="logo-mark" />Velt</a>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#">{link}<span className="caret" aria-hidden="true">▾</span></a>
            ))}
          </div>
          <div className="nav-right">
            <a href="#" className="nav-util">Docs</a>
            <a href="#" className="nav-util">Sign in</a>
            <a href="#" className="btn btn-purple btn-sm">Book demo</a>
          </div>
        </nav>
      </header>

      {/* ── Hero (dark, grid + colorful glows) ──────────────────────────── */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow glow-pink" aria-hidden="true" />
        <div className="hero-glow glow-green" aria-hidden="true" />
        <div className="hero-glow glow-purple" aria-hidden="true" />
        <div className="container hero-inner">
          <span className="badge-line">
            <span className="badge">SOC 2 Type II</span>
            <span className="badge-sep">·</span>
            <span className="badge">HIPAA</span>
            <span className="badge-sep">·</span>
            <span className="badge">EU data residency</span>
          </span>
          <h1 className="h1">Add a pull request to your product.</h1>
          <p className="hero-sub">
            Embeddable review and approval for AI-native apps. Add governance to the work that can’t ship unapproved.
          </p>
          <div className="hero-cta">
            <a href="#" className="btn btn-purple btn-lg">Get free API key <span className="arrow">→</span></a>
            <a href="#" className="btn btn-outline-dark btn-lg">Book demo</a>
          </div>
          <p className="hero-micro">Free tier. No credit card. First comment in 5 minutes.</p>
          <div className="strip">
            {FEATURE_STRIP.map((item, index) => (
              <span key={item} className="strip-item">
                {item}{index < FEATURE_STRIP.length - 1 && <span className="strip-dot">·</span>}
              </span>
            ))}
          </div>

          {/* Hero artifact: a non-code document mid-approval with live cursors */}
          <div className="artifact" aria-label="A document mid-approval with an agent comment and an approve button">
            <Cursor name="Maya" color="pink" style={{ top: "16%", left: "-2%" }} />
            <Cursor name="Agent" color="green" style={{ top: "62%", right: "30%" }} />
            <Cursor name="Sam" color="orange" style={{ bottom: "8%", left: "20%" }} />
            <div className="artifact-bar">
              <span className="artifact-ic" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 1.5h5L11.5 5v7.5H3z" /><path d="M8 1.5V5h3.5" /></svg>
              </span>
              <span className="artifact-title">Q3 Pricing One-Pager</span>
              <span className="artifact-presence">
                <Avatar initials="MR" color="pink" />
                <Avatar initials="SK" color="orange" />
                <Avatar initials="AI" color="agent" />
              </span>
              <span className="tag tag-approved">Approved</span>
            </div>
            <div className="artifact-body">
              <div className="artifact-doc">
                <span className="doc-h" />
                <span className="doc-bar w90" />
                <span className="doc-bar w82" />
                <span className="doc-cell flagged">
                  <span className="doc-bar w70" />
                  <span className="doc-pin">1</span>
                </span>
                <span className="doc-bar w95" />
                <span className="doc-bar w58" />
              </div>
              <div className="artifact-rail">
                <div className="thread">
                  <div className="thread-head">
                    <Avatar initials="AI" color="agent" />
                    <span className="thread-who">Review agent</span>
                    <span className="thread-when">2m</span>
                  </div>
                  <p className="thread-body">Vendor rate is 12% over contract. Suggest correcting line 7.</p>
                  <div className="thread-actions">
                    <span className="btn btn-approve btn-xs">Approve</span>
                    <span className="btn btn-reject btn-xs">Reject</span>
                  </div>
                </div>
                <div className="webhook">
                  <span className="webhook-dot" />POST /webhooks/velt · applied by Maya
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* logo strip closes the dark hero block */}
        <div className="container logos">
          <p className="kicker kicker-dim center">Review and approval running in production</p>
          <div className="logo-row">
            {LOGOS.map((logo) => <span key={logo} className="logo-name">{logo}</span>)}
          </div>
        </div>
      </section>

      {/* ── Problem checklist (light) ───────────────────────────────────── */}
      <section className="section light">
        <div className="container narrow">
          <span className="kicker"><span className="kdot" /> The problem</span>
          <h2 className="h2 mt-20">Your users need to review and approve what your product generates. Building that takes two quarters.</h2>
          <ul className="checklist mt-40">
            {PROBLEMS.map((problem) => (
              <li key={problem.text} className={`check ${problem.on ? "on" : ""}`}>
                <span className="check-box" aria-hidden="true">{problem.on ? "✓" : ""}</span>
                <span>{problem.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* qualifier band (dark) */}
      <div className="band">
        <div className="container band-inner">
          <span className="band-kicker">Check all that apply</span>
          <p className="band-text">If your product has work that more than one of your users reviews or approves, this is for you. If it doesn’t, it isn’t.</p>
        </div>
      </div>

      {/* ── Solution turn (dark) ────────────────────────────────────────── */}
      <section className="section dark solution">
        <div className="container">
          <div className="solution-top">
            <span className="kicker kicker-accent"><span className="kdot" /> Why now</span>
            <p className="solution-leadin mt-20">
              Your users want agents that act. Nobody wants agents that act alone. The hard part is what happens between an agent’s suggestion and a change to your users’ data.
            </p>
            <h2 className="h2 light mt-24">Let agents propose, not touch.</h2>
            <p className="solution-sub mt-16">
              Every agent suggestion becomes a comment a human approves. On approve, the change is applied through your webhook, with a permanent record of who allowed what.
            </p>
            <p className="comment-line mt-20">{"// Stop giving agents write access just to offer agentic features."}</p>
          </div>

          <div className="storyboard mt-48">
            <div className="sb-panel">
              <span className="sb-k">1 · Agent proposes</span>
              <div className="thread dark-thread mt-12">
                <div className="thread-head">
                  <Avatar initials="AI" color="agent" />
                  <span className="thread-who light">Review agent</span>
                  <span className="tag tag-agent">agent</span>
                </div>
                <p className="thread-body light">Vendor rate is 12% over contract. Suggest correcting line 7.</p>
              </div>
            </div>
            <span className="sb-arrow" aria-hidden="true">→</span>
            <div className="sb-panel">
              <span className="sb-k">2 · Human decides</span>
              <div className="thread dark-thread mt-12">
                <div className="thread-head">
                  <Avatar initials="MR" color="pink" />
                  <span className="thread-who light">Maya Reyes</span>
                  <span className="thread-when">approver</span>
                </div>
                <div className="thread-actions">
                  <span className="btn btn-approve btn-xs">Approve</span>
                  <span className="btn btn-reject btn-xs">Reject</span>
                </div>
              </div>
            </div>
            <span className="sb-arrow" aria-hidden="true">→</span>
            <div className="sb-panel">
              <span className="sb-k">3 · Applied via your webhook</span>
              <div className="webhook block mt-12">
                <div><span className="webhook-dot" />POST /webhooks/velt</div>
                <div className="webhook-audit">audit · Maya approved · 14:22 UTC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero primitives (light, bento) ──────────────────────────────── */}
      <section className="section light">
        <div className="container">
          <div className="sec-head">
            <h2 className="h2">Seven primitives. Any review workflow.</h2>
            <p className="sec-sub">Each ships as a React, Next.js, or Angular component plus a typed SDK. Compose the ones you need.</p>
          </div>
          <div className="bento">
            {PRIMITIVES.map((prim, index) => (
              <article key={prim.name} className={`bento-card ${index === 0 || index === 6 ? "span-2" : ""}`}>
                <div className="bento-head">
                  <span className="bento-ix">{prim.no} · {prim.name} <span className="bento-kick">{`// ${prim.kicker}`}</span></span>
                  <PreviewToggle />
                </div>
                <h3 className="bento-title">{prim.headline}</h3>
                <p className="bento-sub">{prim.sub}</p>
                <div className="bento-surface">{primitivePreview(prim.name)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collaboration grid (light grey, demoted) ────────────────────── */}
      <section className="section grey">
        <div className="container">
          <div className="sec-head">
            <h2 className="h2">Everything else your users expect.</h2>
            <p className="sec-sub">The multiplayer layer, included. Same SDK, no second vendor, no second contract.</p>
          </div>
          <div className="collab-grid">
            {COLLAB.map((collab) => (
              <div key={collab.name} className="collab-card">
                <div className="collab-top">
                  <span className="collab-ic" aria-hidden="true">{collabIcon(collab.name)}</span>
                  <PreviewToggle />
                </div>
                <span className="collab-name">{collab.name}</span>
                <span className="collab-copy">{collab.copy}</span>
                <div className="collab-strip" aria-hidden="true">
                  <Avatar initials="MR" color="pink" />
                  <Avatar initials="SK" color="orange" />
                  <Avatar initials="JL" color="green" />
                  <Avatar initials="AI" color="agent" />
                  <span className="collab-live">3 viewing · 1 agent</span>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="text-link mt-32">See the full collaboration layer <span className="arrow">→</span></a>
        </div>
      </section>

      {/* ── How it works (light) ────────────────────────────────────────── */}
      <section className="section light">
        <div className="container">
          <div className="sec-head">
            <h2 className="h2">Live in an afternoon.</h2>
            <p className="sec-sub">Install the SDK, wrap your app, mount a surface. Days, not quarters.</p>
          </div>
          <div className="steps">
            {STEPS.map((step) => (
              <div key={step.ix} className="step-card">
                <span className="step-ix">{step.ix}</span>
                <p className="step-claim">{step.claim}</p>
                <CodeBlock file={step.file} lines={step.lines as [string, string][]} />
              </div>
            ))}
          </div>
          <p className="comment-line dark-comment mt-24">{"// React, Next.js, Vue, Angular, and plain HTML. Turn features on one at a time."}</p>
          <div className="frameworks mt-16">
            {FRAMEWORKS.map((framework) => <span key={framework} className="fw-chip">{framework}</span>)}
          </div>

          {/* MCP banner (dark inset) */}
          <div className="mcp mt-48">
            <span className="kicker kicker-accent"><span className="kdot" /> MCP · The faster path</span>
            <div className="mcp-grid mt-20">
              <div>
                <h3 className="mcp-title">MCP: the faster path.</h3>
                <p className="mcp-sub">Skip the steps. Have your coding agent set it up.</p>
                <div className="mcp-tabs mt-16">
                  {MCP_TOOLS.map((tool, index) => (
                    <button key={tool} className={index === 0 ? "active" : ""}>{tool}</button>
                  ))}
                </div>
              </div>
              <div className="mcp-cmd">
                <code>npx @veltdev/mcp init</code>
                <span className="code-copy">copy</span>
              </div>
            </div>
            <div className="mcp-caps mt-16">
              {MCP_CAPS.map((cap) => (
                <span key={cap} className="cap"><span className="cap-dot" />{cap}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations (light, grey cards) ────────────────────────────── */}
      <section className="section light">
        <div className="container">
          <div className="sec-head">
            <h2 className="h2">Drops into the stack you already have.</h2>
            <p className="sec-sub">First-party integrations for editors, frameworks, canvas, and notifications. Works in any framework via web components.</p>
          </div>
          <div className="int-grid">
            {INTEGRATIONS.map((category) => (
              <div key={category.label} className="int-card">
                <span className="int-label">{category.label}</span>
                <div className="int-chips">
                  {category.items.map((item) => <span key={item} className="int-chip">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise (dark, 4 pillars) ────────────────────────────────── */}
      <section className="section dark ent">
        <div className="container">
          <div className="sec-head ent-head">
            <h2 className="h2 light">Built for your customers’ compliance.</h2>
            <div className="ent-head-right">
              <p className="sec-sub light">The screenshot your champion forwards to their security team: deployment, reliability, residency, and the certifications enterprise buyers ask for.</p>
              <div className="ent-cta mt-20">
                <a href="#" className="btn btn-white btn-sm">Talk to sales</a>
                <a href="#" className="btn btn-outline-dark btn-sm">Governance <span className="arrow">→</span></a>
              </div>
            </div>
          </div>
          <div className="ent-pillars">
            <div className="ent-pillar">
              <span className="ent-ix">Deployment</span>
              <span className="ent-lbl">Runs on your infrastructure</span>
              <div className="prov-chips">
                <span>comments → your database</span>
                <span>recordings → your S3 bucket</span>
                <span>user PII → never leaves</span>
              </div>
              <a href="#" className="ent-foot">velt.dev/self-hosting</a>
            </div>
            <div className="ent-pillar">
              <span className="ent-ix">Reliability</span>
              <span className="ent-lbl">Enterprise SLA</span>
              <span className="ent-ds">Trailing-90-day uptime, published on the status page.</span>
              <div className="uptime" aria-hidden="true">
                {Array.from({ length: 28 }).map((_, index) => (
                  <i key={index} className={index === 11 ? "dip" : ""} />
                ))}
              </div>
              <a href="#" className="ent-foot">View status</a>
            </div>
            <div className="ent-pillar">
              <span className="ent-ix">Global</span>
              <span className="ent-numeral">3<span className="ent-unit">regions</span></span>
              <span className="ent-ds">Pin data to a region. <b>us-east, eu-west, ap-south.</b></span>
              <a href="#" className="ent-foot">Data residency</a>
            </div>
            <div className="ent-pillar">
              <span className="ent-ix">Compliance</span>
              <span className="ent-numeral sm">SOC 2<span className="ent-unit">Type II</span></span>
              <span className="ent-ds"><b>HIPAA</b> with BAA. Report under NDA. Pen-tested.</span>
              <a href="#" className="ent-foot">Governance</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Verticals (light) ───────────────────────────────────────────── */}
      <section className="section light">
        <div className="container">
          <div className="sec-head">
            <h2 className="h2">Built for work that can’t ship unapproved.</h2>
            <p className="sec-sub">Review and approval, tuned to the artifacts your industry signs off on.</p>
          </div>
          <div className="vert-grid">
            {VERTICALS.map((vertical) => (
              <a key={vertical.label} href={vertical.href} className="vert-card">
                <span className="vert-name">{vertical.label}</span>
                <span className="vert-copy">{vertical.copy}</span>
                <span className="text-link mt-16">{vertical.href} <span className="arrow">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (light) ─────────────────────────────────────────────────── */}
      <section className="section light">
        <div className="container narrow">
          <h2 className="h2 center">Questions buyers ask in the first meeting.</h2>
          <div className="faq mt-40">
            {FAQ.map((item, index) => (
              <details key={item.q} className="faq-item" open={index === 0}>
                <summary className="faq-q">
                  <span className="faq-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-text">{item.q}</span>
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (dark, banner cards) ───────────────────────────── */}
      <section className="section dark">
        <div className="container">
          <div className="sec-head">
            <h2 className="h2 light">Real teams. Real metrics. Real names.</h2>
            <p className="sec-sub light">One featured case study, three customer quotes, and the rest of the customer base.</p>
          </div>

          <div className="feat-case">
            <div className="fc-left">
              <span className="tag tag-logo">OpenEnvoy</span>
              <span className="fc-tag mt-16">FEATURED · ANCHOR CUSTOMER</span>
              <h3 className="fc-headline mt-12">Audit-ready review on every invoice, shipped in a weekend.</h3>
              <p className="fc-body mt-16">OpenEnvoy embedded comments, approval flows, and an immutable audit trail without standing up a review backend, then passed security review on the deployment model.</p>
              <div className="fc-person mt-24">
                <Avatar initials="PN" color="green" />
                <span><b>Priya Nair</b><span className="fc-role">Head of Product, OpenEnvoy</span></span>
              </div>
              <a href="#" className="text-link light-link mt-24">Read the case study <span className="arrow">→</span></a>
            </div>
            <div className="fc-stats">
              {[["weekend", "to first approval flow"], ["100%", "of actions audited"], ["1", "vendor, not three"]].map(([value, label]) => (
                <div key={label} className="fc-stat">
                  <span className="fc-num">{value}</span>
                  <span className="fc-lbl">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="quote-row mt-24">
            {QUOTES.map((quote) => (
              <figure key={quote.name} className={`quote-card accent-${quote.color}`}>
                <q className="quote-q">{quote.q}</q>
                <figcaption className="quote-meta">
                  <Avatar initials={quote.name.split(" ").map((part) => part[0]).join("")} color={quote.color} />
                  <span>
                    <b>{quote.name}</b>
                    <span className="quote-role">{quote.role} · {quote.company}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="logo-row demoted mt-40">
            {LOGOS.map((logo) => <span key={logo} className="logo-name dim">{logo}</span>)}
          </div>
        </div>
      </section>

      {/* ── Final CTA (dark, grid) ──────────────────────────────────────── */}
      <section className="final">
        <div className="final-grid-bg" aria-hidden="true" />
        <div className="container final-inner">
          <h2 className="h1 sm">Add comments and approvals to your product this weekend.</h2>
          <p className="hero-sub center mt-20">Embeddable review and approval for AI-native apps. Free tier, no credit card, first comment in five minutes.</p>
          <div className="hero-cta mt-32">
            <a href="#" className="btn btn-white btn-lg">Get free API key <span className="arrow">→</span></a>
            <a href="#" className="btn btn-outline-dark btn-lg">Book demo</a>
          </div>
          <p className="founder mt-20">Or talk to <a href="#">Rakesh, the founder</a>.</p>
        </div>
      </section>

      {/* ── Footer (dark) ───────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo light-logo"><span className="logo-mark" />Velt</a>
            <p className="footer-tag mt-16">Embeddable review and approval for AI-native apps.</p>
            <span className="tag tag-soc mt-16">SOC 2 Type II</span>
          </div>
          {FOOTER.map((column) => (
            <div key={column.h} className="footer-col">
              <h4 className="footer-h">{column.h}</h4>
              <ul>{column.links.map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="container footer-legal">
          <span>© 2026 Velt</span>
          <div className="footer-social">
            <a href="#">GitHub</a><a href="#">LinkedIn</a><a href="#">X</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Per-primitive preview visuals ────────────────────────────────────────────

/**
 * Returns a small representative product visual for a given primitive's
 * Preview surface.
 * @param name the primitive name
 */
function primitivePreview(name: string) {
  switch (name) {
    case "Comments":
      return (
        <div className="pv pv-comments">
          <div className="pv-cmt"><Avatar initials="JD" color="pink" /><div><b>Jules Dean</b><p>Can we ship this section by Friday?</p></div></div>
          <div className="pv-cmt reply"><Avatar initials="MR" color="orange" /><div><b>Maya Reyes</b><p>On it. 🚀</p></div></div>
        </div>
      );
    case "Approval flows":
      return (
        <div className="pv pv-dag">
          <span className="node agent">Agent</span><span className="edge" />
          <span className="node">Reviewer</span><span className="edge" />
          <span className="node">Exec</span><span className="edge" />
          <span className="node ok">Approved</span>
        </div>
      );
    case "Review agents":
      return (
        <div className="pv">
          <div className="thread mini">
            <div className="thread-head"><Avatar initials="AI" color="agent" /><span className="thread-who">Review agent</span><span className="tag tag-flag">flagged</span></div>
            <p className="thread-body">3 issues found. 1 suggested fix.</p>
          </div>
        </div>
      );
    case "Suggestions":
      return (
        <div className="pv pv-diff">
          <div className="diff del">- vendor rate 14%</div>
          <div className="diff add">+ vendor rate 12%</div>
          <div className="thread-actions mt-8"><span className="btn btn-approve btn-xs">Accept</span><span className="btn btn-reject btn-xs">Reject</span></div>
        </div>
      );
    case "Audit trail":
      return (
        <div className="pv pv-audit">
          {["Maya approved · 14:22", "Agent flagged · 14:19", "Jules commented · 14:02"].map((row) => (
            <div key={row} className="audit-row"><span className="audit-dot" />{row}</div>
          ))}
        </div>
      );
    case "Memory":
      return (
        <div className="pv">
          <div className="mem"><span className="tag tag-approved">precedent</span><p>Last 9 invoices over contract were corrected. Suggest the same.</p></div>
        </div>
      );
    case "Notifications":
      return (
        <div className="pv pv-notif">
          {[["In-app", "pink"], ["Slack", "green"], ["Email", "orange"]].map(([channel, color]) => (
            <div key={channel} className="notif"><Avatar initials="•" color={color} /><span>Review requested</span><span className="notif-ch">{channel}</span></div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

/**
 * Returns the outlined Tabler-style icon for a collaboration family card.
 * @param name the collaboration feature name
 */
function collabIcon(name: string) {
  const common = { width: 22, height: 22, viewBox: "0 0 22 22", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "Presence":
      return <svg {...common}><circle cx="8" cy="8" r="3" /><circle cx="14" cy="8" r="3" /><path d="M3 18c.7-2.6 2.6-4 5-4M19 18c-.7-2.6-2.6-4-5-4" /></svg>;
    case "Multiplayer editing":
      return <svg {...common}><path d="M4 14.5 13 5.5l3 3-9 9H4z" /><path d="M11.5 7.5l3 3" /></svg>;
    case "Recording":
      return <svg {...common}><rect x="3" y="6" width="11" height="10" rx="2" /><path d="M14 10l5-3v8l-5-3z" /></svg>;
    case "Huddle":
      return <svg {...common}><rect x="8" y="3" width="6" height="10" rx="3" /><path d="M5 10a6 6 0 0 0 12 0M11 16v3" /></svg>;
    default:
      return null;
  }
}

// ── Scoped design system (faithful to DESIGN.md) ─────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');

.v8 {
  --purple:#625DF5; --purple-hover:#514CE0; --purple-soft:#EEEDFE;
  --black:#000; --white:#fff;
  --muted:#8E8E8E; --muted-2:#555; --footer-link:#B5B5B5;
  --card-dark:#111111; --card-light:#F7F7F7;
  --pink:#E934BF; --green:#0D9A5D; --orange:#FF7162; --yellow:#FFCD2E;
  --line-light:#ECECEC; --line-strong:#DEDEDE;
  --line-dark:rgba(255,255,255,0.12); --line-dark-2:rgba(255,255,255,0.07);
  --sans:"Urbanist",ui-sans-serif,system-ui,-apple-system,sans-serif;
  --mono:var(--font-fira-code),"Fira Code",ui-monospace,"SF Mono",Menlo,monospace;
  --maxw:1200px; --gutter:24px; --pad-y:120px; --pad-y-sm:80px; --radius:16px;
  font-family:var(--sans); color:var(--black); background:var(--white);
  -webkit-font-smoothing:antialiased; line-height:1.5; letter-spacing:0;
}
.v8 *,.v8 *::before,.v8 *::after{box-sizing:border-box;}
.v8 h1,.v8 h2,.v8 h3,.v8 h4,.v8 p,.v8 ul,.v8 figure,.v8 pre{margin:0;}
.v8 ul{list-style:none;padding:0;}
.v8 a{color:inherit;text-decoration:none;}
.v8 q{quotes:"\\201C" "\\201D";}
.v8 .container{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
.v8 .narrow{max-width:840px;}
.v8 .center{text-align:center;}
.v8 .mt-8{margin-top:8px;} .v8 .mt-12{margin-top:12px;} .v8 .mt-16{margin-top:16px;}
.v8 .mt-20{margin-top:20px;} .v8 .mt-24{margin-top:24px;} .v8 .mt-32{margin-top:32px;}
.v8 .mt-40{margin-top:40px;} .v8 .mt-48{margin-top:48px;}

/* ── type ── */
.v8 .h1{font-size:clamp(44px,6.4vw,72px);line-height:1.08;letter-spacing:-0.03em;font-weight:800;}
.v8 .h1.sm{font-size:clamp(34px,4.4vw,52px);}
.v8 .h2{font-size:clamp(30px,3.6vw,40px);line-height:1.12;letter-spacing:-0.025em;font-weight:700;max-width:22ch;}
.v8 .h2.center{max-width:none;}
.v8 .h2.light{color:var(--white);}
.v8 .kicker{font-family:var(--mono);font-size:12px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:var(--muted-2);display:inline-flex;align-items:center;gap:8px;}
.v8 .kicker-accent{color:var(--purple);}
.v8 .kicker-dim{color:var(--muted);}
.v8 .kicker .kdot{width:6px;height:6px;border-radius:50%;background:var(--purple);}
.v8 .comment-line{font-family:var(--mono);font-size:13px;color:var(--purple);}
.v8 .comment-line.dark-comment{color:var(--purple);}

/* ── buttons (pill) ── */
.v8 .btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;font-family:var(--sans);font-weight:600;font-size:15px;border:1.5px solid transparent;white-space:nowrap;cursor:pointer;transition:background .14s,color .14s,border-color .14s,transform .14s;}
.v8 .btn .arrow{font-family:var(--mono);font-weight:400;}
.v8 .btn-lg{height:52px;padding:0 28px;}
.v8 .btn-sm{height:40px;padding:0 20px;font-size:14px;}
.v8 .btn-xs{height:30px;padding:0 13px;font-size:12.5px;border-radius:999px;}
.v8 .btn-purple{background:var(--purple);color:var(--white);}
.v8 .btn-purple:hover{background:var(--purple-hover);}
.v8 .btn-white{background:var(--white);color:var(--black);}
.v8 .btn-white:hover{background:var(--purple);color:var(--white);}
.v8 .btn-outline-dark{background:transparent;color:var(--white);border-color:rgba(255,255,255,0.4);}
.v8 .btn-outline-dark:hover{border-color:var(--white);background:rgba(255,255,255,0.06);}
.v8 .btn-approve{background:rgba(13,154,93,0.14);color:var(--green);}
.v8 .btn-reject{background:rgba(255,113,98,0.16);color:#D4452F;}

/* ── tags / badges ── */
.v8 .tag{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.3px;}
.v8 .tag-approved{background:rgba(13,154,93,0.14);color:var(--green);}
.v8 .tag-agent{background:var(--purple-soft);color:var(--purple);}
.v8 .tag-flag{background:rgba(255,205,46,0.2);color:#9A7A00;}
.v8 .tag-logo{background:rgba(255,255,255,0.1);color:var(--white);border:1px solid var(--line-dark);}
.v8 .tag-soc{background:transparent;color:var(--footer-link);border:1px solid var(--line-dark);}

/* ── nav ── */
.v8 .nav-wrap{position:sticky;top:0;z-index:100;background:rgba(0,0,0,0.55);backdrop-filter:saturate(160%) blur(14px);border-bottom:1px solid var(--line-dark-2);}
.v8 .nav{display:flex;align-items:center;height:68px;gap:32px;}
.v8 .logo{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:19px;letter-spacing:-0.02em;color:var(--white);}
.v8 .logo-mark{width:22px;height:22px;border-radius:6px;background:var(--purple);position:relative;}
.v8 .logo-mark::after{content:"";position:absolute;inset:6px;background:var(--white);border-radius:2px;}
.v8 .nav-links{display:flex;gap:26px;margin:0 auto;}
.v8 .nav-links a{display:inline-flex;align-items:center;gap:5px;font-size:15px;color:rgba(255,255,255,0.8);}
.v8 .nav-links a:hover{color:var(--white);}
.v8 .nav-links .caret{font-size:10px;color:rgba(255,255,255,0.5);}
.v8 .nav-right{display:flex;align-items:center;gap:20px;}
.v8 .nav-util{font-size:15px;color:rgba(255,255,255,0.8);}
.v8 .nav-util:hover{color:var(--white);}

/* ── sections / zebra ── */
.v8 .section{padding:var(--pad-y) 0;}
.v8 .section.light{background:var(--white);color:var(--black);}
.v8 .section.grey{background:var(--card-light);color:var(--black);}
.v8 .section.dark{background:var(--black);color:var(--white);}
.v8 .sec-head{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:end;margin-bottom:56px;}
.v8 .sec-sub{font-size:17px;line-height:1.55;color:var(--muted-2);max-width:48ch;}
.v8 .sec-sub.light{color:rgba(255,255,255,0.66);}

/* ── hero ── */
.v8 .hero{position:relative;background:var(--black);color:var(--white);padding:88px 0 var(--pad-y-sm);overflow:hidden;}
.v8 .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:46px 46px;mask-image:radial-gradient(ellipse 80% 60% at 50% 30%,#000 40%,transparent 100%);}
.v8 .hero-glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.5;pointer-events:none;}
.v8 .glow-pink{width:420px;height:420px;background:var(--pink);top:-80px;left:-60px;opacity:0.28;}
.v8 .glow-green{width:380px;height:380px;background:var(--green);top:120px;right:-80px;opacity:0.24;}
.v8 .glow-purple{width:560px;height:420px;background:var(--purple);bottom:-160px;left:30%;opacity:0.35;}
.v8 .hero-inner{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;}
.v8 .badge-line{display:inline-flex;align-items:center;gap:10px;padding:7px 16px;border:1px solid var(--line-dark);border-radius:999px;background:rgba(255,255,255,0.03);}
.v8 .badge{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:0.4px;color:rgba(255,255,255,0.8);}
.v8 .badge-sep{color:rgba(255,255,255,0.3);}
.v8 .h1{color:var(--white);max-width:16ch;margin-top:28px;}
.v8 .hero-sub{font-size:19px;line-height:1.55;color:rgba(255,255,255,0.72);max-width:60ch;margin-top:24px;}
.v8 .hero-sub.center{margin-left:auto;margin-right:auto;}
.v8 .hero-cta{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:36px;}
.v8 .hero-micro{font-family:var(--mono);font-size:12.5px;color:rgba(255,255,255,0.5);margin-top:18px;}
.v8 .strip{display:flex;flex-wrap:wrap;justify-content:center;gap:0 4px;margin-top:24px;}
.v8 .strip-item{font-size:14px;font-weight:500;color:rgba(255,255,255,0.85);display:inline-flex;align-items:center;gap:10px;}
.v8 .strip-dot{color:var(--purple);margin:0 6px;}

/* hero artifact */
.v8 .artifact{position:relative;width:100%;max-width:880px;margin:56px auto 0;border:1px solid var(--line-dark);border-radius:var(--radius);background:#0C0C0E;box-shadow:0 40px 120px -30px rgba(98,93,245,0.4);overflow:visible;}
.v8 .artifact-bar{display:flex;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid var(--line-dark-2);}
.v8 .artifact-ic{width:28px;height:28px;border-radius:8px;background:var(--purple-soft);color:var(--purple);display:grid;place-items:center;flex:none;}
.v8 .artifact-title{font-size:14px;font-weight:600;color:var(--white);}
.v8 .artifact-presence{display:inline-flex;margin-left:auto;}
.v8 .artifact-presence .av{margin-left:-7px;border:2px solid #0C0C0E;}
.v8 .artifact-body{display:grid;grid-template-columns:1fr 270px;}
.v8 .artifact-doc{padding:26px;border-right:1px solid var(--line-dark-2);display:grid;gap:14px;align-content:start;}
.v8 .doc-h{height:14px;width:60%;border-radius:5px;background:rgba(255,255,255,0.22);}
.v8 .doc-bar{height:10px;border-radius:5px;background:rgba(255,255,255,0.1);}
.v8 .doc-bar.w95{width:95%;} .v8 .doc-bar.w90{width:90%;} .v8 .doc-bar.w82{width:82%;} .v8 .doc-bar.w70{width:100%;} .v8 .doc-bar.w58{width:58%;}
.v8 .doc-cell{position:relative;border-radius:6px;padding:7px 9px;margin:-3px 0;background:rgba(98,93,245,0.16);border:1px solid rgba(98,93,245,0.4);}
.v8 .doc-pin{position:absolute;right:-9px;top:-10px;width:22px;height:22px;border-radius:50% 50% 50% 3px;background:var(--purple);color:var(--white);font-size:11px;font-family:var(--mono);display:grid;place-items:center;}
.v8 .artifact-rail{padding:18px;display:grid;gap:12px;align-content:start;background:rgba(255,255,255,0.02);}
.v8 .thread{border:1px solid var(--line-light);border-radius:12px;background:var(--white);padding:13px 14px;display:grid;gap:10px;}
.v8 .thread.dark-thread,.v8 .artifact-rail .thread{background:#161618;border-color:var(--line-dark);}
.v8 .thread.mini{box-shadow:none;}
.v8 .thread-head{display:flex;align-items:center;gap:9px;}
.v8 .thread-who{font-size:13px;font-weight:600;color:var(--black);}
.v8 .thread-who.light,.v8 .artifact-rail .thread-who{color:var(--white);}
.v8 .thread-when{font-size:11px;color:var(--muted);margin-left:auto;font-family:var(--mono);}
.v8 .thread-body{font-size:13px;line-height:1.5;color:#D7D7DB;}
.v8 .thread.mini .thread-body,.v8 .pv .thread-body{color:var(--muted-2);}
.v8 .thread-body.light{color:#D7D7DB;}
.v8 .thread-actions{display:flex;gap:8px;}
.v8 .webhook{display:flex;align-items:center;gap:9px;border:1px solid var(--line-dark);border-radius:10px;background:#000;color:#CFCFE6;padding:10px 13px;font-family:var(--mono);font-size:11px;}
.v8 .webhook.block{display:block;}
.v8 .webhook-dot{width:7px;height:7px;border-radius:50%;background:var(--green);display:inline-block;margin-right:7px;}
.v8 .webhook-audit{color:rgba(255,255,255,0.45);margin-top:5px;}

/* avatars */
.v8 .av{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;color:var(--white);flex:none;font-family:var(--mono);}
.v8 .av-pink{background:var(--pink);} .v8 .av-green{background:var(--green);}
.v8 .av-orange{background:var(--orange);} .v8 .av-yellow{background:var(--yellow);color:#3a2c00;}
.v8 .av-agent{background:#1b1b22;border:1.5px solid var(--purple);color:#B9B5FF;}

/* cursors */
.v8 .cursor{position:absolute;z-index:5;display:inline-flex;align-items:flex-start;color:var(--purple);}
.v8 .cursor-tag{margin-top:10px;margin-left:-2px;font-family:var(--mono);font-size:10px;font-weight:600;color:var(--white);background:currentColor;padding:2px 7px;border-radius:6px 6px 6px 1px;}
.v8 .cursor-pink{color:var(--pink);} .v8 .cursor-green{color:var(--green);} .v8 .cursor-orange{color:var(--orange);}
.v8 .cursor .cursor-tag{color:var(--white);}
.v8 .cursor-pink .cursor-tag{background:var(--pink);} .v8 .cursor-green .cursor-tag{background:var(--green);} .v8 .cursor-orange .cursor-tag{background:var(--orange);}

/* logos */
.v8 .logos{position:relative;margin-top:72px;}
.v8 .logo-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:18px 44px;margin-top:24px;}
.v8 .logo-name{font-size:20px;font-weight:700;letter-spacing:-0.02em;color:rgba(255,255,255,0.45);transition:color .14s;}
.v8 .logo-name:hover{color:var(--white);}
.v8 .logo-row.demoted .logo-name{font-size:17px;}
.v8 .logo-name.dim{color:rgba(255,255,255,0.4);}

/* problem checklist */
.v8 .checklist{display:grid;gap:16px;max-width:62ch;}
.v8 .check{display:grid;grid-template-columns:26px 1fr;gap:16px;align-items:start;font-size:19px;line-height:1.45;color:var(--muted);}
.v8 .check-box{width:24px;height:24px;border-radius:7px;border:2px solid var(--line-strong);display:grid;place-items:center;font-size:14px;color:var(--white);margin-top:2px;}
.v8 .check.on{color:var(--black);font-weight:500;}
.v8 .check.on .check-box{background:var(--purple);border-color:var(--purple);}

/* qualifier band */
.v8 .band{background:var(--black);color:var(--white);padding:44px 0;}
.v8 .band-inner{display:flex;align-items:center;gap:36px;}
.v8 .band-kicker{font-family:var(--mono);font-size:12px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:var(--purple);white-space:nowrap;}
.v8 .band-text{font-size:20px;line-height:1.4;letter-spacing:-0.015em;color:var(--white);flex:1;}

/* solution */
.v8 .solution-top{max-width:760px;}
.v8 .solution-leadin{font-size:18px;line-height:1.55;color:rgba(255,255,255,0.62);}
.v8 .solution-sub{font-size:17px;line-height:1.55;color:rgba(255,255,255,0.72);max-width:62ch;}
.v8 .storyboard{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:14px;}
.v8 .sb-panel{background:var(--card-dark);border:1px solid var(--line-dark);border-radius:14px;padding:18px;align-self:stretch;}
.v8 .sb-k{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.4px;color:rgba(255,255,255,0.55);}
.v8 .sb-arrow{color:rgba(255,255,255,0.35);font-size:20px;}

/* bento primitives */
.v8 .bento{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.v8 .bento-card{background:var(--white);border:1px solid var(--line-light);border-radius:var(--radius);padding:26px;display:flex;flex-direction:column;gap:14px;transition:border-color .14s,box-shadow .14s;}
.v8 .bento-card:hover{border-color:var(--line-strong);box-shadow:0 18px 50px -28px rgba(0,0,0,0.25);}
.v8 .bento-card.span-2{grid-column:span 2;}
.v8 .bento-head{display:flex;align-items:center;justify-content:space-between;gap:12px;}
.v8 .bento-ix{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;color:var(--black);}
.v8 .bento-kick{color:var(--muted);font-weight:500;}
.v8 .bento-title{font-size:21px;line-height:1.25;letter-spacing:-0.02em;font-weight:600;max-width:34ch;}
.v8 .bento-sub{font-size:15px;color:var(--muted-2);}
.v8 .bento-surface{margin-top:auto;background:var(--card-light);border:1px solid var(--line-light);border-radius:12px;padding:18px;min-height:130px;display:flex;align-items:center;}

/* preview toggle */
.v8 .pc-toggle{display:inline-flex;padding:3px;border:1px solid var(--line-light);border-radius:999px;background:var(--card-light);flex:none;}
.v8 .pc-toggle button{padding:4px 12px;border:0;background:transparent;font-family:var(--sans);font-weight:600;font-size:11px;color:var(--muted);border-radius:999px;cursor:pointer;}
.v8 .pc-toggle button.active{background:var(--black);color:var(--white);}

/* preview visuals */
.v8 .pv{width:100%;display:grid;gap:10px;}
.v8 .pv-comments .pv-cmt{display:flex;gap:9px;align-items:flex-start;}
.v8 .pv-cmt.reply{margin-left:22px;}
.v8 .pv-cmt b{font-size:12.5px;} .v8 .pv-cmt p{font-size:12.5px;color:var(--muted-2);}
.v8 .pv-dag{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.v8 .pv-dag .node{font-family:var(--mono);font-size:11px;padding:6px 10px;border:1px solid var(--line-strong);border-radius:8px;background:var(--white);}
.v8 .pv-dag .node.agent{border-color:var(--purple);background:var(--purple-soft);color:var(--purple);}
.v8 .pv-dag .node.ok{background:rgba(13,154,93,0.14);color:var(--green);border-color:transparent;}
.v8 .pv-dag .edge{width:14px;height:1px;background:var(--line-strong);}
.v8 .pv-diff .diff{font-family:var(--mono);font-size:12px;padding:5px 9px;border-radius:6px;}
.v8 .pv-diff .diff.del{background:rgba(255,113,98,0.14);color:#D4452F;}
.v8 .pv-diff .diff.add{background:rgba(13,154,93,0.14);color:var(--green);}
.v8 .pv-audit .audit-row,.v8 .pv-notif .notif{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12px;color:var(--muted-2);}
.v8 .pv-audit .audit-dot{width:6px;height:6px;border-radius:50%;background:var(--purple);}
.v8 .pv .mem{display:grid;gap:8px;} .v8 .pv .mem p{font-size:12.5px;color:var(--muted-2);}
.v8 .pv-notif .notif-ch{margin-left:auto;color:var(--muted);}
.v8 .pv .thread.mini{background:var(--white);border:1px solid var(--line-light);}

/* collaboration grid */
.v8 .collab-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
.v8 .collab-card{background:var(--white);border:1px solid var(--line-light);border-radius:var(--radius);padding:26px;display:flex;flex-direction:column;gap:12px;}
.v8 .collab-top{display:flex;align-items:center;justify-content:space-between;}
.v8 .collab-ic{color:var(--purple);}
.v8 .collab-name{font-size:21px;letter-spacing:-0.02em;font-weight:600;}
.v8 .collab-copy{font-size:15px;color:var(--muted-2);line-height:1.55;max-width:44ch;}
.v8 .collab-strip{display:flex;align-items:center;gap:0;margin-top:6px;}
.v8 .collab-strip .av{margin-left:-6px;border:2px solid var(--white);}
.v8 .collab-strip .av:first-child{margin-left:0;}
.v8 .collab-live{margin-left:14px;font-family:var(--mono);font-size:11px;color:var(--muted);}
.v8 .text-link{display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);font-size:13px;font-weight:500;color:var(--purple);}
.v8 .text-link:hover{color:var(--purple-hover);}
.v8 .text-link.light-link{color:#B9B5FF;}

/* steps + code */
.v8 .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.v8 .step-card{background:var(--white);border:1px solid var(--line-light);border-radius:var(--radius);padding:24px;display:grid;gap:14px;align-content:start;}
.v8 .step-ix{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.5px;color:var(--purple);}
.v8 .step-claim{font-size:20px;letter-spacing:-0.02em;font-weight:600;}
.v8 .code{font-family:var(--mono);font-size:12.5px;line-height:1.7;background:#0C0C0E;border:1px solid var(--line-dark);border-radius:12px;overflow:hidden;color:#E4E4EC;}
.v8 .code-head{display:flex;align-items:center;gap:9px;padding:9px 13px;border-bottom:1px solid var(--line-dark-2);}
.v8 .code-head .dots{display:inline-flex;gap:5px;}
.v8 .code-head .dots i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,0.2);display:inline-block;}
.v8 .code-file{font-size:11px;color:rgba(255,255,255,0.45);}
.v8 .code-copy{margin-left:auto;font-size:10px;color:rgba(255,255,255,0.5);border:1px solid var(--line-dark);padding:2px 8px;border-radius:5px;}
.v8 .code-body{padding:14px 14px;overflow-x:auto;}
.v8 .code-line{white-space:pre;}
.v8 .code-ln{color:rgba(255,255,255,0.28);padding-right:14px;user-select:none;display:inline-block;width:16px;text-align:right;}
.v8 .tok-comment{color:#6B7280;} .v8 .tok-plain{color:#E4E4EC;}
.v8 .frameworks{display:flex;flex-wrap:wrap;gap:10px;}
.v8 .fw-chip{font-family:var(--mono);font-size:12px;font-weight:500;padding:7px 14px;border:1px solid var(--line-light);border-radius:999px;background:var(--card-light);color:var(--muted-2);}

/* mcp */
.v8 .mcp{background:var(--black);border-radius:var(--radius);padding:36px;color:var(--white);}
.v8 .mcp-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;}
.v8 .mcp-title{font-size:26px;letter-spacing:-0.02em;font-weight:700;}
.v8 .mcp-sub{color:rgba(255,255,255,0.6);font-size:16px;margin-top:8px;}
.v8 .mcp-tabs{display:inline-flex;flex-wrap:wrap;gap:4px;padding:4px;border:1px solid var(--line-dark);border-radius:999px;background:rgba(255,255,255,0.04);}
.v8 .mcp-tabs button{padding:6px 14px;border:0;background:transparent;color:rgba(255,255,255,0.6);font-family:var(--mono);font-size:11px;border-radius:999px;cursor:pointer;}
.v8 .mcp-tabs button.active{background:var(--purple);color:var(--white);}
.v8 .mcp-cmd{display:flex;align-items:center;gap:12px;background:#0C0C0E;border:1px solid var(--line-dark);border-radius:12px;padding:16px;font-family:var(--mono);font-size:13px;color:#CFCFE6;}
.v8 .mcp-cmd .code-copy{margin-left:auto;}
.v8 .mcp-caps{display:flex;flex-wrap:wrap;gap:18px;}
.v8 .mcp-caps .cap{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.6);}
.v8 .mcp-caps .cap-dot{width:5px;height:5px;border-radius:50%;background:var(--green);}

/* integrations */
.v8 .int-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
.v8 .int-card{background:var(--card-light);border:1px solid var(--line-light);border-radius:14px;padding:24px;}
.v8 .int-card:first-child{grid-column:span 2;}
.v8 .int-label{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:var(--muted);}
.v8 .int-chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:16px;}
.v8 .int-chip{font-size:14px;font-weight:500;padding:8px 15px;border-radius:999px;background:var(--white);border:1px solid var(--line-light);}

/* enterprise */
.v8 .ent-head{align-items:start;}
.v8 .ent-head-right{display:flex;flex-direction:column;align-items:flex-start;}
.v8 .ent-cta{display:flex;gap:12px;}
.v8 .ent-pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.v8 .ent-pillar{background:var(--card-dark);border:1px solid var(--line-dark);border-radius:14px;padding:24px;display:flex;flex-direction:column;gap:14px;min-height:248px;}
.v8 .ent-ix{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:var(--purple);}
.v8 .ent-lbl{font-size:17px;letter-spacing:-0.015em;font-weight:600;}
.v8 .ent-numeral{font-size:clamp(34px,3.4vw,46px);line-height:1;letter-spacing:-0.03em;font-weight:800;}
.v8 .ent-numeral.sm{font-size:clamp(26px,2.6vw,34px);}
.v8 .ent-numeral .ent-unit{font-size:13px;font-family:var(--mono);font-weight:500;color:rgba(255,255,255,0.5);margin-left:9px;}
.v8 .ent-ds{font-size:13px;color:rgba(255,255,255,0.62);line-height:1.55;}
.v8 .ent-ds b{color:var(--white);font-weight:600;}
.v8 .prov-chips{display:grid;gap:7px;}
.v8 .prov-chips span{font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.82);background:rgba(255,255,255,0.05);border:1px solid var(--line-dark-2);border-radius:7px;padding:6px 10px;}
.v8 .uptime{display:flex;gap:2px;align-items:flex-end;height:28px;}
.v8 .uptime i{flex:1;height:100%;background:var(--green);border-radius:1px;opacity:0.85;}
.v8 .uptime i.dip{height:52%;background:var(--yellow);}
.v8 .ent-foot{margin-top:auto;padding-top:14px;border-top:1px solid var(--line-dark-2);font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.65);}
.v8 .ent-foot:hover{color:var(--purple);}

/* verticals */
.v8 .vert-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.v8 .vert-card{background:var(--white);border:1px solid var(--line-light);border-radius:var(--radius);padding:26px;display:flex;flex-direction:column;gap:12px;transition:border-color .14s,transform .14s;}
.v8 .vert-card:hover{border-color:var(--purple);transform:translateY(-3px);}
.v8 .vert-name{font-size:19px;letter-spacing:-0.02em;font-weight:600;}
.v8 .vert-copy{font-size:14.5px;color:var(--muted-2);line-height:1.5;flex:1;}

/* faq */
.v8 .faq{border-bottom:1px solid var(--line-light);}
.v8 .faq-item{border-top:1px solid var(--line-light);padding:22px 0;}
.v8 .faq-q{display:grid;grid-template-columns:34px 1fr auto;gap:14px;align-items:center;font-size:18px;font-weight:600;letter-spacing:-0.01em;cursor:pointer;list-style:none;}
.v8 .faq-q::-webkit-details-marker{display:none;}
.v8 .faq-num{font-family:var(--mono);font-size:12px;font-weight:500;color:var(--muted);}
.v8 .faq-q::after{content:"+";font-family:var(--mono);color:var(--muted);font-size:20px;}
.v8 .faq-item[open] .faq-q::after{content:"\\2212";color:var(--purple);}
.v8 .faq-a{margin:14px 0 0 48px;color:var(--muted-2);max-width:76ch;font-size:15.5px;line-height:1.6;}

/* testimonials */
.v8 .feat-case{display:grid;grid-template-columns:1.25fr 1fr;background:var(--card-dark);border:1px solid var(--line-dark);border-radius:var(--radius);overflow:hidden;}
.v8 .fc-left{padding:40px;}
.v8 .fc-tag{display:block;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.6px;color:var(--purple);}
.v8 .fc-headline{font-size:26px;line-height:1.2;letter-spacing:-0.02em;font-weight:700;max-width:24ch;color:var(--white);}
.v8 .fc-body{font-size:15.5px;color:rgba(255,255,255,0.66);line-height:1.6;max-width:48ch;}
.v8 .fc-person{display:flex;align-items:center;gap:11px;font-size:13px;color:var(--white);}
.v8 .fc-person b{display:block;} .v8 .fc-role{color:rgba(255,255,255,0.5);font-size:12px;}
.v8 .fc-stats{background:linear-gradient(160deg,#171622,#0c0c12);padding:40px;display:grid;align-content:center;gap:28px;border-left:1px solid var(--line-dark);}
.v8 .fc-num{font-size:42px;letter-spacing:-0.03em;font-weight:800;display:block;color:var(--white);}
.v8 .fc-lbl{font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.5);}
.v8 .quote-row{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.v8 .quote-card{background:var(--card-dark);border:1px solid var(--line-dark);border-radius:14px;padding:26px;display:flex;flex-direction:column;gap:18px;border-top:3px solid var(--purple);}
.v8 .quote-card.accent-pink{border-top-color:var(--pink);}
.v8 .quote-card.accent-green{border-top-color:var(--green);}
.v8 .quote-card.accent-orange{border-top-color:var(--orange);}
.v8 .quote-q{font-size:16px;line-height:1.5;color:var(--white);}
.v8 .quote-meta{display:flex;align-items:center;gap:11px;font-size:13px;color:var(--white);}
.v8 .quote-meta b{display:block;}
.v8 .quote-role{font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.5);}

/* final cta */
.v8 .final{position:relative;background:var(--black);color:var(--white);padding:var(--pad-y) 0;overflow:hidden;}
.v8 .final-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px;mask-image:radial-gradient(ellipse 70% 80% at 50% 50%,#000,transparent 75%);}
.v8 .final-inner{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;}
.v8 .final .h1{max-width:20ch;}
.v8 .founder{font-family:var(--mono);font-size:13px;color:rgba(255,255,255,0.5);}
.v8 .founder a{color:#B9B5FF;border-bottom:1px solid currentColor;}

/* footer */
.v8 .footer{background:var(--black);color:var(--white);padding:72px 0 44px;border-top:1px solid var(--line-dark-2);}
.v8 .footer-grid{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:36px;}
.v8 .light-logo{color:var(--white);}
.v8 .footer-tag{font-size:14.5px;color:var(--footer-link);max-width:30ch;line-height:1.55;}
.v8 .footer-h{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:var(--muted);margin-bottom:16px;}
.v8 .footer-col li{margin-bottom:11px;}
.v8 .footer-col a{font-size:14.5px;color:var(--footer-link);}
.v8 .footer-col a:hover{color:var(--white);}
.v8 .footer-legal{display:flex;align-items:center;justify-content:space-between;margin-top:52px;padding-top:26px;border-top:1px solid var(--line-dark-2);font-family:var(--mono);font-size:12px;color:var(--muted);}
.v8 .footer-social{display:flex;gap:20px;}
.v8 .footer-social a:hover{color:var(--white);}

/* responsive */
@media (max-width:1024px){
  .v8{--pad-y:88px;--pad-y-sm:64px;}
  .v8 .sec-head{grid-template-columns:1fr;gap:18px;align-items:start;margin-bottom:40px;}
  .v8 .bento,.v8 .steps,.v8 .vert-grid{grid-template-columns:1fr 1fr;}
  .v8 .bento-card.span-2{grid-column:span 2;}
  .v8 .ent-pillars{grid-template-columns:1fr 1fr;}
  .v8 .mcp-grid,.v8 .feat-case,.v8 .quote-row{grid-template-columns:1fr;}
  .v8 .artifact-body{grid-template-columns:1fr;}
  .v8 .artifact-doc{border-right:0;border-bottom:1px solid var(--line-dark-2);}
  .v8 .storyboard{grid-template-columns:1fr;}
  .v8 .sb-arrow{transform:rotate(90deg);justify-self:center;}
  .v8 .fc-stats{grid-auto-flow:column;justify-content:space-between;}
}
@media (max-width:640px){
  .v8{--gutter:18px;--pad-y:64px;}
  .v8 .nav-links{display:none;}
  .v8 .bento,.v8 .steps,.v8 .collab-grid,.v8 .int-grid,.v8 .ent-pillars,.v8 .vert-grid{grid-template-columns:1fr;}
  .v8 .bento-card.span-2,.v8 .int-card:first-child{grid-column:span 1;}
  .v8 .band-inner{flex-direction:column;align-items:flex-start;gap:14px;}
  .v8 .fc-stats{grid-auto-flow:row;}
  .v8 .h1{font-size:40px;}
  .v8 .footer-grid{grid-template-columns:1fr 1fr;}
  .v8 .nav-right .nav-util{display:none;}
}
`;
