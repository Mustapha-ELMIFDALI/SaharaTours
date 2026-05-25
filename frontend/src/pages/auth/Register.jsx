import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas'); return }
    if (form.password.length < 4) { setError('Le mot de passe doit faire au moins 4 caractères'); return }
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const checks = [
    { ok: form.password.length >= 4, label: '4 caractères minimum' },
    { ok: form.password === form.confirm && form.confirm.length > 0, label: 'Mots de passe identiques' },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">🌍</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3 mb-1">Créer un compte</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Rejoignez des milliers de voyageurs au Maroc</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nom complet</label>
              <div className="relative">
                <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required value={form.name} onChange={update('name')} placeholder="Prénom Nom"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Adresse email</label>
              <div className="relative">
                <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required value={form.email} onChange={update('email')} placeholder="vous@exemple.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPwd ? 'text' : 'password'} required value={form.password} onChange={update('password')} placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPwd ? 'text' : 'password'} required value={form.confirm} onChange={update('confirm')} placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            {/* Password checks */}
            {(form.password || form.confirm) && (
              <div className="space-y-1.5">
                {checks.map(({ ok, label }) => (
                  <div key={label} className={`flex items-center gap-2 text-xs ${ok ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                    <CheckCircle size={13} className={ok ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'} />
                    {label}
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-800">
                <AlertCircle size={16} className="flex-shrink-0" /> {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors mt-2">
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              En vous inscrivant, vous acceptez nos{' '}
              <a href="#" className="text-orange-500 hover:underline">conditions d'utilisation</a>
            </p>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-orange-500 font-medium hover:text-orange-600">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
