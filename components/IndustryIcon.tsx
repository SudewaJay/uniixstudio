type Props = { slug: string };

const baseProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IndustryIcon({ slug }: Props) {
  switch (slug) {
    case "education":
      return (
        <svg {...baseProps}>
          <path d="M3 10l9-5 9 5-9 5-9-5z" />
          <path d="M7 12v5a5 4 0 0 0 10 0v-5" />
          <path d="M21 10v6" />
        </svg>
      );
    case "healthcare":
      return (
        <svg {...baseProps}>
          <path d="M3 12h4l2-4 4 8 2-5 2 1h4" />
        </svg>
      );
    case "ecommerce":
      return (
        <svg {...baseProps}>
          <path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7z" />
          <path d="M9 11V6a3 3 0 0 1 6 0v5" />
        </svg>
      );
    case "corporate":
      return (
        <svg {...baseProps}>
          <rect x="4" y="3" width="16" height="18" rx="1.2" />
          <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
        </svg>
      );
    case "travel":
      return (
        <svg {...baseProps}>
          <path d="M3 12l4 1 4-7 2 1-2 7 6 1 2-3 2 1-2 4 4 1-1 2-19-5 0-3z" />
        </svg>
      );
    case "real-estate":
      return (
        <svg {...baseProps}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 9v11h14V9" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "finance":
      return (
        <svg {...baseProps}>
          <path d="M3 17l5-5 4 4 9-9" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case "startups":
      return (
        <svg {...baseProps}>
          <path d="M14 4l6 6-9 9-6-6 9-9z" />
          <path d="M14.5 6.5l3 3" />
          <path d="M5 13l-2 6 6-2" />
        </svg>
      );
    default:
      return null;
  }
}
