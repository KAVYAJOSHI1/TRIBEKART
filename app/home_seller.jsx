import { Text, View, Image, TouchableOpacity, Modal, ScrollView, Alert, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import home_seller_style from "../styles/home_seller_style";
import { fetchUserItems, addItem } from "../services/api";

// // import { db, auth } from "../services/firebaseConfig";
// import { collection, query, where, getDocs, getDoc, doc, addDoc } from "firebase/firestore";

const HomeSeller = () => {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amountSold, setAmountSold] = useState("0");

  const fetchItems = async () => {
    import("@react-native-async-storage/async-storage").then(module => {
      const AsyncStorage = module.default;
      AsyncStorage.getItem("user").then(async userString => {
        if (userString) {
          const user = JSON.parse(userString);
          const data = await fetchUserItems(user.id);
          setItems(data);
        }
      });
    });
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setAmountSold("0");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = async () => {
    if (!name || !price || !description || !category) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    setIsLoading(true);
    import("@react-native-async-storage/async-storage").then(module => {
      const AsyncStorage = module.default;
      AsyncStorage.getItem("user").then(async userString => {
        if (userString) {
          const user = JSON.parse(userString);

          const itemData = {
            name,
            price,
            description,
            category,
            amountSold,
            createdBy: user.id,
            sellerName: user.name || "Seller" // Fallback name
          };

          try {
            await addItem(itemData);
            Alert.alert("Success", "Item added successfully");
            setAddItemModalVisible(false);
            fetchItems();
            resetForm();
          } catch (e) {
            Alert.alert("Error", "Failed to add item");
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      });
    });
  };

  return (
    <>
      <View style={home_seller_style.header}>
        <Text style={home_seller_style.headTitle}>𝗦𝗲𝗹𝗹𝗲𝗿 𝗗𝗮𝘀𝗵𝗯𝗼𝗮𝗿𝗱</Text>
        <TouchableOpacity onPress={() => router.push("/notification")}>
          <Image source={require("../assets/images/notification-logo.png")} style={home_seller_style.notification}></Image>
        </TouchableOpacity>
      </View>

      <ScrollView style={home_seller_style.body}>
        <View style={home_seller_style.bodyView}>
          {/* Item Card */}
          {items.map(item => (
            <TouchableOpacity key={item.id} style={home_seller_style.itemCard} onPress={() => router.push({ pathname: "/seller_item", params: { itemId: item.id } })}>
              <Image source={require("../assets/images/TestImage.jpg")} style={home_seller_style.itemImage}></Image>
              <Text style={home_seller_style.itemTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))}

          {/* Add Item Button */}
          <TouchableOpacity style={home_seller_style.addItemCard} onPress={() => setAddItemModalVisible(true)}>
            <Image source={require("../assets/images/plus-icon.png")}></Image>
            <Text style={home_seller_style.addItemCardText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={home_seller_style.footer}>
        <TouchableOpacity style={home_seller_style.footerIcon}>
          <Image source={require("../assets/images/home-icon.png")} style={home_seller_style.homeIcon}></Image>
          <Text style={home_seller_style.subsection}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={home_seller_style.footerIcon} onPress={() => router.push("./documentation")}>
          <Image source={require("../assets/images/documentation-icon.png")} style={home_seller_style.homeIcon}></Image>
          <Text style={home_seller_style.subsection}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={home_seller_style.footerIcon} onPress={() => router.push("/businessStats")}>
          <Image source={require("../assets/images/stats-icon.png")} style={home_seller_style.homeIcon}></Image>
          <Text style={home_seller_style.subsection}>Business Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={home_seller_style.footerIcon} onPress={() => router.push("/seller_account")}>
          <Image source={require("../assets/images/user-icon.png")} style={home_seller_style.homeIcon}></Image>
          <Text style={home_seller_style.subsection}>Account</Text>
        </TouchableOpacity>
      </View>

      {/* Add Item Modal */}
      <Modal transparent={true} visible={addItemModalVisible} animationType="fade">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={home_seller_style.modalContainer}>
              <Text style={home_seller_style.modalTitle}>Add New Item</Text>

              <TextInput style={home_seller_style.input} placeholder="Item Name" placeholderTextColor={"#6B4226"} value={name} onChangeText={setName} />
              <TextInput style={home_seller_style.input} placeholder="Price" placeholderTextColor={"#6B4226"} keyboardType="numeric" value={price} onChangeText={setPrice} />
              <TextInput style={home_seller_style.input} placeholder="Description" placeholderTextColor={"#6B4226"} multiline value={description} onChangeText={setDescription} />

              <View style={home_seller_style.pickerBox}>
                <Picker selectedValue={category} onValueChange={setCategory}>
                  <Picker.Item label="Painting" value="painting"></Picker.Item>
                  <Picker.Item label="Fabric" value="fabric"></Picker.Item>
                  <Picker.Item label="Statue" value="statue"></Picker.Item>
                  <Picker.Item label="Other" value="other"></Picker.Item>
                </Picker>
              </View>

              <View style={home_seller_style.buttonRow}>
                <TouchableOpacity style={home_seller_style.cancelButton} onPress={() => setAddItemModalVisible(false)} disabled={isLoading}>
                  <Text style={home_seller_style.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[home_seller_style.saveButton, isLoading && { opacity: 0.7 }]}
                  onPress={handleAddItem}
                  disabled={isLoading}
                >
                  <Text style={home_seller_style.buttonText}>{isLoading ? "Saving..." : "Save Item"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

export default HomeSeller;