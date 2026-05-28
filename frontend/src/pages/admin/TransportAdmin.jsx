import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Search, Users } from 'lucide-react'
import { transportService } from '../../services/transportService'
import Modal from '../../components/ui/Modal'
import { PageSpinner } from '../../components/ui/Spinner'

const TYPES = ['SUV', 'Van', 'Sedan', 'Bus', 'Minibus', 'Luxury']
const TYPE_LABELS = { SUV: '🚙 SUV / 4x4', Van: '🚐 Van', Sedan: '🚗 Berline', Bus: '🚌 Bus', Minibus: '🚎 Minibus', Luxury: '✨ Luxe' }
const EMPTY_FORM = { name: '', type: 'SUV', capacity: '', pricePerTrip: '', pricePerDay: '', driver: true, ac: true, image: '' }

export default function TransportAdmin() {
  const [transports, setTransports] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    transportService.getAll()
      .then(data => setTransports(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = transports.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const update = (field) => (e) => setForm(f => ({
    ...f,
    [field]: field === 'driver' || field === 'ac' ? e.target.checked : e.target.value
  }))

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setModalOpen(true) }
  const openEdit = (t) => {
    setForm({ name: t.name, type: t.type, capacity: t.capacity, pricePerTrip: t.pricePerTrip, pricePerDay: t.pricePerDay || '', driver: t.driver, ac: t.ac, image: t.image || '' })
    setEditId(t.id); setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        capacity: Number(form.capacity),
        pricePerTrip: Number(form.pricePerTrip),
        pricePerDay: form.pricePerDay ? Number(form.pricePerDay) : null,
      }
      if (editId) {
        const updated = await transportService.update(editId, payload)
        setTransports(ts => ts.map(t => t.id === editId ? updated : t))
      } else {
        const created = await transportService.create(payload)
        setTransports(ts => [...ts, created])
      }
      setModalOpen(false)
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || `Erreur ${err.response?.status || ''} : impossible de sauvegarder`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await transportService.delete(deleteId)
      setTransports(ts => ts.filter(t => t.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || `Erreur ${err.response?.status || ''} : impossible de supprimer`)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <PageSpinner />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transport</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{transports.length} véhicules / services</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Véhicule</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Type</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Capacité</th>
                <th className="text-right px-5 py-3 font-medium">Prix / trajet</th>
                <th className="text-right px-5 py-3 font-medium hidden lg:table-cell">Prix / jour</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} className={`${i !== filtered.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''} hover:bg-gray-50/50 dark:hover:bg-gray-800/30`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={t.image} alt={t.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-xs truncate max-w-[150px]">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.driver ? 'Avec chauffeur' : 'Sans chauffeur'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{TYPE_LABELS[t.type] || t.type}</span>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Users size={12} /> {t.capacity} pers.
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-orange-500 text-xs">{t.pricePerTrip?.toLocaleString()} MAD</td>
                  <td className="px-5 py-3 text-right hidden lg:table-cell text-gray-500 dark:text-gray-400 text-xs">{t.pricePerDay ? `${t.pricePerDay.toLocaleString()} MAD` : '—'}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(t.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Modifier' : 'Nouveau transport'} size="lg">
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Nom', field: 'name' },
            { label: 'Capacité (pers.)', field: 'capacity', type: 'number' },
            { label: 'Prix / trajet (MAD)', field: 'pricePerTrip', type: 'number' },
            { label: 'Prix / jour (MAD, optionnel)', field: 'pricePerDay', type: 'number' },
          ].map(({ label, field, type = 'text' }) => (
            <div key={field}>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <input type={type} value={form[field]} onChange={update(field)} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select value={form.type} onChange={update('type')} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50">
              {TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">URL Image</label>
            <input type="text" value={form.image} onChange={update('image')} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
          </div>
          <div className="sm:col-span-2 flex gap-4">
            {[['driver', 'Chauffeur inclus'], ['ac', 'Climatisation']].map(([field, label]) => (
              <label key={field} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form[field]} onChange={update(field)} className="rounded text-orange-500 focus:ring-orange-500/50" />
                {label}
              </label>
            ))}
          </div>
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Annuler</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold text-sm">
              {saving ? 'Enregistrement...' : editId ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmer" size="sm">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">Ce service de transport sera supprimé définitivement.</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Annuler</button>
          <button type="button" onClick={handleDelete} disabled={deleting} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold text-sm">
            {deleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
