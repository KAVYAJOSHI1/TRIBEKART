import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    paddingTop: 25,
    paddingBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#5D4037",
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#B8A878"
  },
  headTitle: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 30,
    flex: 1,
    color: "#F5E8C7"
  },
  notification: {
    marginTop: 2,
    marginRight: 1,
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "#F5E8C7"
  },
  body: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#F5E8C7",
    flex: 1
  },
  bodyView: {
    flexDirection:"row",
    flexWrap: "wrap"
  },
  itemCard: {
    width: "46%",
    height: 150,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#B8A878",
    backgroundColor: "#F6EEE3",
    elevation: 3,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  itemImage: {
    height: "50%",
    width: "90%",
    resizeMode: "contain",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#4A342F"
  },
  addItemCard: {
    width: "46%",
    height: 150,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#B8A878",
    backgroundColor: "#F6EEE3",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  addItemCardText: {
    fontWeight: "bold",
    color: "#4A342F"
  },
  footer: {
    marginBottom: 15,
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 2,
    borderColor: "#B8A878",
    backgroundColor: "#5D4037",
    elevation: 5
  },
  footerIcon: {
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  homeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#F5E8C7",
  },
  subsection: {
    color: "white",
    fontSize: 10
  },
  modalContainer: {
    backgroundColor: "#F6EEE3",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B8A878",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#6B4226"
  },
  input: {
    width: "80%",
    borderWidth: 2,
    borderColor: "#B8A878",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#F5E8C7",
    color: "#4A342F"
  },
  pickerBox: {
    borderWidth: 2,
    borderColor: "#B8A878",
    borderRadius: 10,
    height: 55,
    width: "80%",
    overflow: 'hidden',
    backgroundColor: "#F5E8C7",
    color: "#4A342F"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  saveButton: {
    backgroundColor: "#5D4037",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center"
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});