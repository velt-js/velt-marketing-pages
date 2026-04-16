/**
 * Import blog posts from blog-data.json into Sanity.
 *
 * Usage: SANITY_API_TOKEN=<token> node scripts/import-blogs.js
 */

const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Set SANITY_API_TOKEN env var");
  process.exit(1);
}

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function authorIdFromName(name) {
  return "author-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "blog-data.json"), "utf-8")
  );

  console.log(`Importing ${data.length} blog posts...`);

  // Create unique authors
  const uniqueAuthors = [...new Set(data.map((p) => p.authorName || "Velt Team"))];
  const authorTx = client.transaction();
  for (const name of uniqueAuthors) {
    authorTx.createOrReplace({
      _id: authorIdFromName(name),
      _type: "author",
      name,
    });
  }
  await authorTx.commit();
  console.log(`Created ${uniqueAuthors.length} authors: ${uniqueAuthors.join(", ")}`);

  // Map CSV categories to schema values
  const categoryMap = {
    General: "guide",
    Guide: "guide",
    Comparison: "comparison",
    Tutorial: "tutorial",
    "Case Study": "case-study",
    "Product Update": "product-update",
    "Thought Leadership": "thought-leadership",
  };

  // Import posts in batches
  let count = 0;
  const batchSize = 10;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const transaction = client.transaction();

    for (const post of batch) {
      const docId = `blogPost-${post.slug.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
      const authorRef = authorIdFromName(post.authorName || "Velt Team");
      const category = categoryMap[post.category] || "guide";
      transaction.createOrReplace({
        _id: docId,
        _type: "blogPost",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        description: post.description,
        publishedAt: post.publishedAt || new Date().toISOString(),
        author: { _type: "reference", _ref: authorRef },
        category,
        body: post.body,
      });
    }

    await transaction.commit();
    count += batch.length;
    console.log(`  ${count} / ${data.length}`);
  }

  console.log(`\nDone! Imported ${count} blog posts.`);
}

main().catch(console.error);
