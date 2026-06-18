"use client";

import { Fragment, useState, type ReactNode } from "react";
import Link from "next/link";
import "./PricingFaq.css";

type PricingFaqItem = {
  num: string;
  question: string;
  answer: ReactNode;
};

// Pricing FAQ copy mirrors the live velt.dev/pricing entries. Inline links
// render at the brand accent color so they read on the light cream band.
const FAQS: PricingFaqItem[] = [
  {
    num: "01",
    question: "What is a MAD (Monthly Active Document)?",
    answer: (
      <>
        An active document is a unique document which has CRUD operations by any
        Velt feature during the month. This excludes documents which were merely
        initiated without performing CRUD operations on features like comments,
        notifications, CRDT, etc.
      </>
    ),
  },
  {
    num: "02",
    question:
      "What is the difference between MAR and MAD, and why does it matter for my bill?",
    answer: (
      <>
        MAR (Monthly Active Room) counts a document as active when a user merely
        connects to it. MAD (Monthly Active Document) — the metric we use — only
        counts documents where users actively use Velt&rsquo;s collaboration
        features. MAD is a subset of MAR: typically about 20% of MARs perform
        meaningful collaboration. MAD-based pricing means you&rsquo;re billed
        only for users who derive value, a more transparent alternative to
        MAR-based models.
      </>
    ),
  },
  {
    num: "03",
    question: "Do we charge for just connecting to Velt?",
    answer: (
      <>
        No. Billing applies only to Velt SDK CRUD operation usage. You are not
        billed for users that just connect to Velt.
      </>
    ),
  },
  {
    num: "04",
    question: "How long does it take to integrate with Velt SDK?",
    answer: <>On average, customers integrate with Velt SDK in under 30 minutes.</>,
  },
  {
    num: "05",
    question: "Which frameworks do you support?",
    answer: <>Velt SDK supports React, Angular, Vanilla JS, Vue, and Next.js.</>,
  },
  {
    num: "06",
    question: "Do you offer any discounts for startups?",
    answer: (
      <>
        Yes, we offer special deals for early-stage startups.{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe3IubfjaQC3nIUqV9lq1XB6MbuW97XD3ryairNzvnML7v5Ag/viewform"
          target="_blank"
          rel="noopener"
          className="prf-link"
        >
          Apply here
        </a>
        .
      </>
    ),
  },
  {
    num: "07",
    question: "Do you offer any volume discounts?",
    answer: (
      <Fragment>
        Yes, we offer volume discounts.{" "}
        <Link href="/book-demo" className="prf-link">
          Contact us
        </Link>{" "}
        to discuss.
      </Fragment>
    ),
  },
  {
    num: "08",
    question: "How secure is Velt SDK?",
    answer: (
      <>
        Velt provides enterprise-grade security. Our products are SOC 2 Type II
        and HIPAA compliant.{" "}
        <a
          href="https://trust.velt.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="prf-link"
        >
          Learn more
        </a>
        .
      </>
    ),
  },
  {
    num: "09",
    question: "How reliable and scalable is Velt SDK?",
    answer: (
      <>
        We provide 99.999% uptime and a highly scalable infrastructure for our
        growth and enterprise plans.
      </>
    ),
  },
];

/**
 * Pricing FAQ — editorial numbered accordion on a cream band, matching the
 * homepage FAQ interaction (one row open at a time).
 * @returns The FAQ section.
 */
export default function PricingFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="pricing-faq" className="prf-section">
      <div className="prf-inner">
        <div className="prf-eyebrow">
          <span className="prf-eyebrow-dot" />
          Questions
        </div>
        <h2 className="prf-heading">Pricing, answered.</h2>
        <div>
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.num}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="prf-row"
              >
                <div className="prf-row-header">
                  <span className="prf-num">{item.num}</span>
                  <span className="prf-question">{item.question}</span>
                  <span className="prf-toggle">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen ? <p className="prf-answer">{item.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
