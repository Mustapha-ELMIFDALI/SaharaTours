import { useState, useEffect } from 'react'
import { Search, Check, X, Trash2, Calendar } from 'lucide-react'
import { reservationService } from '../../services/reservationService'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import { PageSpinner } from '../../components/ui/Spinner'

export default function ReservationsAdmin() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    reservationService.getAllReservations()
      .then(data => setReservations(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = reservations.filter(r => {
    const matchSearch = r.userName.toLowerCase().includes(search.toLowerCase()) || r.itemName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || r.status === statusFilter
    const matchType = typeFilter === 'all' || r.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const updateStatus = async (id, status) => {
    try {
      const updated = await reservationService.updateStatus(id, status)
      setReservations(rs => rs.map(r => r.id === id ? updated : r))
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la mise à jour')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await reservationService.delete(deleteId)
      setReservations(rs => rs.filter(r => r.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <PageSpinner />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Réservations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{reservations.length} réservations au total</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: reservations.length, color: 'text-gray-900 dark:text-white' },
          { label: 'Confirmées', value: reservations.filter(r => r.status === 'CONFIRMED').length, color: 'text-green-600' },
          { label: 'En attente', value: reservations.filter(r => r.status === 'PENDING').length, color: 'text-yellow-600' },
          { label: 'CA confirmé', value: `${reservations.filter(r => r.status === 'CONFIRMED').reduce((s, r) => s + r.total, 0).toLocaleString()} MAD`, color: 'text-orange-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'PENDING', 'CONFIRMED', 'CANCELLED'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${statusFilter === s ? 'bg-orange-500 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
              {s === 'all' ? 'Tous' : s === 'PENDING' ? 'En attente' : s === 'CONFIRMED' ? 'Confirmées' : 'Annulées'}
            </button>
          ))}
          <button onClick={() => setTypeFilter(typeFilter === 'activity' ? 'all' : 'activity')} className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${typeFilter === 'activity' ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
            🏔️ Activités
          </button>
          <button onClick={() => setTypeFilter(typeFilter === 'transport' ? 'all' : 'transport')} className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${typeFilter === 'transport' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
            🚗 Transport
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Réf.</th>
                <th className="text-left px-5 py-3 font-medium">Client</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Prestation</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3 font-medium">Statut</th>
                <th className="text-right px-5 py-3 font-medium">Montant</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className={`${i !== filtered.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''} hover:bg-gray-50/50 dark:hover:bg-gray-800/30`}>
                  <td className="px-5 py-3 text-xs text-gray-400 font-mono">#{String(r.id).padStart(4, '0')}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 text-xs font-bold flex-shrink-0">
                        {r.userName?.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{r.userName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell max-w-[180px]">
                    <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{r.itemName}</p>
                    <Badge value={r.type} />
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell text-gray-500 dark:text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={11} />{new Date(r.date).toLocaleDateString('fr-FR')}</span>
                  </td>
                  <td className="px-5 py-3"><Badge value={r.status} /></td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-900 dark:text-white text-xs">{r.total?.toLocaleString()} MAD</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {r.status === 'PENDING' && (
                        <>
                          <button onClick={() => updateStatus(r.id, 'CONFIRMED')} title="Confirmer" className="p-1.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                            <Check size={14} />
                          </button>
                          <button onClick={() => updateStatus(r.id, 'CANCELLED')} title="Annuler" className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <X size={14} />
                          </button>
                        </>
                      )}
                      {r.status === 'CONFIRMED' && (
                        <button onClick={() => updateStatus(r.id, 'CANCELLED')} title="Annuler" className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <X size={14} />
                        </button>
                      )}
                      <button onClick={() => setDeleteId(r.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">Aucune réservation correspondante</div>
          )}
        </div>
      </div>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer la réservation" size="sm">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">Cette réservation sera supprimée définitivement.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Annuler</button>
          <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold text-sm">
            {deleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
