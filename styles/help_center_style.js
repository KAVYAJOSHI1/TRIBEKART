import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF3E0"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10
    },
    headerImage: {
        marginLeft: 10,
        height: 35,
        width: 35,
        resizeMode: "contain"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 30,
        left: "17%",
        color: "#4E342E"
    },
    bar: {
        marginTop: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    barLine: {
        height: 2,
        backgroundColor: "#8D6E63",
        width: "90%"
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAE3C6",
        borderRadius: 12,
        marginHorizontal: 20,
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1.5,
        borderColor: "#D7CCC8"
    },
    cardImage: {
        height: 40,
        width: 40,
        resizeMode: "contain",
        marginRight: 10
    },
    cardText: {
        fontWeight: "bold",
        fontSize: 16,
        flex: 1,
        color: "#3E2723"
    },
    cardArrow: {
        marginTop: 3,
        height: 35,
        width: 35,
        resizeMode: "contain",
        tintColor: "#5D4037"
    }
});