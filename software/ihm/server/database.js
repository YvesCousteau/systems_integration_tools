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
            `CREATE TABLE functions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text UNIQUE,
                device text,
                cmd text UNIQUE,
                value integer,
                CONSTRAINT name_unique UNIQUE (name),
                CONSTRAINT cmd_unique UNIQUE (cmd)
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
            `CREATE TABLE devices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text UNIQUE,
                CONSTRAINT name_unique UNIQUE (name)
            )`,
            (err) => {
                if (err) {
                    console.log("Table devices already created")
                } else {
                    console.log("Table devices just created")
                }
            }
        );
        
    }
});
module.exports = db