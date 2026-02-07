'use client'

import { CurrencySelector } from './CurrencySelector';

interface ProfileHeaderProps {
  username: string;
  currencySymbol: string;
  onCurrencyChange: (symbol: string) => void;
  onLogout: () => void;
}

export const ProfileHeader = ({ username, currencySymbol, onCurrencyChange, onLogout }: ProfileHeaderProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{username}</h1>
          <p className="text-blue-100">Track your savings progress</p>
        </div>
        <div className="flex items-center gap-3">
          <CurrencySelector
            currentSymbol={currencySymbol}
            onCurrencyChange={onCurrencyChange}
          />
          <button
            onClick={onLogout}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
          >
            Leave Profile
          </button>
        </div>
      </div>
    </div>
  );
};
