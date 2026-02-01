
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const ip = require('ip');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Blockchain Configuration
const CONTRACT_ADDRESS = '0x96Ae82f38f9760cf23f0fFcDDE9cf63f76B8C909';
const ABI = [
    "function createItem(string memory _name, uint _price) public",
    "function purchaseItem(uint _id) public payable",
    "event ItemCreated(uint id, string name, uint price, address seller)",
    "event ItemPurchased(uint id, address buyer)",
    "function itemCount() public view returns (uint)"
];

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./tribekart.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT,
      name TEXT,
      dob TEXT,
      gender TEXT,
      number TEXT,
      wallet TEXT
    )`);

        // Products Table
        db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      category TEXT,
      sellerName TEXT,
      description TEXT,
      image TEXT,
      createdBy INTEGER,
      amountSold INTEGER DEFAULT 0,
      blockchainId INTEGER
    )`);

        // Cart Table
        db.run(`CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      productId INTEGER,
      quantity INTEGER
    )`);

        // Orders Table
        db.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemId INTEGER,
      quantity INTEGER,
      status TEXT,
      userId INTEGER,
      totalAmount REAL,
      date TEXT,
      transactionHash TEXT
    )`);

        // Addresses Table
        db.run(`CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user INTEGER,
      addressName TEXT,
      addressFirstField TEXT,
      addressSecondField TEXT,
      city TEXT,
      zipcode TEXT,
      selected INTEGER
    )`);

        // Seed Data if empty
        db.get("SELECT count(*) as count FROM users", (err, row) => {
            if (row.count === 0) {
                console.log("Seeding Users...");
                db.run(`INSERT INTO users (email, password, role, name, wallet) VALUES ('buyer@test.com', '123456', 'buyer', 'Test Buyer', '0')`);
                db.run(`INSERT INTO users (email, password, role, name, wallet) VALUES ('seller@test.com', '123456', 'seller', 'Test Seller', '0')`);
            }
        });

        db.get("SELECT count(*) as count FROM products", (err, row) => {
            if (row.count === 0) {
                console.log("Seeding Products...");
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Tribal Painting', 1200, 'painting', 'Ramesh', 'Beautiful hand-painted tribal art.', 2, 5)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Handwoven Fabric', 800, 'fabric', 'Sita', 'Organic cotton fabric.', 2, 3)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Clay Statue', 1500, 'statue', 'Gopal', 'Traditional clay idol.', 2, 8)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Warli Art Wall Piece', 2500, 'painting', 'Suresh', 'Authentic Warli art on canvas.', 2, 12)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Bamboo Basket', 450, 'other', 'Meena', 'Handcrafted bamboo storage basket.', 2, 15)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Terracotta Vase', 900, 'statue', 'Gopal', 'Earthen pot with intricate designs.', 2, 6)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Jute Bag', 300, 'fabric', 'Sita', 'Eco-friendly jute shopping bag.', 2, 20)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Wooden Mask', 1800, 'other', 'Ramesh', 'Traditional tribal mask for decor.', 2, 4)`);
                db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES ('Dokra Figurine', 3200, 'statue', 'Gopal', 'Brass metal casting using Dokra art.', 2, 7)`);
            }
        });
    });
}

// Routes

// Signup
app.post('/signup', (req, res) => {
    const { email, password, role, name } = req.body;
    db.run("INSERT INTO users (email, password, role, name, wallet) VALUES (?, ?, ?, ?, '0')", [email, password, role, name], function (err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ success: false, message: "Email already exists" });
            }
            return res.status(500).json({ error: err.message });
        }
        const userId = this.lastID;
        // Initialize Cart
        db.run(`INSERT INTO cart (userId, productId, quantity) VALUES (?, 0, 0)`, [userId], (err) => {
            // Just a dummy init or we can leave cart empty.
            // Actually, my cart table usage doesn't require init row.
            // But my cart logic in cart.jsx handles empty.
        });

        res.json({ success: true, userId: userId });
    });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json({ success: true, user: row });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    });
});

// Get Products
app.get('/products', (req, res) => {
    const { category, createdBy } = req.query;
    let query = "SELECT * FROM products";
    let params = [];

    // Build query based on filters
    const conditions = [];

    if (category && category !== 'All') {
        const map = { 'Paintings': 'painting', 'Fabrics': 'fabric', 'Statues': 'statue', 'Others': 'other' };
        if (map[category]) {
            conditions.push("category = ?");
            params.push(map[category]);
        }
    }

    if (createdBy) {
        conditions.push("createdBy = ?");
        params.push(createdBy);
    }

    if (req.query.search) {
        conditions.push("(lower(name) LIKE ? OR lower(description) LIKE ?)");
        const searchTerm = `%${req.query.search.toLowerCase()}%`;
        params.push(searchTerm);
        params.push(searchTerm);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add to Cart
app.post('/cart', (req, res) => {
    const { userId, productId } = req.body;
    db.run("INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, 1)", [userId, productId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

// Create Item
app.post('/items', (req, res) => {
    const { name, price, category, sellerName, description, createdBy, amountSold } = req.body;
    db.run(`INSERT INTO products (name, price, category, sellerName, description, createdBy, amountSold) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, price, category, sellerName, description, createdBy, amountSold],
        async function (err) {
            if (err) return res.status(500).json({ error: err.message });
            const dbId = this.lastID;

            try {
                // interact with blockchain
                console.log("Creating item on blockchain...");
                const tx = await contract.createItem(name, price);
                await tx.wait();

                // Get the item count to assume the ID (or parse logs properly, but this is a simple approximation for sync)
                // Better approach: Parse logs. For now, assuming sequential sync.
                // Or simplified: Just store the tx hash if needed, but we wanted ID.
                // Let's rely on event listener in a real app, but here we'll fetch count.
                // Actually, let's just create it and maybe store tx hash in future if needed.
                // Wait, we need the blockchainId to purchase it later.
                // Let's get the item count after creation.
                const count = await contract.itemCount();
                const blockchainId = Number(count);

                db.run("UPDATE products SET blockchainId = ?, creationTxHash = ? WHERE id = ?", [blockchainId, tx.hash, dbId], (updateErr) => {
                    if (updateErr) console.error("Failed to update blockchainId", updateErr);
                    res.json({ success: true, id: dbId, blockchainId: blockchainId, transactionHash: tx.hash });
                });

            } catch (bcError) {
                console.error("Blockchain error:", bcError);
                // We typically shouldn't fail the DB insert if blockchain fails in this loose coupling, 
                // but strictly we should rollback. For prototype, we log error.
                res.json({ success: true, id: dbId, blockchainId: null, blockchainError: bcError.message });
            }
        }
    );
});

// Track Order Journey
app.get('/track/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Join Order, Product, and User (Seller) to get full journey
    const query = `
        SELECT 
            orders.id as orderId, orders.status, orders.date as orderDate, orders.transactionHash as purchaseTxHash,
            products.name as productName, products.price, products.image, products.description, products.category,
            products.creationTxHash, products.sellerName
        FROM orders
        JOIN products ON orders.itemId = products.id
        WHERE orders.id = ?`;

    db.get(query, [orderId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Order not found" });

        res.json(row);
    });
});

// Update Item
app.put('/items/:id', (req, res) => {
    const { name, price, category, description } = req.body;
    db.run("UPDATE products SET name = ?, price = ?, category = ?, description = ? WHERE id = ?",
        [name, price, category, description, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        }
    );
});

// Delete Item
app.delete('/items/:id', (req, res) => {
    db.run("DELETE FROM products WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Get Single Item (if needed for edit) or use existing products?
// Existing products endpoint returns all. Let's add single.
app.get('/items/:id', (req, res) => {
    db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
});

// Update User Profile
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email, dob, gender, number } = req.body;
    // Note: We might want to avoid updating email if it breaks login, but let's allow it for now.
    db.run(`UPDATE users SET name = ?, email = ?, dob = ?, gender = ?, number = ? WHERE id = ?`,
        [username, email, dob, gender, number, userId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        }
    );
});

// Get User Profile
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.get("SELECT id, name as username, email, role, dob, gender, number, wallet FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
});

// Get Cart
app.get('/cart/:userId', (req, res) => {
    const query = `
        SELECT cart.id, cart.quantity, products.name, products.price, products.sellerName 
        FROM cart 
        JOIN products ON cart.productId = products.id 
        WHERE cart.userId = ?`;

    db.all(query, [req.params.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Place Order
// Place Order with Wallet Transaction
app.post('/place-order', (req, res) => {
    const { userId } = req.body; // Ignore totalAmount from frontend, calculate on backend
    const date = new Date().toISOString();
    const SHIPPING_FEE = 80;

    db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        // 1. Fetch Cart Items to Calculate Total
        const cartQuery = `
            SELECT cart.quantity, products.price, products.createdBy as sellerId, products.id as itemId, products.blockchainId
            FROM cart 
            JOIN products ON cart.productId = products.id 
            WHERE cart.userId = ?`;

        db.all(cartQuery, [userId], (err, cartItems) => {
            if (err) {
                db.run("ROLLBACK");
                return res.status(500).json({ error: err.message });
            }

            if (cartItems.length === 0) {
                db.run("ROLLBACK");
                return res.status(400).json({ success: false, message: "Cart is empty" });
            }

            // Calculate exact total
            let itemsTotal = 0;
            cartItems.forEach(item => {
                itemsTotal += item.price * item.quantity;
            });
            const grandTotal = itemsTotal + SHIPPING_FEE;

            console.log(`[ORDER DEBUG] User: ${userId}, ItemsTotal: ${itemsTotal}, GrandTotal: ${grandTotal}`);

            // 2. Get Buyer's Wallet Balance
            db.get("SELECT wallet FROM users WHERE id = ?", [userId], (err, user) => {
                if (err) {
                    console.error("[ORDER DEBUG] Wallet fetch error", err);
                    db.run("ROLLBACK");
                    return res.status(500).json({ error: err.message });
                }

                if (!user) {
                    console.error("[ORDER DEBUG] User not found");
                    db.run("ROLLBACK");
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                const currentBalance = parseFloat(user.wallet || 0);
                console.log(`[ORDER DEBUG] Wallet Balance: ${currentBalance}`);

                if (currentBalance < grandTotal) {
                    console.error(`[ORDER DEBUG] Insufficient Funds. Needed: ${grandTotal}, Has: ${currentBalance}`);
                    db.run("ROLLBACK");
                    return res.status(400).json({
                        success: false,
                        message: `Insufficient funds. Wallet: ₹${currentBalance}, Required: ₹${grandTotal}`
                    });
                }

                // 3. Deduct from Buyer
                const newBuyerBalance = currentBalance - grandTotal;
                db.run("UPDATE users SET wallet = ? WHERE id = ?", [newBuyerBalance.toFixed(2), userId], (err) => {
                    if (err) {
                        db.run("ROLLBACK");
                        return res.status(500).json({ error: err.message });
                    }

                    // 4. Credit Sellers and Insert Orders
                    let completedOperations = 0;
                    const totalOperations = cartItems.length; // Credit + Insert per item
                    let errorOccurred = false;

                    // We need to execute updates sequentially or carefully track completion
                    // Using a simple loop logic with check

                    const processItem = async (index) => {
                        if (index >= cartItems.length) {
                            // All Done
                            if (errorOccurred) {
                                db.run("ROLLBACK");
                                return res.status(500).json({ error: "Transaction failed during item processing" });
                            }

                            // 5. Clear Cart
                            db.run("DELETE FROM cart WHERE userId = ?", [userId], (err) => {
                                if (err) {
                                    db.run("ROLLBACK");
                                    return res.status(500).json({ error: err.message });
                                }

                                db.run("COMMIT");
                                res.json({ success: true, message: "Order placed successfully", newBalance: newBuyerBalance });
                            });
                            return;
                        }

                        const item = cartItems[index];
                        const itemTotal = item.price * item.quantity;
                        let txHash = null;

                        // Blockchain Purchase
                        if (item.blockchainId) {
                            try {
                                console.log(`[BC] Purchasing Item ID: ${item.blockchainId} for ${item.price} wei`);
                                const tx = await contract.purchaseItem(item.blockchainId, { value: item.price });
                                txHash = tx.hash;
                                console.log(`[BC] Tx Hash: ${txHash}`);
                            } catch (bcError) {
                                console.error("[BC] Purchase Failed", bcError.message);
                                // Optional: errorOccurred = true; to block order if BC fails
                            }
                        }

                        // Credit Seller
                        db.run("UPDATE users SET wallet = CAST(COALESCE(wallet, '0') AS REAL) + ? WHERE id = ?", [itemTotal, item.sellerId], (err) => {
                            if (err) {
                                console.error("Seller credit error", err);
                                errorOccurred = true;
                            }

                            // Insert Order with Tx Hash
                            db.run("INSERT INTO orders (userId, totalAmount, date, status, itemId, quantity, transactionHash) VALUES (?, ?, ?, 'Pending', ?, ?, ?)",
                                [userId, itemTotal, date, item.itemId, item.quantity, txHash], (err) => {
                                    if (err) {
                                        console.error("Order insert error", err);
                                        errorOccurred = true;
                                    }

                                    // Next item
                                    processItem(index + 1);
                                });
                        });
                    };

                    // Start processing items
                    processItem(0);
                });
            });
        });
    });
});

app.post('/place-order-blockchain', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Get product to find blockchainId and price
    db.get("SELECT * FROM products WHERE id = ?", [productId], async (err, product) => {
        if (err || !product) return res.status(404).json({ error: "Product not found" });
        if (!product.blockchainId) return res.status(400).json({ error: "Product not on blockchain" });

        try {
            console.log(`Purchasing item ${product.blockchainId} for price ${product.price}`);
            const tx = await contract.purchaseItem(product.blockchainId, { value: product.price });
            await tx.wait();

            // Record order in DB
            db.run("INSERT INTO orders (userId, totalAmount, date, status, itemId, quantity, transactionHash) VALUES (?, ?, ?, 'Paid', ?, ?, ?)",
                [userId, product.price, new Date().toISOString(), product.id, quantity, tx.hash], (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ success: true, transactionHash: tx.hash });
                });
        } catch (bcError) {
            console.error("Blockchain Purchase Error:", bcError);
            res.status(500).json({ error: bcError.reason || bcError.message });
        }
    });
});
// Add Money to Wallet
app.post('/wallet/add', (req, res) => {
    const { userId, amount } = req.body;
    db.run("UPDATE users SET wallet = CAST(COALESCE(wallet, '0') AS REAL) + ? WHERE id = ?", [amount, userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.get("SELECT wallet FROM users WHERE id = ?", [userId], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, newBalance: row.wallet });
        });
    });
});


// Remove Item from Cart
app.delete('/cart/:id', (req, res) => {
    db.run("DELETE FROM cart WHERE productId = ? AND userId = ?", [req.params.id, req.query.userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Get Orders
app.get('/orders', (req, res) => {
    const { userId, sellerId, status } = req.query;

    if (sellerId) {
        // Fetch orders for a seller (orders containing items created by this seller)
        let query = `
            SELECT orders.*, products.name as itemName, products.price as itemPrice 
            FROM orders 
            JOIN products ON orders.itemId = products.id 
            WHERE products.createdBy = ?`;

        let params = [sellerId];

        if (status && status !== 'All') {
            query += " AND lower(status) = ?";
            params.push(status.toLowerCase()); // 'pending', 'completed', etc.
        }

        db.all(query, params, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });

    } else if (userId) {
        // Fetch orders for a buyer
        // FIXED: JOIN with products to get item details
        let query = `
            SELECT orders.*, products.name as itemName, products.price as itemPrice 
            FROM orders 
            JOIN products ON orders.itemId = products.id 
            WHERE orders.userId = ?`;

        let params = [userId];

        if (status && status !== 'All') {
            query += " AND lower(status) = ?";
            params.push(status.toLowerCase()); // 'pending', 'completed', etc.
        }

        db.all(query, params, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        res.status(400).json({ error: "Missing userId or sellerId" });
    }
});

// Cancel Order
app.post('/orders/:id/cancel', (req, res) => {
    const orderId = req.params.id;
    db.run("UPDATE orders SET status = 'Cancelled' WHERE id = ?", [orderId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Get Addresses
app.get('/addresses', (req, res) => {
    const { user } = req.query;
    db.all("SELECT * FROM addresses WHERE user = ?", [user], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        // Handle boolean conversion for 'selected'
        const result = rows.map(r => ({ ...r, selected: r.selected === 1 }));
        res.json(result);
    });
});

// Add Address
app.post('/addresses', (req, res) => {
    const { user, addressName, addressFirstField, addressSecondField, city, zipcode, selected } = req.body;
    db.run(`INSERT INTO addresses (user, addressName, addressFirstField, addressSecondField, city, zipcode, selected) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user, addressName, addressFirstField, addressSecondField, city, zipcode, selected ? 1 : 0],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: this.lastID });
        }
    );
});

// Update Address
app.put('/addresses/:id', (req, res) => {
    const { addressName, addressFirstField, addressSecondField, city, zipcode } = req.body;
    db.run("UPDATE addresses SET addressName = ?, addressFirstField = ?, addressSecondField = ?, city = ?, zipcode = ? WHERE id = ?",
        [addressName, addressFirstField, addressSecondField, city, zipcode, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        }
    );
});

// Delete Address
app.delete('/addresses/:id', (req, res) => {
    db.run("DELETE FROM addresses WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Select Address (Set one as selected, others as not)
app.put('/addresses/:id/select', (req, res) => {
    const userId = req.body.userId; // We need userId to unselect others
    db.serialize(() => {
        db.run("UPDATE addresses SET selected = 0 WHERE user = ?", [userId]);
        db.run("UPDATE addresses SET selected = 1 WHERE id = ?", [req.params.id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    });
});

// Update Order Status
app.put('/orders/:id/status', (req, res) => {
    const { status } = req.body;
    db.run("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Get Seller Stats
app.get('/stats/:sellerId', (req, res) => {
    const sellerId = req.params.sellerId;

    const revenueQuery = `
        SELECT SUM(o.totalAmount) as totalRevenue, SUM(o.quantity) as totalItemsSold
        FROM orders o
        JOIN products p ON o.itemId = p.id
        WHERE p.createdBy = ? AND lower(o.status) = 'completed'`;

    const categoryQuery = `
        SELECT p.category, SUM(o.quantity) as count
        FROM orders o
        JOIN products p ON o.itemId = p.id
        WHERE p.createdBy = ? AND lower(o.status) = 'completed'
        GROUP BY p.category`;

    // Also get item specific stats
    const itemStatsQuery = `
        SELECT p.name, p.price, SUM(o.quantity) as amountSold
        FROM orders o
        JOIN products p ON o.itemId = p.id
        WHERE p.createdBy = ? AND lower(o.status) = 'completed'
        GROUP BY p.id`;

    db.get(revenueQuery, [sellerId], (err, revRow) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(categoryQuery, [sellerId], (err, catRows) => {
            if (err) return res.status(500).json({ error: err.message });

            db.all(itemStatsQuery, [sellerId], (err, itemRows) => {
                if (err) return res.status(500).json({ error: err.message });

                res.json({
                    totalRevenue: revRow ? revRow.totalRevenue : 0,
                    totalItemsSold: revRow ? revRow.totalItemsSold : 0,
                    categoryData: catRows,
                    itemStats: itemRows
                });
            });
        });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://${ip.address()}:${PORT}`);
});
