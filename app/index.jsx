import { Text, Image, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import main_style from "../styles/main_style";

const Index = () => {
  const router = useRouter();

  return (
    <View style={main_style.window}>
      <StatusBar hidden={true} />

      <Text style={main_style.header}>Tribekart</Text>
      <Text style={main_style.desc}>Bringing traditional crafts to life</Text>
      <Image source={require("../assets/images/index-logo.png")} style={main_style.logo}></Image>

      <TouchableOpacity style={main_style.button} onPress={() => setTimeout(() => router.push("/login"), 50)}>
        <Text style={main_style.buttonText}>LOGIN ➜</Text>
      </TouchableOpacity>

      <TouchableOpacity style={main_style.button} onPress={() => setTimeout(() => router.push("/signup"), 50)}>
        <Text style={main_style.buttonText}>SIGN UP ➜</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Index;