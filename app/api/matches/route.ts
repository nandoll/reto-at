import { getMatches } from '@/lib/data'
import { jsonResponse } from '@/lib/api'

export async function GET() {
  const data = getMatches()
  return jsonResponse(data)
}
