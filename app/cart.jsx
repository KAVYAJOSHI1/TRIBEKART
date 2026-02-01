import { Text, View, Image, TouchableOpacity, ScrollView, Modal, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import cart_style from "../styles/cart_style";
import { fetchCart, placeOrder, fetchAddresses, removeFromCart } from "../services/api";
import Toast from 'react-native-toast-message';

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTotal, setModalTotal] = useState("");

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleQuantityChange = async (itemId, operation) => {
    setCartItems(prev => {
      const item = prev[itemId];
      if (!item) return prev;
      let newQty = parseInt(item.quantity, 10);
      if (operation === 'increment') newQty++;
      else if (operation === 'decrement' && newQty > 1) newQty--;

      return {
        ...prev,
        [itemId]: { ...item, quantity: newQty.toString() }
      };
    });
  };

  const handleDeleteItem = async (itemId) => {
    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const result = await removeFromCart(user.id, itemId);
            if (result.success) {
              setCartItems(prev => {
                const newCartItems = { ...prev };
                delete newCartItems[itemId];
                return newCartItems;
              });
            } else {
              Alert.alert("Error", "Failed to delete item");
            }
          }
        });
      });
    } catch (error) {
      Alert.alert("Error deleting item");
    }
  };

  const fetchSelectedAddress = async () => {
    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const addresses = await fetchAddresses(user.id);
            const selected = addresses.find(a => a.selected);
            if (selected) {
              setSelectedAddress(selected);
            }
          }
        });
      });
    } catch (error) {
      Alert.alert("Error fetching address");
    }
    return null;
  };

  useEffect(() => {
    // Mock user ID (replace with persistent user later)
    import("@react-native-async-storage/async-storage").then(module => {
      const AsyncStorage = module.default;
      AsyncStorage.getItem("user").then(userString => {
        if (userString) {
          const user = JSON.parse(userString);
          fetchCart(user.id).then(items => {
            // Convert array to object keyed by ID to match UI expectation
            // UI expects: { itemId: { name, price, quantity, ... } }
            // Backend returns: [ { id, quantity, name, price, ... } ]
            // Note: This UI was designed for Firestore object structure.
            // We need to adapt the data structure or the UI.
            // Let's adapt data for minimal UI breakage.
            const cartObj = {};
            items.forEach(i => {
              cartObj[i.id] = { ...i, quantity: i.quantity.toString() };
            });
            setCartItems(cartObj);
          });
        }
      });
    });

    const loadAddress = async () => {
      // Mock address for now
      setSelectedAddress({ addressName: "Home", addressFirstField: "123 Main St" });
    };
    loadAddress();
  }, []);

  useEffect(() => {
    // Calculate total whenever cartItems changes
    let newTotal = 0;
    Object.values(cartItems).forEach(item => {
      const price = parseFloat(item.price);
      const qty = parseInt(item.quantity, 10);
      if (!isNaN(price) && !isNaN(qty)) {
        newTotal += price * qty;
      }
    });
    setTotal(newTotal);
  }, [cartItems]);

  const CartCard = () => {
    if (Object.keys(cartItems).length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Your cart is empty.</Text>
        </View>
      );
    }

    return Object.entries(cartItems).map(([itemId, item]) => (
      <View style={cart_style.card} key={itemId}>
        <View style={cart_style.cardFirstSection}>
          <Image source={require("../assets/images/TestImage.jpg")} style={cart_style.cardImage} />
        </View>

        <View style={cart_style.cardSecondSection}>
          <Text style={cart_style.cardName}>{item.name}</Text>
          <Text style={cart_style.cardPrice}>₹{item.price}</Text>
        </View>

        <View style={cart_style.cardThirdSection}>
          <TouchableOpacity onPress={() => handleDeleteItem(itemId)}>
            <Image source={require("../assets/images/trash-icon.png")} style={cart_style.deleteOptionImage}></Image>
          </TouchableOpacity>

          <View style={cart_style.quantitySection}>
            <TouchableOpacity style={cart_style.QIcon} onPress={() => handleQuantityChange(itemId, 'decrement')} disabled={parseInt(item.quantity, 10) === 1}>
              <Image source={require("../assets/images/minus-icon.png")} style={[cart_style.QIconImage, parseInt(item.quantity, 10) === 1 && { opacity: 0.5 }]}></Image>
            </TouchableOpacity>

            <Text style={cart_style.quantity}>{item.quantity}</Text>

            <TouchableOpacity style={cart_style.QIcon} onPress={() => handleQuantityChange(itemId, 'increment')}>
              <Image source={require("../assets/images/plus-icon.png")} style={cart_style.QIconImage}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  const handlePlaceOrder = async () => {
    try {
      const module = await import("@react-native-async-storage/async-storage");
      const AsyncStorage = module.default;
      const userString = await AsyncStorage.getItem("user");

      if (userString) {
        const user = JSON.parse(userString);
        try {
          const result = await placeOrder(user.id, parseFloat(modalTotal) + 80);
          if (result.success) {
            Toast.show({
              type: 'success',
              text1: 'Order Placed Successfully!',
              text2: 'You can track it in My Orders.'
            });
            setCartItems({});
            setModalVisible(false);
            router.push("/buyer_order");
          } else {
            Toast.show({
              type: 'error',
              text1: 'Failed',
              text2: result.message || "Failed to place order."
            });
          }
        } catch (apiError) {
          // Extract error message from Axios response if possible
          const errorMessage = apiError.response?.data?.message || "Transaction failed. Please check your wallet balance.";
          Toast.show({
            type: 'error',
            text1: 'Transaction Failed',
            text2: errorMessage
          });
        }
      }
    } catch (error) {
      console.error("Order Error", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const showModal = (total) => {
    setModalTotal(total);
    setModalVisible(true);
  };

  return (
    <View style={cart_style.container}>
      <View style={{ flex: 1 }}>
        <View style={cart_style.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={require("../assets/images/back-button.png")} style={cart_style.headerImage}></Image>
          </TouchableOpacity>
          <Text style={cart_style.headerText}>𝗖𝗮𝗿𝘁</Text>
        </View>

        <View style={cart_style.bar}>
          <View style={cart_style.barLine}></View>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <CartCard />
        </ScrollView>

        <View style={cart_style.buttonView}>
          <Text style={cart_style.totalText}>Total: ₹{total}</Text>
          <TouchableOpacity style={cart_style.payButton} onPress={() => showModal(total)}>
            <Text style={cart_style.payButtonText}>Proceed to Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={cart_style.modalView}>
          <View style={cart_style.modalBox}>
            <Text style={cart_style.modalTitle}>Confirm Purchase</Text>

            <View style={cart_style.modalBar}>
              <View style={cart_style.modalBarLine}></View>
            </View>

            <View style={cart_style.addressBox}>
              <Text style={cart_style.addressTitle}>Delivery Address</Text>
              <View style={cart_style.addressView}>
                <Image source={require("../assets/images/location-icon.png")} style={cart_style.addressImage}></Image>
                <View>
                  {selectedAddress ? (
                    <>
                      <Text>{selectedAddress.addressName}</Text>
                      <Text>{selectedAddress.addressFirstField}</Text>
                    </>
                  ) : (
                    <Text>No address selected.</Text>
                  )}
                </View>
              </View>
            </View>

            <View style={cart_style.modalBar}>
              <View style={cart_style.modalBarLine}></View>
            </View>

            <View style={cart_style.modalPaymentInfo}>
              <View style={cart_style.paymentRow}>
                <Text>Subtotal:</Text>
                <Text>₹{modalTotal}</Text>
              </View>
              <View style={cart_style.paymentRow}>
                <Text>Shipping Fees:</Text>
                <Text>₹80</Text>
              </View>
            </View>

            <View style={cart_style.modalBar}>
              <View style={cart_style.modalBarLine}></View>
            </View>

            <View style={cart_style.modalPaymentInfo}>
              <View style={cart_style.paymentRow}>
                <Text>Total:</Text>
                <Text>₹{modalTotal + 80}</Text>
              </View>
            </View>

            <View style={cart_style.modalButtonView}>
              <TouchableOpacity style={cart_style.cancelModalButton} onPress={() => setModalVisible(false)}>
                <Text style={cart_style.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={cart_style.placeModalButton} onPress={handlePlaceOrder}>
                <Text style={cart_style.placeText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Cart;