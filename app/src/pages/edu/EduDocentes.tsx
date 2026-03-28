import { useTranslation } from 'react-i18next'
import { useDB } from '@/hooks/useDB'
import type { Docente } from '@/types/edu'

export default function EduDocentes() {
  const { t } = useTranslation()
  const { docs, loading } = useDB<Docente>({
    mod: 'edu',
    type: 'docente',
  })

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="text-xl font-bold text-green-800">
        {t('edu.docentes')}
      </h2>

      {loading && (
        <p className="text-sm text-gray-500">{t('common.loading')}</p>
      )}

      {!loading && docs.length === 0 && (
        <p className="text-sm text-gray-400">{t('edu.sinResultados')}</p>
      )}

      <ul className="space-y-3">
        {docs.map((d) => (
          <li
            key={d._id}
            className="rounded-lg bg-white p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-800">{d.nombre}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {d.territorio} · {d.lengua_dominante}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
