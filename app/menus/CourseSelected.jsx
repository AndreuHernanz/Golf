import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	Image,
	ScrollView,
	BackHandler,
	Alert,
} from "react-native";
import React, { useState, useEffect } from 'react';
import { router } from "expo-router";
import useGameStore from '../gameStore';
import * as ScreenOrientation from "expo-screen-orientation";
import { COLORS, BORDER_RADIUS, FONT_SIZES } from "../consts";
import { useLocalSearchParams } from 'expo-router';


export default function CourseSelected() {

	const { courseName } = useLocalSearchParams(); // ✅ Fetch courseName from URL params
	const { resetGame, setCurrentCourse, courses, removeCourse, players, setPlayers } = useGameStore(); // ✅ Fetch updateNote from Zustand

	const [title, setTitle] = useState( courseName ) //useState(courses.find(c => c.courseName === currentCourse).courseName);
	const [coursePars, setCoursePars] = useState(courses.find(c => c.courseName === courseName).holePars);
	
	useEffect(() => {
		onEntry();
	}, []);
	
	const onEntry = async () => {
		await ScreenOrientation.lockAsync(
		ScreenOrientation.OrientationLock.PORTRAIT_UP
		);
	};

	// Function to confirm deletion
	const confirmDeleteCourse = () => {
		Alert.alert(
			"Delete Course",
			"Are you sure you want to delete this course? \nThis action is irreversible",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: () => {
						removeCourse(courseName); // Remove course from Zustand store
						router.push("/"); // Navigate back after deletion
					},
				},
			]
		);
	};

return (
<View style={{ flex: 1 }}>
	<View style={styles.container}>
		<View>
			<Text style={styles.title}>MATCH PLAY GOLF</Text>
		</View>
		<View style={{flexDirection: "row" ,justifyContent: "left", alignItems: "center" }}>
			<Pressable style={({ pressed }) =>[styles.imagePressable, {margin: 10}, pressed && styles.butPressed]} 
				onPress={() => {router.push("/")}}>
				<Image style={styles.image} source={require("../../assets/i_Back.png")} />
			</Pressable>
		</View>
		<View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10, 
			backgroundColor: COLORS.secondary, borderRadius: 10, justifyContent: "space-between" }}>
			<View style={{ padding: 10 }}>
				<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, maxWidth: "100%" }}>
					<Text style={styles.courseName}>{title}</Text>
					<Pressable style={({ pressed }) =>[styles.imagePressable, styles.imagePressableTrash, pressed && styles.butPressed]}	
					onPress={confirmDeleteCourse}>
						<Image style={styles.imageTrash} source={require("../../assets/i_Trash.png")} />
					</Pressable>
				</View>

				<View style={{ marginBottom: 20, padding: 10, backgroundColor: COLORS.background, borderRadius: 10 }}>
					<Text style={styles.coursePars}>
						{coursePars.length} Holes - Par {coursePars.reduce((acc, par) => acc + par, 0)}</Text>
					<Text></Text>
					<Text style={styles.coursePars}>Holes Par:</Text>
					<Text style={styles.coursePars}>{coursePars.join("   ")}</Text>
				</View>

				<View style={{ marginBottom: 10, padding: 10, backgroundColor: COLORS.background, borderRadius: 10, gap: 10 }}>
					<Text style={[styles.coursePars]}>Players:</Text>
					{players.map((player, index) => (
						<TextInput
							key={index}
							style={[styles.playerInput, { backgroundColor: index % 2 === 0 ? "blue" : "red" }]}
							value={player.name}
							onChangeText={(text) => {
								const newPlayers = [...players];
								newPlayers[index].name = text;
								setPlayers(newPlayers);
							}}
						/>
					))}
				</View>
			</View>
			<Pressable onPress={() => {setCurrentCourse(courseName), resetGame(players[0].name, players[1].name, coursePars.length), router.push("/Play/Play")}}
				style={({ pressed }) => [{transform: [{ scale: pressed ? 0.9 : 1 }], opacity: pressed ? 0.7 : 1,	},]}>
				<Text style={styles.mainButs}>START ROUND</Text>
			</Pressable>
		</View>
	</View>

</View>
);
}

const styles = StyleSheet.create({
	butPressed: {
		transform: [{ scale:  0.95  }],
		/*opacity: 0.5,*/
	},

	imagePressable: {
		padding: 5,
		backgroundColor: COLORS.terciary,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 10,
	},
	image: {
		height: 40,
		width: 40,
		tintColor: "black",
	},
	imageTrash:{
		height: 40,
		width: 40,
		tintColor: "white",
	},
	imagePressableTrash: {
		borderColor: "darkred",
		backgroundColor: "red",
		borderWidth: 2,
	},

	container: {
		flex: 1,
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor:COLORS.background,
	},
	title:{
		color: COLORS.textLight,
		backgroundColor: COLORS.primary,
		padding: 10,
		fontSize: 30,
		fontWeight: "bold",
	},
	mainButs: {
		color: "white",
		fontSize: 30,
		textAlign: "center",
		textAlignVertical: "center",
		margin: 10,
		height: 100,
		borderRadius: 10,
		backgroundColor: COLORS.primary,
		borderWidth: 5,
		borderColor: COLORS.text,
	},
	buttonNewGame: {
		padding: 10,
		margin: 10,
		backgroundColor: "orange",
		alignItems: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},



	
	courseName: {
		fontSize: 30,
		color: COLORS.text,
		fontWeight: "bold",
		marginBottom: 10,
		flexWrap: "wrap", // Allows text to wrap
		maxWidth: "80%",
	},
	coursePars: {
		fontSize: 20,
		color: COLORS.text,
	},


	playerInput: {
		height: 70,
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: 10,
		padding: 5,
	},
});
