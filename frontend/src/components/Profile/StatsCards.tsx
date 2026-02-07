'use client'

interface StatsCardsProps {
  savedAmount: number;
  totalAmount: number;
  currencySymbol: string;
}

export const StatsCards = ({ savedAmount, totalAmount, currencySymbol }: StatsCardsProps) => {
  const remaining = totalAmount - savedAmount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Saved Amount */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-2 border-2 border-green-200 dark:border-green-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Saved Amount
          </p>
        </div>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          {currencySymbol}{savedAmount.toFixed(2)}
        </p>
      </div>

      {/* Total Amount */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-2 border-2 border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Total Amount
          </p>
        </div>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {currencySymbol}{totalAmount.toFixed(2)}
        </p>
      </div>

      {/* Remaining */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-2 border-2 border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Remaining
          </p>
        </div>
        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          {currencySymbol}{remaining.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
