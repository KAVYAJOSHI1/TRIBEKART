import { Text, View, Image, TouchableOpacity, TextInput, Modal, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import signup_style from "../styles/signup_style";
import { signupUser } from "../services/api";

// import { doc, setDoc } from "firebase/firestore";
// // import { auth, db } from "../services/firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [buyerChecked, buyerSetChecked] = useState(false);
  const [sellerChecked, sellerSetChecked] = useState(false);

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleSignup = async () => {
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      setLoading(false);
      showModal("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      showModal("Passwords do not match!");
      return;
    }

    if (!buyerChecked && !sellerChecked) {
      setLoading(false);
      showModal("Please select Buyer or Seller!");
      return;
    }

    const role = buyerChecked ? "buyer" : "seller";

    try {
      const result = await signupUser({
        email: email.trim(),
        password: password,
        role: role,
        name: username
      });

      if (result.success) {
        showModal("Account created successfully!");
        setTimeout(() => {
          router.push("/login");
          setLoading(false);
        }, 1000);
      } else {
        showModal(result.message || "Signup failed");
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      showModal(error.message || "Signup failed!");
    }
  }

  return (
    <View style={signup_style.window}>
      {loading && (
        <View style={signup_style.loadingContainer}>
          <View style={signup_style.loadingCenter}>
            <ActivityIndicator size="large" color="#666699" />
          </View>
        </View>
      )}

      <View style={signup_style.headerWindow}>
        <View style={signup_style.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={signup_style.back}>
            <Image source={require('../assets/images/back-button.png')}></Image>
          </TouchableOpacity>
          <Text style={signup_style.header}>Create an account</Text>
        </View>
        <Text style={signup_style.subHeader}>Let's create your account.</Text>
      </View>

      <View style={signup_style.mainWindow}>
        <View style={[signup_style.inputContainer, signup_style.setMarginTop10]}>
          <Text style={signup_style.containerText}>Username</Text>
          <TextInput style={signup_style.textBox} placeholder="Enter your username" placeholderTextColor={"#a1a1a1"} value={username} onChangeText={setUsername}></TextInput>
        </View>

        <View style={[signup_style.inputContainer, signup_style.setMarginTop10]}>
          <Text style={signup_style.containerText}>Email</Text>
          <TextInput style={signup_style.textBox} placeholder="Enter your email address" placeholderTextColor={"#a1a1a1"} keyboardType="email-address" value={email} onChangeText={setEmail}></TextInput>
        </View>

        <View style={[signup_style.inputContainer, signup_style.setMarginTop10]}>
          <Text style={signup_style.containerText}>Password</Text>
          <TextInput style={signup_style.textBox} placeholder="Enter your password" placeholderTextColor={"#a1a1a1"} secureTextEntry value={password} onChangeText={setPassword}></TextInput>
        </View>

        <View style={[signup_style.inputContainer, signup_style.setMarginTop10]}>
          <Text style={signup_style.containerText}>Confirm Password</Text>
          <TextInput style={signup_style.textBox} placeholder="Enter your password" placeholderTextColor={"#a1a1a1"} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}></TextInput>
        </View>

        <View style={signup_style.selection}>
          <TouchableOpacity style={[signup_style.selectCat, buyerChecked ? signup_style.selectedCat : null]} onPress={() => { buyerSetChecked(!buyerChecked); sellerSetChecked(false) }}>
            <Image source={require("../assets/images/buyer-icon.png")} style={signup_style.selectionIcon}></Image>
            <Text style={signup_style.selectionText}>Buyer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[signup_style.selectCat, sellerChecked ? signup_style.selectedCat : null]} onPress={() => { sellerSetChecked(!sellerChecked); buyerSetChecked(false) }}>
            <Image source={require("../assets/images/seller-icon.png")} style={signup_style.selectionIcon}></Image>
            <Text style={signup_style.selectionText}>Seller</Text>
          </TouchableOpacity>
        </View>

        <Text style={[signup_style.tac, signup_style.setMarginTop10]}>By signing up you agree to our 𝗧𝗲𝗿𝗺𝘀, 𝗣𝗿𝗶𝘃𝗮𝗰𝘆 𝗣𝗼𝗹𝗶𝗰𝘆,</Text>
        <Text style={signup_style.tac}>and 𝗖𝗼𝗼𝗸𝗶𝗲 𝗨𝘀𝗲</Text>

        <TouchableOpacity style={signup_style.button} onPress={handleSignup}>
          <Text style={signup_style.buttonText}>Create an Account</Text>
        </TouchableOpacity>

        <View style={signup_style.bar}>
          <Text style={signup_style.barText}>─────────────── Or ───────────────</Text>
        </View>

        <TouchableOpacity style={signup_style.googleSignUpButton}>
          <View style={signup_style.googleSignUpButtonView}>
            <Image source={require("../assets/images/googleLogo.png")} style={signup_style.googleSignUpButtonImage}></Image>
            <Text style={signup_style.googleSignUpButtonText}> Sign Up with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={signup_style.facebookSignUpButton}>
          <View style={signup_style.facebookSignUpButtonView}>
            <Image source={require("../assets/images/facebookLogo.png")} style={signup_style.facebookSignUpButtonImage}></Image>
            <Text style={signup_style.facebookSignUpButtonText}> Sign Up with Facebook</Text>
          </View>
        </TouchableOpacity>

        <View style={signup_style.footer}>
          <Text style={signup_style.footerTextOne}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={signup_style.footerTextTwo}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={signup_style.modalContainer}>
          <View style={signup_style.modalBox}>
            <Text style={signup_style.warning}>WARNING</Text>
            <Text style={signup_style.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={signup_style.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={signup_style.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Signup;