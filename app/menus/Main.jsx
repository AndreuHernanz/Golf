import { StyleSheet, Text, TextInput, View, Pressable, Image, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import useGameStore from "../gameStore";
import NavBar from "../components/NavBar";
import AddCourse from "../components/AddCourse";
import * as ScreenOrientation from "expo-screen-orientation";
import { COLORS, BORDER_RADIUS, FONT_SIZES } from "../consts";
import { LinearGradient } from 'expo-linear-gradient';


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
					<LinearGradient	colors={COLORS.backgroundGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
						style={styles.gradient}
						>
						<Text style={styles.courseName}>{course.courseName}</Text>
						<Text style={styles.coursePars}>{course.holePars.join(", ")}</Text>
					</LinearGradient>
				 </Pressable>
				
			)}
		/>
		<Pressable onPress={() => router.push("/Play/Play")}
			style={({ pressed }) => [{ transform: [{ scale: pressed ? 1.1 : 1,}], 
			opacity: pressed ? 1 : 1}, ]}>
			<Text style={styles.mainButs}>CONTINUE ROUND</Text>
		</Pressable>
	</View>

	<Pressable 
		onPress={() => setAddingCourse(true)} 
		style={({ pressed }) => [styles.addCourseButt, pressed && styles.butPressed]}>
		<Text style={{color: "white", fontSize: 40}}>+</Text>
	</Pressable>

	<NavBar page="Main" />


	{addingCourse && <AddCourse setAddingCourse={setAddingCourse} />}
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
		backgroundColor: COLORS.background,
	},
	title:{
		color: COLORS.textLight,
		backgroundColor: COLORS.primary,
		padding: 10,
		fontSize: 30,
		fontWeight: "bold",
	},
	mainButs: {
		color: COLORS.text,
		fontSize: 30,
		textAlign: "center",
		textAlignVertical: "center",
		/*margin: 10,*/
		height: 100,
		//borderRadius: 10,
		backgroundColor: COLORS.secondary,
		//borderWidth: 5,
		borderColor: "darkgreen",
		borderTopWidth: 1,

		shadowColor: "black",
		elevation: 5, 
	},



	courseContainer: {
		backgroundColor: COLORS.primary,//COLORS.primary,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: BORDER_RADIUS.small,
		marginHorizontal: 20,
		marginVertical: 10,
		
		shadowColor: "black",
		elevation: 5, 
	},
	gradient: {
		borderRadius: BORDER_RADIUS.small,
		padding: 20,
	},
	courseName: {
		color: COLORS.textLight,
		fontWeight: "bold",
		fontSize: 25,
		flexWrap: "wrap",
		overflow: "hidden",
		marginBottom: 10,
		textDecorationLine: "underline",
	},
	coursePars: {
		color: COLORS.textLight,
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
		backgroundColor: COLORS.terciary,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		marginHorizontal: 10,
		marginVertical: 10,

		shadowOffset: { width: 5, height: 5 },
		shadowRadius: 6,
		
		shadowColor: "black",
		elevation: 5, 
	},




	
});
