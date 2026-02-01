import { Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import mydetails_style from "../styles/mydetails_style";
import { fetchUserProfile, updateUserProfile } from "../services/api";

// // import { db, auth } from "../services/firebaseConfig";
// import { doc, getDoc, updateDoc } from "firebase/firestore";

const Mydetails = () => {
  const router = useRouter();

  const [errorGenerated, setErrorGenerated] = useState(false);

  const [buttonEnable, setButtonEnable] = useState(false);
  const [initialValues, setInitialValues] = useState({
    username: '',
    email: '',
    dob: '00/00/0000',
    gender: 'Prefer not to specify',
    number: '0'
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '00/00/0000',
    gender: 'Prefer not to specify',
    number: '0'
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        import("@react-native-async-storage/async-storage").then(module => {
          const AsyncStorage = module.default;
          AsyncStorage.getItem("user").then(async userString => {
            if (userString) {
              const user = JSON.parse(userString);
              const data = await fetchUserProfile(user.id);
              setFormData({
                username: data.username || '',
                email: data.email || '',
                dob: data.dob || '00/00/0000',
                gender: data.gender || 'Prefer not to specify',
                number: data.number || '0'
              });
              setInitialValues({
                username: data.username || '',
                email: data.email || '',
                dob: data.dob || '00/00/0000',
                gender: data.gender || 'Prefer not to specify',
                number: data.number || '0'
              });
            }
          });
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const hasChanged = Object.keys(formData).some(key =>
      formData[key] !== initialValues[key]
    );
    setButtonEnable(hasChanged);

  }, [formData, initialValues]);

  const handleSave = async () => {
    if (!validateEmail(formData.email)) {
      setErrorGenerated(true);
      Alert.alert("Invalid Input has been given!", "Please make sure email is valid");
      return;
    }

    if (!validateDob(formData.dob)) {
      setErrorGenerated(true);
      Alert.alert("Invalid Input has been given!", "Please make sure date of birth is valid (DD/MM/YYYY)");
      return;
    }

    if (!validateNumber(formData.number)) {
      setErrorGenerated(true);
      Alert.alert("Invalid Input has been given!", "Please make sure phone number is valid (10 digits)");
      return;
    }

    setErrorGenerated(false);

    try {
      import("@react-native-async-storage/async-storage").then(module => {
        const AsyncStorage = module.default;
        AsyncStorage.getItem("user").then(async userString => {
          if (userString) {
            const user = JSON.parse(userString);
            await updateUserProfile(user.id, formData);
            setInitialValues(formData);
            setButtonEnable(false);
            Alert.alert('Profile updated successfully!');
          }
        });
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateDob = (dob) => {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobRegex.test(dob)) return false;

    const parts = dob.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > daysInMonth(year, month)) return false;

    return true;
  };

  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const validateNumber = (number) => {
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(number);
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <View style={mydetails_style.container}>
      <View style={mydetails_style.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../assets/images/back-button.png")} style={mydetails_style.headerImage}></Image>
        </TouchableOpacity>
        <Text style={mydetails_style.headerText}>𝗠𝘆 𝗗𝗲𝘁𝗮𝗶𝗹𝘀</Text>
      </View>

      <View style={mydetails_style.bar}>
        <View style={mydetails_style.barLine}></View>
      </View>

      <View style={mydetails_style.field}>
        <Text style={mydetails_style.fieldName}>Username</Text>
        <TextInput style={mydetails_style.textBox} placeholder="username" placeholderTextColor={"#4A2500"} value={formData.username} onChangeText={text => handleChange('username', text)}></TextInput>
      </View>

      <View style={mydetails_style.field}>
        <Text style={mydetails_style.fieldName}>Email Address</Text>
        <TextInput style={mydetails_style.textBox} placeholder="name@gmail.com" placeholderTextColor={"#4A2500"} value={formData.email} onChangeText={text => handleChange('email', text)}></TextInput>
      </View>

      <View style={mydetails_style.field}>
        <Text style={mydetails_style.fieldName}>Date of Birth</Text>
        <TextInput style={mydetails_style.textBox} placeholder="DD/MM/YYYY" placeholderTextColor={"#4A2500"} value={formData.dob} onChangeText={text => handleChange('dob', text)}></TextInput>
      </View>

      <View style={mydetails_style.field}>
        <Text style={mydetails_style.fieldName}>Gender</Text>
        <View style={mydetails_style.pickerBox}>
          <Picker style={mydetails_style.picker} selectedValue={formData.gender} onValueChange={(itemValue) => handleChange('gender', itemValue)}>
            <Picker.Item label="Prefer not to specify" value="Prefer not to specify" style={mydetails_style.pickerItem} />
            <Picker.Item label="Male" value="Male" style={mydetails_style.pickerItem} />
            <Picker.Item label="Female" value="Female" style={mydetails_style.pickerItem} />
            <Picker.Item label="Other" value="Other" style={mydetails_style.pickerItem} />
          </Picker>
        </View>
      </View>

      <View style={mydetails_style.field}>
        <Text style={mydetails_style.fieldName}>Phone Number</Text>
        <TextInput style={mydetails_style.textBox} placeholder="number" placeholderTextColor={"#4A2500"} value={formData.number} onChangeText={text => handleChange('number', text)}></TextInput>
      </View>

      <View style={mydetails_style.footer}>
        <TouchableOpacity style={mydetails_style.footerOptionReset} onPress={() => router.push("/fyp")}>
          <Text style={mydetails_style.footerOptionText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonEnable ? mydetails_style.footerOptionEnabled : mydetails_style.footerOptionDisabled} onPress={handleSave} disabled={!buttonEnable}>
          <Text style={mydetails_style.footerOptionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Mydetails;