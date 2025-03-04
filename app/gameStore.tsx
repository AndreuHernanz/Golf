import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGameStore = create(
  persist(
    (set) => ({
      nHoles: 9,
      players: [
        { name: "ANDREU", scores: Array(18).fill(null) },
        { name: "PAPA", scores: Array(18).fill(null) },
      ],

      setPlayers: (players) => set({ players }),
      setNHoles: (nHoles) => set({ nHoles }),

      resetGame: () => set({
        players: [
          { name: "ANDREU", scores: Array(18).fill(null) },
          { name: "PAPA", scores: Array(18).fill(null) },
        ],
      }),
    }),
    {
      name: 'golf-game-storage',  // This is the key under which your data is saved in AsyncStorage.
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGameStore;
