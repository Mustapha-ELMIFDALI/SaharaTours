import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, MapPin, AlertCircle, Clock } from 'lucide-react'
import { reservationService } from '../services/reservationService'
import { useAuth } from '../context/AuthContext'
import Badge from '../components/ui/Badge'
import { PageSpinner } from '../components/ui/Spinner'

const STATUS_COLORS = {
  CONFIRMED: 'border-l-green-500',
  PENDING: 'border-l-yellow-500',
  CANCELLED: 'border-l-red-500',
}

export default function Reservations() {
  const { user } = useAuth()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    reservationService.getUserReservations(user.id).then(data => {
      setReservations(data)
      setLoading(false)
    })
  }, [user.id])

  const filtered = filter === 'all' ? reservations : reservations.filter(r => r.status === filter)

  const counts = {
    all: reservations.length,
    CONFIRMED: reservations.filter(r => r.status === 'CONFIRMED').length,
    PENDING: reservations.filter(r => r.status === 'PENDING').length,
    CANCELLED: reservations.filter(r => r.status === 'CANCELLED').length,
  }

  if (loading) return <PageSpinner />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Mes réservations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Bonjour {user.name.split(' ')[0]} — voici l'historique de vos réservations.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { key: 'all', label: 'Total', color: 'text-gray-900 dark:text-white' },
          { key: 'CONFIRMED', label: 'Confirmées', color: 'text-green-600' },
          { key: 'PENDING', label: 'En attente', color: 'text-yellow-600' },
          { key: 'CANCELLED', label: 'Annulées', color: 'text-red-500' },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`p-4 rounded-2xl text-left transition-all border ${
              filter === key
                ? 'border-orange-300 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-500/10 shadow-sm'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300'
            }`}
          >
            <p className={`text-2xl font-bold ${color}`}>{counts[key]}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-3">📋</p>
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Aucune réservation</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Commencez par explorer nos activités et transports.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/activities" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
              Voir les activités
            </Link>
            <Link to="/transport" className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Voir le transport
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(res => (
            <div key={res.id} className={`bg-white dark:bg-gray-900 rounded-2xl border-l-4 ${STATUS_COLORS[res.status]} border border-gray-100 dark:border-gray-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge value={res.type} />
                  <Badge value={res.status} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2">{res.itemName}</h3>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={12} />{new Date(res.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Users size={12} />{res.people} {res.people > 1 ? 'personnes' : 'personne'}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />Réservé le {new Date(res.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 flex-shrink-0">
                <p className="text-lg font-bold text-orange-500">{res.total.toLocaleString()} MAD</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Réf. #{String(res.id).padStart(4, '0')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
