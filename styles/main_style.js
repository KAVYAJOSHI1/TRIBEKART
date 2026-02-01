import { StyleSheet } from "react-native";

export default StyleSheet.create({
    window: {
        fontFamily:"Inknut Antiqua",
        flex: 1,
        alignItems: "center",
        backgroundColor:"#DFDFC7",
        justifyContent: "center"
    },
    header: {
        fontSize: 45,
        fontWeight: "bold",
        marginBottom: 5
    },
    desc: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20
    },
    logo: {
        marginBottom: 10,
        height: 200,
        resizeMode: "contain"
    },
    button: {
        height: 50,
        width: 300,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginTop: 10
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }
});