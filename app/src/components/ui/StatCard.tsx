interface Props {
  icon: string
  label: string
  value: string | number
  color?: string
}

export default function StatCard({ icon, label, value, color = 'bg-white' }: Props) {
  return (
    <div className={`flex items-center gap-3 rounded-xl p-4 shadow-sm ${color}`}>
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  )
}
