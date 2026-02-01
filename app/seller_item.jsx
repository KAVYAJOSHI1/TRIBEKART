import { Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import seller_item_style from "../styles/seller_item_style";
import { fetchProductById, updateProduct, deleteProduct } from "../services/api";

// import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
// // import { auth, db } from "../services/firebaseConfig";

const SellerItem = () => {
  const router = useRouter();
  const { itemId } = useLocalSearchParams();

  const [itemData, setItemData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (!itemId) return;

        const data = await fetchProductById(itemId);
        if (data) {
          setItemData(data);
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price ? data.price.toString() : "");
          setCategory(data.category);
        } else {
          Alert.alert("No such item exist");
        }
      } catch (error) {
        Alert.alert("Error fetching item")
      }
    };
    fetchItem();
  }, []);

  useEffect(() => {
    if (name !== itemData.name || description !== itemData.description || price !== itemData.price || category !== itemData.category || selectedImage !== null) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [name, description, price, category, selectedImage, itemData]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to allow access to the gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      if (!name || !description || !price || !category) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }

      if (price <= 0) {
        Alert.alert("Error", "Please make sure that price is more than 0");
        return;
      }

      await updateProduct(itemId, {
        name,
        description,
        price,
        category
      });

      Alert.alert("Success", "Item updated successfully");
      setHasChanges(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update item");
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert("Confirm", "Are you sure you want to delete this item?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK", onPress: async () => {
            try {
              await deleteProduct(itemId);
              Alert.alert("Success", "Item deleted successfully");
              router.dismissTo("/login");
              router.push("/home_seller");
            } catch (error) {
              Alert.alert("Failed to delete the item", error.message);
            }
          }
        }
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to delete item");
    }
  };
  return (
    <View style={seller_item_style.container}>
      <View style={seller_item_style.header}>
        <TouchableOpacity onPress={() => { router.dismissTo("/login"); router.push("/home_seller"); }}>
          <Image source={require("../assets/images/back-button.png")} style={seller_item_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={seller_item_style.headerText}>𝗘𝗱𝗶𝘁 𝗜𝘁𝗲𝗺</Text>
      </View>

      <View style={seller_item_style.body}>
        <Text style={seller_item_style.itemTitle}>Product Image</Text>
        <Image source={selectedImage ? { uri: selectedImage } : require("../assets/images/TestImage.jpg")} style={seller_item_style.mainImage} />
        <TouchableOpacity style={seller_item_style.filePicker} onPress={pickImage}>
          <Text style={seller_item_style.filePickerText}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      <View style={seller_item_style.body}>
        <Text style={seller_item_style.itemTitle}>Product Name:</Text>
        <TextInput style={seller_item_style.textInput} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={"#666"}></TextInput>
      </View>

      <View style={seller_item_style.body}>
        <Text style={seller_item_style.itemTitle}>Product Description:</Text>
        <TextInput style={seller_item_style.textInput} value={description} onChangeText={setDescription} placeholder="Description" placeholderTextColor={"#666"} multiline></TextInput>
      </View>

      <View style={seller_item_style.body}>
        <Text style={seller_item_style.itemTitle}>Product Price:</Text>
        <TextInput style={seller_item_style.textInput} value={price} onChangeText={setPrice} placeholder="Price" placeholderTextColor={"#666"} keyboardType="numeric"></TextInput>
      </View>

      <View style={seller_item_style.body}>
        <Text style={seller_item_style.itemTitle}>Category:</Text>
        <View style={seller_item_style.pickerBox}>
          <Picker selectedValue={category} onValueChange={setCategory}>
            <Picker.Item label="Painting" value="painting"></Picker.Item>
            <Picker.Item label="Fabric" value="fabric"></Picker.Item>
            <Picker.Item label="Statue" value="statue"></Picker.Item>
            <Picker.Item label="Other" value="other"></Picker.Item>
          </Picker>
        </View>
      </View>

      <View style={seller_item_style.buttonView}>
        <TouchableOpacity style={hasChanges ? seller_item_style.saveButtonEnable : seller_item_style.saveButtonDisable} onPress={hasChanges ? handleSave : () => { }}>
          <Text style={seller_item_style.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={seller_item_style.deleteButton} onPress={handleDelete}>
          <Text style={seller_item_style.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SellerItem;