import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">404</h1>
        <h2 className="text-xl font-semibold text-gray-700">Página no encontrada</h2>
        
        <p className="text-gray-600 leading-relaxed">
          El Pokémon que buscas no existe o la página ha sido movida.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-center"
          >
            Volver a la Pokédex
          </Link>
        </div>
      </div>
    </div>
  )
}