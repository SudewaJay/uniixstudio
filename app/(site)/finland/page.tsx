import FinlandPageView, { finlandMetadata } from "@/components/finland/FinlandPageView";

/**
 * /finland/ — English version (the default). Visitors in Finland or with a
 * Finnish browser are redirected to /finland/fi/ by middleware.ts unless they
 * have chosen English with the FI/EN switch.
 */
export const metadata = finlandMetadata("en");

export default function FinlandPage() {
  return <FinlandPageView lang="en" />;
}
