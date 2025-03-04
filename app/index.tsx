import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { router } from "expo-router";
import useGameStore from "./gameStore";

export default function index() {
  const { resetGame } = useGameStore();

  return (
    <View style={styles.container}>
      <Pressable onPress={resetGame}
        style={({ pressed }) => [{ 
          transform: [{ scale: pressed ? 0.9 : 1 }],
          opacity: pressed ? 0.7 : 1, }, ]}>
        <Text style={styles.buttonText}>Start New Game</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/Play/Play")}
        style={({ pressed }) => [{ 
          transform: [{ scale: pressed ? 0.9 : 1 }],
          opacity: pressed ? 0.7 : 1, }, ]}>
        <Text style={styles.mainButs}>PLAY</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/History")}
        style={({ pressed }) => [{ 
          transform: [{ scale: pressed ? 0.9 : 1 }],
          opacity: pressed ? 0.7 : 1, }, ]}>
        <Text style={styles.mainButs}>HISTORY</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "black",
  },
  mainButs: {
    backgroundColor: "green",
    color: "white",
    fontSize: 40,
    padding: 30,
    margin: 20,
    width: 500,
    textAlign: "center",
  },
  buttonText: {
    padding: 10,
    margin: 10,
    backgroundColor: "orange",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
