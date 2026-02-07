'use client'

import { useProfileStore } from '@/src/store/ProfileStore'

export const QuickActions = () => {
  const {
    closedTilesData,
    openTiles,
    savedAmount,
    totalAmount,
    reset,
    addSkippedDay,
  } = useProfileStore()

  const handleSkipToday = () => {
    const today = new Date()
    addSkippedDay(today)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      reset()
    }
  }

  const isCompleted = closedTilesData.length === 30  // All 30 tiles closed

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Skip Today Button */}
          <button
            onClick={handleSkipToday}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Skip Today
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Progress
          </button>

          {/* Celebrate Button (if completed) */}
          {isCompleted ? (
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Completed! 🎉
            </button>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl font-semibold cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Keep Going!
            </button>
          )}
        </div>

        {/* Stats Summary */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {closedTilesData.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tiles Closed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {openTiles.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tiles Open</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${savedAmount}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Saved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                ${totalAmount - savedAmount}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}