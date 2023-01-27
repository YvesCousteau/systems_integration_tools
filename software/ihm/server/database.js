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
            `CREATE TABLE devices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text UNIQUE,
                CONSTRAINT name_unique UNIQUE (name)
            )`,
            (err) => {
                if (err) {
                    console.log("Table devices already created")
                } else {
                    console.log("Table devices just created, creating some rows")
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
                    console.log("Table functions already created")
                } else {
                    console.log("Table functions just created")
                
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
                    console.log("Table details already created")
                } else {
                    console.log("Table details just created")
                
                }
            }
        );
    }
});
module.exports = db