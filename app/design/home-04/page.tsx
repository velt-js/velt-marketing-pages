import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt | Add a pull request to your product",
  description:
    "Embeddable review and approval for AI-native apps. Comments, approval flows, review agents, memory, and audit trails in one SDK.",
};

/* ──────────────────────────────────────────────────────────────────────────
   home-04 — rebuilt on the NEW homepage stack (home-spec.md + home.html).

   Positioning: Velt is the embeddable review & approval layer for AI-native
   apps. Hero claim "Add a pull request to your product." Narrative follows the
   spec's 14-section flow: nav → hero → logo strip → problem checklist →
   qualifier band → solution turn → 7 primitives → collaboration grid →
   how it works (+MCP) → integrations → enterprise → verticals → FAQ →
   testimonials → final CTA → footer.

   Design language ported from home.html: Geist / Geist Mono, warm near-white
   canvas, velt indigo (#625df5) accent, green/red approve-reject semantics,
   dark indigo bands, mono "· KICKER" labels with a dot, code-comment Prevents,
   editor-chrome code blocks, oversized stat numerals, split section headers.

   All design CSS is scoped under `.vx` so nothing leaks into the global
   cascade. Mono uses the project's loaded Geist Mono (--font-geist-mono);
   sans uses a Geist/system-ui stack. Standalone RSC: no "use client", no
   hooks, no handlers, no external images; FAQ is native <details> so it works
   without JS. All visuals are inline SVG / CSS.
   ────────────────────────────────────────────────────────────────────────── */

// ── Content ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Features", "Customers", "Docs", "Pricing"];

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
  { ix: "STEP 01 · INSTALL", claim: "Add the SDK.", file: "terminal", lines: [["c", "# one package, every feature"], ["", "npm i @veltdev/react"]] },
  { ix: "STEP 02 · WRAP", claim: "Provide your app.", file: "_app.tsx", lines: [["", "<VeltProvider apiKey={KEY}>"], ["", "  <App />"], ["", "</VeltProvider>"]] },
  { ix: "STEP 03 · CONFIGURE", claim: "Mount the review surface.", file: "Invoice.tsx", lines: [["", "<VeltComments />"], ["", "<VeltPresence />"]] },
];

const MCP_TOOLS = ["Cursor", "Claude Code", "Windsurf", "Copilot", "Zed"];

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
  { q: "We shipped approval workflows our enterprise buyers had been asking for in a weekend, not a quarter.", who: "VP Engineering, Cofactr", fear: "build time" },
  { q: "The audit trail is the screenshot our champion forwards to their security team. It closes the room.", who: "Head of Product, OpenEnvoy", fear: "deal closed" },
  { q: "Our agents propose, humans approve. We launched AI features security would actually sign off on.", who: "CTO, Datarails", fear: "feature launched" },
];

const FOOTER = [
  { h: "Product", links: ["Comments", "Approval flows", "Review agents", "Suggestions", "Audit trail", "Memory", "Notifications"] },
  { h: "Collaboration", links: ["Presence", "Multiplayer editing", "Recording", "Huddle"] },
  { h: "Platform", links: ["Self-hosting", "Governance", "Pricing", "Docs"] },
  { h: "Company", links: ["Customers", "Blog", "Changelog", "Status"] },
];

// ── Tiny helpers ──────────────────────────────────────────────────────────────

function Avatar({ children, cls }: { children: string; cls: string }) {
  return <span className={`av-c ${cls}`} aria-hidden="true">{children}</span>;
}

/** Editor-chrome code block. lines: [syntaxClass, text][]. */
function Code({ file, lines, dark = false }: { file: string; lines: [string, string][]; dark?: boolean }) {
  return (
    <div className={`code ${dark ? "code-dark" : ""}`}>
      <div className="code-head">
        <span className="dots"><i /><i /><i /></span>
        <span className="file">{file}</span>
        <span className="copy">copy</span>
      </div>
      <div className="code-body">
        {lines.map(([k, text], i) => (
          <div key={i}>
            <span className="ln">{text === "" ? "" : i + 1}</span>
            <span className={k}>{text || " "}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomeReviewPage() {
  return (
    <div className="vx">
      <style>{CSS}</style>

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <div className="nav-wrap">
        <nav className="container nav" aria-label="Primary">
          <a href="#" className="nav-logo"><span className="mark" />Velt</a>
          <div className="nav-links">
            {NAV_LINKS.map((l) => <a key={l} href="#">{l}</a>)}
          </div>
          <div className="nav-right">
            <a href="#" className="btn btn-ghost btn-sm">Sign in</a>
            <a href="#" className="btn btn-primary btn-sm">Get Free API Key <span className="arrow">→</span></a>
          </div>
        </nav>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow"><span className="dot" /> SOC 2 Type II · HIPAA · EU data residency</span>
            <h1 className="h-display mt-16">Add a pull request to your product.</h1>
            <p className="lead mt-24">Embeddable review and approval for AI-native apps. Add governance to the work that can’t ship unapproved.</p>
            <div className="row-wrap mt-32">
              <a href="#" className="btn btn-primary">Get Free API Key <span className="arrow">→</span></a>
              <a href="#" className="btn btn-secondary">Book Demo</a>
            </div>
            <p className="mono micro mt-16">FREE TIER · NO CREDIT CARD · FIRST COMMENT IN 5 MINUTES</p>
            <div className="row-wrap chips mt-24">
              {FEATURE_STRIP.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>

          {/* hero visual: a non-code artifact mid-approval */}
          <div className="artifact" aria-label="A document mid-approval with an agent comment and approve button">
            <div className="artifact-bar">
              <span className="doc-ic" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 1.5h5L11.5 5v7.5H3z" /><path d="M8 1.5V5h3.5" /></svg>
              </span>
              <span className="t">Q3 Pricing One-Pager</span>
              <span className="spacer" />
              <span className="chip chip-approved">Approved</span>
            </div>
            <div className="artifact-body">
              <div className="artifact-doc">
                <span className="headline" />
                <span className="bar w90" /><span className="bar w80" />
                <span className="doc-cell flagged">
                  <span className="bar w70" />
                  <span className="pin" aria-hidden="true">1</span>
                </span>
                <span className="bar w95" /><span className="bar w60" />
              </div>
              <div className="artifact-rail">
                <div className="thread">
                  <div className="thread-head">
                    <Avatar cls="av-agent">AI</Avatar>
                    <span className="who">Review agent</span>
                    <span className="when">2m</span>
                  </div>
                  <p className="thread-body">Vendor rate is 12% over contract. Suggest correcting line 7.</p>
                  <div className="thread-actions">
                    <span className="btn btn-approve btn-sm">Approve</span>
                    <span className="btn btn-reject btn-sm">Reject</span>
                  </div>
                </div>
                <div className="webhook-toast"><span className="wh-dot" />POST /webhooks/velt · applied by Maya</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo strip ────────────────────────────────────────────────────── */}
      <section className="section-sm logos-sec">
        <div className="container">
          <p className="mono micro center">REVIEW AND APPROVAL RUNNING IN PRODUCTION</p>
          <div className="logo-row mt-24">
            {LOGOS.map((l) => <span key={l} className="logo">{l}</span>)}
          </div>
        </div>
      </section>

      {/* ── Problem checklist ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container narrow">
          <span className="eyebrow"><span className="dot" /> THE PROBLEM</span>
          <h2 className="sec-title mt-16">Your users need to review and approve what your product generates. Building that takes two quarters.</h2>
          <ul className="checklist mt-32">
            {PROBLEMS.map((p) => (
              <li key={p.text} className={`check ${p.on ? "on" : ""}`}>
                <span className="box" aria-hidden="true">{p.on ? "✓" : ""}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* qualifier band */}
      <div className="band">
        <div className="container">
          <span className="band-q">CHECK ALL THAT APPLY</span>
          <p className="band-text">If your product has work that more than one of your users reviews or approves, this is for you. If it doesn’t, it isn’t.</p>
        </div>
      </div>

      {/* ── Solution turn ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container solution-grid">
          <div>
            <span className="eyebrow accent"><span className="dot" /> WHY NOW</span>
            <p className="lead mt-16">Your users want agents that act. Nobody wants agents that act alone. The hard part is what happens between an agent’s suggestion and a change to your users’ data.</p>
            <h2 className="h-display sm mt-24">Let agents propose, not touch.</h2>
            <p className="lead mt-16">Every agent suggestion becomes a comment a human approves. On approve, the change is applied through your webhook, with a permanent record of who allowed what.</p>
            <p className="comment-line mt-24">// Stop giving agents write access just to offer agentic features.</p>
          </div>
          <div className="sb">
            <div className="sb-panel">
              <span className="sb-k">1 · AGENT PROPOSES</span>
              <div className="thread mini">
                <div className="thread-head"><Avatar cls="av-agent">AI</Avatar><span className="who">Review agent</span><span className="chip chip-agent">agent</span></div>
                <p className="thread-body">Vendor rate is 12% over contract. Suggest correcting line 7.</p>
              </div>
            </div>
            <span className="sb-arrow" aria-hidden="true">↓</span>
            <div className="sb-panel">
              <span className="sb-k">2 · HUMAN DECIDES</span>
              <div className="thread mini">
                <div className="thread-head"><Avatar cls="a2">MR</Avatar><span className="who">Maya Reyes</span><span className="when">approver</span></div>
                <div className="thread-actions"><span className="btn btn-approve btn-sm">Approve</span><span className="btn btn-reject btn-sm">Reject</span></div>
              </div>
            </div>
            <span className="sb-arrow" aria-hidden="true">↓</span>
            <div className="sb-panel">
              <span className="sb-k">3 · APPLIED VIA YOUR WEBHOOK</span>
              <div className="webhook-toast block">
                <div>POST /webhooks/velt</div>
                <div className="wh-audit">audit · Maya approved · 14:22 UTC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero primitives ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">Seven primitives. Any review workflow.</h2>
            <p className="sec-sub">Each ships as a React, Next.js, or Angular component plus a typed SDK. Compose the ones you need.</p>
          </div>
          <div className="prim-grid">
            {PRIMITIVES.map((p, i) => (
              <article key={p.name} className={`card prim-card ${i === 6 ? "span-2" : ""}`}>
                <div className="prim-head">
                  <span className="mono prim-ix">{p.no} · {p.name.toUpperCase()} <span className="prim-kick">// {p.kicker}</span></span>
                  <span className="feat-tabs"><button className="active">PREVIEW</button><button>CODE</button></span>
                </div>
                <h3 className="prim-title">{p.headline}</h3>
                <p className="prim-sub">{p.sub}</p>
                <div className="feat-surface">{primitiveVisual(p.name)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collaboration grid ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">Everything else your users expect.</h2>
            <p className="sec-sub">The multiplayer layer, included. Same SDK, no second vendor, no second contract.</p>
          </div>
          <div className="collab-grid">
            {COLLAB.map((c) => (
              <div key={c.name} className="collab-tile">
                <span className="ico" aria-hidden="true">{collabIcon(c.name)}</span>
                <span className="nm">{c.name}</span>
                <span className="ds">{c.copy}</span>
              </div>
            ))}
          </div>
          <a href="#" className="prim-link mt-24">See the full collaboration layer <span className="arr">→</span></a>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">Live in an afternoon.</h2>
            <p className="sec-sub">Install the SDK, wrap your app, mount a surface. Days, not quarters.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div key={s.ix} className="step-card">
                <span className="mono step-ix">{s.ix}</span>
                <p className="step-claim">{s.claim}</p>
                <Code file={s.file} lines={s.lines as [string, string][]} />
              </div>
            ))}
          </div>
          <p className="comment-line mt-24">// React, Next.js, Vue, Angular, and plain HTML. Turn features on one at a time.</p>

          {/* MCP banner */}
          <div className="mcp mt-32">
            <span className="eyebrow accent"><span className="dot" /> MCP · THE FASTER PATH</span>
            <div className="mcp-grid mt-16">
              <div>
                <h3 className="mcp-title">MCP: the faster path.</h3>
                <p className="mcp-sub">Skip the steps. Have your coding agent set it up.</p>
                <div className="mcp-tabs mt-16">
                  {MCP_TOOLS.map((t, i) => <button key={t} className={i === 0 ? "active" : ""}>{t}</button>)}
                </div>
              </div>
              <div className="mcp-cmd">
                <code>npx @veltdev/mcp init</code>
                <span className="copy">copy</span>
              </div>
            </div>
            <div className="mcp-caps mt-16">
              {["workspace provisioning", "framework detection", "component mounting", "auth scaffolding"].map((c) => (
                <span key={c} className="cap"><span className="cap-dot" />{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">Drops into the stack you already have.</h2>
            <p className="sec-sub">First-party integrations for editors, frameworks, canvas, and notifications. Works in any framework via web components.</p>
          </div>
          <div className="int-cats">
            {INTEGRATIONS.map((cat) => (
              <div key={cat.label} className="int-row">
                <span className="mono int-label">{cat.label}</span>
                <div className="int-chips">
                  {cat.items.map((it) => <span key={it} className="chip">{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise (dark) ─────────────────────────────────────────────── */}
      <section className="ent">
        <div className="container">
          <div className="sec-head ent-head">
            <h2 className="sec-title light">Built for your customers’ compliance.</h2>
            <p className="sec-sub light">The screenshot your champion forwards to their security team. Deployment, reliability, residency, and the certifications enterprise buyers ask for.</p>
          </div>
          <div className="ent-pillars">
            <div className="ent-pillar">
              <span className="ix">DEPLOYMENT</span>
              <span className="lbl">Runs on your infrastructure</span>
              <div className="prov-chips">
                <span>comments → your database</span>
                <span>recordings → your S3 bucket</span>
                <span>user PII → never leaves</span>
              </div>
              <a href="#" className="pillar-foot">velt.dev/self-hosting</a>
            </div>
            <div className="ent-pillar">
              <span className="ix">RELIABILITY</span>
              <span className="lbl">Enterprise SLA</span>
              <span className="ds">Trailing-90-day uptime, published on the status page.</span>
              <div className="uptime" aria-hidden="true">{Array.from({ length: 28 }).map((_, i) => <i key={i} className={i === 11 ? "dip" : ""} />)}</div>
              <a href="#" className="pillar-foot">View status</a>
            </div>
            <div className="ent-pillar">
              <span className="ix">GLOBAL</span>
              <span className="lbl">Multi-region residency</span>
              <span className="ds">Pin data to a region. <b>us-east, eu-west, ap-south.</b></span>
              <a href="#" className="pillar-foot">Data residency</a>
            </div>
            <div className="ent-pillar">
              <span className="ix">COMPLIANCE</span>
              <span className="stat">SOC 2<span className="unit">Type II</span></span>
              <span className="ds"><b>HIPAA</b> with BAA. Report under NDA. Pen-tested.</span>
              <a href="#" className="pillar-foot">Governance</a>
            </div>
          </div>
          <div className="row-wrap mt-32">
            <a href="#" className="btn btn-on-dark">Talk to Sales</a>
            <a href="#" className="btn btn-ghost-dark">Governance <span className="arrow">→</span></a>
          </div>
        </div>
      </section>

      {/* ── Verticals ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">Built for work that can’t ship unapproved.</h2>
            <p className="sec-sub">Review and approval, tuned to the artifacts your industry signs off on.</p>
          </div>
          <div className="vert-grid">
            {VERTICALS.map((v) => (
              <a key={v.label} href={v.href} className="card card-pad vert-tile">
                <span className="vert-name">{v.label}</span>
                <span className="vert-ds">{v.copy}</span>
                <span className="prim-link mt-16">{v.href} <span className="arr">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container narrow">
          <div className="sec-head one">
            <h2 className="sec-title">Questions buyers ask in the first meeting.</h2>
          </div>
          <div className="faq">
            {FAQ.map((f, i) => (
              <details key={f.q} className="faq-item" open={i === 0}>
                <summary className="q"><span className="mono num">{String(i + 1).padStart(2, "0")}</span><span className="q-text">{f.q}</span></summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">Real teams. Real metrics. Real names.</h2>
            <p className="sec-sub">One featured case study, three customer quotes, and the rest of the customer base.</p>
          </div>

          <div className="card feat-case">
            <div className="fc-left">
              <span className="chip">OpenEnvoy</span>
              <span className="mono fc-tag mt-16">FEATURED · ANCHOR CUSTOMER</span>
              <h3 className="fc-headline mt-16">Audit-ready review on every invoice, shipped in a weekend.</h3>
              <p className="fc-body mt-16">OpenEnvoy embedded comments, approval flows, and an immutable audit trail without standing up a review backend, then passed security review on the deployment model.</p>
              <div className="fc-person mt-24"><Avatar cls="a3">RG</Avatar><span><b>Rachel Gomez</b><span className="role">Head of Product, OpenEnvoy</span></span></div>
              <a href="#" className="prim-link mt-24">Read the case study <span className="arr">→</span></a>
            </div>
            <div className="fc-stats">
              {[["weekend", "to first approval flow"], ["100%", "of actions audited"], ["1", "vendor, not three"]].map(([v, l]) => (
                <div key={l} className="fc-stat"><span className="fc-num">{v}</span><span className="fc-lbl">{l}</span></div>
              ))}
            </div>
          </div>

          <div className="quote-row mt-24">
            {QUOTES.map((qt) => (
              <figure key={qt.who} className="card card-pad quote">
                <q>{qt.q}</q>
                <figcaption className="quote-meta">{qt.who}</figcaption>
              </figure>
            ))}
          </div>
          <div className="logo-row demoted mt-32">
            {LOGOS.map((l) => <span key={l} className="logo">{l}</span>)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="final-cta">
        <div className="container">
          <h2 className="h-display">Add comments and approvals to your product this weekend.</h2>
          <p className="lead mt-24">Embeddable review and approval for AI-native apps. Free tier, no credit card, first comment in five minutes.</p>
          <div className="row-wrap mt-32">
            <a href="#" className="btn btn-primary">Get Free API Key <span className="arrow">→</span></a>
            <a href="#" className="btn btn-secondary">Book Demo</a>
          </div>
          <p className="founder">Or talk to <a href="#">Rakesh, the founder</a>.</p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#" className="nav-logo"><span className="mark" />Velt</a>
            <p className="footer-tag mt-16">Embeddable review and approval for AI-native apps.</p>
            <span className="chip mt-16">SOC 2 Type II</span>
          </div>
          {FOOTER.map((col) => (
            <div key={col.h} className="footer-col">
              <h4 className="mono footer-h">{col.h}</h4>
              <ul>{col.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="container footer-legal">
          <span className="mono">© 2026 Velt</span>
          <div className="footer-social"><a href="#">GitHub</a><a href="#">LinkedIn</a><a href="#">X</a></div>
        </div>
      </footer>
    </div>
  );
}

// ── Per-primitive preview visuals (clean, representative product art) ─────────

function primitiveVisual(name: string) {
  switch (name) {
    case "Comments":
      return (
        <div className="pv pv-comments">
          <div className="cmt"><span className="av-c a1">JD</span><div><b>Jules Dean</b><p>Can we ship this section by Friday?</p></div></div>
          <div className="cmt reply"><span className="av-c a2">MR</span><div><b>Maya Reyes</b><p>On it. 🚀</p></div></div>
        </div>
      );
    case "Approval flows":
      return (
        <div className="pv pv-dag">
          <span className="node agent">Agent</span><span className="edge" />
          <span className="node">Reviewer</span><span className="edge" />
          <span className="node">Exec</span><span className="node ok">Approved</span>
        </div>
      );
    case "Review agents":
      return (
        <div className="pv">
          <div className="thread mini"><div className="thread-head"><span className="av-c av-agent">AI</span><span className="who">Review agent</span><span className="chip chip-pending">flagged</span></div><p className="thread-body">3 issues found. 1 suggested fix.</p></div>
        </div>
      );
    case "Suggestions":
      return (
        <div className="pv pv-diff">
          <div className="diff del">- vendor rate 14%</div>
          <div className="diff add">+ vendor rate 12%</div>
          <div className="thread-actions mt-8"><span className="btn btn-approve btn-sm">Accept</span><span className="btn btn-reject btn-sm">Reject</span></div>
        </div>
      );
    case "Audit trail":
      return (
        <div className="pv pv-audit">
          {["Maya approved · 14:22", "Agent flagged · 14:19", "Jules commented · 14:02"].map((r) => <div key={r} className="audit-row"><span className="audit-dot" />{r}</div>)}
        </div>
      );
    case "Memory":
      return (
        <div className="pv">
          <div className="mem"><span className="chip chip-approved">precedent</span><p>Last 9 invoices over contract were corrected. Suggest the same.</p></div>
        </div>
      );
    case "Notifications":
      return (
        <div className="pv pv-notif">
          {[["In-app", "a1"], ["Slack", "a3"], ["Email", "a2"]].map(([ch, c]) => (
            <div key={ch} className="notif"><span className={`av-c ${c}`}>•</span><span>Review requested</span><span className="mono notif-ch">{ch}</span></div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function collabIcon(name: string) {
  const common = { width: 22, height: 22, viewBox: "0 0 22 22", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "Presence": return <svg {...common}><circle cx="8" cy="8" r="3" /><circle cx="14" cy="8" r="3" /><path d="M3 18c.7-2.6 2.6-4 5-4M19 18c-.7-2.6-2.6-4-5-4" /></svg>;
    case "Multiplayer editing": return <svg {...common}><path d="M4 14.5 13 5.5l3 3-9 9H4z" /><path d="M11.5 7.5l3 3" /></svg>;
    case "Recording": return <svg {...common}><rect x="3" y="6" width="11" height="10" rx="2" /><path d="M14 10l5-3v8l-5-3z" /></svg>;
    case "Huddle": return <svg {...common}><rect x="8" y="3" width="6" height="10" rx="3" /><path d="M5 10a6 6 0 0 0 12 0M11 16v3" /></svg>;
    default: return null;
  }
}

// ── Scoped design system (ported from home.html) ──────────────────────────────

const CSS = `
.vx {
  --accent:#625df5; --accent-hover:#534fcf; --accent-soft:#f2f2fe; --accent-border:#c9c6f9;
  --font-sans:"Geist","Inter Tight",system-ui,-apple-system,BlinkMacSystemFont,sans-serif;
  --font-mono:var(--font-geist-mono),"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace;
  --bg:oklch(0.987 0.002 250); --surface:#fff; --surface-2:oklch(0.975 0.003 250);
  --fg:oklch(0.18 0.006 250); --fg-2:oklch(0.42 0.008 250); --fg-3:oklch(0.62 0.006 250); --fg-4:oklch(0.78 0.004 250);
  --border:oklch(0.92 0.004 250); --border-strong:oklch(0.85 0.005 250); --ink:oklch(0.13 0.008 250);
  --line:oklch(0.91 0.006 280); --line-soft:oklch(0.945 0.004 280);
  --dark:oklch(0.185 0.03 277); --dark-2:oklch(0.235 0.04 277); --dark-line:oklch(0.32 0.04 277); --dark-muted:oklch(0.70 0.03 277);
  --approve:oklch(0.56 0.145 155); --approve-soft:oklch(0.955 0.04 155); --reject:oklch(0.55 0.19 25); --reject-soft:oklch(0.96 0.025 25);
  --amber:oklch(0.72 0.15 75); --amber-soft:oklch(0.96 0.045 85); --faint:oklch(0.68 0.015 280); --muted:oklch(0.52 0.02 280);
  --code-bg:oklch(0.975 0.003 250); --code-fg:oklch(0.22 0.008 250);
  --syn-keyword:oklch(0.50 0.18 290); --syn-string:oklch(0.48 0.13 145); --syn-comment:oklch(0.62 0.006 250);
  --r-sm:8px; --r-md:10px; --r-lg:14px; --maxw:1240px; --gutter:24px; --pad-y:96px; --pad-y-sm:56px;
  --shadow-sm:0 1px 2px oklch(0.2 0.02 280/0.06),0 1px 1px oklch(0.2 0.02 280/0.04);
  --shadow-lg:0 2px 4px oklch(0.2 0.02 280/0.05),0 24px 56px -16px oklch(0.25 0.05 277/0.22);
  font-family:var(--font-sans); color:var(--fg); background:var(--bg); -webkit-font-smoothing:antialiased; line-height:1.5;
}
.vx *,.vx *::before,.vx *::after{box-sizing:border-box;}
.vx h1,.vx h2,.vx h3,.vx h4,.vx p,.vx ul,.vx figure{margin:0;}
.vx ul{list-style:none;padding:0;}
.vx a{color:inherit;text-decoration:none;}
.vx q{quotes:"\\201C" "\\201D";}
.vx .container{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
.vx .narrow{max-width:820px;}
.vx .section{padding:var(--pad-y) 0;border-top:1px solid var(--border);}
.vx .section-sm{padding:var(--pad-y-sm) 0;border-top:1px solid var(--border);}
.vx .mt-8{margin-top:8px;} .vx .mt-16{margin-top:16px;} .vx .mt-24{margin-top:24px;} .vx .mt-32{margin-top:32px;}
.vx .row-wrap{display:flex;flex-wrap:wrap;align-items:center;gap:14px;}
.vx .center{text-align:center;}

/* type */
.vx .h-display{font-size:clamp(38px,5.2vw,64px);line-height:1.02;letter-spacing:-0.035em;font-weight:500;}
.vx .h-display.sm{font-size:clamp(30px,3.6vw,46px);}
.vx .lead{font-size:18px;line-height:1.55;color:var(--fg-2);max-width:60ch;}
.vx .mono{font-family:var(--font-mono);}
.vx .micro{font-size:11px;color:var(--fg-3);letter-spacing:0.04em;}
.vx .eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--fg-3);display:inline-flex;align-items:center;gap:8px;}
.vx .eyebrow.accent{color:var(--accent);}
.vx .eyebrow .dot{width:6px;height:6px;background:var(--accent);border-radius:50%;}
.vx .comment-line{font-family:var(--font-mono);font-size:13px;color:var(--accent);}

/* buttons */
.vx .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:7px;font-size:14px;font-weight:500;border:1px solid transparent;font-family:var(--font-sans);transition:background .12s,color .12s,border-color .12s;white-space:nowrap;cursor:pointer;}
.vx .btn-sm{padding:6px 11px;font-size:13px;}
.vx .btn-primary{background:var(--ink);color:var(--bg);}
.vx .btn-primary:hover{background:var(--accent);color:#fff;}
.vx .btn-secondary{background:var(--surface);color:var(--fg);border-color:var(--border-strong);}
.vx .btn-secondary:hover{border-color:var(--ink);color:var(--ink);}
.vx .btn-ghost{color:var(--fg-2);}
.vx .btn-ghost:hover{color:var(--ink);}
.vx .btn .arrow{font-family:var(--font-mono);}
.vx .btn-approve{background:var(--approve-soft);color:oklch(0.42 0.12 155);border-color:transparent;}
.vx .btn-reject{background:var(--reject-soft);color:oklch(0.45 0.15 25);border-color:transparent;}
.vx .btn-on-dark{background:#fff;color:var(--ink);}
.vx .btn-on-dark:hover{background:var(--accent);color:#fff;}
.vx .btn-ghost-dark{color:#fff;border-color:rgba(255,255,255,0.25);}
.vx .btn-ghost-dark:hover{border-color:#fff;}

/* chips */
.vx .chip{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border:1px solid var(--border);border-radius:999px;font-family:var(--font-mono);font-size:11px;color:var(--fg-2);background:var(--surface);white-space:nowrap;}
.vx .chip-agent{background:var(--accent-soft);color:var(--accent-hover);border-color:transparent;}
.vx .chip-pending{background:var(--amber-soft);color:oklch(0.50 0.11 75);border-color:transparent;}
.vx .chip-approved{background:var(--approve-soft);color:oklch(0.42 0.12 155);border-color:transparent;}

/* nav */
.vx .nav-wrap{position:sticky;top:0;z-index:50;background:rgba(252,252,252,0.85);backdrop-filter:saturate(180%) blur(10px);border-bottom:1px solid var(--border);}
.vx .nav{display:flex;align-items:center;height:56px;gap:32px;}
.vx .nav-logo{display:inline-flex;align-items:center;gap:8px;font-weight:600;letter-spacing:-0.01em;color:var(--ink);}
.vx .nav-logo .mark{width:22px;height:22px;background:var(--ink);position:relative;}
.vx .nav-logo .mark::after{content:"";position:absolute;inset:5px;background:var(--accent);}
.vx .nav-links{display:flex;gap:22px;font-size:14px;color:var(--fg-2);}
.vx .nav-links a:hover{color:var(--ink);}
.vx .nav-right{margin-left:auto;display:flex;align-items:center;gap:12px;}

/* section header */
.vx .sec-head{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:48px;}
.vx .sec-head.one{grid-template-columns:1fr;}
.vx .sec-title{font-size:clamp(28px,3vw,40px);line-height:1.08;letter-spacing:-0.03em;max-width:24ch;font-weight:500;}
.vx .sec-sub{font-size:16px;color:var(--fg-2);max-width:50ch;}
.vx .sec-title.light,.vx .sec-sub.light{color:#fff;}
.vx .sec-sub.light{color:rgba(255,255,255,0.7);}

/* cards */
.vx .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);}
.vx .card-pad{padding:24px;}

/* hero */
.vx .hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:48px;align-items:center;}
.vx .chips{gap:8px;}
.vx .artifact{border:1px solid var(--line);border-radius:var(--r-lg);background:var(--bg);box-shadow:var(--shadow-lg);overflow:hidden;}
.vx .artifact-bar{display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--line-soft);background:var(--surface-2);}
.vx .artifact-bar .doc-ic{width:26px;height:26px;border-radius:7px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex:none;}
.vx .artifact-bar .t{font-size:13.5px;font-weight:550;color:var(--ink);}
.vx .artifact-bar .spacer{flex:1;}
.vx .artifact-body{display:grid;grid-template-columns:1fr 248px;min-height:340px;}
.vx .artifact-doc{padding:26px;border-right:1px solid var(--line-soft);display:grid;gap:14px;align-content:start;}
.vx .artifact-doc .headline{height:14px;width:62%;border-radius:5px;background:oklch(0.85 0.01 280);}
.vx .artifact-doc .bar{height:10px;border-radius:5px;background:oklch(0.93 0.005 280);}
.vx .bar.w95{width:95%;} .vx .bar.w90{width:90%;} .vx .bar.w80{width:80%;} .vx .bar.w70{width:70%;} .vx .bar.w60{width:60%;}
.vx .doc-cell{position:relative;border-radius:6px;padding:6px 8px;margin:-2px 0;display:flex;}
.vx .doc-cell.flagged{background:var(--approve-soft);}
.vx .doc-cell .pin{position:absolute;right:-10px;top:-10px;width:22px;height:22px;border-radius:50% 50% 50% 2px;background:var(--accent);color:#fff;font-size:10px;font-family:var(--font-mono);display:grid;place-items:center;}
.vx .artifact-rail{padding:16px;display:grid;gap:12px;align-content:start;}
.vx .thread{border:1px solid var(--line);border-radius:var(--r-md);background:var(--bg);box-shadow:var(--shadow-sm);padding:13px 14px;display:grid;gap:10px;}
.vx .thread.mini{box-shadow:none;}
.vx .thread-head{display:flex;align-items:center;gap:9px;}
.vx .thread-head .who{font-size:12.5px;font-weight:600;}
.vx .thread-head .when{font-size:11px;color:var(--faint);margin-left:auto;}
.vx .thread-body{font-size:12.5px;line-height:1.5;color:var(--fg);}
.vx .thread-actions{display:flex;gap:8px;}
.vx .av-c{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:600;color:#fff;flex:none;font-family:var(--font-mono);}
.vx .av-c.a1{background:oklch(0.62 0.14 250);} .vx .av-c.a2{background:oklch(0.60 0.13 35);} .vx .av-c.a3{background:oklch(0.58 0.12 155);}
.vx .av-c.av-agent{background:var(--dark);border:1.5px solid var(--accent);color:oklch(0.85 0.09 276);}
.vx .webhook-toast{display:flex;align-items:center;gap:9px;border:1px solid var(--dark-line);border-radius:10px;background:var(--dark);color:oklch(0.88 0.02 277);padding:9px 13px;font-family:var(--font-mono);font-size:11px;}
.vx .webhook-toast.block{display:block;}
.vx .webhook-toast .wh-dot{width:7px;height:7px;border-radius:50%;background:var(--approve);}
.vx .webhook-toast .wh-audit{color:var(--dark-muted);margin-top:4px;}

/* logo strips */
.vx .logos-sec{border-top:1px solid var(--border);}
.vx .logo-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:18px 40px;}
.vx .logo{font-size:19px;font-weight:600;letter-spacing:-0.02em;color:var(--fg-4);}
.vx .logo-row.demoted .logo{font-size:16px;}

/* problem checklist */
.vx .checklist{display:grid;gap:14px;max-width:60ch;}
.vx .check{display:grid;grid-template-columns:24px 1fr;gap:14px;align-items:start;font-size:18px;color:var(--fg-2);}
.vx .check .box{width:22px;height:22px;border-radius:6px;border:1.5px solid var(--border-strong);display:grid;place-items:center;font-size:13px;color:#fff;margin-top:2px;}
.vx .check.on{color:var(--ink);}
.vx .check.on .box{background:var(--accent);border-color:var(--accent);}

/* band */
.vx .band{background:var(--ink);color:#fff;padding:36px 0;}
.vx .band .container{display:flex;align-items:center;gap:32px;}
.vx .band-q{font-family:var(--font-mono);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);white-space:nowrap;}
.vx .band-text{font-size:18px;letter-spacing:-0.015em;color:#fff;flex:1;}

/* solution */
.vx .solution-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
.vx .sb{display:grid;gap:8px;justify-items:stretch;}
.vx .sb-panel{border:1px solid var(--border);border-radius:var(--r-md);background:var(--surface);padding:16px;display:grid;gap:10px;}
.vx .sb-k{font-family:var(--font-mono);font-size:10px;letter-spacing:0.06em;color:var(--fg-3);}
.vx .sb-arrow{justify-self:center;color:var(--fg-4);font-family:var(--font-mono);}

/* primitives */
.vx .prim-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.vx .prim-card{padding:24px;display:flex;flex-direction:column;gap:12px;}
.vx .prim-card.span-2{grid-column:span 2;}
.vx .prim-head{display:flex;align-items:center;justify-content:space-between;gap:12px;}
.vx .prim-ix{font-size:11px;letter-spacing:0.04em;color:var(--fg-2);}
.vx .prim-kick{color:var(--fg-3);}
.vx .prim-title{font-size:20px;line-height:1.22;letter-spacing:-0.02em;font-weight:500;max-width:30ch;}
.vx .prim-sub{font-size:14px;color:var(--fg-2);}
.vx .feat-tabs{display:inline-flex;padding:3px;border:1px solid var(--border);border-radius:6px;background:var(--surface-2);flex:none;}
.vx .feat-tabs button{padding:4px 9px;border:0;background:transparent;font-family:var(--font-mono);font-size:10px;letter-spacing:0.06em;color:var(--fg-3);border-radius:4px;cursor:pointer;}
.vx .feat-tabs button.active{background:var(--ink);color:var(--bg);}
.vx .feat-surface{margin-top:auto;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-sm);padding:18px;min-height:128px;display:flex;align-items:center;}
.vx .pv{width:100%;display:grid;gap:10px;}
.vx .pv .cmt{display:flex;gap:9px;align-items:flex-start;}
.vx .pv .cmt.reply{margin-left:18px;}
.vx .pv .cmt b{font-size:12px;} .vx .pv .cmt p{font-size:12px;color:var(--fg-2);}
.vx .pv-dag{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.vx .pv-dag .node{font-family:var(--font-mono);font-size:11px;padding:5px 9px;border:1px solid var(--border);border-radius:6px;background:#fff;}
.vx .pv-dag .node.agent{border-color:var(--accent-border);background:var(--accent-soft);color:var(--accent-hover);}
.vx .pv-dag .node.ok{background:var(--approve-soft);color:oklch(0.42 0.12 155);border-color:transparent;}
.vx .pv-dag .edge{width:14px;height:1px;background:var(--border-strong);}
.vx .pv-diff .diff{font-family:var(--font-mono);font-size:12px;padding:4px 8px;border-radius:4px;}
.vx .pv-diff .diff.del{background:var(--reject-soft);color:oklch(0.45 0.15 25);}
.vx .pv-diff .diff.add{background:var(--approve-soft);color:oklch(0.42 0.12 155);}
.vx .pv-audit .audit-row,.vx .pv-notif .notif{display:flex;align-items:center;gap:9px;font-family:var(--font-mono);font-size:11.5px;color:var(--fg-2);}
.vx .pv-audit .audit-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);}
.vx .pv .mem{display:grid;gap:8px;} .vx .pv .mem p{font-size:12px;color:var(--fg-2);}
.vx .pv-notif .notif-ch{margin-left:auto;color:var(--fg-3);}
.vx .mt-8{margin-top:8px;}

/* collaboration */
.vx .collab-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--border);border-radius:var(--r-sm);overflow:hidden;background:var(--surface);}
.vx .collab-tile{padding:28px 26px;border-right:1px solid var(--border);border-bottom:1px solid var(--border);display:flex;flex-direction:column;gap:10px;}
.vx .collab-tile:nth-child(2n){border-right:0;}
.vx .collab-tile:nth-last-child(-n+2){border-bottom:0;}
.vx .collab-tile .ico{color:var(--accent);}
.vx .collab-tile .nm{font-size:18px;letter-spacing:-0.02em;font-weight:500;}
.vx .collab-tile .ds{font-size:13.5px;color:var(--fg-2);line-height:1.55;max-width:36ch;}
.vx .prim-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:12px;color:var(--accent);}
.vx .prim-link:hover{color:var(--accent-hover);}

/* code */
.vx .code{font-family:var(--font-mono);font-size:13px;line-height:1.65;background:var(--code-bg);border:1px solid var(--border);border-radius:var(--r-sm);overflow:hidden;color:var(--code-fg);}
.vx .code-head{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid var(--border);background:var(--surface);}
.vx .code-head .dots{display:inline-flex;gap:5px;}
.vx .code-head .dots i{width:9px;height:9px;border-radius:50%;background:var(--border-strong);display:inline-block;}
.vx .code-head .file{font-size:12px;color:var(--fg-3);}
.vx .code-head .copy{margin-left:auto;font-size:11px;color:var(--fg-3);border:1px solid var(--border);padding:2px 8px;border-radius:4px;}
.vx .code-body{padding:14px 16px;overflow-x:auto;white-space:pre;}
.vx .code-body .ln{color:var(--fg-4);padding-right:14px;user-select:none;display:inline-block;width:18px;text-align:right;}
.vx .code-body .c{color:var(--syn-comment);}
.vx .code-body .k{color:var(--syn-keyword);}

/* steps */
.vx .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.vx .step-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:22px;display:grid;gap:14px;align-content:start;}
.vx .step-ix{font-size:10px;letter-spacing:0.06em;color:var(--accent);}
.vx .step-claim{font-size:18px;letter-spacing:-0.02em;font-weight:500;}

/* mcp */
.vx .mcp{background:var(--dark);border-radius:var(--r-lg);padding:32px;color:#fff;}
.vx .mcp-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;}
.vx .mcp-title{font-size:24px;letter-spacing:-0.02em;font-weight:500;}
.vx .mcp-sub{color:var(--dark-muted);font-size:15px;margin-top:6px;}
.vx .mcp-tabs{display:inline-flex;flex-wrap:wrap;gap:4px;padding:4px;border:1px solid var(--dark-line);border-radius:8px;background:var(--dark-2);}
.vx .mcp-tabs button{padding:5px 11px;border:0;background:transparent;color:var(--dark-muted);font-family:var(--font-mono);font-size:11px;border-radius:5px;cursor:pointer;}
.vx .mcp-tabs button.active{background:var(--dark);color:#fff;border:1px solid var(--dark-line);}
.vx .mcp-cmd{display:flex;align-items:center;gap:12px;background:#000;border:1px solid var(--dark-line);border-radius:8px;padding:14px 16px;font-family:var(--font-mono);font-size:13px;color:oklch(0.88 0.02 277);}
.vx .mcp-cmd .copy{margin-left:auto;color:var(--dark-muted);font-size:11px;}
.vx .mcp-caps{display:flex;flex-wrap:wrap;gap:16px;}
.vx .mcp-caps .cap{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-mono);font-size:11px;color:var(--dark-muted);}
.vx .mcp-caps .cap-dot{width:5px;height:5px;border-radius:50%;background:var(--approve);}

/* integrations */
.vx .int-cats{display:grid;gap:18px;}
.vx .int-row{display:grid;grid-template-columns:160px 1fr;gap:18px;align-items:start;padding-bottom:18px;border-bottom:1px solid var(--border);}
.vx .int-row:last-child{border-bottom:0;}
.vx .int-label{font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--fg-3);padding-top:5px;}
.vx .int-chips{display:flex;flex-wrap:wrap;gap:8px;}

/* enterprise */
.vx .ent{background:var(--dark);color:#fff;padding:var(--pad-y) 0;border-top:1px solid var(--ink);}
.vx .ent-head{align-items:start;}
.vx .ent-pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.vx .ent-pillar{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:var(--r-md);padding:24px;display:flex;flex-direction:column;gap:12px;min-height:230px;}
.vx .ent-pillar .ix{font-family:var(--font-mono);font-size:10px;color:var(--accent);letter-spacing:0.08em;}
.vx .ent-pillar .stat{font-size:clamp(30px,3vw,42px);line-height:1;letter-spacing:-0.035em;font-weight:500;}
.vx .ent-pillar .stat .unit{font-size:13px;font-family:var(--font-mono);color:rgba(255,255,255,0.5);margin-left:8px;}
.vx .ent-pillar .lbl{font-size:16px;letter-spacing:-0.015em;font-weight:500;}
.vx .ent-pillar .ds{font-size:12.5px;color:rgba(255,255,255,0.65);line-height:1.55;}
.vx .ent-pillar .ds b{color:#fff;font-weight:500;}
.vx .prov-chips{display:grid;gap:6px;}
.vx .prov-chips span{font-family:var(--font-mono);font-size:11px;color:rgba(255,255,255,0.8);background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:5px 9px;}
.vx .uptime{display:flex;gap:2px;align-items:flex-end;height:26px;}
.vx .uptime i{flex:1;height:100%;background:var(--approve);border-radius:1px;opacity:0.8;}
.vx .uptime i.dip{height:55%;background:var(--amber);}
.vx .ent-pillar .pillar-foot{margin-top:auto;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08);font-family:var(--font-mono);font-size:11px;color:rgba(255,255,255,0.7);}
.vx .ent-pillar .pillar-foot:hover{color:var(--accent);}

/* verticals */
.vx .vert-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.vx .vert-tile{display:flex;flex-direction:column;gap:10px;transition:border-color .12s;}
.vx .vert-tile:hover{border-color:var(--border-strong);}
.vx .vert-name{font-size:18px;letter-spacing:-0.02em;font-weight:500;}
.vx .vert-ds{font-size:14px;color:var(--fg-2);line-height:1.5;flex:1;}

/* faq */
.vx .faq{border-bottom:1px solid var(--border);}
.vx .faq-item{border-top:1px solid var(--border);padding:20px 0;}
.vx .faq-item .q{display:grid;grid-template-columns:32px 1fr auto;gap:14px;align-items:center;font-size:17px;color:var(--ink);letter-spacing:-0.01em;cursor:pointer;list-style:none;}
.vx .faq-item .q::-webkit-details-marker{display:none;}
.vx .faq-item .q .num{font-size:11px;color:var(--fg-3);}
.vx .faq-item .q::after{content:"+";font-family:var(--font-mono);color:var(--fg-3);font-size:18px;}
.vx .faq-item[open] .q::after{content:"\\2212";}
.vx .faq-item .a{margin:12px 0 0 46px;color:var(--fg-2);max-width:74ch;font-size:15px;line-height:1.6;}

/* testimonials */
.vx .feat-case{display:grid;grid-template-columns:1.2fr 1fr;gap:0;overflow:hidden;}
.vx .fc-left{padding:36px;}
.vx .fc-tag{font-size:10px;letter-spacing:0.08em;color:var(--accent);display:block;}
.vx .fc-headline{font-size:24px;line-height:1.2;letter-spacing:-0.02em;font-weight:500;max-width:24ch;}
.vx .fc-body{font-size:15px;color:var(--fg-2);line-height:1.55;max-width:46ch;}
.vx .fc-person{display:flex;align-items:center;gap:10px;font-size:13px;}
.vx .fc-person b{display:block;} .vx .fc-person .role{color:var(--fg-3);font-size:12px;}
.vx .fc-stats{background:var(--dark);color:#fff;padding:36px;display:grid;align-content:center;gap:24px;}
.vx .fc-stat .fc-num{font-size:34px;letter-spacing:-0.03em;font-weight:500;display:block;}
.vx .fc-stat .fc-lbl{font-family:var(--font-mono);font-size:11px;color:var(--dark-muted);}
.vx .quote-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.vx .quote{border-left:2px solid var(--accent);}
.vx .quote q{font-size:15px;color:var(--fg);line-height:1.5;}
.vx .quote-meta{margin-top:12px;font-family:var(--font-mono);font-size:11px;color:var(--fg-3);}

/* final cta */
.vx .final-cta{background:var(--ink);color:#fff;padding:var(--pad-y) 0;position:relative;overflow:hidden;}
.vx .final-cta::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:28px 28px;}
.vx .final-cta .container{position:relative;}
.vx .final-cta .h-display{color:#fff;max-width:18ch;}
.vx .final-cta .lead{color:rgba(255,255,255,0.7);}
.vx .final-cta .btn-primary{background:#fff;color:var(--ink);}
.vx .final-cta .btn-primary:hover{background:var(--accent);color:#fff;}
.vx .final-cta .btn-secondary{background:transparent;color:#fff;border-color:rgba(255,255,255,0.25);}
.vx .final-cta .founder{font-family:var(--font-mono);font-size:12px;color:rgba(255,255,255,0.5);margin-top:18px;}
.vx .final-cta .founder a{color:var(--accent);border-bottom:1px solid currentColor;}

/* footer */
.vx .footer{background:var(--surface);border-top:1px solid var(--border);padding:64px 0 40px;}
.vx .footer-grid{display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:32px;}
.vx .footer-tag{font-size:14px;color:var(--fg-3);max-width:30ch;}
.vx .footer-h{font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--fg-3);margin-bottom:14px;}
.vx .footer-col li{margin-bottom:10px;}
.vx .footer-col a{font-size:14px;color:var(--fg-2);}
.vx .footer-col a:hover{color:var(--ink);}
.vx .footer-legal{display:flex;align-items:center;justify-content:space-between;margin-top:48px;padding-top:24px;border-top:1px solid var(--border);font-size:12px;color:var(--fg-3);}
.vx .footer-social{display:flex;gap:18px;}
.vx .footer-social a:hover{color:var(--ink);}

/* responsive */
@media (max-width:1024px){
  .vx{--pad-y:72px;}
  .vx .hero-grid,.vx .solution-grid,.vx .mcp-grid,.vx .feat-case{grid-template-columns:1fr;gap:36px;}
  .vx .sec-head{grid-template-columns:1fr;gap:16px;align-items:start;margin-bottom:36px;}
  .vx .ent-pillars{grid-template-columns:1fr 1fr;}
  .vx .vert-grid{grid-template-columns:1fr 1fr;}
  .vx .quote-row{grid-template-columns:1fr;}
  .vx .fc-stats{flex-direction:row;}
}
@media (max-width:640px){
  .vx{--gutter:18px;--pad-y:56px;}
  .vx .prim-grid,.vx .steps,.vx .collab-grid,.vx .ent-pillars,.vx .vert-grid{grid-template-columns:1fr;}
  .vx .prim-card.span-2{grid-column:span 1;}
  .vx .collab-tile{border-right:0;}
  .vx .collab-tile:nth-last-child(2){border-bottom:1px solid var(--border);}
  .vx .band .container{flex-direction:column;align-items:flex-start;gap:12px;}
  .vx .int-row{grid-template-columns:1fr;gap:10px;}
  .vx .artifact-body{grid-template-columns:1fr;}
  .vx .artifact-doc{border-right:0;border-bottom:1px solid var(--line-soft);}
  .vx .nav-links{display:none;}
  .vx .footer-grid{grid-template-columns:1fr 1fr;}
}
`;
