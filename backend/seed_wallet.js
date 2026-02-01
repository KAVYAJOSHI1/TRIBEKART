const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tribekart.db');

db.serialize(() => {
    const userId = 1;
    const amount = 50000;

    console.log(`Adding ${amount} to wallet for User ${userId}...`);

    db.run("UPDATE users SET wallet = ? WHERE id = ?", [amount, userId], function (err) {
        if (err) {
            console.error("Error updating wallet:", err.message);
        } else {
            console.log(`Wallet updated. Rows modified: ${this.changes}`);
        }
    });
});

db.close();
