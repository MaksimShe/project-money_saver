'use client'

interface SavingSummaryProps {
  startDate: Date;
  endDate: Date;
  prognosedEnd: Date;
  daysAhead: number;
  closedTilesCount: number;
  totalTilesCount: number;
}

export const SavingSummary = ({
  startDate,
  endDate,
  prognosedEnd,
  daysAhead,
  closedTilesCount,
  totalTilesCount
}: SavingSummaryProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysAheadText = () => {
    if (daysAhead > 0) {
      return `${daysAhead} days ahead`;
    } else if (daysAhead < 0) {
      return `${Math.abs(daysAhead)} days behind`;
    }
    return 'On track';
  };

  const getDaysAheadColor = () => {
    if (daysAhead > 0) return 'text-green-600 dark:text-green-400';
    if (daysAhead < 0) return 'text-red-600 dark:text-red-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Saving Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Start Date</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">{formatDate(startDate)}</p>
        </div>

        {/* Target End Date */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Target End Date</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">{formatDate(endDate)}</p>
        </div>

        {/* Prognosed End Date */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Prognosed End Date</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">{formatDate(prognosedEnd)}</p>
        </div>

        {/* Progress Status */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Progress Status</p>
          <p className={`text-lg font-bold ${getDaysAheadColor()}`}>{getDaysAheadText()}</p>
        </div>

        {/* Tiles Completed */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Tiles Completed</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {closedTilesCount} / {totalTilesCount}
          </p>
        </div>

        {/* Completion Rate */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Completion Rate</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {((closedTilesCount / totalTilesCount) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};
