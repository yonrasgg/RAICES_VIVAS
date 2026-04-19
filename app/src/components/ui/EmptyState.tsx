interface Props {
  icon?: string
  message: string
}

export default function EmptyState({ icon = '📭', message }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
      <span className="text-4xl">{icon}</span>
      <p className="text-sm">{message}</p>
    </div>
  )
}
