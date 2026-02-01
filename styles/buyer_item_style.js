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
        marginBottom: 10
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
        fontSize: 25,
        left: "9%",
        color: "#F1E5D9"
    },
    body: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },
    itemImage: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D1A054"
    },
    itemCard: {
        backgroundColor: "#E7D7B9",
        borderRadius: 12,
        elevation: 5,
        padding: 18,
        marginTop: 15,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 }
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#6A4E23"
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#D35400",
        marginBottom: 5
    },
    itemSellerName: {
        fontSize: 16,
        color: "#444",
        marginBottom: 5,
        fontStyle: "italic"
    },
    itemCategory: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#B85C38",
        marginBottom: 5
    },
    itemDescription: {
        fontSize: 16,
        color: "#444",
        lineHeight: 22
    },
    buttonView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    atcButton: {
        backgroundColor: "#D35400",
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 }
    },
    viarButton: {
        backgroundColor: "#B85C38",
        borderRadius: 10,
        padding: 15,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 }
    },
    buttonText: {
        fontSize: 17,
        color: "white",
        fontWeight: "bold"
    },
    statusView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    statusText: {
        fontSize: 18,
        color: "#666"
    }
});