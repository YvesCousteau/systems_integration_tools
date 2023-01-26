var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(
            `CREATE TABLE test_unit (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                function text UNIQUE, 
                device text,
                state boolean, 
                CONSTRAINT function_unique UNIQUE (function)
            )`,
            (err) => {
                if (err) {
                    console.log("Table already created")
                } else {
                    console.log("Table just created, creating some rows")
                    var insert = 'INSERT INTO test_unit (function, device, state) VALUES (?,?,?)'
                    db.run(insert, ["Max7219 LED Scrolling", "Pico", false])
                    db.run(insert, ["Led Blinking External", "Pico", false])
                }
            }
        );
    }
});
module.exports = db