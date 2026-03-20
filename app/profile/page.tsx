import { auth } from '@/lib/auth'
import { getEnrichedSeedBets } from '@/lib/data'
import ProfileBetList from '../components/ProfileBetList'

export default async function ProfilePage() {
  const session = await auth()
  const seedBets = getEnrichedSeedBets()

  return (
    <div className="flex flex-1 justify-center p-4">
      <div className="w-full max-w-4xl rounded-[var(--radius-pill)] border border-border-light bg-surface p-6">
        <ProfileHeader name={session?.user?.name} email={session?.user?.email} seedBets={seedBets} />
        <ProfileBetList seedBets={seedBets} />
      </div>
    </div>
  )
}

function ProfileHeader({ name, email, seedBets }: { name?: string | null; email?: string | null; seedBets: { status: string; return: number | null; stake: number }[] }) {
  const stats = {
    profit: seedBets.reduce((sum, b) => sum + (b.return ?? 0), 0),
    winRate: seedBets.length > 0 ? Math.round((seedBets.filter(b => b.status === 'WON').length / seedBets.length) * 100) : 0,
    active: seedBets.filter(b => b.status === 'PENDING').length,
    atRisk: seedBets.filter(b => b.status === 'PENDING').reduce((sum, b) => sum + b.stake, 0),
  }

  return (
    <div className="mb-6 border-b border-border-light pb-6">
      <div className="flex items-center gap-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
          {name?.charAt(0).toUpperCase() ?? 'U'}
        </div>
        <div className="mr-4">
          <h1 className="text-lg font-bold text-text-primary">{name}</h1>
          <p className="text-xs text-text-tertiary">{email}</p>
        </div>

        <div className="flex items-center gap-6 border-l border-border-light pl-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gain-positive">+S/.{stats.profit.toFixed(0)}</span>
            <span className="text-[10px] text-text-tertiary">Profit</span>
          </div>
        </div>
        <div className="border-l border-border-light pl-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-text-primary">{stats.winRate}%</span>
            <span className="text-[10px] text-text-tertiary">Win Rate</span>
          </div>
        </div>
        <div className="border-l border-border-light pl-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">{stats.active}</span>
            <span className="text-[10px] text-text-tertiary">Activas</span>
          </div>
        </div>
        <div className="border-l border-border-light pl-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-text-primary">S/.{stats.atRisk.toFixed(0)}</span>
            <span className="text-[10px] text-text-tertiary">En riesgo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
