const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tribekart.db');

const API_URL = 'http://localhost:3000';

async function runAdvancedTest() {
    console.log("=== Starting Advanced Features Verification ===");

    try {
        const buyerId = 1;
        const sellerId = 2; // Assuming seller exists

        // 1. Test Search
        console.log("\n--- Testing Search ---");
        const uniqueName = "Searchable Item " + Date.now();
        await axios.post(`${API_URL}/items`, {
            name: uniqueName, price: 500, category: "other", sellerName: "Test Seller", createdBy: sellerId
        });

        // Wait a bit or immediate
        const searchRes = await axios.get(`${API_URL}/products`, { params: { search: "Searchable" } });
        const found = searchRes.data.find(i => i.name === uniqueName);
        if (found) {
            console.log("✅ Search Verification Passed: Found created item.");
        } else {
            console.error("❌ Search Verification Failed: Item not found.");
            // console.log("Response:", searchRes.data);
            throw new Error("Search Failed");
        }

        // 2. Test Wallet Top-up (QR Logic)
        console.log("\n--- Testing Wallet Top-up ---");
        const initialWalletRes = await axios.get(`${API_URL}/cart/${buyerId}`); // Hacky way to check wallet? No, place-order checks it.
        // Actually we don't have a direct wallet GET endpoint easily accessible without auth middleware usually? 
        // Wait, server.js doesn't expose GET /wallet/:id directly maybe? 
        // Let's use the response from add wallet.
        const topupRes = await axios.post(`${API_URL}/wallet/add`, { userId: buyerId, amount: 500 });
        if (topupRes.data.success && topupRes.data.newBalance) {
            console.log(`✅ Wallet Top-up Passed. New Balance: ${topupRes.data.newBalance}`);
        } else {
            console.error("Top-up Response:", topupRes.data);
            throw new Error("Wallet Top-up Failed");
        }

        // 3. Test Blockchain Tracking Journey
        console.log("\n--- Testing Blockchain Journey (Track Order) ---");
        // A. Create Item (Check Creation Hash)
        const itemRes = await axios.post(`${API_URL}/items`, {
            name: "Trackable Item " + Date.now(), price: 100, category: "painting", sellerName: "Artist", createdBy: sellerId
        });
        const itemId = itemRes.data.id;
        const creationTx = itemRes.data.transactionHash; // We added this to response in server.js
        console.log(`Item Created. ID: ${itemId}`);

        if (creationTx) {
            console.log(`✅ Creation Tx Hash Captured: ${creationTx.substring(0, 15)}...`);
        } else {
            console.warn("⚠️ Creation Tx Hash MISSING in response (Blockchain might be slow or mocking failed).");
        }

        // B. Add to Cart & Place Order
        await axios.post(`${API_URL}/cart`, { userId: buyerId, productId: itemId });
        const orderRes = await axios.post(`${API_URL}/place-order`, { userId: buyerId });
        // The order response might not return the Order ID directly depending on implementation, 
        // usually it returns { success: true, ... }
        // We need to find the order ID from DB or assume it's the latest.

        const orderRow = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM orders WHERE itemId = ? ORDER BY id DESC LIMIT 1", [itemId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!orderRow) throw new Error("Order not found in DB");
        const orderId = orderRow.id;
        console.log(`Order Placed. ID: ${orderId}`);

        // C. Fetch Tracking Info
        console.log(`Fetching Tracking Info for Order #${orderId}...`);
        const trackRes = await axios.get(`${API_URL}/track/${orderId}`);
        const trackData = trackRes.data;

        console.log("Tracking Data:", trackData);

        if (trackData.productName && trackData.creationTxHash && trackData.purchaseTxHash) {
            console.log("✅ Full Journey Verified: Product Name, Creation Tx, and Purchase Tx present.");
        } else {
            if (!trackData.creationTxHash) console.error("❌ Missing Creation Tx Hash");
            if (!trackData.purchaseTxHash) console.error("❌ Missing Purchase Tx Hash");
            throw new Error("Tracking Verification Failed");
        }

        console.log("\n=== Advanced Features Verification: PASSED ✅ ===");

    } catch (error) {
        console.error("\n=== Verification Failed ❌ ===");
        console.error(error.message);
        if (error.response) console.error(error.response.data);
    }
}

runAdvancedTest();
