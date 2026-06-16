"use client";
import "./Faq.css";

import { useState } from "react";

const FAQS: { num: string; q: string; a: string }[] = [
  {
    num: "01",
    q: "How is Velt different from Liveblocks?",
    a: "Liveblocks is realtime collaboration infrastructure focused on engagement: sync, presence, and AI copilots that act on app state. Velt is review and approval infrastructure focused on control: approval workflows, review agents, audit trails, and memory, with the collaboration layer included. If your users need sign-off, records, and consent before anything changes, that is Velt.",
  },
  {
    num: "02",
    q: "How is this different from the approval flow in the OpenAI Agents SDK?",
    a: "The OpenAI SDK pauses your own agent's tool calls so a developer-defined approver can resume them. Velt is the review surface your end users see inside your product: comment threads, multi-step approval workflows, audit records, and notifications, working across humans and agents with any model or framework.",
  },
  {
    num: "03",
    q: "Why not build this in-house?",
    a: "You can, and a first version of one feature takes a quarter or two. The cost is the long tail: anchoring comments to content that moves, notification batching and preferences, permissions, offline sync, audit records, and the edge cases that make review features feel solid. That long tail is Velt's entire roadmap, with the agent layer already integrated.",
  },
  {
    num: "04",
    q: "Can agents change data in my product without approval?",
    a: "Not through Velt. Agent suggestions arrive as comments. A human approves or rejects; on approve, the change fires through your webhook with a permanent record of who allowed what. Agents never need write access to your data.",
  },
  {
    num: "05",
    q: "Where does data live? Do you support self-hosting?",
    a: "Cloud by default, with a hybrid model where content and user PII stay on your infrastructure and Velt stores only metadata, and data residency options including EU. Velt is SOC 2 Type II audited and supports HIPAA workloads.",
  },
  {
    num: "06",
    q: "Which frameworks and editors does Velt support?",
    a: "React, Next.js, Vue, Angular, and plain HTML for the SDK. Multiplayer editing and suggestions work in Tiptap, CodeMirror, and 10 other editor libraries, or in your own custom components.",
  },
  {
    num: "07",
    q: "How is Velt priced?",
    a: "Usage-based on monthly active documents (MAD): you pay for documents with review activity in a month, not per seat. There is a free tier for development and early production.",
  },
  {
    num: "08",
    q: "How long does integration take?",
    a: "Days, not quarters. Install the SDK, wrap your app, and turn on features individually. Most teams render their first comment the same day and launch their first approval workflow within a week.",
  },
];

export default function Faq() {
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <div className="faq-eyebrow"><span className="faq-eyebrow-dot"></span>Objections, named</div>
        <h2 className="faq-heading">Questions buyers ask in the first meeting.</h2>
        <div>
          {FAQS.map((item, index) => {
            const isOpen = faqOpen === index;
            return (
              <div key={item.num} onClick={() => setFaqOpen(isOpen ? -1 : index)} className="faq-row">
                <div className="faq-row-header">
                  <span className="faq-num">{item.num}</span>
                  <span className="faq-question">{item.q}</span>
                  <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && (
                  <p className="faq-answer">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
