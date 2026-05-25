import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, Clock, MapPin, Users, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '../data/mockData'
import { activityService } from '../services/activityService'
import Badge from '../components/ui/Badge'
import { PageSpinner } from '../components/ui/Spinner'

const DIFFICULTIES = ['Tous', 'Facile', 'Moyen', 'Difficile']
const SORT_OPTIONS = [
  { value: 'popular', label: 'Popularité' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
]

export default function Activities() {
  const [searchParams] = useSearchParams()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [difficulty, setDifficulty] = useState('Tous')
  const [sort, setSort] = useState('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    activityService.getAll()
      .then(data => setActivities(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let list = [...activities]
    if (search) list = list.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.location.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'all') list = list.filter(a => a.category === category)
    if (difficulty !== 'Tous') list = list.filter(a => a.difficulty === difficulty)
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [activities, search, category, difficulty, sort])

  if (loading) return <PageSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Activités touristiques</h1>
        <p className="text-gray-500 dark:text-gray-400">Découvrez {activities.length} expériences uniques à travers le Maroc</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une activité ou destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-sm"
          />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm hover:border-orange-500 transition-colors sm:hidden"
        >
          <SlidersHorizontal size={16} /> Filtres
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className={`w-52 flex-shrink-0 space-y-6 ${filtersOpen ? 'block' : 'hidden'} sm:block`}>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Catégorie</h3>
            <div className="space-y-1">
              {CATEGORIES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    category === id
                      ? 'bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Difficulté</h3>
            <div className="space-y-1">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    difficulty === d
                      ? 'bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-3">🔍</p>
              <p className="font-medium">Aucune activité trouvée</p>
              <button onClick={() => { setSearch(''); setCategory('all'); setDifficulty('Tous') }} className="mt-3 text-sm text-orange-500 hover:underline">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(activity => (
                <Link
                  key={activity.id}
                  to={`/activities/${activity.id}`}
                  className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-500/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3"><Badge value={activity.category} /></div>
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
                      <Users size={11} /> {activity.maxPeople} max
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">{activity.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2"><MapPin size={11} />{activity.location}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Clock size={11} />{activity.duration}</span>
                      <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400" />{activity.rating}</span>
                      <span className={`px-2 py-0.5 rounded-full ${activity.difficulty === 'Facile' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : activity.difficulty === 'Difficile' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <span className="text-base font-bold text-orange-500">{activity.price.toLocaleString()} MAD</span>
                        <span className="text-xs text-gray-400"> /pers.</span>
                      </div>
                      <span className="text-xs font-medium text-blue-500 flex items-center gap-0.5">Réserver <ChevronRight size={13} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
