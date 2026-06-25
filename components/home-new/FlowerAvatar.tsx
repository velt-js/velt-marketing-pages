// Radial-gradient stops for the flower agent avatar, keyed by tone.
export const FLOWER_TONES = {
  warm: { from: "#FFE169", to: "#FF6B42" },
  violet: { from: "#FD69FF", to: "#5200AA" },
} as const;

/**
 * A gradient "flower" agent avatar (no unread badge). Ids are namespaced by
 * `uid` so multiple instances can coexist on one page without clashing.
 * @param {{ tone: keyof typeof FLOWER_TONES; uid: string; className?: string }} props Avatar config.
 * @returns {JSX.Element} The avatar SVG.
 */
export default function FlowerAvatar({ tone, uid, className }: { tone: keyof typeof FLOWER_TONES; uid: string; className?: string }) {
  const stops = FLOWER_TONES[tone];
  return (
    <svg className={className} viewBox="0 0 39 39" fill="none" aria-hidden="true">
      <g clipPath={`url(#clip0_${uid})`}>
        <circle cx="19" cy="20" r="19" fill={`url(#paint0_radial_${uid})`} />
        <g opacity="0.4" filter={`url(#filter0_f_${uid})`}>
          <path d="M14 38.5204C19.3333 37.8947 31.6 33.5146 38 21C38 33.5146 23.2308 41.0234 14 38.5204Z" fill="black" />
        </g>
        <g opacity="0.57" filter={`url(#filter1_f_${uid})`}>
          <path d="M25 1.6927C18.7778 2.59653 8.96667 9.42336 1.5 27.5C-4 11 6.5 -3 25 1.6927Z" fill="#FEFFFF" />
        </g>
        <g clipPath={`url(#clip1_${uid})`}>
          <path d="M16.6811 19.9091C16.6811 20.4998 16.9158 21.0663 17.3335 21.484C17.7512 21.9017 18.3177 22.1364 18.9084 22.1364C19.4991 22.1364 20.0656 21.9017 20.4833 21.484C20.901 21.0663 21.1357 20.4998 21.1357 19.9091M16.6811 19.9091C16.6811 19.3184 16.9158 18.7519 17.3335 18.3342C17.7512 17.9165 18.3177 17.6818 18.9084 17.6818C19.4991 17.6818 20.0656 17.9165 20.4833 18.3342C20.901 18.7519 21.1357 19.3184 21.1357 19.9091M16.6811 19.9091L14.7036 20.1808C14.068 20.2848 13.6107 20.4169 13.333 20.5788C12.8242 20.8767 12.4536 21.3635 12.302 21.9334C12.1504 22.5032 12.2301 23.1099 12.5238 23.6212C12.6678 23.8741 12.8604 24.0959 13.0905 24.274C13.3207 24.452 13.5838 24.5827 13.8648 24.6585C14.1457 24.7342 14.4389 24.7536 14.7273 24.7155C15.0158 24.6774 15.2939 24.5826 15.5455 24.4364C15.8038 24.2842 16.1179 23.988 16.4883 23.5418L17.795 22.1364L17.2575 23.1461C16.8737 24.0355 16.6814 24.6888 16.6814 25.1061C16.6814 25.6968 16.916 26.2633 17.3337 26.681C17.7514 27.0987 18.3179 27.3333 18.9086 27.3333C19.4994 27.3333 20.0659 27.0987 20.4836 26.681C20.9013 26.2633 21.1359 25.6968 21.1359 25.1061C21.1359 24.6896 20.9429 24.0362 20.5598 23.1461L20.0223 22.1364L21.3289 23.5418C21.6994 23.988 22.0135 24.2864 22.2718 24.4364C22.5234 24.5826 22.8015 24.6774 23.09 24.7155C23.3784 24.7536 23.6716 24.7342 23.9525 24.6585C24.2335 24.5827 24.4966 24.452 24.7268 24.274C24.9569 24.0959 25.1495 23.8741 25.2935 23.6212C25.5871 23.1099 25.6669 22.5032 25.5153 21.9334C25.3637 21.3635 24.9931 20.8767 24.4843 20.5788C24.1784 20.4013 23.6602 20.2588 22.9177 20.1511L21.1357 19.9091M16.6811 19.9091L14.8996 19.6678C14.1571 19.5602 13.6389 19.4176 13.333 19.2402C12.824 18.9423 12.4532 18.4553 12.3016 17.8853C12.1501 17.3152 12.2299 16.7084 12.5238 16.197C12.6677 15.9441 12.8603 15.7221 13.0904 15.544C13.3205 15.3659 13.5837 15.2352 13.8646 15.1593C14.1455 15.0835 14.4387 15.064 14.7272 15.1021C15.0157 15.1401 15.2938 15.2349 15.5455 15.3811C15.8038 15.5318 16.1179 15.8295 16.4883 16.2757L17.795 17.6818C17.0526 15.9802 16.6814 14.9905 16.6814 14.7121C16.6814 14.1214 16.916 13.5549 17.3337 13.1372C17.7514 12.7195 18.3179 12.4849 18.9086 12.4849C19.4994 12.4849 20.0659 12.7195 20.4836 13.1372C20.9013 13.5549 21.1359 14.1214 21.1359 14.7121C21.1359 15.1294 20.9436 15.7827 20.5598 16.6721L20.0223 17.6818L21.3289 16.2764C21.6994 15.831 22.0135 15.534 22.2718 15.3818C22.5235 15.2357 22.8016 15.1409 23.0901 15.1028C23.3786 15.0647 23.6718 15.0842 23.9527 15.1601C24.2336 15.2359 24.4968 15.3667 24.7269 15.5448C24.957 15.7229 25.1496 15.9448 25.2935 16.1977C25.5871 16.7091 25.6669 17.3157 25.5153 17.8856C25.3637 18.4554 24.9931 18.9423 24.4843 19.2402C24.2066 19.4013 23.7493 19.5342 23.1137 19.6374L21.1357 19.9091" stroke="#FEFFFF" strokeWidth="1.48485" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <defs>
        <filter id={`filter0_f_${uid}`} x="9" y="16" width="34" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.5" result={`effect1_foregroundBlur_${uid}`} />
        </filter>
        <filter id={`filter1_f_${uid}`} x="-5.96094" y="-5.22559" width="36.9609" height="38.7256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3" result={`effect1_foregroundBlur_${uid}`} />
        </filter>
        <radialGradient id={`paint0_radial_${uid}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14 1) rotate(82.5041) scale(38.3275)">
          <stop stopColor={stops.from} />
          <stop offset="1" stopColor={stops.to} />
        </radialGradient>
        <clipPath id={`clip0_${uid}`}>
          <rect y="1" width="38" height="38" rx="19" fill="white" />
        </clipPath>
        <clipPath id={`clip1_${uid}`}>
          <rect width="17.8182" height="17.8182" fill="white" transform="translate(10 11)" />
        </clipPath>
      </defs>
    </svg>
  );
}
