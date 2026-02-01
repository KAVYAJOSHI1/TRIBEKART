import { Text, View, Image, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, ScrollView, Modal } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import address from "../styles/address_style";

import { fetchAddresses, addAddress, updateAddress, deleteAddress, selectAddress } from "../services/api";

const CircularCheckbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity style={[address.checkboxBase, checked && address.checkboxChecked]} onPress={onPress}>
      {checked && <View style={address.checkboxInner} />}
    </TouchableOpacity>
  );
};

const Address = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [addressName, setAddressName] = useState("");
  const [firstAddressField, setFirstAddressField] = useState("");
  const [secondAddressField, setSecondAddressField] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [addAddressName, setAddAddressName] = useState("");
  const [addFirstAddressField, setAddFirstAddressField] = useState("");
  const [addSecondAddressField, setAddSecondAddressField] = useState("");
  const [addCity, setAddCity] = useState("");
  const [addZipcode, setAddZipcode] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const data = await fetchAddresses(user.id);
            setAddresses(data);
          }
        });
      });
    };
    fetchAddress();
  }, []);

  const showEditModal = (address) => {
    if (address) {
      setAddressName(address.addressName);
      setFirstAddressField(address.addressFirstField);
      setSecondAddressField(address.addressSecondField);
      setCity(address.city);
      setZipcode(address.zipcode);
      setSelectedAddress(address);
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const addressData = {
              addressName,
              addressFirstField: firstAddressField,
              addressSecondField: secondAddressField,
              city,
              zipcode,
              user: user.id
            };
            if (selectedAddress) {
              await updateAddress(selectedAddress.id, addressData);
            } else {
              // logic for update actually
            }

            // Reload
            const data = await fetchAddresses(user.id);
            setAddresses(data);
            setModalVisible(false);
            resetForm();
          }
        });
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save address");
    }
  };

  const handleAdd = async () => {
    try {

      if (!addAddressName || !addFirstAddressField || !addCity || !addZipcode) {
        Alert.alert("Error", "Please fill in all required fields");
        return;
      }

      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const addressData = {
              addressName: addAddressName,
              addressFirstField: addFirstAddressField,
              addressSecondField: addSecondAddressField,
              city: addCity,
              zipcode: addZipcode,
              user: user.id,
              selected: false
            };
            await addAddress(addressData);

            const data = await fetchAddresses(user.id);
            setAddresses(data);

            setAddModalVisible(false);
            resetAddForm();
          }
        });
      });
    } catch (error) {
      Alert.alert("Error", `Failed to add address: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedAddress) return;
      await deleteAddress(selectedAddress.id);

      // refresh
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            const data = await fetchAddresses(user.id);
            setAddresses(data);
          }
        });
      });

      setModalVisible(false);
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Failed to delete address");
    }
  };

  const resetForm = () => {
    setSelectedAddress(null);
    setAddressName("");
    setFirstAddressField("");
    setSecondAddressField("");
    setCity("");
    setZipcode("");
  };

  const resetAddForm = () => {
    setAddAddressName("");
    setAddFirstAddressField("");
    setAddSecondAddressField("");
    setAddCity("");
    setAddZipcode("");
  };

  const handleAddressSelection = async (addressId) => {
    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            await selectAddress(addressId, user.id);
            const data = await fetchAddresses(user.id);
            setAddresses(data);
          }
        });
      });
    } catch (error) {
      Alert.alert("Error", "Failed to update selected address");
    }
  };

  return (
    <View style={address.container}>
      <View style={address.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={address.headerImage}></Image>
        </TouchableOpacity>
        <Text style={address.headerText}>𝗔𝗱𝗱𝗿𝗲𝘀𝘀</Text>
      </View>

      <Text style={address.title}>𝗦𝗮𝘃𝗲𝗱 𝗔𝗱𝗱𝗿𝗲𝘀𝘀</Text>

      <ScrollView>
        {addresses.map((addr) => (
          <View key={addr.id} style={address.addressCard}>
            <View style={address.cardFirstSection}>
              <Image source={require("../assets/images/location-icon.png")} style={address.cardImage} />
            </View>

            <View style={address.cardSecondSection}>
              <Text style={address.cardAddressName}>{addr.addressName || "Address Name"}</Text>
              <Text style={address.cardSubfield}>{addr.addressFirstField || "Address line 1"}</Text>
              <Text style={address.cardSubfield}>{addr.addressSecondField || "Address line 2"}</Text>
              <Text style={address.cardSubfield}>{addr.city || "City"}</Text>
              <Text style={address.cardSubfield}>{addr.zipcode || "Zipcode"}</Text>
            </View>

            <View style={address.cardThirdSection}>
              <TouchableOpacity onPress={() => showEditModal(addr)}>
                <Image source={require("../assets/images/edit-icon.png")} style={address.cardImage} />
              </TouchableOpacity>

              <CircularCheckbox checked={addr.selected === true} onPress={() => handleAddressSelection(addr.id)} />
            </View>
          </View>
        ))}

        <TouchableOpacity style={address.addButton} onPress={() => setAddModalVisible(true)}>
          <Image source={require("../assets/images/plus-icon.png")} style={address.addButtonImage}></Image>
          <Text style={address.addButtonText}>Add New Address</Text>
        </TouchableOpacity>


        {/* Edit address modal */}
        <Modal transparent={true} visible={modalVisible} animationType="fade">
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={address.modalCenter}>
              <View style={address.modalContainer}>
                <View style={address.row}>
                  <TouchableOpacity style={address.modalCancelButton} onPress={() => setModalVisible(false)}>
                    <Image source={require("../assets/images/back-button.png")}></Image>
                  </TouchableOpacity>
                  <Text style={address.modalTitle}>Edit Address</Text>
                </View>

                <Text style={address.modalSubTitle}>Address Name:</Text>
                <TextInput style={address.modalTextInput} placeholder="Address Name" value={addressName} onChangeText={setAddressName} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>Address Line 1:</Text>
                <TextInput style={address.modalTextInput} placeholder="First Address Field" value={firstAddressField} onChangeText={setFirstAddressField} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>Address Line 2:</Text>
                <TextInput style={address.modalTextInput} placeholder="Second Address Field" value={secondAddressField} onChangeText={setSecondAddressField} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>City:</Text>
                <TextInput style={address.modalTextInput} placeholder="City" value={city} onChangeText={setCity} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>Zipcode:</Text>
                <TextInput style={address.modalTextInput} placeholder="Zipcode" value={zipcode} onChangeText={setZipcode} placeholderTextColor="#666"></TextInput>

                <View style={address.row2}>
                  <TouchableOpacity style={address.modalContinueButton} onPress={handleSave}>
                    <Text style={address.modalButtonText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={address.modalDeleteButton} onPress={handleDelete}>
                    <Text style={address.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        {/* Add address modal */}
        <Modal transparent={true} visible={addModalVisible} animationType="fade">
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={address.modalCenter}>
              <View style={address.modalContainer}>
                <View style={address.row}>
                  <TouchableOpacity style={address.modalCancelButton} onPress={() => setAddModalVisible(false)}>
                    <Image source={require("../assets/images/back-button.png")}></Image>
                  </TouchableOpacity>
                  <Text style={address.modalTitle}>Add Address</Text>
                </View>

                <Text style={address.modalSubTitle}>Address Name:</Text>
                <TextInput style={address.modalTextInput} placeholder="Address Name" value={addAddressName} onChangeText={setAddAddressName} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>Address Line 1:</Text>
                <TextInput style={address.modalTextInput} placeholder="First Address Field" value={addFirstAddressField} onChangeText={setAddFirstAddressField} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>Address Line 2:</Text>
                <TextInput style={address.modalTextInput} placeholder="Second Address Field" value={addSecondAddressField} onChangeText={setAddSecondAddressField} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>City:</Text>
                <TextInput style={address.modalTextInput} placeholder="City" value={addCity} onChangeText={setAddCity} placeholderTextColor="#666"></TextInput>

                <Text style={address.modalSubTitle}>Zipcode:</Text>
                <TextInput style={address.modalTextInput} placeholder="Zipcode" value={addZipcode} onChangeText={setAddZipcode} placeholderTextColor="#666"></TextInput>

                <TouchableOpacity style={address.addModalContinueButton} onPress={handleAdd}>
                  <Text style={address.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </View>
  );
}

export default Address;