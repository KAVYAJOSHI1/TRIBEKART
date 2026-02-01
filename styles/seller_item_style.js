import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5E1C8"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30,
        marginBottom: 10,
        backgroundColor: "#6D4C41",
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    headerImage: {
        marginLeft: 10,
        height: 35,
        width: 35,
        resizeMode: "contain",
        tintColor: "#F5E8C7"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        left: "24%",
        color: "#F5E8C7"
    },
    body: {
        paddingLeft: 20,
        marginTop: 10
    },
    itemTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#6D4C41"
    },
    mainImage: {
        height: 150,
        width: "70%",
        resizeMode: "contain",
        backgroundColor: "#E5D0B2",
        borderRadius: 10,
        borderColor: "#E5D0B2",
        borderWidth: 5,
        marginTop: 10,
        marginBottom: 10
    },
    filePicker: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#D2691E",
        backgroundColor: "#FFE0B2",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "60%"
    },
    filePickerText: {
        fontWeight: "bold",
        color: "#D2691E"
    },
    textInput: {
        borderWidth: 1.5,
        borderColor: "#6D4C41",
        borderRadius: 10,
        width: "80%",
        height: 50,
        backgroundColor: "#FAF3E0"
    },
    pickerBox: {
        borderWidth: 1.5,
        borderColor: "#6D4C41",
        borderRadius: 10,
        height: 55,
        width: "80%",
        overflow: "hidden",
        backgroundColor: "#FAF3E0"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 20
    },
    saveButtonEnable: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        backgroundColor: "#4B8B3B",
        borderRadius: 10
    },
    saveButtonDisable: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        backgroundColor: "#4B8B3B99",
        borderRadius: 10
    },
    deleteButton: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        backgroundColor: "#A52A2A",
        borderRadius: 10
    },
    buttonText: {
        fontWeight: "bold",
        color: "white"
    }
});