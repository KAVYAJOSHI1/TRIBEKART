import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop:30,
        paddingBottom:20,
        paddingHorizontal: 15,
        backgroundColor: "#5D4037",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3
    },
    headerImage: {
        marginLeft: 10,
        height: 35,
        width: 35,
        resizeMode: "contain",
        tintColor: "#FAF3E0"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        left: "10%",
        color: "#FAF3E0"
    },
    bar: {
        marginTop: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    barLine: {
        height: 1.5,
        backgroundColor: "#D7CCC8",
        width: "92%"
    },
    headerBottom: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    search: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "#D7CCC8",
        borderColor: "#8D6E63"
    },
    searchIcon: {
        marginLeft: 5,
        height: 30,
        width: 30,
        resizeMode: "contain",
        tintColor: "#5D4037"
    },
    searchTextBox: {
        width: "75%",
        color: "#5D4037"
    },
    card: {
        alignSelf: "stretch",
        flex: 1,
        backgroundColor: "#FAF3E0",
        padding: 15,
        marginBottom: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3
    },
    cardImage: {
        borderWidth: 1,
        borderColor: "#5D4037",
        borderRadius: 10,
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        color: "#5D4037"
    },
    cardText: {
        fontSize: 14,
        color: "#4E342E",
        marginTop: 5,
        lineHeight: 20
    },
    videoContainer: {
        marginTop: 10,
        width: "100%",
        alignSelf: "stretch",
        aspectRatio: 16 / 9,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#000",
        elevation: 2
    },
    video: {
        width: "100%",
        height: "100%"
    },
    statusView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    statusText: {
        fontSize: 18,
        color: "#8D6E63",
        fontStyle: "italic"
    }
});