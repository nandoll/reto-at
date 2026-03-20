import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Página no encontrada</p>
      <Link
        href="/"
        className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
