// Notifications "Why use Velt for Notifications?" section. Renders the
// full white-card section (heading + sub + CTA + 2 sub-cards + Linda
// testimonial) as DOM instead of a flat PNG so the popover mockups stay
// sharp at any zoom. Mirrors Figma node 220:23113 in HqWIZdR6ISJmaG2n4o3gr8.
//
// Slug-conditional in app/features/[slug]/page.tsx — only rendered when
// the slug is "notifications".

import { FeatureSectionShell } from "./FeatureSectionShell";

const PURPLE = "#625df5";
const TEXT_DARK = "#0a0a0a";
const TEXT_MUTED = "#8f8f8f";
const TEXT_HEADING = "#111";
const SURFACE_NEUTRAL_1 = "#fafafa";
const SURFACE_NEUTRAL_3 = "#f0f0f0";
const TEXT_NEUTRAL_9 = "#999";
const TEXT_NEUTRAL_10 = "#b8b8b8";

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
        <SubCard variant="prioritized" />
        <SubCard variant="group" />
      </div>
    </FeatureSectionShell>
  );
}

function SubCard({ variant }: { variant: "prioritized" | "group" }) {
  const isPrioritized = variant === "prioritized";
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
      {/* Heading + description, top-left */}
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
          {isPrioritized ? "Prioritized Inbox" : "Group Notifications"}
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
          {isPrioritized
            ? "Notifications are organized based on priority and other customizable factors"
            : "Easily manage and find comments without loosing context of where it is placed"}
        </p>
      </div>

      {/* Floating bell affordance, left of popover */}
      <div
        className="absolute flex items-start"
        style={{
          left: isPrioritized ? 104 : 98,
          top: 170.5,
          background: "#f5f5f5",
          padding: 11.556,
          borderRadius: 34.667,
        }}
      >
        <div
          className="relative shrink-0"
          style={{ width: 28.889, height: 28.889 }}
        >
          <BellIcon />
        </div>
      </div>

      {/* The popover mockup */}
      <div
        className="absolute"
        style={{
          left: isPrioritized ? 152 : 184,
          top: 170.5,
          width: 380,
          height: 400,
          background: "#fff",
          border: `1px solid ${SURFACE_NEUTRAL_1}`,
          borderRadius: 16,
          boxShadow: "0 0 32px 0 rgba(0,0,0,0.08)",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
      >
        {/* Title row */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "8px 12px 2px", width: "100%" }}
        >
          <span
            style={{
              flex: "1 0 0",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: TEXT_DARK,
            }}
          >
            Notifications
          </span>
          <div className="flex items-center" style={{ padding: 8 }}>
            <ChecksIcon />
          </div>
          {isPrioritized ? (
            <div className="flex items-center" style={{ padding: 8 }}>
              <SettingsIcon />
            </div>
          ) : null}
        </div>

        {/* Tab strip */}
        <div className="flex items-center" style={{ padding: 8, width: "100%" }}>
          <div
            className="flex items-start"
            style={{
              flex: "1 0 0",
              gap: 4,
              background: SURFACE_NEUTRAL_3,
              padding: 4,
              borderRadius: 24,
            }}
          >
            <Tab label="For You" active={isPrioritized} />
            <Tab label="Documents" active={!isPrioritized} />
            <Tab label="All" active={false} />
          </div>
        </div>

        {/* Content tiles */}
        {isPrioritized ? (
          <div
            className="flex flex-col items-start"
            style={{ gap: 2, padding: 8, width: "100%" }}
          >
            <PriorityTile
              avatar="/images/features/notifications/mockups/avatar-1.png"
              prefix="Mihir Sodawalla mentioned you on"
              suffix="Velt-x-Pendo.png"
              chip="Slides"
              time="2 mins ago"
              tinted={false}
            />
            <PriorityTile
              avatar="/images/features/notifications/mockups/avatar-2.png"
              prefix="Rakesh Goyal replied to you on"
              suffix="Velt-x-Pendo.png"
              chip="Slides"
              time="2 mins ago"
              tinted
            />
            <PriorityTile
              avatar="/images/features/notifications/mockups/avatar-3.png"
              prefix="Vivek"
              middle="Approved"
              suffix="Velt-x-Pendo.png"
              chip="Slides"
              time="2 mins ago"
              tinted={false}
            />
          </div>
        ) : (
          <div
            className="flex flex-col items-start"
            style={{ gap: 4, padding: 8, width: "100%" }}
          >
            <GroupTile icon="photo" label="Document Name" unread="2 Unread" tinted />
            <GroupTile icon="file" label="Google Docs" unread="2 Unread" />
            <GroupTile icon="youtube" label="Document Name" />
          </div>
        )}
      </div>

      {/* White-to-transparent gradient fade on the right edge — matches the
          recordings/comments card-row treatment so the popover trails off. */}
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

      {/* Bottom-of-popover white fade so tile #3 trails off cleanly. */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: isPrioritized ? 152 : 184,
          bottom: -33,
          width: 423,
          height: 167,
          background:
            "linear-gradient(to top, #fff 56.63%, rgba(255,255,255,0) 100%)",
        }}
        aria-hidden
      />
    </article>
  );
}

function Tab({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        flex: "1 0 0",
        minWidth: 0,
        padding: "8px 12px",
        borderRadius: 15,
        background: active ? PURPLE : "transparent",
      }}
    >
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: active ? 600 : 500,
          fontSize: 12,
          lineHeight: 1,
          color: active ? "#fff" : TEXT_NEUTRAL_9,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function PriorityTile({
  avatar,
  prefix,
  middle,
  suffix,
  chip,
  time,
  tinted,
}: {
  avatar: string;
  prefix: string;
  middle?: string;
  suffix: string;
  chip: string;
  time: string;
  tinted: boolean;
}) {
  return (
    <div
      className="flex items-start"
      style={{
        gap: 10,
        padding: "16px 16px 16px 12px",
        borderRadius: 12,
        width: "100%",
        background: tinted ? SURFACE_NEUTRAL_1 : "transparent",
      }}
    >
      <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 72,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            width: 8,
            height: 8,
            borderRadius: 4,
            background: "#ff7162",
            border: "2px solid #fff",
          }}
        />
      </div>
      <div
        className="flex flex-col items-center justify-center"
        style={{ flex: "1 0 0", minWidth: 0, gap: 8, padding: "2px 0" }}
      >
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 14,
            color: TEXT_DARK,
            lineHeight: 1.4,
            width: "100%",
          }}
        >
          <span style={{ color: "#666", fontWeight: 400 }}>{prefix}</span>
          {middle ? (
            <>
              <span> </span>
              <span style={{ color: "#666", fontWeight: 400 }}>{middle}</span>
            </>
          ) : null}
          <span> </span>
          <span style={{ fontWeight: 500 }}>{suffix}</span>
        </div>
        <div
          className="flex items-center justify-between"
          style={{ width: "100%" }}
        >
          <div className="flex items-center" style={{ gap: 2 }}>
            <FileIcon />
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 12,
                color: TEXT_MUTED,
              }}
            >
              {chip}
            </span>
          </div>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              color: TEXT_MUTED,
            }}
          >
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}

function GroupTile({
  icon,
  label,
  unread,
  tinted = false,
}: {
  icon: "photo" | "file" | "youtube";
  label: string;
  unread?: string;
  tinted?: boolean;
}) {
  const Icon = icon === "photo" ? PhotoIcon : icon === "file" ? FileIconLarge : YoutubeIcon;
  return (
    <div
      className="flex items-center"
      style={{
        padding: 4,
        borderRadius: 12,
        width: "100%",
        background: tinted ? SURFACE_NEUTRAL_1 : "transparent",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ flex: "1 0 0", minWidth: 0, padding: 8 }}
      >
        <div className="flex items-center" style={{ gap: 8 }}>
          <Icon />
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: icon === "youtube" ? 400 : 500,
              fontSize: 14,
              color: TEXT_DARK,
            }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 4 }}>
          {unread ? (
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 12,
                color: TEXT_NEUTRAL_10,
                whiteSpace: "nowrap",
              }}
            >
              {unread}
            </span>
          ) : null}
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

// ---- Inline Tabler-style icons (MIT) ----

function BellIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#111"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", left: 1.45, top: 1.44 }}
      aria-hidden
    >
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  );
}

function ChecksIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={PURPLE}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#111"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={TEXT_MUTED}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    </svg>
  );
}

function FileIconLarge() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 8h.01" />
      <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
      <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#ff0000"
      stroke="none"
      aria-hidden
    >
      <path d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}
