import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Thermometer, CheckCircle, Calendar, Minus, Plus, AlertCircle } from 'lucide-react'
import { transportService } from '../services/transportService'
import { activityService } from '../services/activityService'
import { reservationService } from '../services/reservationService'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/ui/Modal'
import { PageSpinner } from '../components/ui/Spinner'

const TYPE_FILTERS = [
  { id: 'all',     label: 'Tous' },
  { id: 'SUV',     label: '🚙 SUV / 4x4' },
  { id: 'Van',     label: '🚐 Van' },
  { id: 'Sedan',   label: '🚗 Berline' },
  { id: 'Bus',     label: '🚌 Bus' },
  { id: 'Minibus', label: '🚎 Minibus' },
  { id: 'Luxury',  label: '✨ Luxe' },
]

export default function Transport() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [transports, setTransports] = useState([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [date, setDate] = useState('')
  const [people, setPeople] = useState(1)
  const [bookLoading, setBookLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    transportService.getAll()
      .then(data => setTransports(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = typeFilter === 'all' ? transports : transports.filter(t => t.type === typeFilter)
  const minDate = new Date(); minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  const openBooking = (transport) => {
    if (!user) { navigate('/login'); return }
    setSelected(transport)
    setDate(''); setPeople(1); setSuccess(false); setError('')
  }

  const handleBook = async (e) => {
    e.preventDefault()
    if (!date) { setError('Veuillez choisir une date'); return }
    setBookLoading(true); setError('')
    try {
      await reservationService.create({
        userId: user.id,
        userName: user.name,
        type: 'transport',
        itemId: selected.id,
        itemName: selected.name,
        date,
        people,
        total: selected.pricePerTrip,
      })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de la réservation')
    } finally {
      setBookLoading(false)
    }
  }

  if (loading) return <PageSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Services de Transport</h1>
        <p className="text-gray-500 dark:text-gray-400">Confort et ponctualité pour tous vos déplacements au Maroc</p>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {TYPE_FILTERS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTypeFilter(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              typeFilter === id
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-orange-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(transport => (
          <div key={transport.id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-500/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img src={transport.image} alt={transport.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                {transport.driver && (
                  <span className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">Chauffeur inclus</span>
                )}
                {transport.ac && (
                  <span className="bg-blue-500/90 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1"><Thermometer size={11} />Clim</span>
                )}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-orange-500 transition-colors">{transport.name}</h3>

              {/* Specs */}
              <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1"><Users size={13} />{transport.capacity} pers.</span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">{transport.type}</span>
              </div>

              {/* Features */}
              {transport.features?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {transport.features.slice(0, 3).map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">{f}</span>
                  ))}
                </div>
              )}

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-orange-500">{transport.pricePerTrip.toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">MAD/trajet</span>
                  </div>
                  {transport.pricePerDay && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">{transport.pricePerDay.toLocaleString()} MAD/jour</p>
                  )}
                </div>
                <button
                  onClick={() => openBooking(transport)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal open={!!selected && !success} onClose={() => setSelected(null)} title={selected ? `Réserver — ${selected.name}` : ''}>
        {selected && (
          <form onSubmit={handleBook} className="space-y-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 flex items-center gap-3">
              <img src={selected.image} alt={selected.name} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{selected.name}</p>
                <p className="text-orange-500 font-bold">{selected.pricePerTrip.toLocaleString()} MAD / trajet</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Calendar size={14} className="inline mr-1" />Date du trajet
              </label>
              <input type="date" min={minDateStr} value={date} onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Users size={14} className="inline mr-1" />Nombre de passagers
              </label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setPeople(p => Math.max(1, p - 1))} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 transition-colors">
                  <Minus size={15} />
                </button>
                <span className="flex-1 text-center font-semibold text-lg text-gray-900 dark:text-white">{people}</span>
                <button type="button" onClick={() => setPeople(p => Math.min(selected.capacity, p + 1))} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 transition-colors">
                  <Plus size={15} />
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Capacité max : {selected.capacity} passagers</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                <span>Total</span>
                <span className="text-orange-500">{selected.pricePerTrip.toLocaleString()} MAD</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setSelected(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Annuler
              </button>
              <button type="submit" disabled={bookLoading} className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold text-sm transition-colors">
                {bookLoading ? 'En cours...' : 'Confirmer'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal open={success} onClose={() => { setSuccess(false); setSelected(null) }}>
        <div className="text-center py-4">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Réservation effectuée !</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Votre trajet est enregistré. Nous vous confirmons sous 24h.</p>
          <button onClick={() => { setSuccess(false); setSelected(null); navigate('/reservations') }} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
            Voir mes réservations
          </button>
        </div>
      </Modal>
    </div>
  )
}
