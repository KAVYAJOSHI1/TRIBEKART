import { Text, View, Image, TouchableOpacity, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import payment_methods from "../styles/payment_methods_style";
import { fetchUserProfile, addWalletMoney } from "../services/api"; // API import

const PaymentMethods = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [currentOperation, setCurrentOperation] = useState("add");
  const [walletAmount, setWalletAmount] = useState('0.0');

  const showModal = (operation) => {
    setCurrentOperation(operation);
    // Only support "add" for now based on backend logic, withdraw is simulated or same endpoint negativ? 
    // Backend `wallet/add` adds the amount. If we send negative, it withdraws.
    setModalMessage(operation === "add" ? "Deposit Amount" : "Withdraw Amount");
    setModalVisible(true);
  };

  const fetchWallet = async () => {
    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            // We need to fetch FRESH user profile to get updated wallet
            const profile = await fetchUserProfile(user.id);
            if (profile) {
              setWalletAmount(profile.wallet || '0.0');
            }
          } else {
            router.dismissAll();
          }
        });
      });
    } catch (error) {
      console.error("Error fetching wallet amount:", error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleContinue = async () => {
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid positive number");
      return;
    }

    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);

            const operationAmount = currentOperation === "add" ? amount : -amount;

            // Client-side check for withdraw
            if (currentOperation === "withdraw" && parseFloat(walletAmount) < amount) {
              Alert.alert("Error", "Insufficient wallet balance");
              return;
            }

            await addWalletMoney(user.id, operationAmount);

            await fetchWallet(); // Refresh
            Alert.alert("Success", `₹${amount.toFixed(1)} ${currentOperation === "add" ? "added to" : "withdrawn from"} wallet`);
            setAmountInput("");
            setModalVisible(false);
          }
        });
      });
    } catch (error) {
      Alert.alert("Error", "Failed to update wallet");
    }
  };

  return (
    <View style={payment_methods.container}>
      <View style={payment_methods.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={payment_methods.headerImage}></Image>
        </TouchableOpacity>
        <Text style={payment_methods.headerText}>𝗣𝗮𝘆𝗺𝗲𝗻𝘁 𝗠𝗲𝘁𝗵𝗼𝗱</Text>
      </View>

      <View style={payment_methods.bar}>
        <View style={payment_methods.barLine}></View>
      </View>

      <View style={payment_methods.walletCard}>
        <Text style={payment_methods.walletTitle}>𝗪𝗮𝗹𝗹𝗲𝘁</Text>
        <View style={payment_methods.walletAmountView}>
          <Text style={payment_methods.walletAmount}>₹{Number(walletAmount).toFixed(2)}</Text>
        </View>
      </View>

      <View style={payment_methods.buttonView}>
        <View style={payment_methods.button}>
          <TouchableOpacity style={payment_methods.buttonTouch} onPress={() => showModal("add")}>
            <Text style={payment_methods.buttonText}>𝗔𝗱𝗱 𝘁𝗼 𝘄𝗮𝗹𝗹𝗲𝘁</Text>
          </TouchableOpacity>
        </View>

        <View style={payment_methods.button}>
          <TouchableOpacity style={payment_methods.buttonTouch} onPress={() => showModal("withdraw")}>
            <Text style={payment_methods.buttonText}>𝗪𝗶𝘁𝗵𝗱𝗿𝗮𝘄 𝗳𝗿𝗼𝗺 𝘄𝗮𝗹𝗹𝗲𝘁</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={payment_methods.modalCenter}>
            <View style={payment_methods.modalContainer}>
              <Text style={payment_methods.modalTitle}>{modalMessage}</Text>
              <TextInput style={payment_methods.modalTextInput} placeholder="Enter amount" keyboardType="numeric" value={amountInput} onChangeText={setAmountInput} placeholderTextColor="#666"></TextInput>

              <TouchableOpacity style={payment_methods.modalContinueButton} onPress={handleContinue}>
                <Text style={payment_methods.modalButtonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={payment_methods.modalCancelButton} onPress={() => { setAmountInput(""); setModalVisible(false) }}>
                <Text style={payment_methods.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default PaymentMethods;