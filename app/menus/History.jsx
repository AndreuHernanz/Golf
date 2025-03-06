import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from "react-native";
import { router } from "expo-router";
import useGameStore from "../gameStore";
import NavBar from "../components/NavBar";




export default function History() {
  
  
  return (
    <View style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.text}>History</Text>
        </View>
        <NavBar page="History" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    color: "black"
  }
  
});
