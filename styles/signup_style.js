import { StyleSheet } from "react-native";

export default StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: "#DFDFC7"
    },
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    },
    loadingCenter: {
        justifyContent: "center",
        alignItems: "center"
    },
    headerWindow: {
        justifyContent: "center"
    },
    headerRow: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    back: {
        marginLeft: 20
    },
    mainWindow: {
        flex: 1
    },
    header: {
        marginLeft: "7%",
        fontSize: 25,
        fontWeight: "bold",
        color: "#191919"
    },
    subHeader: {
        marginLeft: 20,
        color: "#919191"
    },
    inputContainer: {
        marginLeft: 20
    },
    containerText: {
        color: "#191919",
        fontWeight: "bold",
        fontSize: 15,
    },
    textBox: {
        width: "95%",
        backgroundColor: "#E9EBE6",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        height: 45
    },
    selection: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    },
    selectCat: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: "40%",
        backgroundColor: "#F6EEE3"
    },
    selectedCat: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: "40%",
        backgroundColor: "#B39C6D"
    },
    selectionIcon: {
        marginLeft: 5,
        marginRight: 5,
        height: 40,
        width: 40,
        resizeMode: "contain"
    },
    selectionText: {
        fontWeight: "bold",
        marginRight: 5,
        marginLeft: 5
    },
    tac: {
        fontSize: 12,
        marginLeft: 30,
        color: "#191919"
    },
    setMarginTop10: {
        marginTop: 10
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginLeft: 20,
        width: "90%",
        borderWidth: 2,
        borderColor: "#191919",
        backgroundColor: "#191919",
        borderRadius: 10,
        height: 45
    },
    buttonText: {
        color: "white",
        fontSize: 15
    },
    bar: {
        marginLeft: "6%",
        marginTop: 15
    },
    barText: {
        color: "#909090"
    },
    googleSignUpButton: {
        backgroundColor: "#E9EBE6",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginLeft: 20,
        width: "90%",
        borderWidth: 2,
        borderRadius: 10,
        height: 45,
        borderColor: "#999999"
    },
    googleSignUpButtonView: {
        flexDirection: "row"
    },
    googleSignUpButtonImage: {
        height: 35,
        width: 35,
        resizeMode: "contain"
    },
    googleSignUpButtonText: {
        color: "#191919",
        marginTop: 7,
        fontWeight: "bold"
    },
    facebookSignUpButton: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginLeft: 20,
        width: "90%",
        borderWidth: 2,
        borderRadius: 10,
        height: 45,
        borderColor: "#1877f2",
        backgroundColor: "#1877f2"
    },
    facebookSignUpButtonView: {
        flexDirection: "row"
    },
    facebookSignUpButtonImage: {
        height: 35,
        width: 35,
        resizeMode: "contain"
    },
    facebookSignUpButtonText: {
        color: "white",
        marginTop: 7,
        fontWeight: "bold"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    footerTextOne: {
        marginRight: 5,
        color: "#808080"
    },
    footerTextTwo: {
        color: "#191919",
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalBox: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        minHeight: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    warning: {
        fontWeight: "bold",
        color:"red",
        fontSize:25
    },
    modalText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: "center"
    },
    modalButton: {
        backgroundColor: "#203f81",
        padding: 10,
        borderRadius: 5,
        width: 70,
        height: 40,
        alignItems: "center"
    },
    modalButtonText: {
        color: "white",
        fontSize: 16
    }
});