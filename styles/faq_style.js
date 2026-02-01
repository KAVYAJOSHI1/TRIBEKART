import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5E6CC"
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
        left: "29%",
        color: "#3E2723"
    },
    bar: {
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    barLine: {
        height: 1,
        backgroundColor: "#8D6E63",
        width: "90%"
    },
    filterSection: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 15
    },
    filterOption: {
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#8D6E63",
        backgroundColor: "#E0C9A6",
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    filterText: {
        fontWeight: "light",
        color: "#5D4037"
    },
    filterOptionSelected: {
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#5D4037",
        backgroundColor: "#5D4037",
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    filterTextSelected: {
        fontWeight: "bold",
        color: "white"
    },
    cardsContainer: {
        paddingHorizontal: 16,
        marginTop: 10,
        flex: 1
    },
    card: {
        backgroundColor: "#FAE3C6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#3E2723",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#5D4037"
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardQuestion: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
        color: "#3E2723"
    },
    cardAnswer: {
        fontSize: 14,
        marginTop: 12,
        color: "#5D4037",
        lineHeight: 20
    },
    arrowIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    loadingText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: "#5D4037"
    }
});