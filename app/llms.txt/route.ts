// /llms.txt: curated index of the velt.dev marketing site for LLMs.
// Follows the llmstxt.org convention: a hand-authored, opinionated table of
// contents pointing at the most useful pages and their .md siblings. Bots
// that fetch /llms.txt get a quick map; from there they fetch /llms-full.txt
// or individual /:slug.md endpoints. Mintlify already serves /docs/llms.txt
// and /docs/llms-full.txt for docs content, this file covers everything
// outside /docs/*.

const BODY = `# Velt

> Embeddable review and approval for AI-native apps. Velt is an SDK that adds comments, approval workflows, AI review agents, suggestions, audit trails, memory, and notifications to your product. Agents do the work, humans decide.

Velt is built for products where work cannot ship unapproved: sales enablement, fintech and FP&A, compliance, operations, and AI-native SaaS. Agent suggestions become comments a human approves; approved changes fire through your webhook with a permanent record.

## Docs

- [Quickstart](https://velt.dev/docs/get-started/overview): install and render your first comment in minutes
- [API Reference](https://velt.dev/docs/api-reference): full SDK surface
- [Components](https://velt.dev/docs/components): React, Next.js, Angular SDK components
- [Docs (full)](https://velt.dev/docs/llms-full.txt): complete docs content as a single file

## Features

- [Comments](https://velt.dev/comments.md): contextual threads from humans or agents on any element
- [Approval flows](https://velt.dev/approval-flows.md): user-defined review pipelines with routing, conditions, quorum
- [Review agents](https://velt.dev/review-agents.md): AI first-pass review from plain English instructions
- [Suggestions](https://velt.dev/suggestions.md): propose and accept edits like a diff, from humans or agents
- [Audit trail](https://velt.dev/audit-trail.md): immutable, exportable record of every action
- [Memory](https://velt.dev/memory.md): past decisions surface as precedent
- [Notifications](https://velt.dev/notifications.md): in-app, email, Slack, Teams
- [Presence](https://velt.dev/presence.md): avatars, cursors, live selection, and follow mode for humans and agents
- [Multiplayer editing](https://velt.dev/multiplayer-editing.md): co-editing, single editor mode, and live state sync
- [Recording](https://velt.dev/recording.md): voice, video, screen, and a built-in video editor
- [Huddle](https://velt.dev/huddle.md): live audio and video inside the document
- [Self-hosting](https://velt.dev/self-hosting.md): per-feature data providers, your content and PII stay on your infrastructure

## Use cases

- [Sales enablement](https://velt.dev/for/sales-enablement.md)
- [Fintech and FP&A](https://velt.dev/for/fintech.md)
- [Operations](https://velt.dev/for/operations.md)
- [AI-native SaaS](https://velt.dev/for/ai-native-saas.md)

## Libraries

- [Libraries](https://velt.dev/libraries.md): add comments, co-editing, presence, and agent review to Tiptap, Lexical, Monaco, CodeMirror, AG Grid, React Flow, PDFs, charts, and more, or bring your own surface

## Company

- [Pricing](https://velt.dev/pricing.md): usage-based on monthly active documents, free tier
- [Customers](https://velt.dev/customers.md): Velt in production
- [Comparison](https://velt.dev/comparison.md): how Velt compares to alternatives

## Optional

- [Full content](https://velt.dev/llms-full.txt): all marketing pages in one file
- [Blog](https://velt.dev/blog): articles and announcements
`;

// 24h revalidate: the curated list rarely changes. Cache-Control mirrors
// the revalidate window with a longer stale-while-revalidate so the CDN
// keeps serving while a background refresh lands.
export const revalidate = 86400;

export async function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
