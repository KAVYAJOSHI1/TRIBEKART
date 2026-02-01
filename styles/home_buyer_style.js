import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        marginBottom: 10
    },
    headerTop: {
        flexDirection: "row",
        marginTop: 40,
        alignItems: "center"
    },
    headTitle: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 30,
        color: "#4A342F"
    },
    notification: {
        marginLeft: "66%",
        height: 30,
        width: 30,
        resizeMode: "contain"
    },
    headerBottom: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    search: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#6B4226",
        backgroundColor: "#F5E8C7"
    },
    searchIcon: {
        height: 30,
        width: 30,
        resizeMode: "contain",
        tintColor: "#6B4226"
    },
    searchTextBox: {
        width: "75%",
        color: "#6B4226"
    },
    filtericon: {
        height: 30,
        width: 30,
        resizeMode: "contain",
        tintColor: "#4A342F"
    },
    filterSection: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 10
    },
    filterOption: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#B8A878",
        backgroundColor: "#F5E8C7",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    filterText: {
        fontWeight: "bold",
        color: "#4A342F"
    },
    filterOptionSelected: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#6B4226",
        backgroundColor: "#6B4226",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    filterTextSelected: {
        fontWeight: "bold",
        color: "white"
    },
    body: {
        marginTop: 10,
        paddingHorizontal: 15
    },
    bodyView: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    carouselTitleView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    carouselTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#6B4226"
    },
    carouselCard: {
        width: "100%",
        height: "99%",
        borderRadius: 10,
        backgroundColor: "#F5E8C7",
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    carouselImage: {
        width: "100%",
        height: 160,
        borderRadius: 10,
        resizeMode: "cover"
    },
    carouselName: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5,
        textAlign: "center",
        color: "#4A342F"
    },
    carouselPrice: {
        fontSize: 18,
        color: "#6B4226",
        marginTop: 3
    },
    carouselCreator: {
        fontSize: 16,
        color: "#777",
        marginTop: 2
    },
    productCard: {
        width: "46%",
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#F5E8C7",
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    productImage: {
        width: "100%",
        height: 140,
        borderRadius: 10,
        resizeMode: "cover"
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
        textAlign: "center",
        color: "#4A342F"
    },
    productPrice: {
        fontSize: 14,
        color: "#6B4226",
        marginTop: 3
    },
    productCreator: {
        fontSize: 12,
        color: "#777",
        marginTop: 2
    },
    footer: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#F5E8C7",
        backgroundColor: "#F5E8C7"
    },
    footerIcon: {
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "contain",
    },
    homeIcon: {
        tintColor: "black"
    },
    subsection: {
        color: "#4A342F",
        fontSize: 10
    }
});