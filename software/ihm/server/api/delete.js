function devices(app,db) {
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
    });
}

function functions(app,db) {
    app.delete("/api/function/:id", (req, res, next) => {
        db.run(
            'DELETE FROM functions WHERE id = ?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", changes: this.changes })
            });
    });
}
module.exports = { functions, devices };