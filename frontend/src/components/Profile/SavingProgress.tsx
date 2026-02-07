'use client'

interface SavingProgressProps {
  savedAmount: number;
  totalAmount: number;
  currencySymbol: string;
}

export const SavingProgress = ({ savedAmount, totalAmount, currencySymbol }: SavingProgressProps) => {
  const progressPercentage = (savedAmount / totalAmount) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800 dark:text-white">Savings Progress</p>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          {progressPercentage.toFixed(1)}%
        </p>
      </div>
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>{currencySymbol}{savedAmount.toFixed(2)} saved</span>
        <span>{currencySymbol}{totalAmount.toFixed(2)} goal</span>
      </div>
    </div>
  );
};
