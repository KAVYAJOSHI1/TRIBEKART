const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tribekart.db');

db.serialize(() => {
    // Check and add columns for Products
    db.run("ALTER TABLE products ADD COLUMN createdBy INTEGER", (err) => { });
    db.run("ALTER TABLE products ADD COLUMN blockchainId INTEGER", (err) => { });
    db.run("ALTER TABLE products ADD COLUMN amountSold INTEGER DEFAULT 0", (err) => { });

    // Check and add columns for Orders
    db.run("ALTER TABLE orders ADD COLUMN transactionHash TEXT", (err) => { });
    db.run("ALTER TABLE orders ADD COLUMN itemId INTEGER", (err) => {
        if (!err) console.log("Added itemId to orders");
        else console.log("itemId might already exist or error:", err.message);
    });
    db.run("ALTER TABLE orders ADD COLUMN quantity INTEGER", (err) => {
        if (!err) console.log("Added quantity to orders");
        else console.log("quantity might already exist or error:", err.message);
    });

    // Check and add columns for Users
    db.run("ALTER TABLE users ADD COLUMN wallet TEXT DEFAULT '0'", (err) => {
        if (!err) console.log("Added wallet to users");
        else console.log("wallet might already exist or error:", err.message);
    });

    // Check and add columns for Products
    db.run("ALTER TABLE products ADD COLUMN creationTxHash TEXT", (err) => {
        if (!err) console.log("Added creationTxHash to products");
        else console.log("creationTxHash might already exist or error:", err.message);
    });
});

db.close();
