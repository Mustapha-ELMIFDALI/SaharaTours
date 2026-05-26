import { useState } from 'react'
import { User, Mail, Lock, Save, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'

export default function Profile() {
  const { user, updateUser } = useAuth()

  const [form, setForm] = useState({ name: user.name, email: user.email, password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setSuccess(false)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password && form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (form.password && form.password.length < 4) {
      setError('Le mot de passe doit contenir au moins 4 caractères')
      return
    }

    setLoading(true)
    try {
      const payload = { name: form.name, email: form.email }
      if (form.password) payload.password = form.password

      const updated = await userService.updateProfile(payload)
      updateUser({ name: updated.name, email: updated.email })
      setForm(f => ({ ...f, password: '', confirmPassword: '' }))
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.role === 'ADMIN' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
            {user.role}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Modifier mes informations</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <User size={14} className="inline mr-1.5" />Nom complet
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handle('name')}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <Mail size={14} className="inline mr-1.5" />Adresse email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handle('email')}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
            />
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <p className="text-xs text-gray-400 dark:text-gray-500">Laissez le mot de passe vide pour ne pas le modifier</p>

          {/* New password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <Lock size={14} className="inline mr-1.5" />Nouveau mot de passe
            </label>
            <input
              type="password"
              value={form.password}
              onChange={handle('password')}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <Lock size={14} className="inline mr-1.5" />Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={handle('confirmPassword')}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
            />
          </div>

          {/* Feedback */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
              <AlertCircle size={15} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
              <CheckCircle size={15} /> Profil mis à jour avec succès !
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            <Save size={16} />
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </div>
    </div>
  )
}
