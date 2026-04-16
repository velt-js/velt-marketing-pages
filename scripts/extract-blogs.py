"""
Extract blog content from Framer HTML exports and convert to Sanity-compatible JSON.
Outputs scripts/blog-data.json with Portable Text blocks.
"""

import json
import os
import re
import uuid
from bs4 import BeautifulSoup, NavigableString

BLOG_DIR = "public/pages-html/blog"
OUTPUT = "scripts/blog-data.json"


def make_key():
    return uuid.uuid4().hex[:12]


def text_to_portable_block(text, style="normal", marks=None):
    """Create a Portable Text block from plain text."""
    return {
        "_type": "block",
        "_key": make_key(),
        "style": style,
        "markDefs": [],
        "children": [
            {
                "_type": "span",
                "_key": make_key(),
                "text": text.strip(),
                "marks": marks or [],
            }
        ],
    }


def element_to_blocks(el):
    """Convert an HTML element to Portable Text blocks."""
    blocks = []
    tag = el.name if el.name else None

    if tag in ("h1", "h2", "h3", "h4"):
        text = el.get_text(strip=True)
        if text:
            blocks.append(text_to_portable_block(text, style=tag))

    elif tag == "p":
        text = el.get_text(strip=True)
        if text:
            blocks.append(text_to_portable_block(text))

    elif tag == "blockquote":
        text = el.get_text(strip=True)
        if text:
            blocks.append(text_to_portable_block(text, style="blockquote"))

    elif tag in ("ul", "ol"):
        list_type = "bullet" if tag == "ul" else "number"
        for li in el.find_all("li", recursive=False):
            text = li.get_text(strip=True)
            if text:
                block = text_to_portable_block(text)
                block["listItem"] = list_type
                block["level"] = 1
                blocks.append(block)

    elif tag == "pre":
        code = el.get_text()
        if code.strip():
            blocks.append({
                "_type": "code",
                "_key": make_key(),
                "code": code.strip(),
                "language": "javascript",
            })

    return blocks


def extract_body_content(soup):
    """Extract the main article content as Portable Text blocks."""
    blocks = []

    # Find all text containers in the page
    containers = soup.find_all(attrs={"data-framer-component-type": "RichTextContainer"})

    if not containers:
        # Fallback: find all framer-text elements
        containers = soup.find_all(class_="framer-text")

    seen_texts = set()

    for container in containers:
        for el in container.find_all(["h1", "h2", "h3", "h4", "p", "blockquote", "ul", "ol", "pre"], recursive=True):
            text = el.get_text(strip=True)
            # Skip duplicates (responsive variants render same content multiple times)
            if text and text not in seen_texts:
                seen_texts.add(text)
                new_blocks = element_to_blocks(el)
                blocks.extend(new_blocks)

    return blocks


def extract_blog_post(slug, filepath):
    """Extract a single blog post from its HTML file."""
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")

    # Title
    title_tag = soup.find("title")
    title = title_tag.get_text() if title_tag else slug
    title = re.sub(r"\s*\|\s*Velt\s*$", "", title).strip()

    # Description
    desc_tag = soup.find("meta", attrs={"name": "description"})
    description = desc_tag["content"] if desc_tag and desc_tag.get("content") else ""

    # Date
    time_tag = soup.find("time")
    date = None
    if time_tag and time_tag.get("datetime"):
        date = time_tag["datetime"]
    elif time_tag:
        date = time_tag.get_text(strip=True)

    # Body
    body = extract_body_content(soup)

    # If body is empty, create a minimal block from description
    if not body and description:
        body = [text_to_portable_block(description)]

    return {
        "slug": slug,
        "title": title,
        "description": description[:500] if description else "",
        "publishedAt": date,
        "body": body,
    }


def main():
    posts = []
    blog_dirs = sorted(
        d
        for d in os.listdir(BLOG_DIR)
        if os.path.isdir(os.path.join(BLOG_DIR, d))
    )

    for slug in blog_dirs:
        index_path = os.path.join(BLOG_DIR, slug, "index.html")
        if not os.path.exists(index_path):
            continue

        try:
            post = extract_blog_post(slug, index_path)
            posts.append(post)
            block_count = len(post["body"])
            print(f"  {slug}: {block_count} blocks")
        except Exception as e:
            print(f"  ERROR {slug}: {e}")

    with open(OUTPUT, "w") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)

    print(f"\nExtracted {len(posts)} blog posts to {OUTPUT}")


if __name__ == "__main__":
    main()
