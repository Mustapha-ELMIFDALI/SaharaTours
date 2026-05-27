import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Search, Star } from 'lucide-react'
import { CATEGORIES } from '../../data/mockData'
import { activityService } from '../../services/activityService'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import { PageSpinner } from '../../components/ui/Spinner'

const EMPTY_FORM = { title: '', category: 'desert', description: '', price: '', duration: '', difficulty: 'Facile', maxPeople: '', location: '', image: '' }

export default function ActivitiesAdmin() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    activityService.getAll()
      .then(data => setActivities(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = activities.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.location.toLowerCase().includes(search.toLowerCase())
  )

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setModalOpen(true) }
  const openEdit = (a) => {
    setForm({ title: a.title, category: a.category, description: a.description || '', price: a.price, duration: a.duration, difficulty: a.difficulty, maxPeople: a.maxPeople, location: a.location, image: a.image || '' })
    setEditId(a.id); setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, price: Number(form.price), maxPeople: Number(form.maxPeople) }
      if (editId) {
        const updated = await activityService.update(editId, payload)
        setActivities(acts => acts.map(a => a.id === editId ? updated : a))
      } else {
        const created = await activityService.create(payload)
        setActivities(acts => [...acts, created])
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
      await activityService.delete(deleteId)
      setActivities(acts => acts.filter(a => a.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || `Erreur ${err.response?.status || ''} : impossible de supprimer`)
    } finally {
      setDeleting(false)
    }
  }

  const InputField = ({ label, field, type = 'text', options }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {options ? (
        <select value={form[field]} onChange={update(field)} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50">
          {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[field]} onChange={update(field)} required className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
      )}
    </div>
  )

  if (loading) return <PageSpinner />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activités</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{activities.length} activités au total</p>
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
                <th className="text-left px-5 py-3 font-medium">Activité</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Catégorie</th>
                <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Lieu</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Note</th>
                <th className="text-right px-5 py-3 font-medium">Prix</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} className={`${i !== filtered.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''} hover:bg-gray-50/50 dark:hover:bg-gray-800/30`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-xs truncate max-w-[160px]">{a.title}</p>
                        <p className="text-xs text-gray-400">{a.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell"><Badge value={a.category} /></td>
                  <td className="px-5 py-3 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-xs">{a.location}</td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />{a.rating}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-orange-500 text-xs">{a.price?.toLocaleString()} MAD</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(a.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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

      {/* Create/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Modifier l\'activité' : 'Nouvelle activité'} size="lg">
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <InputField label="Titre" field="title" />
          </div>
          <InputField label="Catégorie" field="category" options={CATEGORIES.filter(c => c.id !== 'all').map(c => ({ value: c.id, label: c.label }))} />
          <InputField label="Difficulté" field="difficulty" options={['Facile', 'Moyen', 'Difficile']} />
          <InputField label="Prix (MAD/pers.)" field="price" type="text" />
          <InputField label="Durée" field="duration" />
          <InputField label="Personnes max" field="maxPeople" type="number" />
          <InputField label="Lieu" field="location" />
          <div className="sm:col-span-2">
            <InputField label="URL Image" field="image" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={form.description} onChange={update('description')} rows={3} required className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none" />
          </div>
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Annuler</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold text-sm transition-colors">
              {saving ? 'Enregistrement...' : editId ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmer la suppression" size="sm">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">Cette activité sera supprimée définitivement.</p>
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
