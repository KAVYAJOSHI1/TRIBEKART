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
        height: 40,
        width: 40,
        resizeMode: "contain"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        left: "12%",
        color: "#5D4037"
    },
    bar: {
        marginTop: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    barLine: {
        height: 2,
        backgroundColor: "#A1887F",
        width: "90%"   
    },
    walletCard: {
        backgroundColor: "#FFE0B2",
        borderRadius: 15,
        padding: 15,
        elevation: 5,
        shadowColor: "#8D6E63",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: "#795548",
        marginVertical: 15,
        marginHorizontal: 10
    },
    walletTitle: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#5D4037"
    },
    walletAmountView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 10
    },
    walletAmount: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#6D4C41",
        marginTop: 20
    },
    buttonView: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 70,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    buttonTouch: {
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#4E342E",
        backgroundColor: "#8D6E63",
        width: "85%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    modalCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContainer: {
        backgroundColor: "#FFE0B2",
        borderWidth: 2,
        borderColor: "#6D4C41",
        borderRadius: 12,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        padding: 10,
        shadowColor: "#795548",
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4E342E",
        marginBottom: 15,
        marginTop: 5
    },
    modalTextInput: {
        width: "85%",
        borderWidth: 1.5,
        borderColor: "#795548",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: "#4E342E",
        backgroundColor: "#FAF3E0"
    },
    modalContinueButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 10,
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    modalCancelButton: {
        backgroundColor: "#F44336",
        padding: 15,
        borderRadius: 10,
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
});