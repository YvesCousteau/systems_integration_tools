/* ------------ */
/* --- Init --- */
/* ------------ */
const express = require("express")
const path = require('path');
const bodyParser = require("body-parser");
const { exec } = require('child_process')
const app = express()
const db = require("./database.js")

const PORT = process.env.PORT || 3001

// The body-parser middleware
// to parse form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/* Run Build */
// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, './../com_manager/build')));

/* ----------- */
/* --- API --- */
/* ----------- */
app.get("/api", (req, res) => {
    res.json({ 
        message: "Server is UP !" 
    });
});

app.get("/api/devices", (req, res, next) => {
    var sql = "select * from devices"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/api/device/:id", (req, res, next) => {
    var sql = "select * from devices where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

app.post("/api/device/", (req, res, next) => {
    var errors = []
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        name: req.body.name,
    }
    var sql = 'INSERT INTO devices (name) VALUES (?)'
    var params = [data.name]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})
app.patch("/api/device/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
    }
    db.run(
        `UPDATE devices set 
           name = COALESCE(?,name)
           WHERE id = ?`,
        [data.name, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "changes": this.changes
            })
        });
})
app.delete("/api/device/:id", (req, res, next) => {
    db.run(
        'DELETE FROM devices WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
        });
})

app.get("/api/functions", (req, res, next) => {
    var sql = "select * from functions"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.post("/api/function/", (req, res, next) => {
    var errors = []
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (!req.body.device) {
        errors.push("No name specified");
    }
    if (!req.body.cmd) {
        errors.push("No name specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        name: req.body.name,
        device: req.body.device,
        cmd: req.body.cmd,
        value: req.body.value,
    }
    var sql = 'INSERT INTO functions (name,device,cmd,value) VALUES (?,?,?,?)'
    var params = [data.name,data.device,data.cmd,data.value]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

/* ------------------------------ */
/* --- API Unit Test Function --- */
/* ------------------------------ */
app.post("/api/test/unit/max7219_scrolling", (req, res) => {
    res.json({
        message: "Max7219 scrolling is running ..."
    });
    exec('python3 ../../uart/sender.py A')
});
app.post("/api/test/unit/led_blinking", (req, res) => {
    res.json({
        message: "LED blancking is running ..."
    });
    exec('python3 ../../uart/sender.py C')
});
/* Need opti */
app.post("/api/test/unit/uart/close", (req, res) => {
    res.json({ 
        message: "closing ..." 
    });
    exec('kill -9 `ps aux | grep ../../uart/sender.py | awk \'{print $2}\' | head -n 1`');
    exec('sleep 1');
    exec('kill -9 `ps aux | grep ../../uart/sender.py | awk \'{print $2}\' | head -n 1`');
});
/* ------------------------ */
/* --- API All the rest --- */
/* ------------------------ */
app.get('*', (req, res) => {
    res.json({ message: "Path does not exist" });
});
/* ------------------------ */
/* --- Server Listening --- */
/* ------------------------ */
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
