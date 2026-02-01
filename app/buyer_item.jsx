import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import buyer_item_style from "../styles/buyer_item_style";
import { addToCart, fetchProductById } from "../services/api";

const BuyerItem = () => {
  const router = useRouter();
  const { itemId } = useLocalSearchParams();

  const [itemData, setItemData] = useState({
    name: "",
    price: "",
    sellerName: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        if (itemId) {
          const product = await fetchProductById(itemId);
          if (product) {
            setItemData(product);
          }
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [itemId]);

  const handleAddToCart = async () => {
    import("@react-native-async-storage/async-storage").then(module => {
      const AsyncStorage = module.default;
      AsyncStorage.getItem("user").then(async userString => {
        if (userString) {
          const user = JSON.parse(userString);
          const result = await addToCart(user.id, itemId);
          if (result.success) {
            Alert.alert("Success", "Item added to cart!");
          } else {
            Alert.alert("Error", "Could not add to cart.");
          }
        } else {
          Alert.alert("Please login first");
        }
      });
    });
  };

  return (
    <View style={buyer_item_style.container}>
      <View style={buyer_item_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={buyer_item_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={buyer_item_style.headerText}>𝗣𝗿𝗼𝗱𝘂𝗰𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻</Text>
      </View>

      <ScrollView style={buyer_item_style.body}>
        <Image source={require("../assets/images/TestImage.jpg")} style={buyer_item_style.itemImage}></Image>

        {loading ? (
          <View style={buyer_item_style.statusView}>
            <Text style={buyer_item_style.statusText}>Loading...</Text>
          </View>
        ) : (
          <View style={buyer_item_style.itemCard}>
            <Text style={buyer_item_style.itemTitle}>{itemData.name}</Text>
            <Text style={buyer_item_style.itemPrice}>₹{itemData.price}</Text>
            <Text style={buyer_item_style.itemSellerName}>By {itemData.sellerName}</Text>
            <Text style={buyer_item_style.itemCategory}>Category: {itemData.category}</Text>
            <Text style={buyer_item_style.itemDescription}>{itemData.description}</Text>
          </View>
        )}

        <View style={buyer_item_style.buttonView}>
          <TouchableOpacity style={buyer_item_style.atcButton} onPress={handleAddToCart}>
            <Text style={buyer_item_style.buttonText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={buyer_item_style.viarButton}>
            <Text style={buyer_item_style.buttonText}>View in AR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default BuyerItem;