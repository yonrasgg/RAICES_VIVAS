import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col text-[color:var(--color-ink)]">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 sm:px-6">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
