import Image from "next/image";
import Link from "next/link";
import "./BlogList.css";

export type BlogListPost = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category?: string;
  featuredImage?: string;
};

/**
 * Formats an ISO date string as a long, human-readable date.
 * @param value The ISO date string.
 * @returns The formatted date, or an empty string when unparseable.
 */
function formatDate(value?: string): string {
  try {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Featured (lead) post — a wide two-column card with the image on the left
 * and the post meta on the right.
 * @param post The lead post.
 * @returns The featured card element.
 */
function FeaturedPost({ post }: { post: BlogListPost }) {
  const date = formatDate(post?.publishedAt);
  return (
    <Link href={`/blog/${post.slug}`} className="blog-feature hcard">
      {post.featuredImage ? (
        <div className="blog-feature-media">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="blog-feature-img"
            priority
          />
        </div>
      ) : null}
      <div className="blog-feature-body">
        {post.category ? (
          <span className="blog-chip">{post.category}</span>
        ) : (
          <span className="blog-chip">Featured</span>
        )}
        <h2 className="blog-feature-title">{post.title}</h2>
        {post.description ? (
          <p className="blog-feature-desc">{post.description}</p>
        ) : null}
        {date ? <time className="blog-meta">{date}</time> : null}
      </div>
    </Link>
  );
}

/**
 * Standard post card used in the grid below the featured post.
 * @param post The post to render.
 * @returns The card element.
 */
function PostCard({ post }: { post: BlogListPost }) {
  const date = formatDate(post?.publishedAt);
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card hcard">
      {post.featuredImage ? (
        <div className="blog-card-media">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            className="blog-card-img"
          />
        </div>
      ) : (
        <div className="blog-card-media blog-card-media--empty" aria-hidden="true" />
      )}
      <div className="blog-card-body">
        {post.category ? <span className="blog-chip">{post.category}</span> : null}
        <h3 className="blog-card-title">{post.title}</h3>
        {post.description ? (
          <p className="blog-card-desc">{post.description}</p>
        ) : null}
        {date ? <time className="blog-meta">{date}</time> : null}
      </div>
    </Link>
  );
}

/**
 * Editorial blog listing: a light hero, a featured lead post, and a card
 * grid of the remaining posts. Renders an empty-state pointer to Sanity
 * Studio when no posts exist.
 * @param posts The blog posts, newest first.
 * @returns The listing section.
 */
export default function BlogList({ posts }: { posts: BlogListPost[] }) {
  const hasPosts = Array.isArray(posts) && posts.length > 0;
  const [lead, ...rest] = hasPosts ? posts : [];

  return (
    <>
      <section className="blog-hero-section">
        <div className="blog-hero-inner">
          <div className="blog-hero-eyebrow">
            <span className="blog-hero-eyebrow-dot" />
            Blog
          </div>
          <h1 className="blog-hero-title">Writing on collaboration and review.</h1>
          <p className="blog-hero-sub">
            Guides, comparisons, and insights on collaboration SDKs, real-time
            features, and building better products.
          </p>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="blog-list-inner">
          {hasPosts ? (
            <>
              {lead ? <FeaturedPost post={lead} /> : null}
              {rest.length > 0 ? (
                <div className="blog-grid">
                  {rest.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="blog-empty">
              No blog posts yet. Add one in{" "}
              <Link href="/studio" className="blog-empty-link">
                Sanity Studio
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
