import { FeatureSectionShell } from "./FeatureSectionShell";

const TEXT_HEADING = "#111";

const lindaTestimonial = {
  name: "Linda Belcher",
  role: "Product Manager @HeyGen",
  quote:
    "Velt hosts all collaboration functionalities needed to boost engagement at HeyGen",
  accentFragment: "boost engagement",
  accentColor: "#b4b1fa",
  avatarSrc: "/images/home/linda-steps.png",
};

export function NotificationsHighlights() {
  return (
    <FeatureSectionShell
      heading="Why use Velt for Notifications?"
      subheading="Velt provides everything you need to easily setup a robust and reliable notification system"
      primaryCta={{ label: "Request Demo", href: "/book-demo" }}
      testimonial={lindaTestimonial}
      topAccent
    >
      <div
        className="flex items-stretch"
        style={{ width: "100%", height: 440 }}
      >
        <SubCard
          title="Prioritized Inbox"
          description="Notifications are organized based on priority and other customizable factors"
          imageSrc="/images/features/notifications/prioritized-inbox.png"
        />
        <SubCard
          title="Group Notifications"
          description="Easily manage and find comments without loosing context of where it is placed"
          imageSrc="/images/features/notifications/group-notifications.png"
        />
      </div>
    </FeatureSectionShell>
  );
}

/**
 * Renders a sub-card with a title, description, and a static image.
 */
function SubCard({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) {
  try {
    return (
      <article
        className="relative overflow-hidden"
        style={{
          flex: "1 0 0",
          minWidth: 0,
          height: 440,
          border: "1px solid #f6f6f6",
        }}
      >
        <div
          className="absolute flex flex-col"
          style={{ top: 47.5, left: 47.5, gap: 12 }}
        >
          <h3
            className="font-urbanist font-semibold"
            style={{
              color: TEXT_HEADING,
              fontSize: 20,
              lineHeight: 1.2,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </h3>
          <p
            className="font-urbanist"
            style={{
              color: TEXT_HEADING,
              fontSize: 15,
              lineHeight: 1.2,
              margin: 0,
              width: 300,
            }}
          >
            {description}
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={title}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />

        <div
          className="absolute pointer-events-none"
          style={{
            right: -0.5,
            top: 69.5,
            width: 186,
            height: 320,
            background:
              "linear-gradient(to left, #fff 5%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden
        />
      </article>
    );
  } catch {
    return null;
  }
}
