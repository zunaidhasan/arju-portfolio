import type { Service } from "../data/portfolio";

const paths: Record<Service["icon"], React.ReactNode> = {
  pen: (
    <path d="M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586" />
  ),
  layers: (
    <>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  spark: (
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20 M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z" />
    </>
  ),
  play: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M10 9l5 3-5 3V9z" />
    </>
  ),
  megaphone: (
    <path d="M3 11l14-5v12L3 13v-2z M7 13v5a2 2 0 004 0v-3.5 M19 5a4 4 0 010 8" />
  ),
};

export default function ServiceIcon({
  icon,
  className = "h-6 w-6",
}: {
  icon: Service["icon"];
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  );
}
