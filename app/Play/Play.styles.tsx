import { StyleSheet } from "react-native";

const fSize = 20;
const fSizeNumbs = 25;
const backgroundColor = "#fff8e3";
const butColor = "#e0d7ba";
const butBorderColor = "grey";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        justifyContent: "space-between",
    },
        imagePressable: {
            position: "absolute",
            top: 0,
            left: 0,
            margin: 10,
            zIndex: 10,
        },
        image: {
            height: 40,
            width: 40,
            backgroundColor: butColor,
            borderWidth: 1,
            borderColor: butBorderColor,
            tintColor: "black",
        },
        /* ---------------------------- */
        nHolesButs: {
            position: "absolute",
            top: 0,
            right: 0,
            margin: 10,
            zIndex: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10,
            
        },
        nHolesButsText: {
            textAlign: "center",
            width: 80,
            padding: 10,
            backgroundColor: butColor,
            borderWidth: 1,
            borderColor: butBorderColor,
        },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 16,
    },

    
    table: {
        
        flex: 1,
        maxWidth: "100%",
        margin: 5,
        alignContent: "center",
    },
    row: {
        //flex: 1,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },
        /* --------------------------------------------- */
        infoCell: {
            width: 100,
            height: "100%",

            fontSize: fSize - 5,
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
        },
        holesRow: {
            backgroundColor: "green",
            borderColor: "darkgreen",
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
        },
        playerNames: {
            /* background colors???? */
        },
        /* --------------------------------------------- */
        cells: {
            flex: 1,
            /*width: 70,*/
            height: "100%",
            fontWeight: "bold",
            textAlign: "center",
            textAlignVertical: "center",
            borderBottomWidth: 1,
            borderRightWidth: 1,
        },
        numHoleCell: {            
            color: "white",
            fontSize: fSize,
            backgroundColor: "green",
            borderColor: "darkgreen",
        },
        inputCell: {
            fontSize: fSizeNumbs,
            padding: 0,
            color: "grey",
            borderColor: "#ccc",
        },
        /* --------------------------------------------- */
        total: {
            width: 100,
            maxWidth: 100,
            height: "100%",
            fontSize: fSize,
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
            borderBottomWidth: 1,
            borderRightWidth: 1,
        },
        headerTotal: {
            color: "white",
            backgroundColor: "green",
            borderColor: "darkgreen",
        },
        playerTotal: {
            fontSize: fSizeNumbs,
            color: "black",
            backgroundColor: butColor,
            borderColor: "#ccc",
        },
        /* --------------------------------------------- */
        mp_: {
            width: 100,
            maxWidth: 100,
            height: "100%",
            fontSize: 12,
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
            backgroundColor: "purple",
            
        },
        mp_Cell: {
            flex: 1,
            /*width: 70,*/
            height: "100%",
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
            borderRightWidth: 1,
            borderColor: "#ccc",
            color: "white",
        },
        mp_Total: {
            width: 100,
            maxWidth: 100,
            height: "100%",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
            padding: 6,
        },
    resume: {
        fontSize: fSize + 5,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: "bold",
        padding: 10,
    },
    bluePlayer: { backgroundColor: "blue", color: "white", borderWidth: 0, borderColor: "darkblue" },
    redPlayer: { backgroundColor: "red", color: "white", borderWidth: 0, borderColor: "darkred" },
});

export const getUpDownCellStyle = (score) => ({
  backgroundColor: score === null ? "grey" : score === 0 ? "#333333" : score > 0 ? "blue" : "red",
  borderColor: score === null ? "#666666" : score === 0 ? "#1f1f1f" : score > 0 ? "darkblue" : "darkred",
});

export const getResultBackgroundColor = (total) => (total === 0 ? "#333333" : total > 0 ? "blue" : "red");

export default styles;
