import { Text, View, Image, TouchableOpacity, TextInput, Modal, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import login_style from "../styles/login_style";
import { loginUser } from "../services/api";

// // import { firebaseApp, db } from "../services/firebaseConfig";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { getDoc, doc } from "firebase/firestore";

const Login = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const auth = getAuth(firebaseApp);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showModal("Invalid email or password!");
      return;
    }

    setLoading(true);

    // Attempt Login, fallback to "Free Pass" Guest access if it fails
    // This satisfies the user's request to "give free pass"
    try {
      let user = null;
      try {
        const response = await loginUser(trimmedEmail, trimmedPassword);
        if (response.success) user = response.user;
      } catch (err) {
        console.log("Backend login failed, using guest mode");
      }

      // Guest Fallback (The "Free Pass") logic handled by specific buttons now
      if (!user) {
        showModal("Login Failed. Try Guest Mode.");
      } else {
        showModal("Login Success!");

        import("@react-native-async-storage/async-storage").then(module => {
          const AsyncStorage = module.default;
          AsyncStorage.setItem("user", JSON.stringify(user));
        });

        setTimeout(() => {
          if (user.role === "buyer") {
            router.push("/home_buyer");
          } else {
            router.push("/home_seller");
          }
          setLoading(false);
        }, 500);
      }

    } catch (e) {
      showModal("Login Error");
      setLoading(false);
    }
  }

  const handleGuestLogin = (role) => {
    setLoading(true);
    const user = {
      id: role === 'buyer' ? 1 : 2,
      email: `${role}@test.com`,
      role: role,
      name: `Guest ${role.charAt(0).toUpperCase() + role.slice(1)}`
    };

    import("@react-native-async-storage/async-storage").then(module => {
      const AsyncStorage = module.default;
      AsyncStorage.setItem("user", JSON.stringify(user));
    });

    setTimeout(() => {
      if (role === "buyer") {
        router.push("/home_buyer");
      } else {
        router.push("/home_seller");
      }
      setLoading(false);
    }, 500);
  };



  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <View style={login_style.window}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image source={require('../assets/images/back-button.png')} style={login_style.back}></Image>
      </TouchableOpacity>

      <View style={login_style.headerWindow}>
        <Text style={login_style.header}>Login to your account</Text>
        <Text style={login_style.subHeader}>It's great to see you again.</Text>
      </View>

      {loading && (
        <View style={login_style.loadingContainer}>
          <View style={login_style.loadingCenter}>
            <ActivityIndicator size="large" color="#666699" />
          </View>
        </View>
      )}

      <View style={login_style.mainWindow}>
        <View style={[login_style.inputContainer, login_style.setMarginTop30]}>
          <Text style={login_style.containerText}>Email</Text>
          <TextInput style={login_style.textBox} placeholder="Enter your email address" placeholderTextColor={"#a1a1a1"} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"></TextInput>
        </View>

        <View style={[login_style.inputContainer, login_style.setMarginTop10]}>
          <Text style={login_style.containerText}>Password</Text>
          <TextInput style={login_style.textBox} placeholder="Enter your password" placeholderTextColor={"#a1a1a1"} secureTextEntry value={password} onChangeText={setPassword}></TextInput>
        </View>

        <View style={login_style.fop}>
          <Text style={login_style.fopText1}>Forgot your password?</Text>
          <TouchableOpacity onPress={() => router.push("/fyp")}>
            <Text style={login_style.fopText2}>Reset your password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={login_style.button} onPress={handleLogin}>
          <Text style={login_style.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={login_style.bar}>
          <View style={login_style.barLine} />
          <Text style={login_style.barText}>Or</Text>
          <View style={login_style.barLine} />
        </View>

        <TouchableOpacity style={login_style.googleSignUpButton}>
          <View style={login_style.googleSignUpButtonView}>
            <Image source={require("../assets/images/googleLogo.png")} style={login_style.googleSignUpButtonImage}></Image>
            <Text style={login_style.googleSignUpButtonText}> Sign Up with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={login_style.facebookSignUpButton}>
          <View style={login_style.facebookSignUpButtonView}>
            <Image source={require("../assets/images/facebookLogo.png")} style={login_style.facebookSignUpButtonImage}></Image>
            <Text style={login_style.facebookSignUpButtonText}> Sign Up with Facebook</Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={[login_style.button, { backgroundColor: '#4CAF50', marginBottom: 10 }]} onPress={() => handleGuestLogin('buyer')}>
            <Text style={login_style.buttonText}>Guest Buyer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[login_style.button, { backgroundColor: '#FF9800' }]} onPress={() => handleGuestLogin('seller')}>
            <Text style={login_style.buttonText}>Guest Seller Login</Text>
          </TouchableOpacity>
        </View>

        <View style={login_style.footer}>
          <Text style={login_style.footerText1}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={login_style.footerText2}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={login_style.modalContainer}>
          <View style={login_style.modalBox}>
            <Text style={login_style.warning}>WARNING</Text>
            <Text style={login_style.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={login_style.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={login_style.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Login;