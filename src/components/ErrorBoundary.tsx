'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch and handle React errors
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
          <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            {/* Error icon */}
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error message */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              ¡Algo salió mal!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Lo sentimos, ha ocurrido un error inesperado.
            </p>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-left overflow-auto">
                <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                  {this.state.error.message}
                </p>
                <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                  {this.state.error.stack}
                </pre>
              </div>
            )}

            {/* Reset button */}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/'
              }}
              className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-blue-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Volver al inicio
            </button>

            {/* Contact/report link */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Si el problema persiste, por favor{' '}
              <a
                href="mailto:support@pokedex.com"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                contáctanos
              </a>
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
