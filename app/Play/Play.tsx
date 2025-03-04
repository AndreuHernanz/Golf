import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  BackHandler,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import useGameStore from "../gameStore";
import styles, {
  getUpDownCellStyle,
  getResultBackgroundColor,
} from "./Play.styles";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Play() {
    const { nHoles, setNHoles, players, setPlayers } = useGameStore();
    const [upAndDownInd, setUpAndDownInd] = useState(Array(nHoles).fill(null));
    const [upAndDownAdd, setUpAndDownAdd] = useState(Array(nHoles).fill(null));

    useEffect(() => {
        onEntry();
        handleMatchPlay(players);
    }, []);

    useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				onLeave();
				return false; 
			};

			BackHandler.addEventListener('hardwareBackPress', onBackPress);

			return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
		}, [])
	);

    const onEntry = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    
    const onLeave = async () => {
        await ScreenOrientation.unlockAsync();
    };

    const handleMatchPlay = (newPlayers, newNHoles = nHoles) => {
        let individualUpAndDown = [];
        //const newupAndDown = [...upAndDownAdd];
        let newupAndDown = Array(newNHoles).fill(null);

        for (let i = 0; i < nHoles; i++) {
            if (
                newPlayers[0].scores[i] === null ||
                newPlayers[1].scores[i] === null
            ) {
                individualUpAndDown.push(-10);
            } else if (newPlayers[0].scores[i] < newPlayers[1].scores[i]) {
                individualUpAndDown.push(1);
            } else if (newPlayers[0].scores[i] > newPlayers[1].scores[i]) {
                individualUpAndDown.push(-1);
            } else {
                individualUpAndDown.push(0);
            }
        }

        let count = 0;
            for (let i = 0; i < nHoles; i++) {
            if (individualUpAndDown[i] !== -10) {
                count += individualUpAndDown[i];
                newupAndDown[i] = count;
            }
        }

        // individualUpAndDown = [1,1,1,1,1,1];
        // newupAndDown = [1,2,3,4,5,6]

        setUpAndDownInd(individualUpAndDown);
        setUpAndDownAdd(newupAndDown);
    };

    const handleScoreChange = (playerIndex, holeIndex, value) => {
        const newPlayers = [...players];
        newPlayers[playerIndex].scores[holeIndex] = value;
        setPlayers(newPlayers);
        handleMatchPlay(newPlayers);
    };

    const calculateTotal = (scores) => {
        return scores.reduce((total, score) => {
            return total + (isNaN(score) ? 0 : score);
        }, 0);
    };

    const upAndDownTotal = () => {
        return upAndDownInd.reduce((total, score) => {
            return total + (score === -10 ? 0 : score);
        }, 0);
    };

    const resultToText = (result) => {
        if (result !== 0) {
            return `${Math.abs(result)}UP`;
        } else {
            return "EVEN";
        }
    };

  

  return (
    <View style={styles.container}>

        {/* BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS BUTTONS */}
        <Pressable onPress={() => {onLeave(), router.back()}}
            style={({ pressed }) => [ styles.imagePressable,
            { transform: [{ scale: pressed ? 0.9 : 1 }], opacity: pressed ? 0.7 : 1,},
            ]}
        >
            <Image
            source={require("../../assets/i_Back.png")}
            style={styles.image}
            />
        </Pressable>

        <View style={styles.nHolesButs}>
            <Pressable onPress={() => { setNHoles(9), handleMatchPlay(players, 9); }}
                style={({ pressed }) => [
                    {
                    transform: [{ scale: pressed ? 0.9 : 1 }],
                    opacity: pressed ? 0.7 : 1,
                    },
                ]}
            >
                <Text style={styles.nHolesButsText}>9 Holes</Text>
            </Pressable>
            <Pressable onPress={() => { setNHoles(18), handleMatchPlay(players, 18) }} 
                style={({ pressed }) => [
                    {
                    transform: [{ scale: pressed ? 0.9 : 1 }],
                    opacity: pressed ? 0.7 : 1,
                    },
                ]}>
                <Text style={styles.nHolesButsText}>18 Holes</Text>
            </Pressable>
        </View>
        
        {/* TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE */}
        <Text style={styles.title}>GOLF MATCH PLAY</Text>
        
        
        <View style={styles.table}>

            <View style={styles.row}>
                <Text style={[styles.holesRow, styles.infoCell]}>Nº Hole</Text>
                {[...Array(nHoles)].map((_, index) => (
                    <Text key={index} style={[styles.numHoleCell, styles.cells]}>
                    {index + 1}
                    </Text>
                ))}
                <Text style={[styles.headerTotal, styles.total]}>Total</Text>
            </View>

            
                {players.map((player, pIndx) => (
                    <View key={pIndx} style={styles.row}>
                        <Text style={[styles.playerNames, styles.infoCell,
                            pIndx % 2 === 0 ? styles.bluePlayer : styles.redPlayer, ]} >
                                {player.name}
                        </Text>
                        {player.scores.map((score, holeIndex) => {
                            if (holeIndex >= nHoles) return null; // Skip if holeIndex is outside nHoles
                            return (
                                <TextInput
                                    key={holeIndex}
                                    style={[styles.inputCell, styles.cells]}
                                    keyboardType="numeric"
                                    value={score ? score.toString() : ""}
                                    maxLength={2}
                                    onChangeText={(value) =>
                                        handleScoreChange(pIndx, holeIndex, parseInt(value, 10))
                                    }
                                    /*onFocus={() => handleScoreChange(pIndx, holeIndex, null)}*/
                                
                                />
                            );
                        })}
                        <Text style={[styles.total, styles.playerTotal]}>{calculateTotal(player.scores)}</Text>
                    </View>
                ))}
                
            

            <View style={styles.row}>
                <Text style={styles.mp_}>Match Play</Text>
                {upAndDownAdd.map((score, holeIndex) => (
                    <Text key={holeIndex} style={[styles.mp_Cell, getUpDownCellStyle(score)]}>
                        {score === null ? "" : resultToText(score)}
                    </Text>
                ))}
                <Text style={[styles.mp_Total, getUpDownCellStyle(upAndDownTotal())]} >
                    {resultToText(upAndDownTotal())}
                </Text>
            </View>

        </View>
        <Text
            style={[ styles.resume,
                { backgroundColor: getResultBackgroundColor(upAndDownTotal()) }, ]}
            >
            {upAndDownTotal() === 0 ? "" : upAndDownTotal() > 0
                ? "ANDREU WINS" : "PAPA WINS"}{" "}
            {resultToText(upAndDownTotal())}
        </Text>
        
    </View>
  );
}
