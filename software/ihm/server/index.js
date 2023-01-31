/* ------------ */
/* --- Init --- */
/* ------------ */
const express = require("express")
const path = require('path');
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
        exec('python3 ../../udp/client.py')
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


/*
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
/*
app.post("/api/test/unit/uart/close", (req, res) => {
    res.json({ 
        message: "closing ..." 
    });
    exec('kill -9 `ps aux | grep ../../uart/sender.py | awk \'{print $2}\' | head -n 1`');
    exec('sleep 1');
    exec('kill -9 `ps aux | grep ../../uart/sender.py | awk \'{print $2}\' | head -n 1`');
});
*/
