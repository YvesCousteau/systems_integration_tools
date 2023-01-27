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
        db.run(
            `CREATE TABLE devices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text UNIQUE,
                CONSTRAINT name_unique UNIQUE (name)
            )`,
            (err) => {
                if (err) {
                    console.log("Table already created")
                } else {
                    console.log("Table just created, creating some rows")
                    var insert = 'INSERT INTO devices (name) VALUES (?)'
                    db.run(insert, ["Com Manager"])
                }
            }
        );
        db.run(
            `CREATE TABLE functions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text UNIQUE,
                value integer,
                CONSTRAINT name_unique UNIQUE (name)
            )`,
            (err) => {
                if (err) {
                    console.log("Table already created")
                } else {
                    console.log("Table just created")
                
                }
            }
        );
        db.run(
            `CREATE TABLE details (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ref text,
                power text,
            )`,
            (err) => {
                if (err) {
                    console.log("Table already created")
                } else {
                    console.log("Table just created")
                
                }
            }
        );
    }
});
module.exports = db