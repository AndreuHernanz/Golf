import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { COLORS, BORDER_RADIUS, FONT_SIZES } from "../consts";



export default function NavBar({page}) {
  
  
    return (
        <View style={styles.navBarContainer}>
          <Pressable
            onPress={() => router.push('/')}
            style={({ pressed }) => [styles.navBut, pressed && styles.butPressed]}
          >
            <Image 
              source={require('../../assets/i_Draw.png')}
              style={[styles.navImage, page === 'Main' && styles.activeNavImage]}
              />
          </Pressable>
    
          <Pressable
            onPress={() => router.push('/menus/History')}
            style={({ pressed }) => [styles.navBut, pressed && styles.butPressed]}
            >
            <Image 
              source={require('../../assets/i_History.png')}
              style={[styles.navImage, page === 'History' && styles.activeNavImage]}
            />
          </Pressable>   
          
        </View>
      );
}

const styles = StyleSheet.create({
    navBarContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderColor: "black",
        alignItems: "center",
        backgroundColor: COLORS.primary,//"white",
        zIndex: 100,

        shadowColor: "black",
		elevation: 5, 
      },
    navBut: {
        justifyContent: "center",
        alignItems: "center",
        padding: 21
      },
    butPressed: {
        transform: [{ scale:  0.9  }],
        opacity: 0.5,
    },
    navImage: {
        tintColor : "white",
        height: 40,
        width: 40
    },
    activeNavImage: {
        tintColor: COLORS.terciary
    }
  
});