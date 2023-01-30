function devices(app,db) {
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
            }
        );
    });
}

function functions(app,db) {
    app.patch("/api/function/:id", (req, res, next) => {
        var data = {
            name: req.body.name,
            device: req.body.device,
            cmd: req.body.cmd,
        }
        db.run(
            `UPDATE functions set 
                name = COALESCE(?,name),
                device = COALESCE(?,device),
                cmd = COALESCE(?,cmd)
                WHERE id = ?`,
            [data.name, data.device, data.cmd, req.params.id],
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