import { Text, View, Image, TouchableOpacity, Linking, Alert } from "react-native";
import { useRouter } from "expo-router";
import help_center_style from "../styles/help_center_style";

const HelpCenter = () => {
  const router = useRouter();

  const openPlayStore = (packageName) => {
    Linking.openURL(`market://details?id=${packageName}`)
    .catch(() => {
      Linking.openURL(`https://play.google.com/store/apps/details?id=${packageName}`);
    });
  };

  const handleOpenApp = async (url, packageName) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if(supported) {
        await Linking.openURL(url);
      } else {
        if (Platform.OS === 'android') {
          openPlayStore(packageName);
        }
      }
    } catch(error) {
      Alert.alert("Error opening app!");
    }
  }

  const handleOpenWeb = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Error opening website!");
    }
  };

  return (
    <View style={help_center_style.container}>
      <View style={help_center_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={help_center_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={help_center_style.headerText}>𝗛𝗲𝗹𝗽 𝗖𝗲𝗻𝘁𝗲𝗿</Text>
      </View>

      <View style={help_center_style.bar}>
        <View style={help_center_style.barLine} />
      </View>

      <TouchableOpacity style={help_center_style.card} onPress={() => handleOpenApp('https://wa.me/919106989031?text=Hello%20SSIP', 'com.whatsapp')}>
        <Image source={require("../assets/images/whatsapp-icon.png")} style={help_center_style.cardImage}></Image>
        <Text style={help_center_style.cardText}>Whatsapp</Text>
        <Image source={require("../assets/images/right-side-arrow.png")}  style={help_center_style.cardArrow}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={help_center_style.card} onPress={() => handleOpenWeb('https://google.com')}>
        <Image source={require("../assets/images/website-icon.png")} style={help_center_style.cardImage}></Image>
        <Text style={help_center_style.cardText}>Website</Text>
        <Image source={require("../assets/images/right-side-arrow.png")}  style={help_center_style.cardArrow}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={help_center_style.card} onPress={() => handleOpenApp('https://www.facebook.com/SSIP', 'com.facebook.katana')}>
        <Image source={require("../assets/images/facebook-icon.png")} style={help_center_style.cardImage}></Image>
        <Text style={help_center_style.cardText}>Facebook</Text>
        <Image source={require("../assets/images/right-side-arrow.png")}  style={help_center_style.cardArrow}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={help_center_style.card} onPress={() => handleOpenApp('https://x.com/VALORANT', 'com.x.android')}>
        <Image source={require("../assets/images/twitter-icon.png")} style={help_center_style.cardImage}></Image>
        <Text style={help_center_style.cardText}>Twitter</Text>
        <Image source={require("../assets/images/right-side-arrow.png")}  style={help_center_style.cardArrow}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={help_center_style.card} onPress={() => handleOpenApp('https://www.instagram.com/gujarati.hard.mp4s', 'com.instagram.android')}>
        <Image source={require("../assets/images/instagram-icon.png")} style={help_center_style.cardImage}></Image>
        <Text style={help_center_style.cardText}>Instagram</Text>
        <Image source={require("../assets/images/right-side-arrow.png")}  style={help_center_style.cardArrow}></Image>
      </TouchableOpacity>
    </View>
  );
}

export default HelpCenter;