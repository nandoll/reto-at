# BetDay Lite

Aplicacion de apuestas deportivas simuladas. Reto tecnico Frontend Senior.

## Stack

- Next.js 16.2 (App Router)
- React 19
- TypeScript
- NextAuth v5 (Credentials)
- TailwindCSS v4
- Zustand (estado client-side + localStorage)
- Vitest + Testing Library

## Ejecutar en local

```bash
git clone https://github.com/nandoll/reto-at.git
cd reto-at
pnpm install
cp .env.example .env
pnpm dev
```

Abrir http://localhost:3000

### Credenciales demo

```
Email:    demo@betday.com
Password: demo123
```

## Estructura

```
app/
  page.tsx              Home - timeline de partidos
  profile/page.tsx      Perfil - historial de apuestas
  bets/[betId]/page.tsx Detalle de apuesta
  components/           Componentes UI
  api/                  API Routes (matches, bets)
data/                   JSON estatico (matches, bets seed)
store/                  Zustand store (cupon, apuestas)
lib/                    Auth, data helpers, teams
types/                  Tipos de dominio
```

## Decisiones clave

- Sin base de datos. Apuestas simuladas con Zustand + localStorage.
- Server Components cargan datos directamente, sin self-fetch.
- API Routes existen como endpoints funcionales independientes.
- Late Auth Gate: el usuario anonimo puede explorar y agregar al cupon. Login se pide al confirmar.
- Responsive mobile-first con breakpoint `lg` (1024px).
- Crests de equipos almacenados en `public/crests/` (sin dependencia de API externa).

## Deploy

Produccion en Vercel.
