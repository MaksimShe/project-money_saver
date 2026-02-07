'use client'

import { useProfileStore } from '@/src/store/ProfileStore'
import { useEffect } from 'react'
import cn from 'classnames'

export const ProfileSummary = () => {
  const {
    startDate,
    endDate,
    prognoseEndDate,
    skippedDays,
    isSavedToday,
    closedTilesData,
    openTiles,
    daysAhead,
    checkIsSavedToday,
  } = useProfileStore()

  useEffect(() => {
    // Check if user saved today
    checkIsSavedToday()
  }, [closedTilesData, checkIsSavedToday])

  const daysRemaining = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const daysTotal = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const daysElapsed = daysTotal - daysRemaining

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Savings Summary</h2>
        {isSavedToday && (
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Saved Today</span>
          </div>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Closed Tiles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Closed Tiles</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{closedTilesData.length}</p>
          <p className="text-xs text-gray-500 mt-1">of {closedTilesData.length + openTiles.length} total</p>
        </div>

        {/* Open Tiles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Open Tiles</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{openTiles.length}</p>
          <p className="text-xs text-gray-500 mt-1">remaining to close</p>
        </div>

        {/* Days Elapsed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Days Elapsed</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{daysElapsed}</p>
          <p className="text-xs text-gray-500 mt-1">of {daysTotal} days</p>
        </div>

        {/* Days Remaining */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Days Remaining</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{daysRemaining}</p>
          <p className="text-xs text-gray-500 mt-1">until {formatDate(endDate)}</p>
        </div>

        {/* Days Ahead */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border-l-4 border-teal-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Days Ahead</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {daysAhead > 0 ? '+' : ''}{daysAhead}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {daysAhead > 0 ? 'ahead of schedule' : daysAhead < 0 ? 'behind schedule' : 'on schedule'}
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Start Date</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(startDate)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">End Date</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(endDate)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                daysAhead > 0 ? "bg-green-100 dark:bg-green-900" :
                daysAhead < 0 ? "bg-red-100 dark:bg-red-900" :
                "bg-purple-100 dark:bg-purple-900"
              )}>
                <svg className={cn(
                  "w-5 h-5",
                  daysAhead > 0 ? "text-green-600 dark:text-green-400" :
                  daysAhead < 0 ? "text-red-600 dark:text-red-400" :
                  "text-purple-600 dark:text-purple-400"
                )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Prognose End Date</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(prognoseEndDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skipped Days Section */}
      {skippedDays.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Skipped Days</h3>
          <div className="flex flex-wrap gap-2">
            {skippedDays.map((date, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm"
              >
                {formatDate(date)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}