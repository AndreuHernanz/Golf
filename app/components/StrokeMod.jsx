import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image} from "react-native";
import useGameStore from "../gameStore";
import { COLORS, BORDER_RADIUS, FONT_SIZES } from "../consts";


export default function StrokeMod({holeClicked}) {

    const {players, currentCourse, courses} = useGameStore();

    const [holeStrokeP1, setHoleStrokeP1] = useState(players[0].scores[holeClicked] ? players[0].scores[holeClicked] : 
        courses.find(c => c.courseName === currentCourse).holePars[holeClicked]);
    const [holeStrokeP2, setHoleStrokeP2] = useState(players[1].scores[holeClicked] ? players[1].scores[holeClicked] : 
        courses.find(c => c.courseName === currentCourse).holePars[holeClicked]);


return (
<View style={styles.container}>
    <Text style={styles.title}>Hole {holeClicked + 1}</Text>
    <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{gap: 10}}>
            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <Text style={{fontSize: FONT_SIZES.large, fontWeight: "bold", color: "white",
                    maxWidth: 150, minWidth: 150, textAlign: "right", }}>{players[0].name}:     </Text>
                <Pressable style={styles.box}>
                    <Text style={styles.textInput}> - </Text>
                </Pressable>	
                <View style={styles.box}>
                    <Text style={styles.textInput}> {holeStrokeP1} </Text>
                </View>	
                <Pressable style={styles.box}>
                    <Text style={styles.textInput}> + </Text>
                </Pressable>		 
            </View>
            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <Text style={{fontSize: FONT_SIZES.large, fontWeight: "bold", color: "white",
                    maxWidth: 150, minWidth: 150, textAlign: "right", }}>{players[1].name}:     </Text>
                <Pressable style={styles.box}>
                    <Text style={styles.textInput}> - </Text>
                </Pressable>	
                <View style={styles.box}>
                    <Text style={styles.textInput}> {holeStrokeP2} </Text>
                </View>	
                <Pressable style={styles.box}>
                    <Text style={styles.textInput}> + </Text>
                </Pressable>
            </View>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Pressable style={[styles.box,{backgroundColor: COLORS.terciary, maxWidth: 150, minWidth: 150}]}><Text style={styles.textInput}>OK</Text></Pressable>
        </View>
    </View>
</View>
);

};

const styles = StyleSheet.create({
    butPressed: {
        transform: [{ scale:  0.95  }],
        /*opacity: 0.5,*/
    },
    butX: {
        position: "absolute",
        top: -20, right: -20,
        padding: 10,
        borderRadius: "50%", backgroundColor: "red",

        shadowOffset: { width: 5, height: 5 },
		shadowRadius: 6,
		shadowColor: "black",
		elevation: 5
    },
    butXImage: {
        
        width: 40, height: 40, 
    },

    container: {
        position: "absolute", 
        top: 0, left: 0, 
        width: "100%", height: "100%", 
        backgroundColor: "#005C53CC",//"rgba(18, 54, 0, 0.79)",
        zIndex: 200,
        gap: 10,
        justifyContent: "center",
        //alignItems: "center",
        paddingHorizontal: "20%",
    },
    box: {
        backgroundColor: COLORS.background, 
        borderRadius: 50, 
        padding: 20,
        fontSize: FONT_SIZES.large,
    },
    title:{
        fontSize: 20, 
        fontWeight: "bold", 
        marginBottom: 10,
        textAlign: "center",
        color: "white",
    },
    textInput: {
        fontSize: FONT_SIZES.large,
        borderRadius: 50, 
        padding: 5,
        textAlign: "center",
    },




});