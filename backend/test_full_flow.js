const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tribekart.db');

const API_URL = 'http://localhost:3000';

async function runTest() {
    console.log("=== Starting Full Flow Verification ===");

    try {
        // 1. Setup Data - Ensure Users Exist
        console.log("1. Checking Users...");

        // We know we have users from seed, but let's grab IDs
        // Assuming user 1 is buyer, user 2 is seller (as per server.js seed)
        const buyerId = 1;
        const sellerId = 2;

        console.log(`Using Buyer ID: ${buyerId}, Seller ID: ${sellerId}`);

        // 2. Seller Adds an Item
        console.log("2. Creating Item as Seller...");
        const itemRes = await axios.post(`${API_URL}/items`, {
            name: "Test Flow Item " + Date.now(),
            price: 1500,
            category: "painting",
            sellerName: "Test Seller",
            description: "A test item for flow verification",
            createdBy: sellerId,
            amountSold: 0
        });

        if (!itemRes.data.success) throw new Error("Item creation failed");
        const newItemId = itemRes.data.id;
        console.log(`Item Created. ID: ${newItemId}`);

        // 3. Buyer Adds to Cart
        console.log("3. Buyer Adding to Cart...");
        const cartRes = await axios.post(`${API_URL}/cart`, {
            userId: buyerId,
            productId: newItemId
        });
        if (!cartRes.data.id && !cartRes.data.success) throw new Error("Add to cart failed");
        console.log("Item Added to Cart");

        // 3b. Test Remove from Cart (Add another dummy item then remove it)
        console.log("3b. Testing Remove from Cart...");
        const dummyItemRes = await axios.post(`${API_URL}/items`, {
            name: "Dummy Item " + Date.now(), price: 100, category: "other", sellerName: "Test", createdBy: sellerId
        });
        const dummyItemId = dummyItemRes.data.id;
        await axios.post(`${API_URL}/cart`, { userId: buyerId, productId: dummyItemId });
        console.log(`Dummy Item ${dummyItemId} added to cart. Now removing...`);

        try {
            const delRes = await axios.delete(`${API_URL}/cart/${dummyItemId}`, { params: { userId: buyerId } });
            if (delRes.data.success) console.log("Remove from Cart: SUCCESS");
            else throw new Error("Remove from Cart returned false");
        } catch (e) {
            console.error("Remove from Cart FAILED:", e.message);
            throw e;
        }

        // 4. Buyer Places Order
        console.log("4. Buyer Placing Order...");
        try {
            const orderRes = await axios.post(`${API_URL}/place-order`, {
                userId: buyerId
            });
            console.log("Order Placed Successfully:", orderRes.data);
        } catch (e) {
            console.error("Order Placement Failed:", e.response ? e.response.data : e.message);
            // If failed due to money, adds money and retry
            if (e.response && e.response.data.message.includes("Insufficient funds")) {
                console.log("Insufficient funds. Adding money...");
                await axios.post(`${API_URL}/wallet/add`, { userId: buyerId, amount: 10000 });
                console.log("Money Added. Retrying Order...");
                const retryOrder = await axios.post(`${API_URL}/place-order`, { userId: buyerId });
                console.log("Order Placed Successfully (Retry):", retryOrder.data);
            } else {
                throw e;
            }
        }

        // 5. Verify Order in Database
        console.log("5. Verifying Order in Database...");
        const orderRow = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM orders WHERE itemId = ? ORDER BY id DESC LIMIT 1", [newItemId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!orderRow) throw new Error("Order not found in DB");
        console.log("Order Found in DB:", orderRow);

        // 6. Fetch Seller Orders (Pending)
        console.log("6. Fetching Pending Orders for Seller...");
        const sellerOrdersRes = await axios.get(`${API_URL}/orders`, {
            params: { sellerId: sellerId, status: 'Pending' }
        });

        const foundOrder = sellerOrdersRes.data.find(o => o.itemId === newItemId);

        if (foundOrder) {
            console.log("SUCCESS: Order found in Seller's Pending list!");
            console.log("Verified Order Details:", foundOrder);
        } else {
            console.error("FAILURE: Order NOT found in Seller's Pending list.");
            console.log("Full List Returned:", sellerOrdersRes.data);
            throw new Error("Verification Failed");
        }

        // 7. Fetch Buyer Orders (Pending)
        console.log("7. Fetching Orders for Buyer (Testing Item Details)...");
        const buyerOrdersRes = await axios.get(`${API_URL}/orders`, {
            params: { userId: buyerId, status: 'Pending' }
        });

        const foundBuyerOrder = buyerOrdersRes.data.find(o => o.itemId === newItemId);
        if (foundBuyerOrder) {
            console.log("SUCCESS: Order found in Buyer's list!");
            console.log("Buyer Order Details:", foundBuyerOrder);
            if (foundBuyerOrder.itemName && foundBuyerOrder.itemPrice) {
                console.log("✅ Item Name and Price present in Buyer Order");
            } else {
                console.error("❌ Item Name/Price MISSING in Buyer Order");
                throw new Error("Buyer Verification Failed - Missing Details");
            }
        } else {
            console.error("FAILURE: Order NOT found in Buyers list.");
            const allOrders = await axios.get(`${API_URL}/orders`, { params: { userId: buyerId } });
            console.log("All Buyer Orders:", allOrders.data);
            throw new Error("Buyer Verification Failed");
        }

        console.log("=== Verification Complete: PASSED ===");

    } catch (error) {
        console.error("=== Verification Failed ===");
        console.error(error.response ? error.response.data : error);
    }
}

runTest();
