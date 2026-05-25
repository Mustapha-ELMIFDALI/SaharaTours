import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, MapPin, Clock, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '../data/mockData'
import Badge from '../components/ui/Badge'
import { activityService } from '../services/activityService'
import { transportService } from '../services/transportService'

function ActivityCard({ activity }) {
  return (
    <Link to={`/activities/${activity.id}`} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
      <div className="relative overflow-hidden h-52">
        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge value={activity.category} />
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs opacity-80 flex items-center gap-1"><MapPin size={11} />{activity.location.split(',')[0]}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">{activity.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Clock size={12} />{activity.duration}</span>
          <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />{activity.rating} ({activity.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-orange-500">{activity.price} MAD</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">/pers.</span>
          </div>
          <span className="text-xs font-medium text-blue-500 flex items-center gap-1">Voir <ChevronRight size={13} /></span>
        </div>
      </div>
    </Link>
  )
}

const STATS = [
  { value: '500+', label: 'Aventuriers / mois' },
  { value: '4.9', label: 'Note moyenne' },
  { value: '24', label: 'Activités uniques' },
  { value: '8 ans', label: "D'expérience" },
]

const WHY_ITEMS = [
  { icon: '🏆', title: 'Guides certifiés', desc: 'Tous nos guides sont diplômés et passionnés par le Maroc authentique.' },
  { icon: '🛡️', title: 'Sécurité garantie', desc: 'Équipements aux normes, assurances incluses dans toutes nos excursions.' },
  { icon: '💬', title: 'Support 24/7', desc: 'Notre équipe vous accompagne avant, pendant et après votre voyage.' },
  { icon: '💰', title: 'Meilleur prix', desc: "Garantie du meilleur tarif. Nous alignons tout prix inférieur trouvé ailleurs." },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [featuredTransports, setFeaturedTransports] = useState([])
  const [loadingAct, setLoadingAct] = useState(true)
  const [loadingTrans, setLoadingTrans] = useState(true)

  useEffect(() => {
    activityService.getAll()
      .then(data => setFeatured(data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoadingAct(false))

    transportService.getAll()
      .then(data => setFeaturedTransports(data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoadingTrans(false))
  }, [])

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <span>🇲🇦</span> Agence touristique n°1 au Maroc
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Découvrez le Maroc
              <span className="text-orange-500 block">authentique</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Désert, montagne, mer ou médina — vivez des expériences inoubliables avec nos guides certifiés et nos transports confortables.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/activities" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30">
                Explorer les activités <ArrowRight size={18} />
              </Link>
              <Link to="/transport" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-6 py-3 rounded-xl transition-all backdrop-blur-sm">
                Nos transports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-orange-100 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange-500 text-sm font-medium mb-1">À la une</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Activités populaires</h2>
          </div>
          <Link to="/activities" className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 flex-shrink-0 ml-4">
            Voir tout <ArrowRight size={15} />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(({ id, label, icon }) => (
            <Link
              key={id}
              to={id === 'all' ? '/activities' : `/activities?category=${id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              {icon} {label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loadingAct
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-72 animate-pulse" />
              ))
            : featured.map((a) => <ActivityCard key={a.id} activity={a} />)
          }
        </div>
      </section>

      {/* Transport teaser */}
      <section className="bg-gray-900 dark:bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-orange-500 text-sm font-medium mb-1">Déplacements</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Services de transport</h2>
              <p className="text-gray-400 mt-2 text-sm">Voiture, van, bus ou transfert aéroport — nous assurons tous vos trajets.</p>
            </div>
            <Link to="/transport" className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 flex-shrink-0 ml-4">
              Voir tout <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {loadingTrans
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-gray-700 rounded-2xl h-56 animate-pulse" />
                ))
              : featuredTransports.map((t) => (
                <div key={t.id} className="group bg-gray-800 hover:bg-gray-700 rounded-2xl overflow-hidden transition-all cursor-pointer border border-gray-700 hover:border-orange-500/50">
                  <div className="h-44 overflow-hidden">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-1">{t.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-orange-500 font-bold">{t.pricePerTrip} MAD</span>
                        <span className="text-gray-500 text-xs"> / trajet</span>
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Users size={12} />{t.capacity} pers. max</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-medium mb-1">Pourquoi nous choisir</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">L'excellence au service de votre voyage</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_ITEMS.map(({ icon, title, desc }) => (
            <div key={title} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-lg transition-all group">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=40")', backgroundSize: 'cover' }} />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Prêt pour l'aventure ?</h2>
            <p className="text-orange-100 mb-8 text-lg">Créez votre compte et réservez votre première expérience au Maroc dès aujourd'hui.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/register" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                Commencer gratuitement
              </Link>
              <Link to="/activities" className="border border-white/40 text-white font-medium px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
                Parcourir les activités
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
