import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, X, Send, Minimize2, ChevronDown } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { reservationService } from '../../services/reservationService'
import { sendChatMessage, getWelcomeMessage, getSuggestions } from '../../services/chatbotService'

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3 animate-in fade-in">
      <BotAvatar />
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.18}s`, animationDuration: '0.9s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Avatars ──────────────────────────────────────────────────────────────────
function BotAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
      🧭
    </div>
  )
}

function UserAvatar({ name }) {
  return (
    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
      {name ? name.charAt(0).toUpperCase() : 'V'}
    </div>
  )
}

// ─── Single message bubble ────────────────────────────────────────────────────
function MessageBubble({ msg, userName }) {
  const isUser = msg.role === 'user'

  // Render basic markdown: **bold**, newlines
  const renderText = (text) =>
    text.split('\n').map((line, li) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <p key={li} className={li > 0 ? 'mt-1.5' : ''}>
          {parts.map((part, pi) =>
            pi % 2 === 0 ? part : <strong key={pi} className="font-semibold">{part}</strong>
          )}
        </p>
      )
    })

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {isUser ? <UserAvatar name={userName} /> : <BotAvatar />}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-orange-500 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
        }`}
      >
        {renderText(msg.content)}
        <p className={`text-[10px] mt-1.5 ${isUser ? 'text-orange-100 text-right' : 'text-gray-400 dark:text-gray-500'}`}>
          {msg.time}
        </p>
      </div>
    </div>
  )
}

// ─── Suggestion chip ──────────────────────────────────────────────────────────
function Chip({ label, onClick }) {
  return (
    <button
      onClick={() => onClick(label)}
      className="text-xs px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all whitespace-nowrap"
    >
      {label}
    </button>
  )
}

// ─── Main Chatbot component ───────────────────────────────────────────────────
export default function Chatbot() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reservations, setReservations] = useState([])
  const [unread, setUnread] = useState(0)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [messages, setMessages] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const now = () =>
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  // Initialize on user change
  useEffect(() => {
    const welcome = getWelcomeMessage(user)
    setMessages([{ role: 'assistant', content: welcome, time: now() }])
    setSuggestions(getSuggestions(user))
    setUnread(0)
  }, [user?.id])

  // Fetch reservations for logged-in client
  useEffect(() => {
    if (user?.role === 'CLIENT') {
      reservationService.getUserReservations(user.id).then(setReservations).catch(() => {})
    } else {
      setReservations([])
    }
  }, [user?.id])

  // Auto-scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => scrollToBottom(false), 50)
      setUnread(0)
    }
  }, [open, minimized])

  useEffect(() => {
    if (open && !minimized) {
      scrollToBottom()
      setUnread(0)
    } else if (!open) {
      setUnread(u => u + 0) // don't increment on bot messages already shown
    }
  }, [messages])

  // Detect scroll position for "scroll to bottom" button
  const handleScroll = () => {
    const el = messagesContainerRef.current
    if (!el) return
    const fromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setShowScrollBtn(fromBottom > 80)
  }

  // Send message
  const handleSend = useCallback(async (text) => {
    const content = (text || input).trim()
    if (!content || loading) return
    setInput('')
    setSuggestions([]) // hide chips after first interaction
    setError(null)

    const userMsg = { role: 'user', content, time: now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Build history without timestamps for the API
    const historyForApi = messages
      .filter(m => m.role !== 'system')
      .map(({ role, content }) => ({ role, content }))

    try {
      const reply = await sendChatMessage(content, historyForApi, user, reservations)
      setMessages(prev => [...prev, { role: 'assistant', content: reply, time: now() }])
      if (!open || minimized) setUnread(u => u + 1)
    } catch (err) {
      console.error('Chatbot error:', err)
      setError('Désolé, une erreur est survenue. Réessayez dans un instant.')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '😕 Désolé, je rencontre une difficulté technique. Veuillez réessayer ou contacter l\'équipe au **+212 524 000 000**.',
        time: now()
      }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [input, loading, messages, user, reservations, open, minimized])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleOpen = () => {
    setOpen(o => !o)
    setMinimized(false)
    setUnread(0)
  }

  return (
    <>
      {/* ── Chat window ────────────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[90vw] sm:w-96 flex flex-col transition-all duration-300 origin-bottom-right ${
          open && !minimized
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          style={{ maxHeight: 'inherit' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🧭</div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-orange-500 rounded-full" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Sahara — Assistant</p>
                <p className="text-orange-100 text-xs">SaharaTours · En ligne</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(true)}
                className="p-1.5 rounded-lg text-orange-100 hover:bg-white/20 transition-colors"
                title="Réduire"
              >
                <Minimize2 size={15} />
              </button>
              <button
                onClick={toggleOpen}
                className="p-1.5 rounded-lg text-orange-100 hover:bg-white/20 transition-colors"
                title="Fermer"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Context banner for logged-in users */}
          {user && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 px-4 py-2 flex items-center gap-2 flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Connecté en tant que <strong>{user.name}</strong>
                {reservations.length > 0 && ` · ${reservations.length} réservation${reservations.length > 1 ? 's' : ''}`}
              </p>
            </div>
          )}

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-0 scroll-smooth"
            style={{ minHeight: 0 }}
          >
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} userName={user?.name} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to bottom button */}
          {showScrollBtn && (
            <div className="absolute bottom-20 right-6">
              <button
                onClick={() => scrollToBottom()}
                className="w-8 h-8 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          )}

          {/* Suggestion chips */}
          {suggestions.length > 0 && messages.length <= 1 && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0 border-t border-gray-100 dark:border-gray-800 pt-2">
              {suggestions.map(s => (
                <Chip key={s} label={s} onClick={handleSend} />
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-800 flex items-end gap-2 flex-shrink-0 bg-gray-50 dark:bg-gray-900/80">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={user ? 'Posez votre question…' : 'Renseignez-vous sur nos activités…'}
              rows={1}
              className="flex-1 resize-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-colors max-h-24 overflow-auto"
              style={{ lineHeight: '1.5' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 flex-shrink-0 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Minimized bar ───────────────────────────────────────────────────── */}
      {open && minimized && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 cursor-pointer hover:shadow-xl transition-all"
          onClick={() => setMinimized(false)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm">🧭</div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Sahara — Assistant</p>
            <p className="text-xs text-gray-400">Cliquez pour rouvrir</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 ml-1 rotate-180" />
        </div>
      )}

      {/* ── Floating button ─────────────────────────────────────────────────── */}
      <button
        onClick={toggleOpen}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          open
            ? 'bg-gray-800 dark:bg-gray-700 rotate-0'
            : 'bg-orange-500 hover:bg-orange-600'
        }`}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <>
            <MessageCircle size={24} className="text-white" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                {unread}
              </span>
            )}
          </>
        )}
      </button>
    </>
  )
}
