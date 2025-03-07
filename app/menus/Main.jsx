import { StyleSheet, Text, TextInput, View, Pressable, Image, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import useGameStore from "../gameStore";
import NavBar from "../components/NavBar";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Main() {
	const { courses, setCurrentCourse, addCourse } = useGameStore();

	const [addingCourse, setAddingCourse] = useState(false);

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

	<Pressable 
		onPress={() => setAddingCourse(true)} 
		style={({ pressed }) => [styles.addCourseButt, pressed && styles.butPressed]}>
		<Text style={{color: "white", fontSize: 40}}>+</Text>
	</Pressable>

	<NavBar page="Main" />


	{addingCourse && 
		<View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(18, 54, 0, 0.79)", zIndex: 200, }}>
			<View style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "80%", backgroundColor: "white", borderRadius: 10, padding: 20 }}>
				<Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Add a new course</Text>
				<Text style={{ marginBottom: 10 }}>Course name:</Text>
				<TextInput style={{ borderWidth: 1, borderColor: "black", borderRadius: 5, padding: 5, marginBottom: 10 }} />
				<Text style={{ marginBottom: 10 }}>Hole pars (comma separated):</Text>
				<TextInput style={{ borderWidth: 1, borderColor: "black", borderRadius: 5, padding: 5, marginBottom: 10 }} />
				<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
					<Pressable
						onPress={() => setAddingCourse(false)}
						style={({ pressed }) => [
						{
							transform: [{ scale: pressed ? 0.9 : 1 }],
							opacity: pressed ? 0.7 : 1,
						},
						]}
					>
						<Text style={{ padding: 10, backgroundColor: "red", color: "white", borderRadius: 5 }}>Cancel</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							addCourse({ courseName: "New Course", holePars: [3, 3, 3, 3, 3, 3, 3, 3, 3] });
							setAddingCourse(false);
						}
						}
						style={({ pressed }) => [
						{
							transform: [{ scale: pressed ? 0.9 : 1 }],
							opacity: pressed ? 0.7 : 1,
						},
						]}
					>
						<Text style={{ padding: 10, backgroundColor: "green", color: "white", borderRadius: 5 }}>Add</Text>
					</Pressable>
				</View>
			</View>		
		</View>
	}
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
		/*margin: 10,*/
		height: 100,
		//borderRadius: 10,
		backgroundColor: "lightgreen",
		//borderWidth: 5,
		borderColor: "darkgreen",
		borderTopWidth: 1,

		shadowColor: "black",
		elevation: 5, 
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
		borderColor: "black",
		borderRadius: 10,
		marginHorizontal: 20,
		marginVertical: 10,
		padding: 20,

		shadowColor: "black",
		elevation: 5, 
	},
	courseName: {
		color: "white",
		fontWeight: "bold",
		fontSize: 25,
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
	addCourseButt: {
		width: 80,
		height: 80,
		position: "absolute",
		bottom: 200,
		right: 0,
		backgroundColor: "lightgreen",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		marginHorizontal: 10,
		marginVertical: 10,

		shadowOffset: { width: 5, height: 5 },
		shadowRadius: 6,
		
		shadowColor: "black",
		elevation: 5, 
	}
});
