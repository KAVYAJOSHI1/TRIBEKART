const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tribekart.db');

db.all("SELECT id, status, transactionHash FROM orders", [], (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Orders:", rows);
});

db.all("SELECT id, name, creationTxHash FROM products", [], (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Products:", rows);
});
