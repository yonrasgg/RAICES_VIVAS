import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { startAllSync, stopAllSync } from '@/db/sync'
import { seedAll } from '@/data/seed'
import AppShell from '@/components/layout/AppShell'
import HomePage from '@/pages/HomePage'
import EduDashboard from '@/pages/edu/EduDashboard'
import EduMateriales from '@/pages/edu/EduMateriales'
import EduDocentes from '@/pages/edu/EduDocentes'
import EduEstudiantes from '@/pages/edu/EduEstudiantes'
import EduEjercicios from '@/pages/edu/EduEjercicios'
import SabDashboard from '@/pages/sab/SabDashboard'
import SabCatalogo from '@/pages/sab/SabCatalogo'
import SabPortadores from '@/pages/sab/SabPortadores'
import SalDashboard from '@/pages/sal/SalDashboard'
import SalPacientes from '@/pages/sal/SalPacientes'
import SalCitas from '@/pages/sal/SalCitas'
import SalBrigadas from '@/pages/sal/SalBrigadas'

export default function App() {
  useEffect(() => {
    seedAll()
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
          <Route path="estudiantes" element={<EduEstudiantes />} />
          <Route path="ejercicios" element={<EduEjercicios />} />
        </Route>
        <Route path="sab">
          <Route index element={<SabDashboard />} />
          <Route path="catalogo" element={<SabCatalogo />} />
          <Route path="portadores" element={<SabPortadores />} />
        </Route>
        <Route path="sal">
          <Route index element={<SalDashboard />} />
          <Route path="pacientes" element={<SalPacientes />} />
          <Route path="citas" element={<SalCitas />} />
          <Route path="brigadas" element={<SalBrigadas />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
