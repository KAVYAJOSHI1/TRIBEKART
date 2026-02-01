import { StyleSheet } from "react-native";

export default StyleSheet.create({
    window: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:"#DFDFC7"
    },
    back: {
        marginTop: 20,
        marginLeft: 10
    },
    headerWindow: {
        justifyContent: "center",
        backgroundColor:"#DFDFC7"
    },
    header: {
        marginTop: 20,
        marginLeft: 25,
        fontSize: 25,
        fontWeight: "bold",
        color: "#191919"
    },
    subHeader: {
        marginLeft: 20,
        color: "#919191"
    },
    mainWindow: {
        flex: 1
    },
    inputContainer: {
        marginLeft: 20
    },
    setMarginTop30: {
        marginTop: 30
    },
    setMarginTop10: {
        marginTop: 10
    },
    containerText: {
        color: "#191919",
        fontWeight: "bold",
        fontSize: 15
    },
    textBox: {
        width: "95%",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        height: 45,
        backgroundColor:"#E9EBE6"
    },
    fop: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    fopText1: {
        color: "#353535",
        marginRight: 5
    },
    fopText2: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
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
    bar: {
        marginLeft: 8,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    barLine: {
        height: 1,
        width: "44%",
        borderWidth: 0.5,
        borderColor: "#909090"
    },
    barText: {
        color: "#909090",
        marginLeft: 5,
        marginRight: 5
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
        position: "absolute",
        bottom: 30,
        left: 90
    },
    footerText1: {
        marginRight: 5,
        color: "#808080"
    },
    footerText2: {
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