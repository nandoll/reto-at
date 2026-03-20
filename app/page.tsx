import { Suspense } from 'react'
import type { MatchesResponse } from '@/types/domain'
import MatchTimeline from './components/MatchTimeline'
import CuponSidebar from './components/CuponSidebar'

async function getMatches(): Promise<MatchesResponse> {
  const res = await fetch(`${process.env.AUTH_URL ?? 'http://localhost:3806'}/api/matches`, {
    cache: 'no-store',
  })
  return res.json()
}

async function MatchTimelineLoader() {
  const data = await getMatches()
  return <MatchTimeline matches={data.matches} />
}

export default function Home() {
  return (
    <div className="flex flex-1 gap-4 p-4">
      <div className="flex-1">
        <Suspense fallback={<TimelineSkeleton />}>
          <MatchTimelineLoader />
        </Suspense>
      </div>
      <CuponSidebar />
    </div>
  )
}

function TimelineSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-pill)] border border-border-light bg-surface p-6">
      <div className="h-6 w-48 animate-pulse rounded bg-surface-secondary" />
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 w-[280px] animate-pulse rounded-[var(--radius-lg)] bg-surface-secondary" />
        ))}
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-[72px] animate-pulse rounded-[var(--radius-md)] bg-surface-secondary" />
      ))}
    </div>
  )
}
