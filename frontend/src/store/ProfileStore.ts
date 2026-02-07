import { create } from "zustand";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/src/constants/currencies";

type Profile = {
  totalAmount: number;  //db
  savedAmount: number;  //db

  startDate: Date;      //db
  endDate: Date;        //db

  skippedDays: Date[]   //db
  prognoseEndDate: Date;//db

  isSavedToday: boolean;

  allTiles: number[];   //db
  closedTilesData: Array<{    // NEW: replaces closedTiles
    tileNumber: number
    closedDate: Date
  }>;
  openTiles: number[];
  daysAhead: number;    // NEW: how many days ahead of schedule
  currencySymbol: string; // Currency symbol to display
}

type ProfileStore = Profile & {
  // Actions
  setTotalAmount: (amount: number) => void;
  setSavedAmount: (amount: number) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  addSkippedDay: (date: Date) => void;
  removeSkippedDay: (date: Date) => void;
  setPrognoseEndDate: (date: Date) => void;
  setIsSavedToday: (saved: boolean) => void;
  setCurrency: (symbol: string) => void;
  closeTile: (tileNumber: number) => void;
  openTile: (tileNumber: number) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  calculateOpenTiles: () => void;
  calculateSavedAmount: () => void;
  calculateSkippedDays: () => void;
  calculateDaysAhead: () => void;
  calculatePrognoseEndDate: () => void;
  checkIsSavedToday: () => void;
  reset: () => void;
}

const initialState: Profile = {
  totalAmount: 465,
  savedAmount: 0,
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  skippedDays: [],
  prognoseEndDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  isSavedToday: false,
  allTiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  closedTilesData: [],
  openTiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  daysAhead: 0,
  currencySymbol: DEFAULT_CURRENCY.symbol,
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  ...initialState,

  setTotalAmount: (amount: number) =>
    set({ totalAmount: amount }),

  setSavedAmount: (amount: number) =>
    set({ savedAmount: amount }),

  setStartDate: (date: Date) =>
    set({ startDate: date }),

  setEndDate: (date: Date) =>
    set({ endDate: date }),

  addSkippedDay: (date: Date) =>
    set((state) => ({
      skippedDays: [...state.skippedDays, date]
    })),

  removeSkippedDay: (date: Date) =>
    set((state) => ({
      skippedDays: state.skippedDays.filter(
        d => d.getTime() !== date.getTime()
      )
    })),

  setPrognoseEndDate: (date: Date) =>
    set({ prognoseEndDate: date }),

  setIsSavedToday: (saved: boolean) =>
    set({ isSavedToday: saved }),

  setCurrency: (symbol: string) =>
    set({ currencySymbol: symbol }),

  closeTile: (tileNumber: number) => {
    const state = get();
    const alreadyClosed = state.closedTilesData.some(t => t.tileNumber === tileNumber);

    if (!alreadyClosed && state.allTiles.includes(tileNumber)) {
      const newTile = {
        tileNumber,
        closedDate: new Date() // Track when tile was closed
      };

      set({
        closedTilesData: [...state.closedTilesData, newTile]
      });

      get().calculateOpenTiles();
      get().calculateSavedAmount();
      get().calculateSkippedDays();
      get().calculateDaysAhead();
      get().calculatePrognoseEndDate();
      get().checkIsSavedToday();
    }
  },

  openTile: (tileNumber: number) => {
    const state = get();
    const exists = state.closedTilesData.some(t => t.tileNumber === tileNumber);

    if (exists) {
      set({
        closedTilesData: state.closedTilesData.filter(t => t.tileNumber !== tileNumber)
      });

      get().calculateOpenTiles();
      get().calculateSavedAmount();
      get().calculateSkippedDays();
      get().calculateDaysAhead();
      get().calculatePrognoseEndDate();
      get().checkIsSavedToday();
    }
  },

  updateProfile: (profile: Partial<Profile>) =>
    set((state) => ({ ...state, ...profile })),

  calculateOpenTiles: () => {
    const state = get();
    const closedNumbers = state.closedTilesData.map(t => t.tileNumber);
    const openTiles = state.allTiles.filter(tile => !closedNumbers.includes(tile));
    set({ openTiles });
  },

  calculateSavedAmount: () => {
    const state = get();
    const savedAmount = state.closedTilesData.reduce((sum, tile) => sum + tile.tileNumber, 0);
    set({ savedAmount });
  },

  calculateSkippedDays: () => {
    const state = get();
    const { startDate, closedTilesData } = state;
    const today = new Date();

    // Get all unique dates that have deposits
    const datesWithDeposits = new Set(
      closedTilesData.map(tile => {
        const d = new Date(tile.closedDate);
        return d.toDateString(); // Normalize to day (ignore time)
      })
    );

    // Find all dates from start to today
    const skipped: Date[] = [];
    const current = new Date(startDate);

    while (current <= today) {
      const dateStr = current.toDateString();

      // If this date has no deposits AND it's not today, it's skipped
      if (!datesWithDeposits.has(dateStr) && dateStr !== today.toDateString()) {
        skipped.push(new Date(current));
      }

      current.setDate(current.getDate() + 1);
    }

    set({ skippedDays: skipped });
  },

  calculateDaysAhead: () => {
    const state = get();
    const { startDate, closedTilesData } = state;
    const today = new Date();

    // Calculate how many days have elapsed since start
    const daysElapsed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Expected deposits at this point (1 per day pace)
    const expectedDeposits = daysElapsed;

    // Actual deposits made
    const actualDeposits = closedTilesData.length;

    // Days ahead = actual - expected (positive = ahead, negative = behind)
    const daysAhead = actualDeposits - expectedDeposits;

    set({ daysAhead });
  },

  calculatePrognoseEndDate: () => {
    const state = get();
    const { endDate, daysAhead } = state;

    // Prognose end date = original end date - days ahead
    // If ahead: end date moves earlier
    // If behind (negative): end date moves later
    const prognoseEndDate = new Date(endDate);
    prognoseEndDate.setDate(prognoseEndDate.getDate() - daysAhead);

    set({ prognoseEndDate });
  },

  checkIsSavedToday: () => {
    const state = get();
    const today = new Date().toDateString();
    const savedToday = state.closedTilesData.some(tile =>
      new Date(tile.closedDate).toDateString() === today
    );
    set({ isSavedToday: savedToday });
  },

  reset: () =>
    set(initialState),
}));