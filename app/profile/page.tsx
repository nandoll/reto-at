import { auth } from "@/lib/auth";
import { getEnrichedSeedBets } from "@/lib/data";
import ProfileBetList from "../components/ProfileBetList";

export default async function ProfilePage() {
  const session = await auth();
  const seedBets = getEnrichedSeedBets();

  return (
    <div className="flex flex-1 justify-center p-4">
      <div className="w-full max-w-4xl rounded-[var(--radius-pill)] border border-border-light bg-surface p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary">
              {session?.user?.name}
            </h1>
            <p className="text-xs text-text-tertiary">{session?.user?.email}</p>
          </div>
        </div>

        <ProfileBetList seedBets={seedBets} />
      </div>
    </div>
  );
}
