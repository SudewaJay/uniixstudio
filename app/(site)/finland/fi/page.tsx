import FinlandPageView, { finlandMetadata } from "@/components/finland/FinlandPageView";

/** /finland/fi/ — Finnish version of the Finland page. */
export const metadata = finlandMetadata("fi");

export default function FinlandPageFi() {
  return <FinlandPageView lang="fi" />;
}
