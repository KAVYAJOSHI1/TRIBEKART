import { Text, View, Image, TouchableOpacity, TextInput, Modal } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import fyp_style from "../styles/fyp_style";

// import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// // import { firebaseApp } from "../services/firebaseConfig";

const Fyp = () => {
  const router = useRouter();
//   const auth = getAuth(firebaseApp);

  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handlePasswordReset = async () => {
    if(!email) {
      showModal("Enter your email address!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      showModal("Check your email!");
      router.push("/login");
    } catch(error) {
      showModal("Failed to send reset mail!");
    }
  }

  return (
    <View style={fyp_style.container}>
      <View style={fyp_style.window}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={fyp_style.backButton}></Image>
        </TouchableOpacity>

        <Text style={fyp_style.header}>Reset password</Text>
        <Text style={fyp_style.subHeader1}>Enter your email for the verification process.</Text>
        <Text style={fyp_style.subHeader2}>We will send a link to your email.</Text>

        <View style={fyp_style.inputContainer}>
          <Text style={fyp_style.containerText}>Email</Text>
          <TextInput style={fyp_style.textBox} placeholder="Enter your email address" placeholderTextColor={"#a1a1a1"} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"></TextInput>
        </View>

        <TouchableOpacity style={fyp_style.button} onPress={handlePasswordReset}>
          <Text style={fyp_style.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={fyp_style.modalContainer}>
          <View style={fyp_style.modalBox}>
            <Text style={fyp_style.warning}>WARNING</Text>
            <Text style={fyp_style.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={fyp_style.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={fyp_style.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Fyp;