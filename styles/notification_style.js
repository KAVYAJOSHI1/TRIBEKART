import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7D7B9"
    },
    header: {
        flexDirection: "row",
        alignContent: "center",
        paddingTop: 40,
        backgroundColor: "#5D4037",
        paddingBottom: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#6A4E23"
    },
    backBTN: {
        marginLeft: 10,
        tintColor: "#F1E5D9"
    },
    headerText: {
        color: "#F1E5D9",
        fontWeight: "bold",
        fontSize: 25,
        marginTop: 5,
        marginLeft: 50
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E7D7B9"
    },
    emptyImage: {
        tintColor: "#6A4E23"
    },
    emptyText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#6A4E23"
    },
    emptyText2: {
        fontSize: 15,
        color: "#808080"
    }
});