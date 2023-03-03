function devices(app,db) {
    app.post("/api/device/", (req, res, next) => {
        var errors = []
        if (!req.body.name) {
            errors.push("No name specified");
        }
        if (!req.body.ip) {
            errors.push("No ip specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            name: req.body.name,
            ip: req.body.ip,
        }
        var sql = 'INSERT INTO devices (name,ip) VALUES (?,?)'
        var params = [data.name,data.ip]
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
            errors.push("No device specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            name: req.body.name,
            device: req.body.device,
        }
        var sql = 'INSERT INTO functions (name,device) VALUES (?,?)'
        var params = [data.name,data.device]
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