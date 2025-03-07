import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGameStore = create(
  persist(
    (set) => ({

      // Current Game data
      currentCourse: "Default",
      nHoles: 9,
      players: [
        { name: "ANDREU", scores: Array(18).fill(null) },
        { name: "PAPA", scores: Array(18).fill(null) },
      ],

      // Saved courses (array of { name, holePars })
      courses: [
        { courseName: "Default Pitch and Putt", holePars: Array(18).fill(3) },
        { courseName: "Can Cuyas", holePars: Array(18).fill(3) },
        { courseName: "Valles Golf, Terrassa", holePars: [4,3,5,5,3,4,3,4,4] },
        { courseName: "Sant Cugat temp", holePars: Array(18).fill(3) },
        { courseName: "Roc 3 temp", holePars: Array(9).fill(3) },
        { courseName: "Montjuic temp", holePars: Array(18).fill(3) },
        { courseName: "Temp temp", holePars: Array(9).fill(3) },
        { courseName: "Costa Daurada temp", holePars: [5,3,5,4,4,4,4,4,4 , 3,5,3,4,4,5,4,3,4] },
        { courseName: "Sant Boi", holePars: Array(9).fill(3) },
        { courseName: "Caldes", holePars: [4,5,3,4,3,4,4,5,4] },
        { courseName: "Sant Pere de Ribes", holePars: Array(9).fill(3) },
        { courseName: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", holePars: Array(9).fill(3) },
      ],

      // Match history (array of completed games)
      matchHistory: [],

      setCurrentCourse: (currentCourse) => set({ currentCourse }),
      setNHoles: (nHoles) => set({ nHoles }),
      setPlayers: (players) => set({ players }),

      resetGame: () => set({
        players: [
          { name: "ANDREU", scores: Array(18).fill(null) },
          { name: "PAPA", scores: Array(18).fill(null) },
        ],
      }),

      // === COURSE MANAGEMENT ===
      addCourse: (course) => set((state) => ({
        courses: [...state.courses, course]
      })),
      
      removeCourse: (courseName) => set((state) => ({
        courses: state.courses.filter(c => c.name !== courseName)
      })),
      

      // === MATCH HISTORY ===
      saveMatch: ({ course, nHoles, players, matchPlayResult}) => {
        // MATCH PLAY RESULT will go for example from -5 to 0 to +5 (5DOWN in red or EVEN or 5UP in blue)
        const date = new Date().toISOString();
      
        const playerResults = players.map(player => ({
          name: player.name,
          totalStrokes: player.scores.slice(0, nHoles).reduce((sum, score) => sum + (score ?? 0), 0)
        }));
      
        // Sort by strokes to find the winner and the stroke difference
        playerResults.sort((a, b) => a.totalStrokes - b.totalStrokes);
      
        const result = playerResults[0].totalStrokes;  // Winner's strokes
        const strokesDifference = playerResults[1].totalStrokes - playerResults[0].totalStrokes;
      
        const match = {
          course,
          nHoles,
          players,
          date,
          matchPlayResult,
          result,
          strokesDifference,
        };
      
        set((state) => ({
          matchHistory: [match, ...state.matchHistory]
        }));
      },
        

      clearMatchHistory: () => set({ matchHistory: [] }),

    }),
    {
      name: 'golf-game-storage',  // This is the key under which your data is saved in AsyncStorage.
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGameStore;
