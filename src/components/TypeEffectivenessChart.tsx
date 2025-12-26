import { memo } from 'react'
import { getWeaknesses, getResistances, getImmunities } from '@/lib/typeEffectiveness'
import { TYPE_COLORS } from '@/lib/constants'

interface TypeEffectivenessChartProps {
  types: Array<{ type: { name: string } }>
}

function TypeEffectivenessChart({ types }: TypeEffectivenessChartProps) {
  const typeNames = types.map(t => t.type.name)
  const weaknesses = getWeaknesses(typeNames)
  const resistances = getResistances(typeNames)
  const immunities = getImmunities(typeNames)

  if (weaknesses.length === 0 && resistances.length === 0 && immunities.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Efectividad de Tipos
      </h2>

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Débil Contra (2x o más daño)
          </h3>
          <div className="flex flex-wrap gap-2">
            {weaknesses.map((type) => (
              <span
                key={type}
                className={`px-3 py-1.5 rounded-full text-white text-sm font-semibold capitalize ${TYPE_COLORS[type] || TYPE_COLORS.normal} shadow-md`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resistances */}
      {resistances.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Resistente Contra (0.5x o menos daño)
          </h3>
          <div className="flex flex-wrap gap-2">
            {resistances.map((type) => (
              <span
                key={type}
                className={`px-3 py-1.5 rounded-full text-white text-sm font-semibold capitalize ${TYPE_COLORS[type] || TYPE_COLORS.normal} opacity-70 shadow-md`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Immunities */}
      {immunities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                clipRule="evenodd"
              />
            </svg>
            Inmune Contra (sin efecto)
          </h3>
          <div className="flex flex-wrap gap-2">
            {immunities.map((type) => (
              <span
                key={type}
                className={`px-3 py-1.5 rounded-full text-white text-sm font-semibold capitalize ${TYPE_COLORS[type] || TYPE_COLORS.normal} opacity-50 shadow-md border-2 border-gray-400 dark:border-gray-600`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(TypeEffectivenessChart)
