import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getEnrichedSeedBets, getMatches } from '@/lib/data'
import BetDetail from './BetDetail'

interface Props {
  params: Promise<{ betId: string }>
}

export default async function BetDetailPage({ params }: Props) {
  const { betId } = await params
  const session = await auth()
  const seedBets = getEnrichedSeedBets()
  const seedBet = seedBets.find((b) => b.id === betId)
  const matches = getMatches()

  if (!session?.user) {
    notFound()
  }

  return (
    <BetDetail
      betId={betId}
      seedBet={seedBet ?? null}
      seedBets={seedBets}
      matches={matches.matches}
    />
  )
}
