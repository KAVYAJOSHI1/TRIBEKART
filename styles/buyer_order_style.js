import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8EDEB"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: "#5D4037",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3
    },
    headerImage: {
        marginLeft: 5,
        height: 35,
        width: 35,
        resizeMode: "contain",
        tintColor: "#FAF3E0"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 30,
        left: "15%",
        color: "#FAF3E0"
    },
    filterSection: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 15
    },
    filterOption: {
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#A67B5B",
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: "#FAF3E0",
        elevation: 3
    },
    filterText: {
        fontWeight: "600",
        color: "#5C3D2E"
    },
    filterOptionSelected: {
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#7D3C1D",
        backgroundColor: "#7D3C1D",
        paddingVertical: 8,
        paddingHorizontal: 18,
        elevation: 5
    },
    filterTextSelected: {
        fontWeight: "bold",
        color: "white"
    },
    cardsContainer: {
        flex: 1,
        marginBottom: 50
    },
    card: {
        backgroundColor: "#FAF3E0",
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: "#8D6E63"
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#5C3D2E"
    },
    completedStatus: {
        fontWeight: "bold",
        color: "green"
    },
    cancelledStatus: {
        fontWeight: "bold",
        color: "red"
    },
    pendingStatus: {
        fontWeight: "bold",
        color: "orange"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    deleteButtonStyle: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#f14c4c",
        backgroundColor: "#f14c4c",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold"
    }
});