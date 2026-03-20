const teamColors: Record<string, string> = {
  ars: '#EF0107', liv: '#C8102E', che: '#034694', mci: '#6CABDD',
  mun: '#DA291C', tot: '#132257', bha: '#0057B8', bre: '#E30613',
  lei: '#003090', whu: '#7A263A', wol: '#FDB913', nfo: '#DD0000',
  ful: '#000000', avl: '#670E36', eve: '#003399', cry: '#1B458F',
  new: '#241F20', bou: '#DA291C', bur: '#6C1D45', shu: '#EE2737',
}

export function getTeamCrestUrl(teamId: string | undefined): string {
  if (!teamId || !teamColors[teamId]) return ''
  return `/crests/${teamId}.png`
}

export function getTeamColor(teamId: string | undefined): string {
  if (!teamId) return '#999999'
  return teamColors[teamId] ?? '#999999'
}
