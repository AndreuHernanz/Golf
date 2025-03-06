import { StyleSheet, Text, View, Pressable, Image, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import useGameStore from "../gameStore";
import NavBar from "../components/NavBar";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Main() {
	const { courses, setCurrentCourse } = useGameStore();

	useEffect(() => {
		onEntry();
	}, []);

	const onEntry = async () => {
		await ScreenOrientation.lockAsync(
		ScreenOrientation.OrientationLock.PORTRAIT_UP
		);
	};

	const onLeave = async () => {
		await ScreenOrientation.unlockAsync();
	};

return (
<View style={{ flex: 1 }}>
	<View style={styles.container}>
		<View>
			<Text style={styles.title}>MATCH PLAY GOLF</Text>
		</View>
		<FlatList
			data={courses}
			keyExtractor={(course) => course.courseName}
			renderItem={({ item: course }) => (
				<Pressable onPress={() => {setCurrentCourse(course.courseName), router.push(`/menus/CourseSelected`)}} 
						style={({ pressed }) => [styles.courseContainer, pressed && styles.butPressed]}>

					<Text style={styles.courseName}>{course.courseName}</Text>
					<Text style={styles.coursePars}>{course.holePars.join(", ")}</Text>
				</Pressable>
			)}
		/>
		<Pressable
			onPress={() => router.push("/Play/Play")}
			style={({ pressed }) => [
			{
				transform: [{ scale: pressed ? 0.9 : 1 }],
				opacity: pressed ? 0.7 : 1,
			},
			]}
		>
			<Text style={styles.mainButs}>CONTINUE</Text>
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
		color: "darkgreen",
		fontSize: 30,
		textAlign: "center",
		textAlignVertical: "center",
		margin: 10,
		height: 100,
		borderRadius: 10,
		backgroundColor: "lightgreen",
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
	addNote: {
		width: 80,
		height: 80,
		position: "absolute",
		bottom: 100,
		right: 0,
		backgroundColor: "orange",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "50%",
		marginHorizontal: 20,
		marginVertical: 10,
	}
});
