import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SanityAuditPayload = {
  projectId?: string;
  dataset?: string;
  _id?: string;
  _type?: string;
  operation?: "create" | "update" | "delete" | string;
  title?: string;
  slug?: string;
  _rev?: string;
  _updatedAt?: string;
  before?: {
    _type?: string;
    title?: string;
    name?: string;
    slug?: { current?: string } | string;
  } | null;
  after?: {
    _type?: string;
    title?: string;
    name?: string;
    slug?: { current?: string } | string;
  } | null;
};

const IMPORTANT_OPERATIONS = new Set(["create", "update", "delete"]);

function timingSafeEqualString(a: string, b: string) {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  if (aBytes.length !== bBytes.length) return false;

  let diff = 0;
  for (let i = 0; i < aBytes.length; i += 1) {
    diff |= aBytes[i] ^ bBytes[i];
  }
  return diff === 0;
}

function getSuppliedSecret(request: Request) {
  const url = new URL(request.url);
  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Bearer ")) return auth.slice("Bearer ".length);
  return (
    request.headers.get("x-sanity-audit-secret") ||
    url.searchParams.get("secret") ||
    ""
  );
}

function isAuthorized(request: Request) {
  const expected = process.env.SANITY_AUDIT_WEBHOOK_SECRET;
  if (!expected) return false;

  const supplied = getSuppliedSecret(request);
  return supplied ? timingSafeEqualString(supplied, expected) : false;
}

function getSlug(value: SanityAuditPayload["before"] | SanityAuditPayload["after"]) {
  if (!value?.slug) return undefined;
  if (typeof value.slug === "string") return value.slug;
  return value.slug.current;
}

function summarizePayload(payload: SanityAuditPayload, request: Request) {
  const operation =
    request.headers.get("sanity-operation") || payload.operation || "unknown";
  const documentId = request.headers.get("sanity-document-id") || payload._id;
  const documentType =
    payload._type || payload.after?._type || payload.before?._type || "unknown";
  const title =
    payload.title ||
    payload.after?.title ||
    payload.after?.name ||
    payload.before?.title ||
    payload.before?.name ||
    "(untitled)";
  const slug = payload.slug || getSlug(payload.after) || getSlug(payload.before);
  const dataset =
    request.headers.get("sanity-dataset") || payload.dataset || "unknown";
  const projectId =
    request.headers.get("sanity-project-id") || payload.projectId || "unknown";
  const transactionId = request.headers.get("sanity-transaction-id") || payload._rev;
  const transactionTime =
    request.headers.get("sanity-transaction-time") ||
    payload._updatedAt ||
    new Date().toISOString();

  return {
    operation,
    documentId,
    documentType,
    title,
    slug,
    dataset,
    projectId,
    transactionId,
    transactionTime,
    idempotencyKey: request.headers.get("idempotency-key"),
  };
}

function getOperationColor(operation: string) {
  if (operation === "delete") return "#E5484D";
  if (operation === "create") return "#30A46C";
  if (operation === "update") return "#F5A524";
  return "#8E8E93";
}

async function postToSlack(summary: ReturnType<typeof summarizePayload>) {
  const webhookUrl = process.env.SANITY_AUDIT_SLACK_WEBHOOK_URL;
  if (!webhookUrl) return { skipped: true };

  const slugLine = summary.slug ? `\n*Slug:* \`${summary.slug}\`` : "";
  const text = [
    `Sanity ${summary.operation.toUpperCase()}: ${summary.documentType}`,
    `Title: ${summary.title}`,
    summary.slug ? `Slug: ${summary.slug}` : undefined,
    summary.documentId ? `ID: ${summary.documentId}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      attachments: [
        {
          color: getOperationColor(summary.operation),
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Sanity ${summary.operation.toUpperCase()}* on \`${summary.documentType}\`\n*Title:* ${summary.title}${slugLine}`,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: [
                    summary.documentId ? `ID: \`${summary.documentId}\`` : undefined,
                    `Project: \`${summary.projectId}\``,
                    `Dataset: \`${summary.dataset}\``,
                    summary.transactionId
                      ? `Transaction: \`${summary.transactionId}\``
                      : undefined,
                    `Time: ${summary.transactionTime}`,
                  ]
                    .filter(Boolean)
                    .join(" • "),
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Slack webhook failed: ${response.status} ${body}`);
  }

  return { skipped: false };
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: SanityAuditPayload;
  try {
    payload = (await request.json()) as SanityAuditPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const summary = summarizePayload(payload, request);

  if (!IMPORTANT_OPERATIONS.has(summary.operation)) {
    return NextResponse.json({ ok: true, skipped: true, summary });
  }

  try {
    const slack = await postToSlack(summary);
    console.log("[sanity-audit]", JSON.stringify(summary));

    return NextResponse.json({ ok: true, slack, summary });
  } catch (error) {
    console.error("[sanity-audit] failed", error, summary);
    return NextResponse.json(
      { error: "Audit webhook failed", summary },
      { status: 500 },
    );
  }
}
