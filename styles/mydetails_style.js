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
        left: "18%",
        color: "#4A2500"
    },
    bar: {
        marginTop: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    barLine: {
        height: 2,
        backgroundColor: "#D4A373",
        width: "90%"
    },
    field: {
        justifyContent: "center",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    fieldName: {
        fontWeight: "bold",
        fontSize: 16
    },
    textBox: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#A67C52",
        backgroundColor: "#FDF6E3",
        color: "#4A2500",
        fontSize: 16,
        borderRadius: 12,
        height: 45,
        paddingRight: 15,
        paddingLeft: 15
    },
    pickerBox: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#A67C52",
        borderRadius: 12,
        height: 55,
        overflow: 'hidden'
    },
    picker: {
        width: "100%",
        color: "#4A2500"
    },
    pickerItem: {
        fontSize: 16,
        color: "4A2500"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "55%"
    },
    footerOptionEnabled: {
        height: 42,
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8B4513",
        borderRadius: 10
    },
    footerOptionDisabled: {
        height: 42,
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8B451377",
        borderRadius: 10
    },
    footerOptionReset: {
        height: 42,
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4A2500",
        borderRadius: 10
    },
    footerOptionText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white"
    }
});