import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "#F5E8C7",
        flex: 1
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 35,
        marginBottom: 15
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
        left: "22%",
        color: "#6D4C41"
    },
    bar: {
        alignItems: "center",
        marginVertical: 10
    },
    barLine: {
        height: 1,
        backgroundColor: "#8D6E63",
        width: "90%"   
    },
    barLine2: {
        height: 1,
        backgroundColor: "#A1887F",
        width: "70%"   
    },
    bar2: {
        height: 3,
        backgroundColor: "#BCAAA4",
        width: "100%",
        marginVertical: 8
    },
    optionCard: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 10,
    },
    optionImage: {
        height: 30,
        width: 30,
        resizeMode: "contain",
        marginRight: 15,
        tintColor: "#5D4037"
    },
    optionText: {
        fontSize: 16,
        flex: 1,
        color: "#4E342E"
    },
    optionArrow: {
        marginTop: 3,
        height: 35,
        width: 35,
        resizeMode: "contain",
        tintColor: "#795548"
    },
    logoutText: {
        fontSize: 16,
        flex: 1,
        color: "#D84315"
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        backgroundColor: "#F5E8C7",
        alignItems: "center",
        borderRadius: 12,
        width: "90%",
        paddingVertical: 30,
        paddingHorizontal: 25,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5
    },
    modalImage: {
        height: 70,
        width: 70,
        resizeMode: "contain",
        marginBottom: 15
    },
    modalHeader1: {
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 5,
        color: "#5D4037"
    },
    modalHeader2: {
        color: "#6D4C41",
        fontWeight: "bold",
        marginBottom: 20,
        fontSize: 16
    },
    modalButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        height: 50,
        width: "100%",
        marginBottom: 15
    },
    modalButton1: {
        backgroundColor: "#BF360C"
    },
    modalOption1: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    modalButton2: {
        borderWidth: 2,
        borderColor: "#795548",
        backgroundColor: "#DFDFC7"
    },
    modalOption2: {
        color: "#5D4037",
        fontWeight: "bold",
        fontSize: 16
    }
});