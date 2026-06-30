import "./Primitives.css";
import PrimitiveCard from "./PrimitiveCard";
import CopyButton from "./CopyButton";
import FlowerAvatar from "./FlowerAvatar";

// Real customer testimonials (names, roles, avatars) reused from the
// "Our Customers Trust Us" set in components/feature/FeatureCustomerCarousel.
const TRUST_AVATARS = "/images/features/comments/trust-us";

// Testimonials are real customer quotes, verified against the canonical
// "Our Customers Trust Us" inventory in FeatureCustomerCarousel (TRUST_DEFAULTS):
// every name, role, company, avatar, and quote matches a real Velt customer.
// Per spec 2.6 truth gate, only verified quotes render; the Memory card has
// none and renders without one. Enabled.
const SHOW_TESTIMONIALS = true;

/**
 * Maya's gradient notification avatar (warm yellow → orange) with an unread badge.
 * @returns {JSX.Element} The avatar SVG.
 */
function MayaAvatar() {
  return (
    <svg className="prim-notif-grad-avatar" viewBox="0 0 39 39" fill="none" aria-hidden="true">
      <g clipPath="url(#clip0_889_2323)">
        <circle cx="19" cy="20" r="19" fill="url(#paint0_radial_889_2323)" />
        <g opacity="0.4" filter="url(#filter0_f_889_2323)">
          <path d="M14 38.5204C19.3333 37.8947 31.6 33.5146 38 21C38 33.5146 23.2308 41.0234 14 38.5204Z" fill="black" />
        </g>
        <g opacity="0.57" filter="url(#filter1_f_889_2323)">
          <path d="M25 1.6927C18.7778 2.59653 8.96667 9.42336 1.5 27.5C-4 11 6.5 -3 25 1.6927Z" fill="#FEFFFF" />
        </g>
        <path d="M13.0114 14.3636H16.0455L19.25 22.1818H19.3864L22.5909 14.3636H25.625V26H23.2386V18.4261H23.142L20.1307 25.9432H18.5057L15.4943 18.3977H15.3977V26H13.0114V14.3636Z" fill="#FEFFFF" />
      </g>
      <circle cx="33.5" cy="5.5" r="5" fill="#FA3737" stroke="#FEFFFF" />
      <defs>
        <filter id="filter0_f_889_2323" x="9" y="16" width="34" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_889_2323" />
        </filter>
        <filter id="filter1_f_889_2323" x="-5.96094" y="-5.22559" width="36.9609" height="38.7256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_889_2323" />
        </filter>
        <radialGradient id="paint0_radial_889_2323" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14 1) rotate(82.5041) scale(38.3275)">
          <stop stopColor="#FFE169" />
          <stop offset="1" stopColor="#FF6B42" />
        </radialGradient>
        <clipPath id="clip0_889_2323">
          <rect y="1" width="38" height="38" rx="19" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/**
 * The Pricing Agent gradient notification avatar (magenta → violet, flower mark)
 * with an unread badge.
 * @returns {JSX.Element} The avatar SVG.
 */
function AgentAvatar() {
  return (
    <svg className="prim-notif-grad-avatar" viewBox="0 0 39 39" fill="none" aria-hidden="true">
      <g clipPath="url(#clip0_889_2340)">
        <circle cx="19" cy="20" r="19" fill="url(#paint0_radial_889_2340)" />
        <g opacity="0.4" filter="url(#filter0_f_889_2340)">
          <path d="M14 38.5204C19.3333 37.8947 31.6 33.5146 38 21C38 33.5146 23.2308 41.0234 14 38.5204Z" fill="black" />
        </g>
        <g opacity="0.57" filter="url(#filter1_f_889_2340)">
          <path d="M25 1.6927C18.7778 2.59653 8.96667 9.42336 1.5 27.5C-4 11 6.5 -3 25 1.6927Z" fill="#FEFFFF" />
        </g>
        <g clipPath="url(#clip1_889_2340)">
          <path d="M16.6811 19.9091C16.6811 20.4998 16.9158 21.0663 17.3335 21.484C17.7512 21.9017 18.3177 22.1364 18.9084 22.1364C19.4991 22.1364 20.0656 21.9017 20.4833 21.484C20.901 21.0663 21.1357 20.4998 21.1357 19.9091M16.6811 19.9091C16.6811 19.3184 16.9158 18.7519 17.3335 18.3342C17.7512 17.9165 18.3177 17.6818 18.9084 17.6818C19.4991 17.6818 20.0656 17.9165 20.4833 18.3342C20.901 18.7519 21.1357 19.3184 21.1357 19.9091M16.6811 19.9091L14.7036 20.1808C14.068 20.2848 13.6107 20.4169 13.333 20.5788C12.8242 20.8767 12.4536 21.3635 12.302 21.9334C12.1504 22.5032 12.2301 23.1099 12.5238 23.6212C12.6678 23.8741 12.8604 24.0959 13.0905 24.274C13.3207 24.452 13.5838 24.5827 13.8648 24.6585C14.1457 24.7342 14.4389 24.7536 14.7273 24.7155C15.0158 24.6774 15.2939 24.5826 15.5455 24.4364C15.8038 24.2842 16.1179 23.988 16.4883 23.5418L17.795 22.1364L17.2575 23.1461C16.8737 24.0355 16.6814 24.6888 16.6814 25.1061C16.6814 25.6968 16.916 26.2633 17.3337 26.681C17.7514 27.0987 18.3179 27.3333 18.9086 27.3333C19.4994 27.3333 20.0659 27.0987 20.4836 26.681C20.9013 26.2633 21.1359 25.6968 21.1359 25.1061C21.1359 24.6896 20.9429 24.0362 20.5598 23.1461L20.0223 22.1364L21.3289 23.5418C21.6994 23.988 22.0135 24.2864 22.2718 24.4364C22.5234 24.5826 22.8015 24.6774 23.09 24.7155C23.3784 24.7536 23.6716 24.7342 23.9525 24.6585C24.2335 24.5827 24.4966 24.452 24.7268 24.274C24.9569 24.0959 25.1495 23.8741 25.2935 23.6212C25.5871 23.1099 25.6669 22.5032 25.5153 21.9334C25.3637 21.3635 24.9931 20.8767 24.4843 20.5788C24.1784 20.4013 23.6602 20.2588 22.9177 20.1511L21.1357 19.9091M16.6811 19.9091L14.8996 19.6678C14.1571 19.5602 13.6389 19.4176 13.333 19.2402C12.824 18.9423 12.4532 18.4553 12.3016 17.8853C12.1501 17.3152 12.2299 16.7084 12.5238 16.197C12.6677 15.9441 12.8603 15.7221 13.0904 15.544C13.3205 15.3659 13.5837 15.2352 13.8646 15.1593C14.1455 15.0835 14.4387 15.064 14.7272 15.1021C15.0157 15.1401 15.2938 15.2349 15.5455 15.3811C15.8038 15.5318 16.1179 15.8295 16.4883 16.2757L17.795 17.6818C17.0526 15.9802 16.6814 14.9905 16.6814 14.7121C16.6814 14.1214 16.916 13.5549 17.3337 13.1372C17.7514 12.7195 18.3179 12.4849 18.9086 12.4849C19.4994 12.4849 20.0659 12.7195 20.4836 13.1372C20.9013 13.5549 21.1359 14.1214 21.1359 14.7121C21.1359 15.1294 20.9436 15.7827 20.5598 16.6721L20.0223 17.6818L21.3289 16.2764C21.6994 15.831 22.0135 15.534 22.2718 15.3818C22.5235 15.2357 22.8016 15.1409 23.0901 15.1028C23.3786 15.0647 23.6718 15.0842 23.9527 15.1601C24.2336 15.2359 24.4968 15.3667 24.7269 15.5448C24.957 15.7229 25.1496 15.9448 25.2935 16.1977C25.5871 16.7091 25.6669 17.3157 25.5153 17.8856C25.3637 18.4554 24.9931 18.9423 24.4843 19.2402C24.2066 19.4013 23.7493 19.5342 23.1137 19.6374L21.1357 19.9091" stroke="#FEFFFF" strokeWidth="1.48485" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <circle cx="33.5" cy="5.5" r="5" fill="#FA3737" stroke="#FEFFFF" />
      <defs>
        <filter id="filter0_f_889_2340" x="9" y="16" width="34" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_889_2340" />
        </filter>
        <filter id="filter1_f_889_2340" x="-5.96094" y="-5.22559" width="36.9609" height="38.7256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_889_2340" />
        </filter>
        <radialGradient id="paint0_radial_889_2340" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14 1) rotate(82.5041) scale(38.3275)">
          <stop stopColor="#FD69FF" />
          <stop offset="1" stopColor="#5200AA" />
        </radialGradient>
        <clipPath id="clip0_889_2340">
          <rect y="1" width="38" height="38" rx="19" fill="white" />
        </clipPath>
        <clipPath id="clip1_889_2340">
          <rect width="17.8182" height="17.8182" fill="white" transform="translate(10 11)" />
        </clipPath>
      </defs>
    </svg>
  );
}

/**
 * Review-agents flow artifact: a source event triggers agents that fan out to
 * parallel agent findings. Supports a stacked (`vertical`) or left-to-right
 * (`horizontal`) layout so different surfaces can pick the better fit.
 * @param {{ orientation?: "vertical" | "horizontal" }} props Layout orientation.
 * @returns {JSX.Element} The flow artifact.
 */
function ReviewAgentsArtifact({ orientation = "vertical" }: { orientation?: "vertical" | "horizontal" }) {
  return (
    <div className={orientation === "horizontal" ? "prim-ra prim-ra--horizontal" : "prim-ra"}>
      <span className="prim-ra-pill prim-ra-pill--source">
        <svg className="prim-ra-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" /></svg>
        Website Update
      </span>
      <span className="prim-ra-stem" aria-hidden="true" />
      <span className="prim-ra-pill prim-ra-pill--trigger">
        <svg className="prim-ra-pill-icon prim-ra-pill-icon--bolt" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3v7h6l-8 11v-7H5l8-11z" /></svg>
        Trigger Agents
      </span>
      <div className="prim-ra-fan" aria-hidden="true">
        <span className="prim-ra-fan-trunk" />
        <span className="prim-ra-fan-split" />
        <span className="prim-ra-fan-arm prim-ra-fan-arm--left" />
        <span className="prim-ra-fan-arm prim-ra-fan-arm--right" />
      </div>
      <div className="prim-ra-nodes">
        <div className="prim-ra-node">
          <FlowerAvatar tone="warm" uid="ra1" className="prim-ra-avatar" />
          <div className="prim-ra-node-text">
            <div className="prim-ra-node-name">Compliance Agent</div>
            <p className="prim-ra-node-sub">&ldquo;Guaranteed returns&rdquo;: prohibited phrasing</p>
          </div>
        </div>
        <div className="prim-ra-node">
          <FlowerAvatar tone="violet" uid="ra2" className="prim-ra-avatar" />
          <div className="prim-ra-node-text">
            <div className="prim-ra-node-name">Design Agent</div>
            <p className="prim-ra-node-sub">Logo on the cover is the 2024 mark.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Glyphs for the memory precedent chips (date, discount, approvals, sign-off).
 * @returns {JSX.Element} The requested memory chip icon.
 */
function MemoryChipIcon({ kind }: { kind: "calendar" | "discount" | "approved" | "signoff" }) {
  const common = {
    className: "prim-mem-chip-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    );
  }
  if (kind === "discount") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 15l6-6" />
        <path d="M9.2 9h.01M14.8 15h.01" />
      </svg>
    );
  }
  if (kind === "approved") {
    return (
      <svg {...common}>
        <path d="M2 13l4 4 7-8" />
        <path d="M12 17l1 1 8-9" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

/**
 * Delivery-channel glyphs for the notification chips (in-app, email, Slack).
 * @returns {JSX.Element} The requested channel icon.
 */
function ChannelIcon({ channel }: { channel: "in-app" | "email" | "slack" }) {
  if (channel === "in-app") {
    return (
      <svg className="prim-notif-chip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 5.3335H4.00667M6 5.3335H6.00667M2 4.66683C2 4.31321 2.14048 3.97407 2.39052 3.72402C2.64057 3.47397 2.97971 3.3335 3.33333 3.3335H12.6667C13.0203 3.3335 13.3594 3.47397 13.6095 3.72402C13.8595 3.97407 14 4.31321 14 4.66683V11.3335C14 11.6871 13.8595 12.0263 13.6095 12.2763C13.3594 12.5264 13.0203 12.6668 12.6667 12.6668H3.33333C2.97971 12.6668 2.64057 12.5264 2.39052 12.2763C2.14048 12.0263 2 11.6871 2 11.3335V4.66683Z" stroke="#7735EA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (channel === "email") {
    return (
      <svg className="prim-notif-chip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 4.66683C2 4.31321 2.14048 3.97407 2.39052 3.72402C2.64057 3.47397 2.97971 3.3335 3.33333 3.3335H12.6667C13.0203 3.3335 13.3594 3.47397 13.6095 3.72402C13.8595 3.97407 14 4.31321 14 4.66683M2 4.66683V11.3335C2 11.6871 2.14048 12.0263 2.39052 12.2763C2.64057 12.5264 2.97971 12.6668 3.33333 12.6668H12.6667C13.0203 12.6668 13.3594 12.5264 13.6095 12.2763C13.8595 12.0263 14 11.6871 14 11.3335V4.66683M2 4.66683L8 8.66683L14 4.66683" stroke="#2699E6" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="prim-notif-chip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.74902 9.47851C4.74902 10.1265 4.21972 10.6558 3.57178 10.6558C2.92384 10.6558 2.39453 10.1265 2.39453 9.47851C2.39453 8.83057 2.92384 8.30127 3.57178 8.30127H4.74902V9.47851Z" fill="#E01E5A" />
      <path d="M5.3418 9.47851C5.3418 8.83057 5.8711 8.30127 6.51904 8.30127C7.16698 8.30127 7.69629 8.83057 7.69629 9.47851V12.4262C7.69629 13.0741 7.16698 13.6034 6.51904 13.6034C5.8711 13.6034 5.3418 13.0741 5.3418 12.4262V9.47851Z" fill="#E01E5A" />
      <path d="M6.51904 4.75097C5.8711 4.75097 5.3418 4.22167 5.3418 3.57373C5.3418 2.92579 5.8711 2.39648 6.51904 2.39648C7.16698 2.39648 7.69629 2.92579 7.69629 3.57373V4.75097H6.51904Z" fill="#36C5F0" />
      <path d="M6.51945 5.34424C7.16739 5.34424 7.69669 5.87354 7.69669 6.52148C7.69669 7.16942 7.16739 7.69873 6.51945 7.69873H3.57178C2.92384 7.69873 2.39453 7.16942 2.39453 6.52148C2.39453 5.87354 2.92384 5.34424 3.57178 5.34424H6.51945Z" fill="#36C5F0" />
      <path d="M11.248 6.52148C11.248 5.87354 11.7774 5.34424 12.4253 5.34424C13.0732 5.34424 13.6025 5.87354 13.6025 6.52148C13.6025 7.16942 13.0732 7.69873 12.4253 7.69873H11.248V6.52148Z" fill="#2EB67D" />
      <path d="M10.6553 6.5214C10.6553 7.16934 10.126 7.69865 9.47802 7.69865C8.83008 7.69865 8.30078 7.16934 8.30078 6.5214V3.57373C8.30078 2.92579 8.83008 2.39648 9.47802 2.39648C10.126 2.39648 10.6553 2.92579 10.6553 3.57373V6.5214Z" fill="#2EB67D" />
      <path d="M9.47802 11.249C10.126 11.249 10.6553 11.7783 10.6553 12.4263C10.6553 13.0742 10.126 13.6035 9.47802 13.6035C8.83008 13.6035 8.30078 13.0742 8.30078 12.4263V11.249H9.47802Z" fill="#ECB22E" />
      <path d="M9.47802 10.6558C8.83008 10.6558 8.30078 10.1265 8.30078 9.47851C8.30078 8.83057 8.83008 8.30127 9.47802 8.30127H12.4257C13.0736 8.30127 13.6029 8.83057 13.6029 9.47851C13.6029 10.1265 13.0736 10.6558 12.4257 10.6558H9.47802Z" fill="#ECB22E" />
    </svg>
  );
}

export default function Primitives() {
  return (
    <section id="primitives" className="prim-section">
      <div className="prim-inner">
        <div className="prim-intro">
          <div className="prim-eyebrow"><span className="prim-eyebrow-dot"></span>The primitives</div>
          <h2 className="prim-intro-h2">Seven primitives. Any review workflow.</h2>
          <p className="prim-intro-p">Each ships as a React, Next.js, or Angular component plus a typed SDK.</p>
        </div>

        <div className="prim-grid">
          <PrimitiveCard
            showTestimonial={SHOW_TESTIMONIALS}
            num="01"
            name="COMMENTS"
            headline="Contextual threads from humans or agents, on any element, doc, cell, or canvas."
            support="The feedback layer your users already expect."
            exploreLabel="Explore Comments"
            exploreHref="/comments"
            quote={{ text: "Full collaboration features shipped in under 1 week.", attribution: "Chris Bakke · Head of Product @X", avatar: `${TRUST_AVATARS}/avatar-chris-bakke.png` }}
            preview={
              <div className="prim-doc">
                <div className="prim-doc-lines" aria-hidden="true">
                  <span className="prim-doc-line" style={{ width: "82%" }} />
                  <span className="prim-doc-line" style={{ width: "64%" }} />
                  <span className="prim-doc-line prim-doc-line--hl" style={{ width: "74%" }} />
                  <span className="prim-doc-line" style={{ width: "48%" }} />
                </div>
                <div className="prim-doc-comment">
                  <div className="prim-doc-comment-head">
                    <span className="prim-doc-status">
                      <svg className="prim-doc-status-dot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
                      Open
                      <svg className="prim-doc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                    <span className="prim-doc-flag">
                      <svg className="prim-doc-flag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
                      <svg className="prim-doc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                    <span className="prim-doc-head-actions">
                      <svg className="prim-doc-action-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                      <span className="prim-doc-resolve" aria-label="Resolve">
                        <svg className="prim-doc-resolve-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                      </span>
                    </span>
                  </div>
                  <div className="prim-doc-comment-msg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="prim-doc-avatar" src={`${TRUST_AVATARS}/avatar-chris-bakke.png`} alt="Chris" />
                    <span className="prim-doc-name">Chris</span>
                    <span className="prim-doc-time">2w</span>
                    <svg className="prim-doc-read" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 13l4 4 8-9" /><path d="M11 16l1.5 1.5L21 8" /></svg>
                  </div>
                  <p className="prim-doc-comment-text">Can we tone this down <span className="prim-doc-mention">@Mark</span></p>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">App.tsx<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltProvider apiKey=<span class="prim-code-str">"API_KEY"</span>&gt;
  &lt;VeltComments /&gt;

  &lt;div className=<span class="prim-code-str">"toolbar"</span>&gt;
    &lt;VeltCommentTool /&gt;
  &lt;/div&gt;
&lt;/VeltProvider&gt;` }} />
              </div>
            }
          />

          <PrimitiveCard
            showTestimonial={SHOW_TESTIMONIALS}
            num="02"
            name="SUGGESTIONS"
            headline="Propose edits inline, accept or reject like a diff."
            support="In any editor, or your own custom components."
            exploreLabel="Explore Suggestions"
            exploreHref="/suggestions"
            quote={{ text: "We were able to launch 5x faster than building from scratch.", attribution: "Roman Sevast · CEO @Awesomic", avatar: `${TRUST_AVATARS}/avatar-roman.png` }}
            preview={
              <div className="prim-card">
                <p className="prim-sug-p">Renewal is due within <span className="prim-sug-del">30 days</span> <span className="prim-sug-ins">45 days</span> of the notice date, and either party may terminate with <span className="prim-sug-del">written consent</span> <span className="prim-sug-ins">30 days written notice</span>.</p>
                <div className="prim-sug-actions">
                  <span className="prim-sug-accept">Accept</span>
                  <span className="prim-sug-reject">Reject</span>
                  <span className="prim-sug-agent">Suggested by Contract Agent</span>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">Editor.tsx<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span class="prim-code-kw">const</span> { id } = <span class="prim-code-kw">await</span> commitSuggestion({
  targetId: <span class="prim-code-str">'row.123'</span>,
  newValue: { qty: 7, price: 99 },
  summary: <span class="prim-code-str">'Bump qty + price'</span>,
  metadata: { source: <span class="prim-code-str">'manual'</span> },
});` }} />
              </div>
            }
          />

          <PrimitiveCard
            showTestimonial={SHOW_TESTIMONIALS}
            num="03"
            name="APPROVAL FLOWS"
            headline="Staged sign-off before anything ships."
            support="Routing, conditions, and a timestamped record."
            exploreLabel="Explore Approval flows"
            exploreHref="/approval-flows"
            quote={{ text: "Saved 3 FTEs and will boost retention.", attribution: "Hope Callaway · Senior PM @Leadpages", avatar: `${TRUST_AVATARS}/avatar-hope.png` }}
            preview={
              /* Workflow DAG (Altana demo): an Agent node fans out to two
                 PARALLEL human reviewers (Legal + Brand) that converge into an
                 exec sponsor, with a visible reject branch returning to the
                 author. The structure reads as a graph, not a linear list. */
              <div className="prim-dag" role="img" aria-label="Approval workflow: review agent feeds parallel Legal and Brand reviewers, converging into an exec sponsor, with a reject branch back to the author.">
                <div className="prim-dag-row prim-dag-row--source">
                  <div className="prim-dag-node">
                    <span className="prim-avatar-ai-22">AI</span>
                    <span className="prim-dag-node-label">Review agent</span>
                    <span className="prim-badge-done">done</span>
                  </div>
                </div>
                <div className="prim-dag-fan" aria-hidden="true">
                  <span className="prim-dag-fan-trunk" />
                  <span className="prim-dag-fan-split" />
                  <span className="prim-dag-fan-arm prim-dag-fan-arm--left" />
                  <span className="prim-dag-fan-arm prim-dag-fan-arm--right" />
                </div>
                <div className="prim-dag-row prim-dag-row--parallel">
                  <div className="prim-dag-node">
                    <span className="prim-avatar-mk-22">MK</span>
                    <span className="prim-dag-node-label">Legal</span>
                    <span className="prim-badge-done">approved</span>
                  </div>
                  <div className="prim-dag-node prim-dag-node--reject">
                    <span className="prim-avatar-jr-22">JR</span>
                    <span className="prim-dag-node-label">Brand</span>
                    <span className="prim-badge-pending">pending</span>
                  </div>
                </div>
                <div className="prim-dag-merge" aria-hidden="true">
                  <span className="prim-dag-merge-arm prim-dag-merge-arm--left" />
                  <span className="prim-dag-merge-arm prim-dag-merge-arm--right" />
                  <span className="prim-dag-merge-split" />
                  <span className="prim-dag-merge-trunk" />
                </div>
                <div className="prim-dag-row prim-dag-row--sink">
                  <div className="prim-dag-node prim-dag-node--muted">
                    <span className="prim-avatar-sp-22">SP</span>
                    <span className="prim-dag-node-label">Exec sponsor</span>
                    <span className="prim-badge-waiting">on quorum</span>
                  </div>
                </div>
                <div className="prim-dag-reject">
                  <span className="prim-dag-reject-branch" aria-hidden="true" />
                  <span className="prim-dag-reject-label">On reject: return to author</span>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">create-workflow.sh<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span class="prim-code-kw">curl</span> -X POST <span class="prim-code-str">https://api.velt.dev/v2/workflow/definitions/create</span>
{
  <span class="prim-code-str">"definitionId"</span>: <span class="prim-code-str">"marketing-copy-approval"</span>,
  <span class="prim-code-str">"name"</span>: <span class="prim-code-str">"Marketing copy approval"</span>,
  <span class="prim-code-str">"scope"</span>: { <span class="prim-code-str">"level"</span>: <span class="prim-code-str">"apiKey"</span> },
  <span class="prim-code-str">"nodes"</span>: [
    { <span class="prim-code-str">"nodeId"</span>: <span class="prim-code-str">"agent-draft"</span>, <span class="prim-code-str">"type"</span>: <span class="prim-code-str">"agent"</span>,
      <span class="prim-code-str">"config"</span>: { <span class="prim-code-str">"agentId"</span>: <span class="prim-code-str">"copy-agent-v1"</span> } },
    ...
  ]
}` }} />
              </div>
            }
          />

          <PrimitiveCard
            showTestimonial={SHOW_TESTIMONIALS}
            num="04"
            name="AUDIT TRAIL"
            headline="An immutable record of every action in your product."
            support="Audit-ready by default."
            exploreLabel="Explore Audit trail"
            exploreHref="/audit-trail"
            quote={{ text: "With Velt we turned months of development into weeks of delivery.", attribution: "Gavin McIver · Senior PM @Bigtincan", avatar: `${TRUST_AVATARS}/avatar-gavin.png` }}
            preview={
              <div className="prim-card-overflow">
                <div className="prim-audit-header">Q3 Pricing One-Pager · run #214<span className="prim-audit-export">Export CSV</span></div>
                <div className="prim-audit-log">
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:02:11</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Pricing Agent</strong> proposed change to cell C4</span><span className="prim-tag-agent">agent</span></div>
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:06:40</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Maya K.</strong> approved the change</span><span className="prim-tag-approved">approved</span></div>
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:06:41</span><span className="prim-audit-desc">Webhook <strong className="prim-audit-strong">change.applied</strong> delivered</span><span className="prim-tag-approved">200</span></div>
                  <div className="prim-audit-row-last"><span className="prim-audit-ts">15:18:03</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Sam P.</strong> rejected revision 7</span><span className="prim-tag-rejected">rejected</span></div>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">audit.ts<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltActivityLog
      variant=<span class="prim-code-str">"comments"</span>
      darkMode={<span class="prim-code-kw">true</span>}
    /&gt;` }} />
              </div>
            }
          />

          <PrimitiveCard
            showTestimonial={SHOW_TESTIMONIALS}
            num="05"
            name="NOTIFICATIONS"
            headline="Reach reviewers in-app, by email, in Slack and Teams, before the deadline slips."
            exploreLabel="Explore Notifications"
            exploreHref="/notifications"
            quote={{ text: "Velt's commenting and notification features are bundled with a lot of magic.", attribution: "Yuri Kleban · Sr. Product Manager @Google", avatar: `${TRUST_AVATARS}/avatar-yuri.png` }}
            preview={
              <div className="prim-card prim-notif">
                <div className="prim-notif-head">
                  <div className="prim-notif-head-title">
                    Notifications
                    <span className="prim-notif-count">3</span>
                  </div>
                </div>

                <div className="prim-notif-list">
                  <div className="prim-notif-item">
                    <MayaAvatar />
                    <div className="prim-notif-item-body">
                      <p className="prim-notif-item-title"><strong>Maya K.</strong> requested your review</p>
                      <p className="prim-notif-item-sub">Q3 Pricing One-Pager · due tomorrow</p>
                    </div>
                    <span className="prim-notif-time">2h</span>
                  </div>
                  <div className="prim-notif-item">
                    <AgentAvatar />
                    <div className="prim-notif-item-body">
                      <p className="prim-notif-item-title"><strong>Pricing Agent</strong> left 2 comments</p>
                      <p className="prim-notif-item-sub">On cell C3 and the executive summary</p>
                    </div>
                    <span className="prim-notif-time">1h</span>
                  </div>
                </div>

                <div className="prim-notif-channels">
                  <span className="prim-notif-channels-label">Delivered to</span>
                  <div className="prim-notif-chips">
                    <span className="prim-notif-chip"><ChannelIcon channel="in-app" />In App</span>
                    <span className="prim-notif-chip"><ChannelIcon channel="email" />Email</span>
                    <span className="prim-notif-chip"><ChannelIcon channel="slack" />Slack</span>
                  </div>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">App.tsx<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span class="prim-code-kw">import</span> { VeltNotificationsTool } <span class="prim-code-kw">from</span> <span class="prim-code-str">'@veltdev/react'</span>;

&lt;div className=<span class="prim-code-str">"toolbar"</span>&gt;
  &lt;VeltNotificationsTool /&gt;
&lt;/div&gt;` }} />
              </div>
            }
          />

          <PrimitiveCard
            showTestimonial={SHOW_TESTIMONIALS}
            num="06"
            name="MEMORY"
            isNew
            headline="Past decisions surface as precedent, so reviews stay consistent as teams grow."
            exploreLabel="Explore Memory"
            exploreHref="/memory"
            preview={
              <div className="prim-card prim-mem">
                <FlowerAvatar tone="warm" uid="mem" className="prim-mem-grad-avatar" />
                <div className="prim-mem-title">Pricing Agent Memory</div>
                <p className="prim-mem-body">Not re-flagging the 18% discount. Settled in May.</p>
                <div className="prim-mem-chips">
                  <span className="prim-mem-chip"><MemoryChipIcon kind="calendar" />In this quarter</span>
                  <span className="prim-mem-chip"><MemoryChipIcon kind="discount" />Discount Above 20%</span>
                  <span className="prim-mem-chip"><MemoryChipIcon kind="approved" />Approved 3 Times</span>
                  <span className="prim-mem-chip"><MemoryChipIcon kind="signoff" />After initial exec sponsor sign-off</span>
                </div>
                <p className="prim-mem-footer">Based on 12 prior reviews · In your organization</p>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">ingest.sh<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span class="prim-code-kw">curl</span> -X POST <span class="prim-code-str">https://api.velt.dev/v2/memory/knowledge/ingest</span>
<span class="prim-code-str">"data"</span>: {
  <span class="prim-code-str">"source"</span>: <span class="prim-code-str">"inline"</span>,
  <span class="prim-code-str">"file"</span>: {
    <span class="prim-code-str">"base64"</span>: <span class="prim-code-str">"$(base64 -w0 brand-guidelines.pdf)"</span>,
    <span class="prim-code-str">"mimeType"</span>: <span class="prim-code-str">"application/pdf"</span>,
    <span class="prim-code-str">"fileName"</span>: <span class="prim-code-str">"brand-guidelines.pdf"</span>,
    <span class="prim-code-str">"fileSize"</span>: 184320
  }
}` }} />
              </div>
            }
          />

          <PrimitiveCard
            showTestimonial={SHOW_TESTIMONIALS}
            num="07"
            name="REVIEW AGENTS"
            isNew
            wide
            headline="AI flags issues and proposes fixes as comments, before a human looks."
            support="The first-pass reviewer that never gets tired."
            exploreLabel="Explore Review agents"
            exploreHref="/review-agents"
            quote={{ text: "Increased engagement by 10% and helped ship 5x faster.", attribution: "William Angel · Lead PM @Trumpet", avatar: `${TRUST_AVATARS}/avatar-william.png` }}
            preview={<ReviewAgentsArtifact orientation="horizontal" />}
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">flag.sh<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span class="prim-code-kw">curl</span> -X POST <span class="prim-code-str">https://api.velt.dev/v2/commentannotations/add</span>
{ <span class="prim-code-str">"data"</span>: { <span class="prim-code-str">"documentId"</span>: <span class="prim-code-str">"launch-email"</span>, ...
  <span class="prim-code-str">"commentData"</span>: [{ <span class="prim-code-str">"commentText"</span>: <span class="prim-code-str">"Missing the required disclaimer."</span>,
    <span class="prim-code-str">"agent"</span>: {
      <span class="prim-code-str">"agentName"</span>: <span class="prim-code-str">"Compliance Agent"</span>,
      <span class="prim-code-str">"reason"</span>: {
        <span class="prim-code-str">"severity"</span>: <span class="prim-code-str">"high"</span>,
        <span class="prim-code-str">"suggestedFix"</span>: <span class="prim-code-str">"Add the 2025 policy disclaimer."</span>, ...
      }
    } }] } }` }} />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
