import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import buyer_order_style from "../styles/buyer_order_style";
import { fetchOrders, cancelOrder } from "../services/api";

// // import { db, auth } from "../services/firebaseConfig";
// import { collection, query, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

const OrderCard = ({ order, onCancel, router }) => {
  // No need for separate item state or mock DB lookup
  // The backend now joins properties: itemName, itemPrice

  const handleCancelOrder = async () => {
    const result = await cancelOrder(order.id);
    if (result.success) {
      Alert.alert("Order Cancelled");
      onCancel(); // Refresh list
    } else {
      Alert.alert("Error", "Failed to cancel order");
    }
  };

  const getStatusStyle = () => {
    switch (order.status.toLowerCase()) {
      case "completed":
        return buyer_order_style.completedStatus;
      case "cancelled":
        return buyer_order_style.cancelledStatus;
      default:
        return buyer_order_style.pendingStatus;
    }
  };

  return (
    <View style={buyer_order_style.card}>
      <View style={buyer_order_style.cardRow}>
        <Text style={buyer_order_style.cardTitle}>Order #{order.id}</Text>
        <Text style={getStatusStyle()}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text>
      </View>

      <View style={buyer_order_style.cardRow}>
        <Text>Item: {order.itemName || "Unknown Item"} (x{order.quantity || 1})</Text>
        <Text>Price: ₹{order.itemPrice}</Text>
      </View>

      <View style={buyer_order_style.buttonView}>
        <TouchableOpacity
          style={[buyer_order_style.deleteButtonStyle, { backgroundColor: '#2196F3', marginRight: 10, flex: 1 }]}
          onPress={() => router.push({ pathname: "/order_tracking", params: { orderId: order.id } })}
        >
          <Text style={buyer_order_style.deleteButtonText}>Track Journey</Text>
        </TouchableOpacity>

        {order.status === "pending" && (
          <TouchableOpacity style={[buyer_order_style.deleteButtonStyle, { flex: 1 }]} onPress={handleCancelOrder}>
            <Text style={buyer_order_style.deleteButtonText}>Cancel Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const BuyerOrder = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Pending");
  const [orders, setOrders] = useState([]);

  const fetchOrdersRaw = async () => {
    import("@react-native-async-storage/async-storage").then(module => {
      const AsyncStorage = module.default;
      AsyncStorage.getItem("user").then(async userString => {
        if (userString) {
          const user = JSON.parse(userString);
          const data = await fetchOrders(user.id, selectedOption.toLowerCase());
          setOrders(data);
        }
      });
    });
  };

  useEffect(() => {
    fetchOrdersRaw();
  }, [selectedOption]);

  return (
    <View style={buyer_order_style.container}>
      <View style={buyer_order_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={buyer_order_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={buyer_order_style.headerText}>𝗬𝗼𝘂𝗿 𝗢𝗿𝗱𝗲𝗿𝘀</Text>
      </View>

      <View style={buyer_order_style.filterSection}>
        <TouchableOpacity style={selectedOption === "Pending" ? buyer_order_style.filterOptionSelected : buyer_order_style.filterOption} onPress={() => { setSelectedOption("Pending"); }}>
          <Text style={selectedOption === "Pending" ? buyer_order_style.filterTextSelected : buyer_order_style.filterText}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity style={selectedOption === "Completed" ? buyer_order_style.filterOptionSelected : buyer_order_style.filterOption} onPress={() => { setSelectedOption("Completed"); }}>
          <Text style={selectedOption === "Completed" ? buyer_order_style.filterTextSelected : buyer_order_style.filterText}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={selectedOption === "Cancelled" ? buyer_order_style.filterOptionSelected : buyer_order_style.filterOption} onPress={() => { setSelectedOption("Cancelled"); }}>
          <Text style={selectedOption === "Cancelled" ? buyer_order_style.filterTextSelected : buyer_order_style.filterText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={buyer_order_style.cardsContainer}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onCancel={fetchOrdersRaw} router={router} />
        ))}
      </ScrollView>
    </View>
  );
}

export default BuyerOrder;