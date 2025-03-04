// import {
//     StyleSheet,
//     Text,
//     View,
//     Pressable,
//     Image,
//     TextInput,
//     FlatList,
//   } from "react-native";
//   import { router } from "expo-router";
//   import React, { useEffect, useState } from "react";
//   import useGameStore from '../gameStore';
  
//   export default function PlayTemp() {
    
//     const {
//       nHoles,
//       players,
//       setPlayers,
//       setNHoles,
//     } = useGameStore();
  
//     const [upAndDownInd, setUpAndDownInd] = useState(Array(nHoles).fill(null));
//     const [upAndDownAdd, setUpAndDownAdd] = useState(Array(nHoles).fill(null));
  
//     useEffect(() => {
//       handleMatchPlay(players);
//     }
//     , []);
  
//     const handleMatchPlay = (newPlayers) => {
//       let individualUpAndDown = [];
//       const newupAndDown = [...upAndDownAdd];
  
//       for (let i = 0; i < newupAndDown.length; i++) {
//         if (
//           newPlayers[0].scores[i] === null ||
//           newPlayers[1].scores[i] === null
//         ) {
//           // nothing
//           individualUpAndDown.push(-10);
//         } else if (newPlayers[0].scores[i] < newPlayers[1].scores[i]) {
//           //p1Up++;
//           individualUpAndDown.push(1);
//           //newupAndDown[i] = 1;
//         } else if (newPlayers[0].scores[i] > newPlayers[1].scores[i]) {
//           //p1Up--;
//           individualUpAndDown.push(-1);
//         } else {
//           individualUpAndDown.push(0);
//         }
//       }
  
//       let count = 0;
//       for (let i = 0; i < individualUpAndDown.length; i++) {
//         if (individualUpAndDown[i] === -10) {
//         } else {
//           count += individualUpAndDown[i];
//           newupAndDown[i] = count;
//         }
//       }
//       setUpAndDownInd(individualUpAndDown);
//       setUpAndDownAdd(newupAndDown);
//     }
  
//     const handleScoreChange = (playerIndex, holeIndex, value) => {
//       const newPlayers = [...players];
//       newPlayers[playerIndex].scores[holeIndex] = value;
//       setPlayers(newPlayers);
//       handleMatchPlay(newPlayers);
      
//     };
  
//     const calculateTotal = (scores) => {
//       return scores.reduce((total, score) => {
//         const num = parseInt(score, 10);
//         return total + (isNaN(num) ? 0 : num);
//       }, 0);
//     };
  
//     const upAndDownTotal = () => {
//       return upAndDownInd.reduce((total, score) => {
//         let num = score;
//         return total + (score === -10 ? 0 : num);
//       }, 0);
//     };
//     const resultToText = (result) => {
//       if (result !== 0) {
//         return `${Math.abs(result)}UP`;
//       } else {
//         return "EVEN";
//       }
//     };
  
//     const renderPlayerRow = ({ item: player, index: playerIndex }) => (
//       <View style={styles.row}>
//         <Text
//           style={[
//             styles.cellNames,
//             { backgroundColor: playerIndex % 2 === 0 ? "blue" : "red", borderColor: playerIndex % 2 === 0 ? "darkblue" : "darkred" },
//           ]}
//         >
//           {player.name}
//         </Text>
//         {player.scores.map((score, holeIndex) => (
//           <TextInput
//             key={holeIndex}
//             style={styles.inputCell}
//             keyboardType="numeric"
//             value={score}
//             maxLength={2}
//             onChangeText={(value) =>
//               handleScoreChange(playerIndex, holeIndex, value)
//             }
//           />
//         ))}
//         <Text style={styles.cellTotal}>{calculateTotal(player.scores)}</Text>
//       </View>
//     );
  
//     return (
//       <View style={styles.container}>
//         <Pressable onPress={() => router.push("/")} 
//           style={({ pressed }) => [styles.imagePressable,{ 
//             transform: [{ scale: pressed ? 0.9 : 1 }],
//             opacity: pressed ? 0.7 : 1, }, ]}>
//           <Image
//             source={require("../assets/i_Back.png")}
//             style={styles.image}
//           />
//         </Pressable>
  
//         <View style={styles.table}>
//           <Text style={styles.title}>Golf Match Results</Text>
  
//           {/* Header Row */}
//           <View style={styles.row}>
//             <Text style={styles.headerCellPlayers}>Player</Text>
//             {[...Array(nHoles)].map((_, index) => (
//               <Text key={index} style={styles.headerCell}>
//                 {index + 1}
//               </Text>
//             ))}
//             <Text style={styles.headerCellTotal}>Total</Text>
//           </View>
  
//           {/* Player Rows */}
//           <View style={{ flexShrink: 1 }}>
//             <FlatList
//               data={players}
//               renderItem={renderPlayerRow}
//               keyExtractor={(item, index) => index.toString()}
//             />
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.upDownNames}>Up & Down</Text>
//             {upAndDownAdd.map((upDownScore, holeIndex) => (
//               <Text key={holeIndex} style={[styles.upDownCell, 
//                 { backgroundColor: upDownScore === null ? "grey" : upDownScore === 0 ? "black" : upDownScore > 0 ? "blue" : "red", 
//                 borderColor: upDownScore === null ? "darkgrey" : upDownScore === 0 ? "black" : upDownScore > 0 ? "darkblue" : "darkred" }]}>
//                 {upDownScore === null ? "" : resultToText(upDownScore)}
//               </Text>
//             ))}
//             <Text style={[styles.upDownTotal, 
//               { backgroundColor: upAndDownTotal() === 0 ? "grey" : upAndDownTotal() > 0 ? "blue" : "red", 
//               borderColor: upAndDownTotal() === 0 ? "darkgrey" : upAndDownTotal() > 0 ? "darkblue" : "darkred" }]}>
//                 {resultToText( upAndDownTotal())}
//             </Text>
//           </View>
//           <View>
            
//             <Text style={[ styles.resume,
//             { backgroundColor: upAndDownTotal() === 0 ? "grey" : upAndDownTotal() > 0 ? "blue" : "red"}]}>
//               {upAndDownTotal() == 0 ? "" : upAndDownTotal() > 0 ? "ANDREU WINS" : "PAPA WINS"} {resultToText( upAndDownTotal())}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
  
//   const fSize = 20;
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: "center",
//       flexDirection: "row",
//     },
//     imagePressable: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       margin: 10,
//       zIndex: 10,
//     },
//     image: {
//       height: 40,
//       width: 40,
//       backgroundColor: "black",
//     },
//     table: {
//       backgroundColor: "white",
//       flex: 1,
//       maxWidth: "100%",
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: "bold",
//       textAlign: "center",
//       marginBottom: 16,
//     },
//     row: {
//       height: 40,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//     },
//     headerCellPlayers: {
//       width: 100,
//       maxWidth: 100,
//       height: "100%",
//       fontSize: fSize,
//       color: "white",
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       backgroundColor: "green",
//       borderBottomWidth: 1,
//       borderRightWidth: 1,
//       borderLeftWidth: 1,
//       borderColor: "darkgreen",
//     },
//     cellNames: {
//       width: 100,
//       maxWidth: 100,
//       height: "100%",
//       fontSize: fSize,
//       color: "white",
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       borderBottomWidth: 1,
//       borderRightWidth: 1,
//       borderLeftWidth: 1,
//     },
//     headerCell: {
//       flex: 1,
//       height: "100%",
//       fontSize: fSize,
//       fontWeight: "bold",
//       color: "white",
//       textAlign: "center",
//       textAlignVertical: "center",
//       backgroundColor: "green",
//       borderBottomWidth: 1,
//       borderRightWidth: 1,
//       borderColor: "darkgreen",
//     },
//     inputCell: {
//       flex: 1,
//       height: "100%",
//       fontSize: fSize,
//       fontWeight: "bold",
//       color: "grey",
//       textAlign: "center",
//       textAlignVertical: "center",
//       borderBottomWidth: 1,
//       borderRightWidth: 1,
//       borderColor: "#ccc",
//     },
//     headerCellTotal: {
//       width: 100,
//       maxWidth: 100,
//       height: "100%",
//       color: "white",
//       fontSize: fSize,
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       padding: 6,
//       backgroundColor: "green",
//       borderBottomWidth: 1,
//       borderRightWidth: 1,
//       borderColor: "darkgreen",
//     },
//     cellTotal: {
//       width: 100,
//       maxWidth: 100,
//       height: "100%",
//       fontSize: fSize,
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       borderBottomWidth: 1,
//       borderRightWidth: 1,
//       borderColor: "#ccc",
//     },
//     upDownNames: {
//       width: 100,
//       maxWidth: 100,
//       height: "100%",
//       fontSize: fSize,
//       color: "white",
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       backgroundColor: "purple",
//       borderWidth: 1,
//       borderColor: "darkmagenta",
//     },
//     upDownCell: {
//       flex: 1,
//       height: "100%",
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       borderWidth: 1,
//       borderColor: "#ccc",
//       color: "white",
//     },
//     upDownTotal: {
//       width: 100,
//       maxWidth: 100,
//       height: "100%",
//       color: "white",
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       padding: 6,
//       borderWidth: 1,
//       borderColor: "#ccc",
//     },
//     resume: {
//       fontSize: fSize,
//       color: "white",
//       textAlign: "center",
//       textAlignVertical: "center",
//       fontWeight: "bold",
//       padding: 6,
//       margin: 10,
//     },
//   });