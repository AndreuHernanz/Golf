import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGameStore = create( persist(
    (set) => ({

        // Current Game data
        currentCourse: "Default",
        currentDate: new Date().toLocaleString(),
        currentTime: new Date().getTime(),
        nHoles: 9,
        players: [
            { name: "P1", scores: Array(18).fill(null) },
            { name: "P2", scores: Array(18).fill(null) },
        ],

        // Saved courses (array of { name, holePars })
        courses: [
            { courseName: "Default Pitch and Putt", holePars: Array(18).fill(3) },
            { courseName: "Can Cuyas", holePars: Array(9).fill(3) },
            { courseName: "Valles Golf, Terrassa", holePars: [4,3,5,5,3,4,3,4,4] },
            { courseName: "Costa Daurada temp", holePars: [5,3,5,4,4,4,4,4,4 , 3,5,3,4,4,5,4,3,4] },
            { courseName: "Caldes", holePars: [4,5,3,4,3,4,4,5,4] },
        ],

        // Match history (array of completed games)
        matchHistory: [],

        setCurrentCourse: (currentCourse) => set({ currentCourse }),
        setCurrentDate: () => set({ currentDate: new Date().toLocaleString() }),
        setNHoles: (nHoles) => set({ nHoles }),
        setPlayers: (players) => set({ players }),

        resetGame: (pName1, pName2, nHoles) => set({
            players: [
            { name: pName1, scores: Array(nHoles).fill(null) },
            { name: pName2, scores: Array(nHoles).fill(null) },
            ],
            currentDate: new Date().toLocaleString([], { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false, // Set to true for AM/PM format
            }),
            currentTime: new Date().getTime(),
        }),

        // === COURSE MANAGEMENT ===
        addCourse: (course) => set((state) => ({
            courses: [...state.courses, course]
        })),
      
        removeCourse: (_courseName) => set((state) => ({
            courses: state.courses.filter(c => c.courseName !== _courseName)
        })),
      

        // === MATCH HISTORY ===
        saveMatch: ( course, players, matchPlayResult, holePars, time) => {
            // MATCH PLAY RESULT will go for example from -5 to 0 to +5 (5DOWN in red or EVEN or 5UP in blue)
            //const date = new Date().toLocaleString();
            console.log("Saving match:", { course, players, matchPlayResult, holePars, time });
            const nHoles = players[0].scores.length;  // Assuming both players have the same number of holes
        

            const playerResults = players.map(player => ({
                name: player.name,
                totalStrokes: player.scores.slice(0, nHoles).reduce((sum, score) => sum + (score ?? 0), 0)
            }));
        
            // Sort by strokes to find the winner and the stroke difference
            playerResults.sort((a, b) => a.totalStrokes - b.totalStrokes);
        
            const result = playerResults[0].totalStrokes;  // Winner's strokes
            const strokesDifference = playerResults[1].totalStrokes - playerResults[0].totalStrokes;
            
            console.log("Match result:", playerResults[0].name, "won by", strokesDifference, "strokes");

            const match = {
                course,
                nHoles,
                holePars,
                players,
                time,
                matchPlayResult,
                result,
                strokesDifference,
            };
        
            set((state) => {
                const existingIndex = state.matchHistory.findIndex(m => m.time === time);
            
                let newHistory;
                if (existingIndex !== -1) {
                  newHistory = [...state.matchHistory];
                  newHistory[existingIndex] = match;
                } else {
                  newHistory = [match, ...state.matchHistory];
                }
            
                return { matchHistory: newHistory };
              });
        },
        

        clearMatchHistory: () => set({ matchHistory: [] }),

    }),
    {
        name: 'golf-game-storage',  // This is the key under which your data is saved in AsyncStorage.
        storage: createJSONStorage(() => AsyncStorage),
    })
);

export default useGameStore;
