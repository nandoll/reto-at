import { auth } from '@/lib/auth'

export default async function ProfilePage() {
  const session = await auth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Mis Apuestas</h1>
      <p className="mt-2 text-gray-600">
        Bienvenido, {session?.user?.name}
      </p>
      {/* Bet list will be implemented in Goal 3 */}
    </div>
  )
}
