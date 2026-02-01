import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import notification_style from "../styles/notification_style";

const Notification = () => {
  const router = useRouter();

  return (
    <View style={notification_style.container}>
      <View style={notification_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={notification_style.backBTN}></Image>
        </TouchableOpacity>
        <Text style={notification_style.headerText}>Notifications</Text>
      </View>

      <View style={notification_style.body}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../assets/images/empty-notification.png")} style={notification_style.emptyImage}></Image>
          <Text style={notification_style.emptyText}>You haven't gotten any</Text>
          <Text style={notification_style.emptyText}>notifications yet!</Text>
          <Text style={notification_style.emptyText2}>We'll alert you when something</Text>
          <Text style={notification_style.emptyText2}>cool happens.</Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default Notification;