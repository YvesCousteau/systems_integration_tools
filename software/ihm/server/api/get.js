function server(app) {
    app.get("/api", (req, res) => {
        res.json({ 
            "message": "Server is UP !" 
        });
    });
}

function rest(app) {
    app.get('*', (req, res) => {
        res.json({ "message": "Path does not exist" });
    });
}

module.exports = { functions, devices, server, rest };