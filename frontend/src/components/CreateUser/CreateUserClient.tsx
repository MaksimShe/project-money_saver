'use client'

const preparedPrograms = [
  {
    name: '1x',
    days: 30,
    totalAmount: 9300,      // 20+40+60...+600
    multiplier: 20,
    range: '20-600',
    description: '30 days, 20-600 (step: 20)'
  },
  {
    name: '2x',
    days: 90,
    totalAmount: 20475,     // 5+10+15...+450
    multiplier: 5,
    range: '5-450',
    description: '90 days, 5-450 (step: 5)'
  },
  {
    name: '3x',
    days: 365,
    totalAmount: 133590,    // 2+4+6...+730
    multiplier: 2,
    range: '2-730',
    description: '365 days, 2-730 (step: 2)'
  }
]

import { useState } from 'react'
import { createUser } from "@/src/sevices/CreateUser";
import { useRouter } from 'next/navigation'
import { DEFAULT_CURRENCY } from '@/src/constants/currencies'

export const CreateUserClient = () => {
  const [selectedProgram, setSelectedProgram] = useState<number>(0);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const currencySymbol = DEFAULT_CURRENCY.symbol;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const program = preparedPrograms[selectedProgram];
      await createUser(
        username,
        program.totalAmount,
        program.days,
        program.multiplier
      );

      // Store username in localStorage for profile page
      localStorage.setItem('currentUser', username);

      // Redirect to profile
      router.push('/profile');
    } catch (err) {
      setError('Failed to create user. Username might already exist.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleProgramSelect = (program: number) => {
    setSelectedProgram(program)
  }

  return (
    <form
      onSubmit={event => handleSubmit(event)}
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Create or access your account</p>
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Username
        </label>
        <input
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
          placeholder="Enter your username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Program Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Select Program
        </label>
        <div className="grid grid-cols-3 gap-3">
          {preparedPrograms.map((program, index) => (
            <div key={program.name} className="relative group">
              <button
                type="button"
                onClick={() => handleProgramSelect(index)}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  selectedProgram === index
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-102'
                }`}
              >
                {program.name.toUpperCase()}
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                <div className="font-semibold">{program.days} days</div>
                <div>{program.range}</div>
                <div className="text-gray-300">Total: {currencySymbol}{program.totalAmount.toLocaleString()}</div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? 'Creating...' : 'Continue'}
      </button>
    </form>
  )
}