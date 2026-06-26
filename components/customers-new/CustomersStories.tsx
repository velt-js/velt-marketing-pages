import "./CustomersStories.css";

type Story = {
  logoSrc: string;
  logoAlt: string;
  label: string;
  quote: string;
  body: string;
  authorName: string;
  authorRole: string;
  avatarSrc: string;
};

const TRUST_BASE = "/images/features/comments/trust-us";

// Testimonials ported from components/feature/FeatureCustomerCarousel.tsx
// (TRUST_DEFAULTS), reframed as a static light-theme card grid. `label` is a
// short mono kicker derived from each customer's headline metric.
const STORIES: Story[] = [
  {
    logoSrc: `${TRUST_BASE}/logo-google.png`,
    logoAlt: "Google",
    label: "BUNDLED WITH MAGIC",
    quote: "Velt's commenting & notifications are bundled with a lot of magic.",
    body: "Velt gave us 1-on-1 attention in our own private Slack channel. The team was quick to add features we needed, and the components were extremely customizable, letting us keep a cohesive look and feel. Highly recommended.",
    authorName: "Yuri Kleban",
    authorRole: "Sr. Product Manager · Google",
    avatarSrc: `${TRUST_BASE}/avatar-yuri.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-x.png`,
    logoAlt: "X",
    label: "SHIPPED IN A WEEK",
    quote: "Full collaboration features shipped in under one week.",
    body: "Building our own collaborative features was becoming overwhelming, so we were relieved to find Velt. Their SDK included all the commenting and notification features we needed and was easy to integrate. We shipped comments in a week.",
    authorName: "Chris Bakke",
    authorRole: "Head of Product · X",
    avatarSrc: `${TRUST_BASE}/avatar-chris-bakke.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-metaimpact.png`,
    logoAlt: "MetaImpact",
    label: "WAU UP 26%",
    quote: "Increased weekly active users by 26%.",
    body: "The team was quick to add the features we needed, and we were extremely happy with how customizable Velt's components were, allowing us to keep a cohesive look and feel to our product.",
    authorName: "Jeff Cunning",
    authorRole: "CPO · MetaImpact",
    avatarSrc: `${TRUST_BASE}/avatar-jeff.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-trumpet.png`,
    logoAlt: "Trumpet",
    label: "5X FASTER",
    quote: "Increased engagement by 10% and helped us ship 5x faster.",
    body: "Took about a week to implement. The speed of iteration from the Velt team is incredible compared to alternatives: they're always happy to discuss and find a solution. Docs were clear and easy to understand.",
    authorName: "William Angel",
    authorRole: "Lead PM · Trumpet",
    avatarSrc: `${TRUST_BASE}/avatar-william.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-leadpages.png`,
    logoAlt: "Leadpages",
    label: "SAVED 3 FTES",
    quote: "Saved 3 FTEs and will boost retention.",
    body: "Implementing Velt took weeks, not the quarters it would have taken us to build in-house even with 3 FTE engineers. We're already seeing added value for our users and anticipate increased retention.",
    authorName: "Hope Callaway",
    authorRole: "Senior PM · Leadpages",
    avatarSrc: `${TRUST_BASE}/avatar-hope.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-cloudfactory.png`,
    logoAlt: "CloudFactory",
    label: "SEAMLESS MIGRATION",
    quote: "Saved massive development effort.",
    body: "Velt provides the critical commenting functionality our customers rely on, saving us massive development effort. Migration from our previous vendor was seamless.",
    authorName: "Fenne Buitenrust Hettema",
    authorRole: "Product Lead · CloudFactory",
    avatarSrc: `${TRUST_BASE}/avatar-fenne.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-bigtincan.png`,
    logoAlt: "Bigtincan",
    label: "MONTHS TO WEEKS",
    quote: "We turned months of development into weeks of delivery.",
    body: "We considered building this in-house, but a robust, scalable commenting system with all the modern collaboration features our users expect would have taken months and pulled teams away from core innovation. That's when we discovered Velt.",
    authorName: "Gavin McIver",
    authorRole: "Senior PM · Bigtincan",
    avatarSrc: `${TRUST_BASE}/avatar-gavin.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-eqtble.png`,
    logoAlt: "eqtble",
    label: "HAPPIER CUSTOMERS",
    quote: "Boosted customer happiness.",
    body: "Commenting was something we knew we wanted in our app, but with limited resources it wasn't going to be prioritized, until we found Velt. The team was fantastic to work with.",
    authorName: "Ethan Veres",
    authorRole: "Co-founder & CTO · eqtble",
    avatarSrc: `${TRUST_BASE}/avatar-ethan.png`,
  },
  {
    logoSrc: `${TRUST_BASE}/logo-awesomic.png`,
    logoAlt: "Awesomic",
    label: "LAUNCHED 5X FASTER",
    quote: "We launched 5x faster than building from scratch.",
    body: "Velt is a great product that sped up our feature development. It saved us weeks of work.",
    authorName: "Roman Sevast",
    authorRole: "CEO · Awesomic",
    avatarSrc: `${TRUST_BASE}/avatar-roman.png`,
  },
];

/**
 * Light-theme customer testimonial wall. Renders ported quotes as a masonry
 * grid of cards, each with a customer logo, pull-quote, body, and author.
 * @returns The customer stories section.
 */
export default function CustomersStories() {
  try {
    return (
      <section className="cus-section" id="stories">
        <div className="cus-inner">
          <div className="cus-eyebrow">
            <span className="cus-eyebrow-dot" />
            In their words
          </div>
          <h2 className="cus-title">Real teams. Real metrics. Real names.</h2>
          <div className="cus-grid">
            {STORIES.map((story) => (
              <article className="cus-card" key={story.authorName}>
                <div className="cus-card-top">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="cus-card-logo"
                    src={story.logoSrc}
                    alt={story.logoAlt}
                    loading="lazy"
                  />
                  <span className="cus-card-label">{story.label}</span>
                </div>
                <h3 className="cus-card-quote">{story.quote}</h3>
                <p className="cus-card-body">{story.body}</p>
                <div className="cus-card-author">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="cus-card-avatar"
                    src={story.avatarSrc}
                    alt={story.authorName}
                    loading="lazy"
                  />
                  <div className="cus-card-author-meta">
                    <span className="cus-card-author-name">
                      {story.authorName}
                    </span>
                    <span className="cus-card-author-role">
                      {story.authorRole}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
