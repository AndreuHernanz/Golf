import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	Image,
	ScrollView,
	BackHandler,
} from "react-native";
import React, { useState, useEffect } from 'react';
import { router } from "expo-router";
import useGameStore from '../gameStore';
import NavBar from "../components/NavBar";

export default function CourseSelected() {

	const { resetGame, currentCourse, players, setPlayers } = useGameStore(); // ✅ Fetch updateNote from Zustand

	//const [title, setTitle] = useState('');
	//const [content, setContent] = useState('');

	// Load the note data when the component mounts
	useEffect(() => {
		
	}, []);

  	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>MATCH PLAY GOLF</Text>
				</View>
				
				<Pressable
					onPress={resetGame}
					style={({ pressed }) => [
					{
						transform: [{ scale: pressed ? 0.9 : 1 }],
						opacity: pressed ? 0.7 : 1,
					},
					]}
				>
					<Text style={styles.buttonNewGame}>Start New Game</Text>
				</Pressable>
				<Pressable
					onPress={() => {resetGame(), router.push("/Play/Play")}}
					style={({ pressed }) => [
					{
						transform: [{ scale: pressed ? 0.9 : 1 }],
						opacity: pressed ? 0.7 : 1,
					},
					]}
				>
					<Text style={styles.mainButs}>START ROUND</Text>
				</Pressable>
			</View>
		
			<NavBar page="Main" />
		</View>
  	);
}

const styles = StyleSheet.create({
	butPressed: {
		transform: [{ scale:  0.95  }],
		/*opacity: 0.5,*/
	},

	container: {
		flex: 1,
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: "white",
	},
	title:{
		backgroundColor: "#eeeeee",
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
		backgroundColor: "green",
		borderWidth: 5,
		borderColor: "darkgreen",
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



	courseContainer: {
		backgroundColor: "darkgreen",
		borderWidth: 1,
		borderColor: "white",
		borderRadius: 10,
		marginHorizontal: 20,
		marginVertical: 10,
		padding: 20,
	},
	courseName: {
		maxHeight: 18,
		color: "white",
		fontWeight: "bold",
		flexWrap: "wrap",
		overflow: "hidden",
		marginBottom: 10,
		textDecorationLine: "underline",
	},
	coursePars: {
		color: "white",
		maxHeight: 36,
		flexWrap: "wrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		display: "-webkit-box",
	},
});
