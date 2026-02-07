'use client'

import { CURRENCIES } from '@/src/constants/currencies';
import { useState } from 'react';

interface CurrencySelectorProps {
  currentSymbol: string;
  onCurrencyChange: (symbol: string) => void;
}

export const CurrencySelector = ({ currentSymbol, onCurrencyChange }: CurrencySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentCurrency = CURRENCIES.find(c => c.symbol === currentSymbol) || CURRENCIES[0];

  const handleSelect = (symbol: string) => {
    onCurrencyChange(symbol);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
      >
        <span className="text-lg">{currentCurrency.symbol}</span>
        <span className="text-sm">{currentCurrency.code}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-20 overflow-hidden">
            <div className="py-2 max-h-64 overflow-y-auto">
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleSelect(currency.symbol)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                    currency.symbol === currentSymbol
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold w-8">{currency.symbol}</span>
                    <div>
                      <div className="font-semibold">{currency.code}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{currency.name}</div>
                    </div>
                  </div>
                  {currency.symbol === currentSymbol && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
