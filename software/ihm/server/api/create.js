function devices(app,db) {
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
    });
}

function functions(app,db) {
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
        }
        var sql = 'INSERT INTO functions (name,device,cmd) VALUES (?,?,?)'
        var params = [data.name,data.device,data.cmd]
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
    });
}
module.exports = { functions, devices };