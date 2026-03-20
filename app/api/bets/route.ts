import { auth } from "@/lib/auth";
import { getEnrichedSeedBets } from "@/lib/data";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return errorResponse("No autorizado", 401);
  }

  const bets = getEnrichedSeedBets();
  return jsonResponse({ bets });
}
