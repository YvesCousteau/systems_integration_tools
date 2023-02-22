function devices(app,db) {
    app.patch("/api/device/:id", (req, res, next) => {
        var data = {
            name: req.body.name,
            ip: req.body.ip,
        }
        db.run(
            `UPDATE devices set 
                name = COALESCE(?,name),
                ip = COALESCE(?,ip)
                WHERE id = ?`,
            [data.name, data.ip, req.params.id],
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
            }
        );
    });
}

function functions(app,db) {
    app.patch("/api/function/:id", (req, res, next) => {
        var data = {
            name: req.body.name,
            device: req.body.device,
        }
        db.run(
            `UPDATE functions set 
                name = COALESCE(?,name),
                device = COALESCE(?,device),
                WHERE id = ?`,
            [data.name, data.device, req.params.id],
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
    });
}
module.exports = { functions, devices };