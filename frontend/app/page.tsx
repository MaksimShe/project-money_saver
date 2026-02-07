'use client'

import Link from "next/link";
import { useState } from "react";
import { LoginClient } from "@/src/components/Login/LoginClient";
import { CreateUserClient } from "@/src/components/CreateUser/CreateUserClient";

export default function Home() {
  const [mode, setMode] = useState<'login' | 'create'>('login');

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">Money Saver</h1>
        <p className="text-gray-600 dark:text-gray-400">Save money with daily challenges</p>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg">
        <button
          onClick={() => setMode('login')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            mode === 'login'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('create')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            mode === 'create'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Form */}
      {mode === 'login' ? <LoginClient /> : <CreateUserClient />}
    </div>
  );
}
