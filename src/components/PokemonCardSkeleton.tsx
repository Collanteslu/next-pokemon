import { memo } from 'react'
import Skeleton from './Skeleton'

function PokemonCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full">
      <div className="p-4 flex flex-col items-center">
        {/* Image skeleton */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4">
          <Skeleton variant="circular" className="w-full h-full" />
        </div>

        {/* Name skeleton */}
        <Skeleton variant="text" width="60%" height={24} className="mb-2" />

        {/* ID skeleton */}
        <Skeleton variant="text" width="40%" height={16} />
      </div>

      {/* Bottom bar skeleton */}
      <Skeleton variant="rectangular" height={4} className="rounded-none" />
    </div>
  )
}

export default memo(PokemonCardSkeleton)
