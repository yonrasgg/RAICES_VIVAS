import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { startAllSync, stopAllSync } from '@/db/sync'
import AppShell from '@/components/layout/AppShell'
import HomePage from '@/pages/HomePage'
import EduDashboard from '@/pages/edu/EduDashboard'
import EduMateriales from '@/pages/edu/EduMateriales'
import EduDocentes from '@/pages/edu/EduDocentes'

export default function App() {
  useEffect(() => {
    startAllSync()
    return () => stopAllSync()
  }, [])

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="edu">
          <Route index element={<EduDashboard />} />
          <Route path="materiales" element={<EduMateriales />} />
          <Route path="docentes" element={<EduDocentes />} />
        </Route>
        {/* SAB and SAL modules — Sprint-04+ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
