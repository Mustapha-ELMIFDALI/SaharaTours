import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, Share2, Rss } from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="SaharaTours" className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Votre agence touristique de confiance au Maroc. Expériences authentiques, guides certifiés et souvenirs inoubliables.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><Globe size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><Share2 size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><Rss size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explorer</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/activities" className="hover:text-orange-500 transition-colors">Activités touristiques</Link></li>
              <li><Link to="/transport" className="hover:text-orange-500 transition-colors">Services de transport</Link></li>
              <li><Link to="/reservations" className="hover:text-orange-500 transition-colors">Mes réservations</Link></li>
              <li><Link to="/register" className="hover:text-orange-500 transition-colors">Créer un compte</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2 text-sm">
              {['Marrakech', 'Fès', 'Merzouga', 'Agadir', 'Essaouira', 'Chefchaouen'].map((city) => (
                <li key={city}><a href="#" className="hover:text-orange-500 transition-colors">{city}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span>12 Rue Ibn Battouta, Marrakech 40000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-orange-500 flex-shrink-0" />
                <span>+212 524 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-orange-500 flex-shrink-0" />
                <span>contact@saharatours.ma</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2024 SaharaTours. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Mentions légales</a>
            <a href="#" className="hover:text-gray-300">Confidentialité</a>
            <a href="#" className="hover:text-gray-300">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
