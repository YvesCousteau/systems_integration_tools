function devices(app,db) {
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
}

function functions(app,db) {
    app.get("/api/functions/", (req, res, next) => {
        var sql = "select * from functions"
        var params = []
        db.all(sql, params, (err, row) => {
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
    app.get("/api/functions/:name", (req, res, next) => {
        var sql = "select * from functions WHERE device = ?"
        var params = [req.params.name]
        db.all(sql, params, (err, row) => {
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
    app.get("/api/function/:id", (req, res, next) => {
        var sql = "select * from functions where id = ?"
        var params = [req.params.id]
        db.all(sql, params, (err, row) => {
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
}

function server(app) {
    app.get("/api", (req, res) => {
        res.json({ 
            message: "Server is UP !" 
        });
    });
}

function rest(app) {
    app.get('*', (req, res) => {
        res.json({ message: "Path does not exist" });
    });
}

module.exports = { functions, devices, server, rest };