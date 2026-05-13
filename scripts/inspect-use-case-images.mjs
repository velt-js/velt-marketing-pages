import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "useCasePage" && defined(slug.current)]{
    "slug": slug.current,
    benefits[]{ tag, title, imageSrc }
  } | order(slug asc)`
);

for (const doc of docs) {
  console.log(`\n/use-case/${doc.slug}`);
  for (const b of doc.benefits ?? []) {
    const has = b.imageSrc ? "OK " : "missing";
    console.log(`  [${has}] ${b.title ?? "(no title)"}`);
    if (b.imageSrc) console.log(`           ${b.imageSrc}`);
  }
}
