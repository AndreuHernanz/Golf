import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { router } from "expo-router";
import useGameStore from "../gameStore";
import NavBar from "../components/NavBar";
import { COLORS, BORDER_RADIUS, FONT_SIZES } from "../consts";




export default function History() {
  const { matchHistory } = useGameStore();

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
  
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid';
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // e.g. "Apr"
  
    return `${day} ${month}`;
  };
  

const renderItem = ({ item }) => {

    

    return (
    <View style={styles.card}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{item.course} - {item.nHoles} Holes</Text>
            <Text style={styles.date}>{formatTimestamp(item.time)}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>

            <View style={styles.playerContainer}>
                {item.players.map((player, index) => (
                    <Text key={index} style={index % 2 === 0 ? { color: "blue" } : { color: "red" }}>
                    {player.name}: {player.scores.reduce((sum, score) => sum + (score ?? 0), 0)} strokes
                </Text>
                ))}
            </View>
            <Text style={[styles.result, getResultColor(item.matchPlayResult)]}>
                {item.matchPlayResult === 0 ? "EVEN" : Math.abs(item.matchPlayResult) + "UP"}</Text>
        </View>
    </View>
    );
};

if (!matchHistory || matchHistory.length === 0) {
    return (
        <View style={styles.container}>
            <Text style={{flex: 1, textAlign: "center", textAlignVertical: "center", fontSize: 30}}>No match history yet!</Text>
            <NavBar page="History" />
        </View>
    );
}
  
return (
<View style={{flex: 1}}>
    <View style={styles.container}>
        

    <View>
        <Text style={styles.titleApp}>MATCH PLAY GOLF</Text>
    </View>

    <FlatList
        data={matchHistory}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
    />





    </View>
    <NavBar page="History" />
</View>
);
}


const getResultColor = (result) => {
    if (!result || typeof result !== 'number') return { backgroundColor: 'black', color: 'white' }; // <- guard clause
    if (result > 0) return { backgroundColor: 'blue', color: 'white' };
    if (result < 0) return { backgroundColor: 'red', color: 'white' };
    return { color: 'black' };
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    titleApp: {
		color: COLORS.textLight,
		backgroundColor: COLORS.primary,
		padding: 10,
		fontSize: 30,
		fontWeight: "bold",
	},
    text: {
        color: "black"
    },
    
    resultRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      },

    list: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS.medium,
        padding: 10,
        marginBottom: 12,
    },
    title: {
        fontSize: FONT_SIZES.large,
        fontWeight: '600',
    },
    date: {
        fontSize: FONT_SIZES.small,
        color: '#555',
        marginBottom: 4,
    },
    result: {
        width: 150,
        fontSize: FONT_SIZES.large,
        borderRadius: BORDER_RADIUS.medium,
        padding: 5,
        marginTop: 6,
        textAlign: 'center',
    },
    playerContainer: {
        padding: 5,
        flex: 1,
    },

    red: {
        backgroundColor: "red",
        color: "white",
    },
    blue: {
        backgroundColor: "blue",
        color: "white",
    },
    black: {
        backgroundColor: "black",
        color: "white",
    },
  });
