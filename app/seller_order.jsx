import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import seller_order_style from "../styles/seller_order_style";
import { fetchSellerOrders, cancelOrder, updateOrderStatus } from "../services/api";

const Card = ({ order, onCancel }) => {

  const handleCancelOrder = async () => {
    try {
      Alert.alert("Confirm", "Are you sure you want to cancel this order?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes", onPress: async () => {
            await cancelOrder(order.id);
            onCancel(); // Refresh list
          }
        }
      ]);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handleProcessOrder = async () => {
    try {
      Alert.alert("Confirm", "Mark this order as Completed?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes", onPress: async () => {
            const result = await updateOrderStatus(order.id, "Completed");
            if (result.success) {
              Alert.alert("Success", "Order marked as completed");
              onCancel();
            } else {
              Alert.alert("Error", "Failed to update order");
            }
          }
        }
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to process order");
    }
  };

  const getStatusStyle = () => {
    switch (order.status.toLowerCase()) {
      case "completed":
        return seller_order_style.completedStatus;
      case "cancelled":
        return seller_order_style.cancelledStatus;
      default:
        return seller_order_style.pendingStatus;
    }
  };

  return (
    <View style={seller_order_style.card}>
      <View style={seller_order_style.cardRow}>
        <Text style={seller_order_style.cardTitle}>Order #{order.id}</Text>
        <Text style={getStatusStyle()}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text>
      </View>

      <View style={seller_order_style.cardRow}>
        <Text>Item: {order.itemName || "Unknown Item"} (x{order.quantity || 1})</Text>
        <Text>Price: ₹{order.itemPrice}</Text>
      </View>
      <View style={seller_order_style.cardRow}>
        <Text style={{ fontSize: 12, color: '#666' }}>Ordered on: {new Date(order.date).toLocaleDateString()}</Text>
      </View>

      {order.status.toLowerCase() === "pending" && (
        <View style={seller_order_style.buttonView}>
          <TouchableOpacity style={[seller_order_style.deleteButtonStyle, { backgroundColor: '#4CAF50', marginRight: 10 }]} onPress={handleProcessOrder}>
            <Text style={seller_order_style.deleteButtonText}>Complete Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={seller_order_style.deleteButtonStyle} onPress={handleCancelOrder}>
            <Text style={seller_order_style.deleteButtonText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const SellerOrder = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Pending");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const data = await fetchSellerOrders(user.id, selectedOption);
            setOrders(data);
          } else {
            router.dismissAll();
            router.push("/login");
          }
        });
      });
    } catch (error) {
      Alert.alert("Error", "Unable to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedOption]);

  return (
    <View style={seller_order_style.container}>
      <View style={seller_order_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={seller_order_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={seller_order_style.headerText}>𝗢𝗿𝗱𝗲𝗿𝘀</Text>
      </View>

      <View style={seller_order_style.bar}>
        <View style={seller_order_style.barLine}></View>
      </View>

      <View style={seller_order_style.filterSection}>
        <TouchableOpacity style={selectedOption === "Pending" ? seller_order_style.filterOptionSelected : seller_order_style.filterOption} onPress={() => { setSelectedOption("Pending"); }}>
          <Text style={selectedOption === "Pending" ? seller_order_style.filterTextSelected : seller_order_style.filterText}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity style={selectedOption === "Completed" ? seller_order_style.filterOptionSelected : seller_order_style.filterOption} onPress={() => { setSelectedOption("Completed"); }}>
          <Text style={selectedOption === "Completed" ? seller_order_style.filterTextSelected : seller_order_style.filterText}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={selectedOption === "Cancelled" ? seller_order_style.filterOptionSelected : seller_order_style.filterOption} onPress={() => { setSelectedOption("Cancelled"); }}>
          <Text style={selectedOption === "Cancelled" ? seller_order_style.filterTextSelected : seller_order_style.filterText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={seller_order_style.cardsContainer}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card
              key={order.id}
              order={order}
              onCancel={fetchOrders}
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>No orders found.</Text>
        )}

      </ScrollView>
    </View>
  );
}

export default SellerOrder;