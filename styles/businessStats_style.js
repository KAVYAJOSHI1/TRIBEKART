import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE5D3"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5D4037",
    paddingVertical: 25,
    paddingHorizontal: 15,
    elevation: 5
  },
  headerImage: {
    height: 35,
    width: 35,
    resizeMode: "contain",
    tintColor: "#F5E8C7"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    left: "15%",
    color: "#F5E8C7"
  },
  overallStatsView: {
    backgroundColor: "#FFDAB9",
    borderRadius: 15,
    padding: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  overallStatsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5A3E36",
    textAlign: "center"
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 8,
    color: "#5A3E36"
  },
  cardTitle2: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    color: "#5A3E36"
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF5EE",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#8C2F39",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5A3E36"
  },
  itemAmount: {
    fontSize: 14,
    color: "#333"
  }
});

export default styles;