import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF3E0"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: "#8B5E3C",
        borderBottomWidth: 2,
        borderBottomColor: "#E5C9A8",
        marginBottom: 10
    },
    headerImage: {
        height: 35,
        width: 35,
        marginLeft: 20,
        resizeMode: "contain",
        tintColor: "#FFF"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        left: "23%",
        color: "#F1E5D9"
    },
    title: {
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        color: "#6A4E23"
    },
    addressCard: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#C8A47D",
        backgroundColor: "#E7D7B9",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    cardFirstSection: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    cardImage: {
        height: 30,
        width: 30,
        resizeMode: "contain"
    },
    cardSecondSection: {
        flex: 1
    },
    cardAddressName: {
        fontWeight: "bold",
        color: "#5D4037"
    },
    cardSubfield: {
        color: "#6A4E23"
    },
    cardThirdSection: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    addButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#C8A47D",
        backgroundColor: "#E7D7B9",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    addButtonImage: {
        resizeMode: "contain"
    },
    addButtonText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#5D4037"
    },
    modalCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        backgroundColor: "#E7D7B9",
        borderWidth: 2,
        borderColor: "#B69A6A",
        borderRadius: 10,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        padding: 5
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%"
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 5,
        left: "15%",
        color: "#5D4037"
    },
    modalSubTitle: {
        fontWeight: "bold",
        color: "#6A4E23"
    },
    modalTextInput: {
        width: "80%",
        borderWidth: 2,
        borderColor: "#B69A6A",
        backgroundColor: "#F1E5D9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    row2: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%"
    },
    modalContinueButton: {
        backgroundColor: "#5D4037",
        padding: 15,
        borderRadius: 10,
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    modalCancelButton: {
        resizeMode: "contain"
    },
    modalDeleteButton: {
        backgroundColor: "#B69A6A",
        padding: 15,
        borderRadius: 10,
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    modalButtonText: {
        color: "#F1E5D9",
        fontWeight: "bold"
    },
    addModalContinueButton: {
        backgroundColor: "#5D4037",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    checkboxBase: {
        marginTop: 20,
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#6A4E23",
        backgroundColor: "transparent"
    },
    checkboxChecked: {
        backgroundColor: "#B69A6A"
    },
    checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#5D4037"
    }
});