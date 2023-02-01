/* ------------ */
/* --- Init --- */
/* ------------ */
const express = require("express")
const bodyParser = require("body-parser");
const { exec } = require('child_process')
const app = express()
const db = require("./database.js")

const get = require("./api/get");
const post = require("./api/post");
const del = require("./api/delete");
const patch = require("./api/patch");

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
get.server(app)

get.devices(app,db)
post.devices(app,db)
del.devices(app,db)
patch.devices(app,db)

get.functions(app,db)
post.functions(app,db)
del.functions(app,db)
patch.functions(app,db)

app.post("/api/run/:name", (req, res) => {
    try {
        console.log(req.params.name);
        exec('python3 exec/client.py 192.168.1.175 '+req.params.name)
    } catch {
        console.log("error");
    }
    res.json({
        message: req.params.id + " is running ..."
    });
    
});

get.rest(app)
/* ------------------------ */
/* --- Server Listening --- */
/* ------------------------ */
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
