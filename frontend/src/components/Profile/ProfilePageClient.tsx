'use client'

import { useProfileStore } from '@/src/store/ProfileStore'
import { getUserByUsername, closeTile as closeTileAPI, reopenTile as reopenTileAPI } from "@/src/sevices/UserService";
import { useEffect, useState } from 'react';
import { ConfirmModal } from '@/src/components/Modal/ConfirmModal';
import { useRouter } from 'next/navigation';
import { ProfileHeader } from './ProfileHeader';
import { StatsCards } from './StatsCards';
import { SavingSummary } from './SavingSummary';
import { SavingProgress } from './SavingProgress';
import { TileGrid } from './TileGrid';

export const ProfilePageClient = () => {
  const {
    totalAmount,
    savedAmount,
    allTiles,
    closedTilesData,
    startDate,
    endDate,
    prognoseEndDate,
    daysAhead,
    currencySymbol,
    setCurrency,
    updateProfile,
  } = useProfileStore()

  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    tileNumber: number | null;
    action: 'close' | 'reopen' | null;
  }>({
    isOpen: false,
    tileNumber: null,
    action: null,
  });
  const router = useRouter();

  // Load user data from backend on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
          window.location.href = '/login';
          return;
        }

        setUsername(currentUser);

        const userData = await getUserByUsername(currentUser);

        // Update store with backend data
        updateProfile({
          totalAmount: userData.totalAmount,
          savedAmount: userData.savedAmount,
          allTiles: userData.allTiles,
          closedTilesData: userData.closedTiles.map((tile: any) => ({
            tileNumber: tile.tileNumber,
            closedDate: new Date(tile.closedDate)
          })),
          startDate: new Date(userData.startDate),
          endDate: new Date(userData.endDate),
          prognoseEndDate: new Date(userData.prognosedEnd),
          skippedDays: userData.skippedDays.map((d: string) => new Date(d)),
          daysAhead: userData.daysAhead,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
        setError('Failed to load user data');
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [updateProfile]);

  const handleTileClick = (number: number) => {
    const isClosed = closedTilesData.some(tile => tile.tileNumber === number);

    // Show modal for confirmation
    setModalState({
      isOpen: true,
      tileNumber: number,
      action: isClosed ? 'reopen' : 'close',
    });
  };

  const handleConfirmAction = async () => {
    if (!modalState.tileNumber || !modalState.action) return;

    try {
      let updatedUser;

      if (modalState.action === 'close') {
        updatedUser = await closeTileAPI(username, modalState.tileNumber);
      } else {
        updatedUser = await reopenTileAPI(username, modalState.tileNumber);
      }

      // Update store with fresh data from backend
      updateProfile({
        savedAmount: updatedUser.savedAmount,
        closedTilesData: updatedUser.closedTiles.map((tile: any) => ({
          tileNumber: tile.tileNumber,
          closedDate: new Date(tile.closedDate)
        })),
        daysAhead: updatedUser.daysAhead,
        prognoseEndDate: new Date(updatedUser.prognosedEnd),
      });

      // Close modal
      setModalState({ isOpen: false, tileNumber: null, action: null });
    } catch (error) {
      console.error('Error with tile action:', error);
      alert(`Failed to ${modalState.action} tile.`);
      setModalState({ isOpen: false, tileNumber: null, action: null });
    }
  };

  const handleCancelAction = () => {
    setModalState({ isOpen: false, tileNumber: null, action: null });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const handleCurrencyChange = (symbol: string) => {
    setCurrency(symbol);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="text-2xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* 1. User Profile Header */}
      <ProfileHeader
        username={username}
        currencySymbol={currencySymbol}
        onCurrencyChange={handleCurrencyChange}
        onLogout={handleLogout}
      />

      {/* 2. Stats Cards (Saved, Total, Remaining) */}
      <StatsCards savedAmount={savedAmount} totalAmount={totalAmount} currencySymbol={currencySymbol} />

      {/* 3. Saving Summary */}
      <SavingSummary
        startDate={startDate}
        endDate={endDate}
        prognosedEnd={prognoseEndDate}
        daysAhead={daysAhead}
        closedTilesCount={closedTilesData.length}
        totalTilesCount={allTiles.length}
      />

      {/* 4. Saving Progress */}
      <SavingProgress savedAmount={savedAmount} totalAmount={totalAmount} currencySymbol={currencySymbol} />

      {/* 5. Tile Grid */}
      <TileGrid
        allTiles={allTiles}
        closedTilesData={closedTilesData}
        onTileClick={handleTileClick}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.action === 'close' ? 'Close Tile' : 'Reopen Tile'}
        message={
          modalState.action === 'close'
            ? `Are you sure you want to close tile ${modalState.tileNumber}? This will add ${currencySymbol}${modalState.tileNumber} to your saved amount.`
            : `Are you sure you want to reopen tile ${modalState.tileNumber}? This will subtract ${currencySymbol}${modalState.tileNumber} from your saved amount.`
        }
        confirmText={modalState.action === 'close' ? 'Close Tile' : 'Reopen Tile'}
        cancelText="Cancel"
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        isDangerous={modalState.action === 'reopen'}
      />
    </div>
  )
}