const variants = {
  desert: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  mountain: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  sea: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  city: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  CONFIRMED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  ADMIN: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  CLIENT: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  activity: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  transport: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

const labels = {
  desert: '🏜️ Désert',
  mountain: '⛰️ Montagne',
  sea: '🌊 Mer',
  city: '🏙️ Ville',
  CONFIRMED: 'Confirmé',
  PENDING: 'En attente',
  CANCELLED: 'Annulé',
  ADMIN: 'Admin',
  CLIENT: 'Client',
  activity: 'Activité',
  transport: 'Transport',
}

export default function Badge({ value, children }) {
  const cls = variants[value] ?? variants.default
  const text = children ?? labels[value] ?? value
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {text}
    </span>
  )
}
