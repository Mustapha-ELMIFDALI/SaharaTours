import { useState, useEffect } from 'react'
import { TrendingUp, Users, CalendarCheck, Mountain, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { STATS } from '../../data/mockData'
import { reservationService } from '../../services/reservationService'
import { userService } from '../../services/userService'
import Badge from '../../components/ui/Badge'
import { useTheme } from '../../context/ThemeContext'

const PIE_COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
      <p className="text-orange-500">{payload[0].value.toLocaleString()} MAD</p>
    </div>
  )
}

export default function Dashboard() {
  const { dark } = useTheme()
  const axisColor = dark ? '#6b7280' : '#9ca3af'

  const [reservations, setReservations] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    reservationService.getAllReservations().then(setReservations).catch(console.error)
    userService.getAll().then(setUsers).catch(console.error)
  }, [])

  const totalRevenue = reservations.filter(r => r.status === 'CONFIRMED').reduce((s, r) => s + r.total, 0)
  const recentRes = [...reservations].slice(-5).reverse()
  const clients = users.filter(u => u.role === 'CLIENT')

  const STAT_CARDS = [
    { label: 'Chiffre d\'affaires', value: `${(totalRevenue / 1000).toFixed(0)}K MAD`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', trend: '+18%' },
    { label: 'Réservations', value: reservations.length, icon: CalendarCheck, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', trend: '+12%' },
    { label: 'Clients', value: clients.length, icon: Users, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10', trend: '+24%' },
    { label: 'Activités actives', value: STATS.totalActivities, icon: Mountain, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', trend: '+2' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tableau de bord</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Vue d'ensemble de l'activité SaharaTours</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, bg, trend }) => (
          <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`${bg} p-3 rounded-xl`}>
                <Icon size={20} className={color} />
              </div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-0.5 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />{trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Revenus mensuels</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">2024</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={STATS.monthlyRevenue} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#374151' : '#f3f4f6'} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Répartition par catégorie</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={STATS.categoryBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {STATS.categoryBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {STATS.categoryBreakdown.map(({ name, value }, i) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-gray-600 dark:text-gray-400">{name}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reservations */}
      {recentRes.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Réservations récentes</h3>
            <a href="/admin/reservations" className="text-xs text-orange-500 hover:text-orange-600">Voir tout →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-5 py-3 font-medium">Client</th>
                  <th className="text-left px-5 py-3 font-medium">Prestation</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                  <th className="text-right px-5 py-3 font-medium">Montant</th>
                </tr>
              </thead>
              <tbody>
                {recentRes.map((r, i) => (
                  <tr key={r.id} className={`${i !== recentRes.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''} hover:bg-gray-50 dark:hover:bg-gray-800/50`}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 text-xs font-bold flex-shrink-0">
                          {r.userName?.charAt(0)}
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium text-xs">{r.userName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 max-w-[200px]">
                      <p className="text-gray-700 dark:text-gray-300 text-xs truncate">{r.itemName}</p>
                      <Badge value={r.type} />
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell text-gray-500 dark:text-gray-400 text-xs">{new Date(r.date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-3"><Badge value={r.status} /></td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900 dark:text-white text-xs">{r.total?.toLocaleString()} MAD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Clients */}
      {clients.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Clients récents</h3>
            <a href="/admin/users" className="text-xs text-orange-500 hover:text-orange-600">Voir tout →</a>
          </div>
          <div className="flex flex-wrap gap-3">
            {clients.map(u => (
              <div key={u.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {u.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
