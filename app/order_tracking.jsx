import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { trackOrder } from '../services/api';

const OrderTracking = () => {
    const { orderId } = useLocalSearchParams();
    const router = useRouter();
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTracking = async () => {
            if (orderId) {
                setLoading(true);
                const data = await trackOrder(orderId);
                if (data && !data.error) {
                    setTrackingData(data);
                } else {
                    const msg = data?.error || "Could not fetch tracking info";
                    Alert.alert("Error", msg);
                }
                setLoading(false);
            }
        };
        fetchTracking();
    }, [orderId]);

    const openExplorer = (txHash) => {
        if (txHash) {
            // Sepolia Etherscan link generic
            Linking.openURL(`https://sepolia.etherscan.io/tx/${txHash}`);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading Blockchain Data...</Text>
            </View>
        );
    }

    if (!trackingData) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require("../assets/images/back-button.png")} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order #{orderId} Journey</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Product Info */}
                <View style={styles.productCard}>
                    <Image source={require("../assets/images/TestImage.jpg")} style={styles.productImage} />
                    <View>
                        <Text style={styles.productName}>{trackingData.productName}</Text>
                        <Text style={styles.productPrice}>Sold by: {trackingData.sellerName}</Text>
                        <Text style={styles.productPrice}>₹{trackingData.price}</Text>
                    </View>
                </View>

                <Text style={styles.journeyTitle}>Blockchain Timeline</Text>

                <View style={styles.timeline}>

                    {/* Step 1: Creation */}
                    <View style={styles.step}>
                        <View style={styles.circleActive} />
                        <View style={[styles.line, { backgroundColor: trackingData.purchaseTxHash ? '#4CAF50' : '#ddd' }]} />
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Item Minted (Digital Twin Born)</Text>
                            <Text style={styles.stepDesc}>Created by Seller {trackingData.sellerName}</Text>
                            {trackingData.creationTxHash ? (
                                <TouchableOpacity onPress={() => openExplorer(trackingData.creationTxHash)}>
                                    <Text style={styles.hashLink}>Tx: {trackingData.creationTxHash.substring(0, 15)}...</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.pendingText}>Not recorded on chain (Pre-update item)</Text>
                            )}
                        </View>
                    </View>

                    {/* Step 2: Purchase */}
                    <View style={styles.step}>
                        <View style={[styles.circle, trackingData.purchaseTxHash ? styles.circleActive : null]} />
                        <View style={[styles.line, { backgroundColor: trackingData.status === 'Completed' ? '#4CAF50' : '#ddd' }]} />
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Order Placed (Ownership Transfer)</Text>
                            <Text style={styles.stepDesc}>{new Date(trackingData.orderDate).toLocaleString()}</Text>
                            {trackingData.purchaseTxHash ? (
                                <TouchableOpacity onPress={() => openExplorer(trackingData.purchaseTxHash)}>
                                    <Text style={styles.hashLink}>Tx: {trackingData.purchaseTxHash.substring(0, 15)}...</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.pendingText}>Pending / Off-chain</Text>
                            )}
                        </View>
                    </View>

                    {/* Step 3: Delivery */}
                    <View style={[styles.step, { minHeight: 0 }]}>
                        <View style={[styles.circle, trackingData.status === 'Completed' ? styles.circleActive : null]} />
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Order Completed</Text>
                            <Text style={styles.stepDesc}>Status: {trackingData.status}</Text>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
    header: {
        flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50,
        backgroundColor: '#fff', elevation: 2
    },
    backButton: { width: 24, height: 24, marginRight: 15 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    loadingText: { marginTop: 50, textAlign: 'center', fontSize: 16, color: '#666' },
    content: { padding: 20 },

    productCard: {
        flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 12,
        marginBottom: 30, elevation: 2, alignItems: 'center'
    },
    productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
    productName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    productPrice: { fontSize: 14, color: '#666', marginTop: 2 },

    journeyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#444' },

    timeline: { paddingLeft: 10 },
    step: { flexDirection: 'row', minHeight: 100 },
    circle: {
        width: 20, height: 20, borderRadius: 10, backgroundColor: '#ddd',
        zIndex: 1, borderWidth: 2, borderColor: '#fff'
    },
    circleActive: {
        width: 20, height: 20, borderRadius: 10, backgroundColor: '#4CAF50',
        zIndex: 1, borderWidth: 2, borderColor: '#fff'
    },
    line: {
        width: 2, position: 'absolute', top: 20, bottom: 0, left: 9,
        backgroundColor: '#ddd', zIndex: 0
    },
    stepContent: { marginLeft: 20, flex: 1, paddingBottom: 30 },
    stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    stepDesc: { fontSize: 14, color: '#777', marginTop: 4 },
    hashLink: { color: '#007BFF', marginTop: 5, fontSize: 12, textDecorationLine: 'underline' },
    pendingText: { color: '#F57C00', marginTop: 5, fontSize: 12, fontStyle: 'italic' }
});

export default OrderTracking;
