import { finlandOgSize, renderFinlandOG } from "@/components/finland/og";

export const runtime = "edge";
export const alt = "Uniix Studio — digital experiences built to move businesses forward";
export const size = finlandOgSize;
export const contentType = "image/png";

export default function FinlandOG() {
  return renderFinlandOG("en");
}
