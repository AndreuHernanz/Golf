import React, { useEffect, useState, useCallback } from "react";
import { Text, View, Pressable, Image, TextInput, BackHandler} from "react-native";
import { router, useFocusEffect } from "expo-router";
import useGameStore from "../gameStore";
import styles, { getInputCellStyle, getUpDownCellStyle, getResultBackgroundColor} from "./Play.styles";
import StrokeMod from "../components/StrokeMod";
import * as ScreenOrientation from 'expo-screen-orientation';
import { COLORS, BORDER_RADIUS, FONT_SIZES } from "../consts";

export default function Play() {
    const { nHoles, setNHoles, players, setPlayers, currentCourse, courses, currentDateString, currentDate, saveMatch } = useGameStore();
    const [gameCourse, setGameCourse] = useState(courses.find(c => c.courseName === currentCourse));
    //setNHoles(gameCourse.holePars.length);
    const [upAndDownInd, setUpAndDownInd] = useState(Array(gameCourse.holePars.length).fill(null));
    const [upAndDownAdd, setUpAndDownAdd] = useState(Array(gameCourse.holePars.length).fill(null));

    const [saveBool, setSaveBool] = useState(false);

    const [strokeMod, setStrokeMod] = useState(false);
    const [holeClicked, setHoleClicked] = useState(null);

    useEffect(() => {
        onEntry();
        setNHoles(gameCourse.holePars.length);
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

    const handleMatchPlay = (newPlayers) => {
        //console.log("handleMatchPlay", newPlayers, newNHoles);
        let individualUpAndDown = [];
        //const newupAndDown = [...upAndDownAdd];
        let newupAndDown = Array(gameCourse.holePars.length).fill(null);

        let count = 0;
        for (let i = 0; i < gameCourse.holePars.length; i++) {
            if (newPlayers[0].scores[i] === null || newPlayers[1].scores[i] === null) {
                individualUpAndDown.push(null);
            } 
            else {
                if (newPlayers[0].scores[i] < newPlayers[1].scores[i]) {
                    individualUpAndDown.push(1);
                    count++;
                } else if (newPlayers[0].scores[i] > newPlayers[1].scores[i]) {
                    individualUpAndDown.push(-1);
                    count--;
                } else {
                    individualUpAndDown.push(0);
                }
                newupAndDown[i] = count;
            }
        }
        setUpAndDownInd(individualUpAndDown);
        setUpAndDownAdd(newupAndDown);
    };

    const handleScoreChange = (playerIndex, holeIndex, value) => {
        const newPlayers = [...players];
        newPlayers[playerIndex].scores[holeIndex] = isNaN(value) ? null : value ;
        setPlayers(newPlayers);
        handleMatchPlay(newPlayers);
    };

    const calculateTotal = (scores) => {
        return scores.reduce((total, score) => total + (score ?? 0), 0);
    };

    const calculateStrokeDifference = () => {
        //console.log("calculateStrokeDifference", players[0].scores, players[1].scores);
        return calculateTotal(players[0].scores) - calculateTotal(players[1].scores);
    };

    const totalPar = () => {
        return gameCourse.holePars.reduce((total, par) => total + par, 0);
    };

    const upAndDownTotal = () => {
        return upAndDownInd.reduce((total, score) => {
            return total + score /*(score === null ? 0 : score)*/;
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
    

    {/* <View style={styles.nHolesButs}>
        <Pressable onPress={() => { setNHoles(9), handleMatchPlay(players, 9); }}
            style={({ pressed }) => [
                {transform: [{ scale: pressed ? 0.9 : 1 }],
                opacity: pressed ? 0.7 : 1,},
            ]}
        >
            <Text style={styles.nHolesButsText}>9 Holes</Text>
        </Pressable>
        <Pressable onPress={() => { setNHoles(18), handleMatchPlay(players, 18) }} 
            style={({ pressed }) => [{
                transform: [{ scale: pressed ? 0.9 : 1 }],
                opacity: pressed ? 0.7 : 1,},
            ]}>
            <Text style={styles.nHolesButsText}>18 Holes</Text>
        </Pressable>
    </View> */}
    
    
    <View style={{ flexDirection: "row", justifyContent: "space-between", maxHeight: 60, }}>
        <Pressable onPress={() => {onLeave(), router.push("/")}}
            style={({ pressed }) => [ styles.imagePressable,
            { transform: [{ scale: pressed ? 0.9 : 1 }], opacity: pressed ? 0.7 : 1,},]}>
            <Image source={require("../../assets/i_Back.png")} style={styles.image} />
        </Pressable>
        <View style={{flex: 1, justifyContent: "center"}}>
            <Text>{currentCourse} - Round</Text>
            <Text style={{color: "grey", fontSize: 10}}>{currentDateString}</Text>
        </View>
        <Text style={styles.title}>GOLF MATCH PLAY</Text>
        <View style={{flex: 1, flexDirection: "row", gap: 10, justifyContent: "flex-end"}}>
            <Text style={{textAlignVertical: "center", fontWeight: "bold", color: COLORS.holeOne}}>Hole in One</Text>
            <Text style={{textAlignVertical: "center", fontWeight: "bold", color: COLORS.eagle}}>Eagle</Text>
            <Text style={{textAlignVertical: "center", fontWeight: "bold", color: COLORS.birdie}}>Birdie</Text>
            <Text style={{textAlignVertical: "center", fontWeight: "bold", color: COLORS.par}}>Par</Text> 
            <Text style={{textAlignVertical: "center", fontWeight: "bold", color: COLORS.bogey}}>Bogey</Text>
        </View>
        <Pressable onPress={()=>{ setSaveBool(true), saveMatch(currentCourse,players,upAndDownTotal(),gameCourse.holePars,currentDate)}}
            style={({ pressed }) => [ styles.imagePressable,
            { transform: [{ scale: pressed ? 0.9 : 1 }], opacity: pressed ? 0.7 : 1,},]}>
            <Image source={require("../../assets/i_Save.png")} 
            style={[styles.image, saveBool && styles.imageSaveActive]} />
        </Pressable>
    </View>
    
    {/* TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE TABLE */}
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


        <View style={styles.row}>
            <Text style={[styles.holesRow, styles.infoCell]}>Par</Text>
            {gameCourse.holePars.map((holePar, indx) => (
                <Text key={indx} style={[styles.numHoleCell, styles.cells]}>
                    {holePar.toString() }
                </Text>
            ))}
            <Text style={[styles.total, styles.headerTotal]} >
                {totalPar()}
            </Text>
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
                        <Pressable style={{flex: 1}} key={holeIndex} onPress={() => {setHoleClicked(holeIndex), setStrokeMod(true)}}>
                            <Text style={[styles.inputCell, styles.cells, getInputCellStyle(score, gameCourse.holePars[holeIndex]) ]}>
                                {score === null ? "" : score.toString()}
                            </Text>
                        </Pressable>
                        ///////////<Text/>
                        //  <TextInput
                        //      key={holeIndex}
                        //      style={[styles.inputCell, styles.cells, getInputCellStyle(score, gameCourse.holePars[holeIndex]) ]}
                        //      keyboardType="numeric"
                        //      value={score ? score.toString() : ""}
                        //      maxLength={2}
                        //      onChangeText={(value) =>
                        //          handleScoreChange(pIndx, holeIndex, parseInt(value, 10))
                        //      }
                        //      onFocus={() => handleScoreChange(pIndx, holeIndex, null)}
                    
                        //  />
                    );
                })}
                <Text style={[styles.total, styles.playerTotal]}>{calculateTotal(player.scores)}</Text>
            </View>
        ))}
            
        

        <View style={styles.row}>
            <Text style={[styles.infoCell, styles.mp_]}>Match Play</Text>
            {upAndDownAdd.map((score, holeIndex) => (
                <Text key={holeIndex} style={[styles.mp_Cell, styles.cells, getUpDownCellStyle(score)]}>
                    {score === null ? "" : resultToText(score)}
                </Text>
            ))}
            <Text style={[styles.mp_Total, getUpDownCellStyle(upAndDownTotal())]} >
                {resultToText(upAndDownTotal())}
            </Text>
        </View>

    </View>
    <Text style={[styles.resume, 
        { backgroundColor: getResultBackgroundColor(upAndDownTotal() === 0 
            ? calculateStrokeDifference()*-1 : upAndDownTotal()) }]}>
    {upAndDownTotal() === 0 
        ? (calculateStrokeDifference() !== 0 
            ? `${players[calculateStrokeDifference() < 0 ? 0 : 1].name} WINS by ${Math.abs(calculateStrokeDifference())} stroke${Math.abs(calculateStrokeDifference()) > 1 ? "s" : ""}`
            : "EVEN")
        : `${players[upAndDownTotal() > 0 ? 0 : 1].name} WINS ${resultToText(upAndDownTotal())}`}
</Text>
    {strokeMod && <StrokeMod holeClicked={holeClicked} />}
</View>
);
}
