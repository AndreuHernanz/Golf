import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, Image } from "react-native";
import useGameStore from "../gameStore";

export default function AddCourse({setAddingCourse}) {

    const [courseName, setCourseName] = useState("");

    const [holes, setHoles] = useState(Array(9).fill(3));  

    const { courses, setCurrentCourse, addCourse } = useGameStore();

    const setNumberHoles = (num) => {
        let newHoles = holes.slice(0, num);
        if (num > holes.length) newHoles = newHoles.concat(Array(num - holes.length).fill(4));
        setHoles(newHoles);
    }

return (
<View style={styles.container}>
    <View style={styles.containerBox}>
        <Text style={styles.title}>Add a new course</Text>
        <TextInput style={styles.nameTextInput} onChangeText={setCourseName} 
                    value={courseName} placeholder="Enter course name" />
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
            <Text style={{textAlignVertical: "center"}}>Number of Holes:   </Text>
            <Pressable onPress={() => setNumberHoles(9)}
                style={({ pressed }) => pressed && styles.butPressed}>
                <Text style={[styles.butNumHoles, holes.length==9 && styles.butNumHolesActive]}>9</Text>
            </Pressable>
            <Pressable onPress={() => setNumberHoles(18)}
                style={({ pressed }) => pressed && styles.butPressed}>
                <Text style={[styles.butNumHoles, holes.length==18 && styles.butNumHolesActive]}>18</Text>
            </Pressable>
        </View>
        <Text style={styles.courseNameText}>Hole pars:</Text>
        <ScrollView vertical={true}>
        {holes.map((element, index) => (
        <View key={index} 
            style={{flexDirection: "row", justifyContent: "center", 
                gap: 10, marginBottom: 10}}>
            <Text style={{textAlignVertical: "center"}}>H{index + 1}</Text>
            <Pressable onPress={() => setHoles(holes.map((hole, i) => i === index ? 3 : hole))}
                style={({ pressed }) => pressed && styles.butPressed}>
                <Text style={[styles.butParNum,holes[index] === 3 && styles.butParNumActive]}>3</Text>
            </Pressable>
            <Pressable onPress={() => setHoles(holes.map((hole, i) => i === index ? 4 : hole))}
                style={({ pressed }) => pressed && styles.butPressed}>
                <Text style={[styles.butParNum,holes[index] === 4 && styles.butParNumActive]}>4</Text>
            </Pressable>
            <Pressable onPress={() => setHoles(holes.map((hole, i) => i === index ? 5 : hole))}
                style={({ pressed }) => pressed && styles.butPressed}>
                <Text style={[styles.butParNum,holes[index] === 5 && styles.butParNumActive]}>5</Text>
            </Pressable>
            <Text style={{textAlignVertical: "center", color: "white"}}>H{index + 1}</Text>
        </View>
        ))}
        </ScrollView>
            <Pressable onPress={() => setAddingCourse(false)}
                style={({ pressed }) => [pressed && styles.butPressed, styles.butX]}>
                <Image
                    source={require("../../assets/i_X.png")}
                    style={styles.butXImage} />
            </Pressable>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Pressable onPress={() => { addCourse({ courseName: "New Course", holePars: holes });
                    setAddingCourse(false); }} //TODO
                style={({ pressed }) => pressed && styles.butPressed}>
                <Text style={{ padding: 10, backgroundColor: "green", color: "white", borderRadius: 30, 
                    marginTop: 10, width: 200, textAlign: "center" }}>Add</Text>
            </Pressable>
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
        backgroundColor: "rgba(18, 54, 0, 0.79)", 
        zIndex: 200,
    },
    containerBox: {
        position: "absolute", 
        top: "5%", left: "10%", 
        width: "80%", height: "90%", 
        backgroundColor: "white", 
        borderRadius: 10, 
        padding: 20
    },
    title:{
        fontSize: 20, 
        fontWeight: "bold", 
        marginBottom: 10
    },
    courseNameText:{
        marginBottom: 10
    },
    nameTextInput: {
        borderWidth: 1, 
        borderColor: "black", 
        borderRadius: 5, 
        padding: 5, marginBottom: 10
    },

    butNumHoles: {
        width: 70,
        height: 30,
        textAlign: "center",
        textAlignVertical: "center", 
        backgroundColor: "#eeeeee", 
        borderRadius: 15,
        fontSize: 20
    },
    butNumHolesActive: {
        backgroundColor: "green",
        color: "white"
    },

    butParNum: {
        width: 50,
        height: 50,
        textAlign: "center",
        textAlignVertical: "center", 
        backgroundColor: "#eeeeee", 
        borderRadius: 5,
        fontSize: 25
    },
    butParNumActive: {
        backgroundColor: "lightgreen"
    }


});