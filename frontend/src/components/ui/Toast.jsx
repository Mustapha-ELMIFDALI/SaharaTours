import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

let idCounter = 0

const STYLES = {
  success: 'bg-emerald-600 border-emerald-400',
  error:   'bg-red-600 border-red-400',
  info:    'bg-blue-600 border-blue-400',
  warning: 'bg-amber-500 border-amber-300',
}

const ICONS = {
  success: '✅',
  error:   '⛔',
  info:    'ℹ️',
  warning: '⚠️',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, message, type }])
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
    return id
  }, [removeToast])

  const toast = {
    show: showToast,
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    dismiss: removeToast,
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-80 max-w-[90vw]">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={`${STYLES[t.type] || STYLES.info} text-white border-l-4 rounded-lg shadow-lg px-4 py-3 flex items-start gap-3 animate-[fadeIn_0.2s_ease-out]`}
          >
            <span className="text-lg leading-none">{ICONS[t.type] || ICONS.info}</span>
            <p className="text-sm flex-1">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              aria-label="Fermer la notification"
              className="text-white/80 hover:text-white text-sm leading-none"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast doit être utilisé à l\'intérieur d\'un <ToastProvider>')
  }
  return ctx
}
