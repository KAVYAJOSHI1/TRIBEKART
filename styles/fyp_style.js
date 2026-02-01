import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F1EB"
    },
    window: {
        flex: 1,
        marginTop: 20,
        marginLeft: 15
    },
    header: {
        fontWeight: "bold",
        marginTop: 20,
        marginLeft: 4,
        fontSize: 30,
        color: "#6B4F3D"
    },
    subHeader1: {
        marginLeft: 4,
        marginTop: 5,
        color: "#8E735B"
    },
    subHeader2: {
        marginLeft: 4,
        color: "#8E735B"
    },
    inputContainer: {
        marginLeft: 4,
        marginTop: 20
    },
    containerText: {
        color: "#191919",
        fontWeight: "bold",
        fontSize: 16
    },
    textBox: {
        backgroundColor: "#E9EBE6",
        width: "95%",
        borderWidth: 2,
        borderColor: "#6B4F3D",
        borderRadius: 10,
        height: 45,
        marginTop: 5
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginLeft: 4,
        width: "95%",
        borderWidth: 2,
        borderColor: "#6B4F3D",
        backgroundColor: "#6B4F3D",
        borderRadius: 10,
        height: 45
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalBox: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        minHeight: 120,
        maxWidth: 350,
        alignItems: "center"
    },
    modalText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: "center",
        color: "#6B4F3D"
    },
    modalButton: {
        backgroundColor: "#203f81",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        minWidth: 80,
        alignItems: "center"
    },
    modalButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    warning: {
        fontWeight: "bold",
        color: "red",
        fontSize: 26
    }
});