import { Suspense } from "react";
import { getMatches } from "@/lib/data";
import MatchTimeline from "./components/MatchTimeline";
import CuponSidebar from "./components/CuponSidebar";

async function MatchTimelineLoader() {
  const data = getMatches();
  return <MatchTimeline matches={data.matches} />;
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-3 lg:flex-row lg:p-4">
      <div className="min-w-0 flex-1">
        <Suspense fallback={<TimelineSkeleton />}>
          <MatchTimelineLoader />
        </Suspense>
      </div>
      <CuponSidebar />
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-pill)] border border-border-light bg-surface p-6">
      <div className="h-6 w-48 animate-pulse rounded bg-surface-secondary" />
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 w-[280px] animate-pulse rounded-[var(--radius-lg)] bg-surface-secondary"
          />
        ))}
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-[72px] animate-pulse rounded-[var(--radius-md)] bg-surface-secondary"
        />
      ))}
    </div>
  );
}
