import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1E5D9"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: "#5D4037",
        paddingHorizontal: 15
    },
    headerImage: {
        marginLeft: 10,
        height: 35,
        width: 35,
        resizeMode: "contain",
        tintColor: "#F1E5D9"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 30,
        left: "27%",
        color: "#F1E5D9"
    },
    bar: {
        marginTop: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    barLine: {
        height: 1,
        backgroundColor: "#B69A6A",
        width: "90%"
    },
    card: {
        borderWidth: 2,
        borderColor: "#C8A47D",
        padding: 12,
        margin: 10,
        flexDirection: "row",
        backgroundColor: "#E7D7B9", 
        borderRadius: 14,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5
    },
    cardFirstSection: {
        marginRight: 15,
        height: 100
    },
    cardSecondSection: {
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5,
        width: "40%",
    },
    cardThirdSection: {
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingTop: 5,
        paddingBottom: 5,
        width: "25%"
    },
    cardImage: {
        width: 100,
        height: "100%",
        resizeMode: "cover",
        borderRadius: 12,
        borderColor: "#6A4E23",
        borderWidth: 2
    },
    cardName: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#6A4E23"
    },
    cardPrice: {
        fontSize: 18,
        color: "#B69A6A"
    },
    deleteOptionImage: {
        height: 30,
        width: 30,
        resizeMode: "contain",
        tintColor: "#6A4E23"
    },
    quantitySection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    QIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    QIconImage: {
        height: 30,
        width: 30,
        resizeMode: "contain"
    },
    quantity: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#6A4E23"
    },
    buttonView: {
        marginBottom: 20,
        width: "100%",
        paddingVertical: 15,
        alignItems: "center"
    },
    totalText: {
        fontWeight: "bold",
        margin: 5,
        fontSize: 20,
        color: "#6A4E23"
    },
    payButton: {
        backgroundColor: "#5D4037",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10
    },
    payButtonText: {
        color: "#F1E5D9",
        fontSize: 18,
        fontWeight: "bold"
    },
    modalView: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalBox: {
        backgroundColor: "#E7D7B9",
        padding: 10,
        borderRadius: 10,
        width: "90%",
        height: "48%",
        alignItems: "center"
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marign: 5,
        color: "#6A4E23"
    },
    modalBar: {
        marginTop: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    modalBarLine: {
        height: 1,
        backgroundColor: "#B69A6A",
        width: "90%"
    },
    addressBox: {
        justifyContent: "flex-start",
        width: "100%",
        padding: 5
    },
    addressTitle:{
        fontWeight: "bold",
        color: "#6A4E23"
    },
    addressView:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5
    },
    addressImage: {
        height: 30,
        width: 30,
        resizeMode: "contain",
        marginRight: 5
    },
    modalPaymentInfo: {
        padding: 5,
        margin: 10
    },
    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 5
    },
    modalButtonView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    cancelModalButton: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#D98841",
        borderRadius: 10
    },
    cancelText: {
        color: "#F1E5D9",
        fontWeight: "bold"
    },
    placeModalButton: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#A65F2B",
        borderRadius: 10
    },
    placeText: {
        color: "#F1E5D9",
        fontWeight: "bold"
    }
});