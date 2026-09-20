"use client";

import { useState, useMemo } from "react";
import PortfolioHero, { type ViewMode } from "./PortfolioHero";
import PortfolioFilterBar, {
  type DisciplineFilter,
  type TierFilter,
} from "./PortfolioFilterBar";
import EditorialProjectFeed from "./EditorialProjectFeed";
import ArchiveDirectoryTable from "./ArchiveDirectoryTable";
import PortfolioCTA from "./PortfolioCTA";
import type { Project } from "@/lib/projects";

type Props = {
  initialProjects: Project[];
};

export default function PortfolioArchiveClient({ initialProjects }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("stories");
  const [discipline, setDiscipline] = useState<DisciplineFilter>("all");
  const [tier, setTier] = useState<TierFilter>("all");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Filter by Discipline
      if (discipline !== "all") {
        const tags = (project.tags ?? []).map((t) => t.toLowerCase());
        const overline = project.overline.toLowerCase();
        const services = (project.services ?? []).map((s) => s.toLowerCase());
        const allDescriptors = [...tags, overline, ...services];

        if (discipline === "brand") {
          const isBrand = allDescriptors.some(
            (d) =>
              d.includes("brand") ||
              d.includes("logo") ||
              d.includes("guideline"),
          );
          if (!isBrand) return false;
        } else if (discipline === "web") {
          const isWeb = allDescriptors.some(
            (d) =>
              d.includes("web") ||
              d.includes("wordpress") ||
              d.includes("ui/ux") ||
              d.includes("development") ||
              d.includes("platform"),
          );
          if (!isWeb) return false;
        } else if (discipline === "seo") {
          const isSeo = allDescriptors.some(
            (d) =>
              d.includes("seo") ||
              d.includes("growth") ||
              d.includes("optimization"),
          );
          if (!isSeo) return false;
        } else if (discipline === "social") {
          const isSocial = allDescriptors.some(
            (d) =>
              d.includes("social") ||
              d.includes("motion") ||
              d.includes("video") ||
              d.includes("graphic"),
          );
          if (!isSocial) return false;
        }
      }

      // Filter by Audience Tier
      if (tier !== "all") {
        if (project.audienceTier !== tier) {
          return false;
        }
      }

      return true;
    });
  }, [initialProjects, discipline, tier]);

  const handleReset = () => {
    setDiscipline("all");
    setTier("all");
  };

  return (
    <>
      <PortfolioHero
        totalCount={initialProjects.length}
        filteredCount={filteredProjects.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <PortfolioFilterBar
        discipline={discipline}
        tier={tier}
        onDisciplineChange={setDiscipline}
        onTierChange={setTier}
        onReset={handleReset}
        filteredCount={filteredProjects.length}
        totalCount={initialProjects.length}
      />

      <main id="archive-content" tabIndex={-1}>
        {viewMode === "stories" ? (
          <EditorialProjectFeed projects={filteredProjects} />
        ) : (
          <ArchiveDirectoryTable projects={filteredProjects} />
        )}
      </main>

      <PortfolioCTA />
    </>
  );
}
