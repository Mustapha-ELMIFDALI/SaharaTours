import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Star, Clock, MapPin, Users, CheckCircle, Calendar, Minus, Plus, AlertCircle } from 'lucide-react'
import { activityService } from '../services/activityService'
import { reservationService } from '../services/reservationService'
import { useAuth } from '../context/AuthContext'
import Badge from '../components/ui/Badge'
import { PageSpinner } from '../components/ui/Spinner'

export default function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [activity, setActivity] = useState(null)
  const [loadingActivity, setLoadingActivity] = useState(true)
  const [date, setDate] = useState('')
  const [people, setPeople] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    activityService.getById(id)
      .then(data => setActivity(data))
      .catch(() => setActivity(null))
      .finally(() => setLoadingActivity(false))
  }, [id])

  if (loadingActivity) return <PageSpinner />
  if (!activity) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-3">😕</p>
      <p className="font-medium text-gray-700 dark:text-gray-300 mb-3">Activité introuvable</p>
      <Link to="/activities" className="text-orange-500 hover:underline text-sm">Retour aux activités</Link>
    </div>
  )

  const total = activity.price * people

  const handleBook = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    if (!date) { setError('Veuillez choisir une date'); return }
    setLoading(true)
    setError('')
    try {
      await reservationService.create({
        userId: user.id,
        userName: user.name,
        type: 'activity',
        itemId: activity.id,
        itemName: activity.title,
        date,
        people,
        total,
      })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de la réservation')
    } finally {
      setLoading(false)
    }
  }

  const minDate = new Date(); minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/activities" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
          <ArrowLeft size={15} /> Activités
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white truncate max-w-xs">{activity.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96">
            <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4"><Badge value={activity.category} /></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.floor(activity.rating) ? 'fill-yellow-400' : 'text-yellow-400/40'} />)}
                <span className="text-white text-sm ml-1">{activity.rating} ({activity.reviews} avis)</span>
              </div>
            </div>
          </div>

          {/* Title & info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{activity.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><MapPin size={15} className="text-orange-500" />{activity.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={15} className="text-orange-500" />{activity.duration}</span>
              <span className="flex items-center gap-1.5"><Users size={15} className="text-orange-500" />Max {activity.maxPeople} personnes</span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${activity.difficulty === 'Facile' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : activity.difficulty === 'Difficile' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                {activity.difficulty}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{activity.description}</p>
          </div>

          {/* Includes */}
          {activity.includes?.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Ce qui est inclus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activity.includes.map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: booking widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-transparent">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-orange-500">{activity.price.toLocaleString()}</span>
                <span className="text-gray-500 dark:text-gray-400">MAD / pers.</span>
              </div>
            </div>

            {success ? (
              <div className="p-6 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Réservation confirmée !</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Nous vous contacterons sous 24h pour la confirmation finale.</p>
                <Link to="/reservations" className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl transition-colors text-sm">
                  Voir mes réservations
                </Link>
              </div>
            ) : (
              <form onSubmit={handleBook} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    <Calendar size={13} className="inline mr-1" />Date souhaitée
                  </label>
                  <input
                    type="date"
                    min={minDateStr}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    <Users size={13} className="inline mr-1" />Nombre de personnes
                  </label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setPeople(p => Math.max(1, p - 1))} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 transition-colors text-gray-600 dark:text-gray-300">
                      <Minus size={15} />
                    </button>
                    <span className="flex-1 text-center font-semibold text-gray-900 dark:text-white">{people}</span>
                    <button type="button" onClick={() => setPeople(p => Math.min(activity.maxPeople, p + 1))} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 transition-colors text-gray-600 dark:text-gray-300">
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-1">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{activity.price.toLocaleString()} MAD × {people} pers.</span>
                    <span>{(activity.price * people).toLocaleString()} MAD</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 dark:text-white pt-1 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <span className="text-orange-500">{total.toLocaleString()} MAD</span>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                    <AlertCircle size={15} /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  {loading ? 'Réservation...' : user ? 'Réserver maintenant' : 'Se connecter pour réserver'}
                </button>

                {!user && (
                  <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                    <Link to="/login" className="text-orange-500 hover:underline">Connexion</Link> ou{' '}
                    <Link to="/register" className="text-orange-500 hover:underline">inscription</Link> requise
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
