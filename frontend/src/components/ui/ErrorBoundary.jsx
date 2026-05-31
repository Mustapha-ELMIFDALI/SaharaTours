import { Component } from 'react'

/**
 * Global error boundary — catches rendering errors anywhere in the React tree
 * below it and displays a friendly fallback UI instead of a blank white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production this would forward to a monitoring service (Sentry, etc.)
    console.error('ErrorBoundary caught an error:', error, info?.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Oups, une erreur est survenue
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Quelque chose s'est mal passé pendant l'affichage de cette page.
              Vous pouvez réessayer ou revenir à l'accueil.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="text-left text-xs text-red-500 bg-red-50 dark:bg-red-950/40 rounded-lg p-3 mb-6 overflow-auto max-h-40">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
