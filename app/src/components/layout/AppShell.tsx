import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 px-4 py-6 pb-20">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
