// Inline Tabler-style stroke icons used across the "Extend the Capabilities"
// section and its inner UI demos. Matches the codebase's existing pattern
// (LibraryBento.tsx:205-219, MentionsComposerStack.tsx) — no @tabler package.
//
// All icons accept `size`, `stroke`, and `strokeWidth` props with sensible
// defaults. Use `currentColor` so the parent can theme via `color`.

type IconProps = {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
};

export function BracesIcon({ size = 30, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 4a3 3 0 0 0-3 3v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a3 3 0 0 0 3 3" />
      <path d="M17 4a3 3 0 0 1 3 3v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a3 3 0 0 1-3 3" />
    </svg>
  );
}

export function SelectIcon({ size = 32, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

export function HashIcon({ size = 32, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <line x1="11" y1="4" x2="7" y2="20" />
      <line x1="17" y1="4" x2="13" y2="20" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 12, stroke = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, stroke = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function FileFilledIcon({ size = 16, stroke = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={stroke} aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    </svg>
  );
}

export function FileIcon({ size = 16, stroke = "currentColor", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function LinkIcon({ size = 16, stroke = "currentColor", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 14a5 5 0 0 0 7.07 0l3.07-3.07a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path d="M14 10a5 5 0 0 0-7.07 0l-3.07 3.07a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </svg>
  );
}

export function BrushIcon({ size = 20, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21v-4a4 4 0 1 1 4 4z" />
      <path d="M21 3a16 16 0 0 0-12.8 10.2" />
      <path d="M21 3a16 16 0 0 1-10.2 12.8" />
      <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
    </svg>
  );
}

export function BrandWindowsIcon({ size = 20, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 5.5l8-1.1v7.6h-8z" />
      <path d="M3 12h8v7.6l-8-1.1z" />
      <path d="M11 4l10-1.4v9h-10z" />
      <path d="M11 12h10v9.4l-10-1.4z" />
    </svg>
  );
}

export function BrandFigmaIcon({ size = 20, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path d="M6 3h6v6H9a3 3 0 0 1 0-6z" />
      <path d="M12 3h3a3 3 0 0 1 0 6h-3z" />
      <path d="M6 9h3a3 3 0 0 0 0 6 3 3 0 0 1-3-3z" />
      <path d="M9 15h3v3a3 3 0 1 1-3-3z" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 20, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
      <line x1="10" y1="14" x2="20" y2="4" />
      <polyline points="15 4 20 4 20 9" />
    </svg>
  );
}

export function Book2Icon({ size = 18, stroke = "currentColor", strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 4v16h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  );
}

// Small 4-dot ornament shown in the top-right of each Comments card.
export function FrameDotsIcon({ size = 24, stroke = "#c4c4c4" }: IconProps) {
  return (
    <svg width={size} height={size * 0.2} viewBox="0 0 24 5" fill={stroke} aria-hidden>
      <circle cx="2" cy="2.5" r="2" />
      <circle cx="9" cy="2.5" r="2" />
      <circle cx="16" cy="2.5" r="2" />
      <circle cx="23" cy="2.5" r="2" />
    </svg>
  );
}

export type SectionIconKey = "braces" | "select" | "hash";

export const SECTION_ICONS: Record<
  SectionIconKey,
  (props: IconProps) => React.JSX.Element
> = {
  braces: BracesIcon,
  select: SelectIcon,
  hash: HashIcon,
};
