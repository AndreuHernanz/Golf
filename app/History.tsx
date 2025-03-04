import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from "react-native";
import { router } from "expo-router";




export default function History() {
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History</Text>
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
