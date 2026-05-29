import { useState, useEffect } from 'react'
import { Search, UserCheck, UserX, Trash2, Plus, ShieldCheck } from 'lucide-react'
import { userService } from '../../services/userService'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import { PageSpinner } from '../../components/ui/Spinner'

const EMPTY_ADMIN = { name: '', email: '', password: '' }

export default function UsersAdmin() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Add-admin modal
  const [addOpen, setAddOpen] = useState(false)
  const [adminForm, setAdminForm] = useState(EMPTY_ADMIN)
  const [addError, setAddError] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    userService.getAll()
      .then(data => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const toggleRole = async (u) => {
    const newRole = u.role === 'ADMIN' ? 'CLIENT' : 'ADMIN'
    try {
      const updated = await userService.update(u.id, { role: newRole })
      setUsers(us => us.map(x => x.id === u.id ? updated : x))
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la mise à jour')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await userService.delete(deleteId)
      setUsers(us => us.filter(u => u.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    setAddError('')
    if (adminForm.password.length < 4) { setAddError('Mot de passe trop court (min 4 caractères)'); return }
    setAdding(true)
    try {
      const created = await userService.createUser({ ...adminForm, role: 'ADMIN' })
      setUsers(us => [...us, created])
      setAddOpen(false)
      setAdminForm(EMPTY_ADMIN)
    } catch (err) {
      setAddError(err.response?.data?.message || 'Erreur lors de la création')
    } finally {
      setAdding(false)
    }
  }

  if (loading) return <PageSpinner />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Utilisateurs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{users.length} comptes enregistrés</p>
        </div>
        <button
          onClick={() => { setAdminForm(EMPTY_ADMIN); setAddError(''); setAddOpen(true) }}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Ajouter un admin
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher un utilisateur..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'CLIENT', 'ADMIN'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${roleFilter === r ? 'bg-orange-500 text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
              {r === 'all' ? 'Tous' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: users.length, color: 'text-gray-900 dark:text-white' },
          { label: 'Clients', value: users.filter(u => u.role === 'CLIENT').length, color: 'text-blue-600' },
          { label: 'Admins', value: users.filter(u => u.role === 'ADMIN').length, color: 'text-orange-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center shadow-sm">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Utilisateur</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Email</th>
                <th className="text-left px-5 py-3 font-medium">Rôle</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Inscrit le</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className={`${i !== filtered.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''} hover:bg-gray-50/50 dark:hover:bg-gray-800/30`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {u.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-xs">{u.name}</p>
                        <p className="text-xs text-gray-400 sm:hidden">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell text-gray-500 dark:text-gray-400 text-xs">{u.email}</td>
                  <td className="px-5 py-3"><Badge value={u.role} /></td>
                  <td className="px-5 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400 text-xs">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleRole(u)}
                        title={u.role === 'ADMIN' ? 'Rétrograder en client' : 'Promouvoir en admin'}
                        className={`p-1.5 rounded-lg transition-colors ${u.role === 'ADMIN' ? 'text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                      >
                        {u.role === 'ADMIN' ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                      <button onClick={() => setDeleteId(u.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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

      {/* Add Admin Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Créer un administrateur" size="sm">
        <form onSubmit={handleAddAdmin} className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <ShieldCheck size={20} className="text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-700 dark:text-orange-300">Ce compte aura accès au panneau d'administration complet.</p>
          </div>

          {[
            { label: 'Nom complet', field: 'name', type: 'text' },
            { label: 'Email', field: 'email', type: 'email' },
            { label: 'Mot de passe', field: 'password', type: 'password' },
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <input
                type={type}
                value={adminForm[field]}
                onChange={e => setAdminForm(f => ({ ...f, [field]: e.target.value }))}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
          ))}

          {addError && (
            <p className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2.5 rounded-xl">{addError}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setAddOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Annuler</button>
            <button type="submit" disabled={adding} className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold text-sm">
              {adding ? 'Création...' : 'Créer l\'admin'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer l'utilisateur" size="sm">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">Ce compte sera supprimé définitivement.</p>
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
