import { getTeamCrestUrl, getTeamColor } from '@/lib/teams'

interface TeamCrestProps {
  teamId: string
  teamName: string
  size?: number
}

export default function TeamCrest({ teamId, teamName, size = 32 }: TeamCrestProps) {
  const url = getTeamCrestUrl(teamId)
  const color = getTeamColor(teamId)

  if (!url) {
    return (
      <div
        className="shrink-0 rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    )
  }

  return (
    <img
      src={url}
      alt={teamName}
      width={size}
      height={size}
      className="shrink-0 object-contain"
    />
  )
}
