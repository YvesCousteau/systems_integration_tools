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
/* --------------------- */
/* --- API Unit Test --- */
/* --------------------- */
app.get("/api/test/units", (req, res, next) => {
    var sql = "select * from test_unit"
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
app.get("/api/test/unit/:id", (req, res, next) => {
    var sql = "select * from test_unit where id = ?"
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
app.post("/api/test/unit/", (req, res, next) => {
    var errors = []
    if (!req.body.function) {
        errors.push("No function specified");
    }
    if (!req.body.device) {
        errors.push("No device specified");
    }
    if (!req.body.state) {
        req.body.state = false;
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        function: req.body.function,
        device: req.body.device,
        state: req.body.state
    }
    var sql = 'INSERT INTO test_unit (function, device, state) VALUES (?,?,?)'
    var params = [data.function, data.device, data.state]
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
app.patch("/api/test/unit/:id", (req, res, next) => {
    var data = {
        function: req.body.function,
        device: req.body.device,
        state: req.body.state
    }
    //console.log(data.function);
    //console.log(data.device);
    //console.log(data.state);
    db.run(
        `UPDATE test_unit set 
           function = COALESCE(?,function), 
           device = COALESCE(?,device), 
           state = COALESCE(?,state) 
           WHERE id = ?`,
        [data.function, data.device, data.state, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
        });
})
app.delete("/api/test/unit/:id", (req, res, next) => {
    db.run(
        'DELETE FROM test_unit WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
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
