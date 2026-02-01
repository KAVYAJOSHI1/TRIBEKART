const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tribekart.db');

db.serialize(() => {
    db.all("PRAGMA table_info(orders)", (err, rows) => {
        if (err) console.error(err);
        else console.log("Orders Columns:", JSON.stringify(rows, null, 2));
    });
});

db.close();
