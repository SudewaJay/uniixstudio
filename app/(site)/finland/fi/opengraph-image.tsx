import { finlandOgSize, renderFinlandOG } from "@/components/finland/og";

export const runtime = "edge";
export const alt = "Uniix Studio — digitaalisia kokemuksia, jotka vievät liiketoimintaa eteenpäin";
export const size = finlandOgSize;
export const contentType = "image/png";

export default function FinlandOGFi() {
  return renderFinlandOG("fi");
}
