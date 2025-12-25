import { memo } from 'react'
import Skeleton from './Skeleton'

function PokemonDetailSkeleton() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back button skeleton */}
        <Skeleton variant="rectangular" width={150} height={36} className="mb-6" />

        <div className="max-w-4xl mx-auto">
          {/* Header section with image */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              {/* Pokemon image skeleton */}
              <div className="w-48 h-48 mx-auto mb-4">
                <Skeleton variant="circular" className="w-full h-full" />
              </div>
              {/* Name skeleton */}
              <Skeleton variant="text" width={200} height={40} className="mx-auto mb-2" />
              {/* ID and genus skeleton */}
              <Skeleton variant="text" width={150} height={28} className="mx-auto" />
            </div>
          </div>

          {/* Content section */}
          <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-6">
                {/* Basic info section */}
                <div>
                  <Skeleton variant="text" width={200} height={32} className="mb-4" />
                  <div className="space-y-3">
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>

                {/* Types section */}
                <div>
                  <Skeleton variant="text" width={100} height={32} className="mb-4" />
                  <div className="flex space-x-3">
                    <Skeleton variant="rectangular" width={100} height={36} className="rounded-full" />
                    <Skeleton variant="rectangular" width={100} height={36} className="rounded-full" />
                  </div>
                </div>

                {/* Abilities section */}
                <div>
                  <Skeleton variant="text" width={150} height={32} className="mb-4" />
                  <div className="space-y-2">
                    <Skeleton variant="rectangular" height={48} />
                    <Skeleton variant="rectangular" height={48} />
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Stats section */}
                <div>
                  <Skeleton variant="text" width={200} height={32} className="mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                          <Skeleton variant="text" width={100} height={20} />
                          <Skeleton variant="text" width={40} height={20} />
                        </div>
                        <Skeleton variant="rectangular" height={12} className="rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description section */}
                <div>
                  <Skeleton variant="text" width={150} height={32} className="mb-4" />
                  <div className="space-y-2">
                    <Skeleton variant="rectangular" height={20} />
                    <Skeleton variant="rectangular" height={20} />
                    <Skeleton variant="rectangular" height={20} width="80%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PokemonDetailSkeleton)
