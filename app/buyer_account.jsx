import { Text, View, Image, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import buyer_account from "../styles/buyer_account_style";

const BuyerAccount = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={buyer_account.container}>
      <View style={buyer_account.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={buyer_account.headerImage}></Image>
        </TouchableOpacity>
        <Text style={buyer_account.headerText}>𝗔𝗰𝗰𝗼𝘂𝗻𝘁</Text>
      </View>

      <View style={buyer_account.bar}>
        <View style={buyer_account.barLine} />
      </View>

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => router.push("/buyer_order")}>
        <Image source={require("../assets/images/box-logo.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.optionText}>My Orders</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={buyer_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={buyer_account.bar}>
        <View style={buyer_account.barLine} />
      </View>

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => router.push("/qr_scan")}>
        <Image source={require("../assets/images/qr-icon.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.optionText}>QR Scan</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={buyer_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={buyer_account.bar2} />

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => router.push("/mydetails")}>
        <Image source={require("../assets/images/user-detail-logo.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.optionText}>My Details</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={buyer_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={buyer_account.bar}>
        <View style={buyer_account.barLine2} />
      </View>

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => router.push("/address")}>
        <Image source={require("../assets/images/home-address-logo.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.optionText}>Address Book</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={buyer_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={buyer_account.bar}>
        <View style={buyer_account.barLine2} />
      </View>

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => router.push("/payment_methods")}>
        <Image source={require("../assets/images/card-logo.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.optionText}>Payment Methods</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={buyer_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={buyer_account.bar2} />

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => router.push("/faq")}>
        <Image source={require("../assets/images/question-mark-logo.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.optionText}>FAQs</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={buyer_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={buyer_account.bar}>
        <View style={buyer_account.barLine2} />
      </View>

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => router.push("/help_center")}>
        <Image source={require("../assets/images/phone-call-logo.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.optionText}>Help Center</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={buyer_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={buyer_account.bar2} />

      <TouchableOpacity style={buyer_account.optionCard} onPress={() => showModal()}>
        <Image source={require("../assets/images/log-out-logo.png")} style={buyer_account.optionImage}></Image>
        <Text style={buyer_account.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={buyer_account.modalBackground}>
          <View style={buyer_account.modalContainer}>
            <Image source={require("../assets/images/attention.png")} style={buyer_account.modalImage}></Image>
            <Text style={buyer_account.modalHeader1}>Logout?</Text>
            <Text style={buyer_account.modalHeader2}>𝗔𝗿𝗲 𝘆𝗼𝘂 𝘀𝘂𝗿𝗲 𝘆𝗼𝘂 𝘄𝗮𝗻𝘁 𝘁𝗼 𝗹𝗼𝗴𝗼𝘂𝘁?</Text>

            <TouchableOpacity style={[buyer_account.modalButton, buyer_account.modalButton1]} onPress={() => {
              import("@react-native-async-storage/async-storage").then(module => {
                const AsyncStorage = module.default;
                AsyncStorage.removeItem("user").then(() => {
                  router.dismissAll();
                  router.push("/login");
                });
              });
            }}>
              <Text style={buyer_account.modalOption1}>𝗬𝗲𝘀, 𝗟𝗼𝗴𝗼𝘂𝘁</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[buyer_account.modalButton, buyer_account.modalButton2]} onPress={() => setModalVisible(false)}>
              <Text style={buyer_account.modalOption2}>𝗡𝗼, 𝗖𝗮𝗻𝗰𝗲𝗹</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default BuyerAccount;