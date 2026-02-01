import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { addWalletMoney } from "../services/api";

const QRScanner = () => {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);

  const processCode = async (data) => {
    setIsScanning(false);

    // Expected format: "TOPUP_500" or just "500"
    let amount = 0;
    if (data.startsWith("TOPUP_")) {
      amount = parseInt(data.split("_")[1]);
    } else if (!isNaN(data)) {
      amount = parseInt(data);
    }

    if (amount > 0) {
      Alert.alert("QR Code Detected", `Adding ₹${amount} to wallet...`);
      try {
        import("@react-native-async-storage/async-storage").then(module => {
          const AsyncStorage = module.default;
          AsyncStorage.getItem("user").then(async userString => {
            if (userString) {
              const user = JSON.parse(userString);
              const result = await addWalletMoney(user.id, amount);
              if (result.success) {
                Alert.alert("Success", `Added ₹${amount} to your wallet!`);
                router.back();
              } else {
                Alert.alert("Error", "Failed to add money.");
              }
            }
          });
        });
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    } else {
      Alert.alert("Invalid QR", "This code is not a valid top-up voucher.");
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    if (isScanning) processCode(data);
  };

  const simulateScan = () => {
    processCode("TOPUP_500");
  };

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ paddingBottom: 10 }}>We need your permission to show the camera</Text>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#1d9ac3", width: "50%", height: "5%", borderRadius: 12 }} onPress={requestPermission}>
          <Text style={{ color: "white" }}>Grant Permission</Text>
        </TouchableOpacity>

        {/* Fallback for Simulator */}
        <TouchableOpacity style={{ marginTop: 20, padding: 10 }} onPress={simulateScan}>
          <Text style={{ color: "blue" }}>Simulator: Mock Scan ₹500</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing={'back'} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={handleBarCodeScanned} />

      <View style={{ position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", backgroundColor: isScanning ? '#FF5252' : '#4CAF50', padding: 10, borderRadius: 5, width: 120, height: 50 }} onPress={() => setIsScanning(!isScanning)}>
          <Text style={{ fontWeight: "bold", color: "white" }}>{isScanning ? 'Stop Scan' : 'Start Scan'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5 }} onPress={simulateScan}>
          <Text style={{ color: "white", fontSize: 12 }}>Debug: Mock ₹500</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default QRScanner;