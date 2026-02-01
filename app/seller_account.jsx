import { Text, View, Image, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import seller_account from "../styles/seller_account_style";

const Selleraccount = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={seller_account.container}>
      <View style={seller_account.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={seller_account.headerImage}></Image>
        </TouchableOpacity>
        <Text style={seller_account.headerText}>𝗔𝗰𝗰𝗼𝘂𝗻𝘁</Text>
      </View>

      <View style={seller_account.bar}>
        <View style={seller_account.barLine} />
      </View>

      <TouchableOpacity style={seller_account.optionCard} onPress={() => router.push("/seller_order")}>
        <Image source={require("../assets/images/box-logo.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.optionText}>Orders</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={seller_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={seller_account.bar}>
        <View style={seller_account.barLine2} />
      </View>

      <TouchableOpacity style={seller_account.optionCard} onPress={() => router.push("/businessStats")}>
        <Image source={require("../assets/images/stats-black-icon.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.optionText}>Business Stats</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={seller_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={seller_account.bar2} />

      <TouchableOpacity style={seller_account.optionCard} onPress={() => router.push("/mydetails")}>
        <Image source={require("../assets/images/user-detail-logo.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.optionText}>My Details</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={seller_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={seller_account.bar}>
        <View style={seller_account.barLine2} />
      </View>

      <TouchableOpacity style={seller_account.optionCard} onPress={() => router.push("/address")}>
        <Image source={require("../assets/images/home-address-logo.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.optionText}>Pick-up address</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={seller_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={seller_account.bar}>
        <View style={seller_account.barLine2} />
      </View>

      <TouchableOpacity style={seller_account.optionCard} onPress={() => router.push("/payment_methods")}>
        <Image source={require("../assets/images/card-logo.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.optionText}>Payment Methods</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={seller_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={seller_account.bar2} />

      <TouchableOpacity style={seller_account.optionCard} onPress={() => router.push("/faq")}>
        <Image source={require("../assets/images/question-mark-logo.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.optionText}>FAQs</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={seller_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={seller_account.bar}>
        <View style={seller_account.barLine2} />
      </View>

      <TouchableOpacity style={seller_account.optionCard} onPress={() => router.push("/help_center")}>
        <Image source={require("../assets/images/phone-call-logo.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.optionText}>Help Center</Text>
        <Image source={require("../assets/images/right-side-arrow.png")} style={seller_account.optionArrow}></Image>
      </TouchableOpacity>

      <View style={seller_account.bar2} />

      <TouchableOpacity style={seller_account.optionCard} onPress={() => showModal()}>
        <Image source={require("../assets/images/log-out-logo.png")} style={seller_account.optionImage}></Image>
        <Text style={seller_account.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={seller_account.modalBackground}>
          <View style={seller_account.modalContainer}>
            <Image source={require("../assets/images/attention.png")} style={seller_account.modalImage}></Image>
            <Text style={seller_account.modalHeader1}>Logout?</Text>
            <Text style={seller_account.modalHeader2}>𝗔𝗿𝗲 𝘆𝗼𝘂 𝘀𝘂𝗿𝗲 𝘆𝗼𝘂 𝘄𝗮𝗻𝘁 𝘁𝗼 𝗹𝗼𝗴𝗼𝘂𝘁?</Text>

            <TouchableOpacity style={[seller_account.modalButton, seller_account.modalButton1]} onPress={() => {
              import("@react-native-async-storage/async-storage").then(module => {
                const AsyncStorage = module.default;
                AsyncStorage.removeItem("user").then(() => {
                  router.dismissAll();
                  router.push("/login");
                });
              });
            }}>
              <Text style={seller_account.modalOption1}>𝗬𝗲𝘀, 𝗟𝗼𝗴𝗼𝘂𝘁</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[seller_account.modalButton, seller_account.modalButton2]} onPress={() => setModalVisible(false)}>
              <Text style={seller_account.modalOption2}>𝗡𝗼, 𝗖𝗮𝗻𝗰𝗲𝗹</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Selleraccount;