/****************/
/***** Init *****/
/****************/
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;
// JSON CONFIG
const fs = require('fs');
const systemName = '../config/system.json';
const system = require(systemName);
const devicesName = '../config/devices.json';
const devices = require(devicesName);
const functionsName = '../config/functions.json';
const functions = require(functionsName);
/*****************/
/***** Start *****/
/*****************/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/***************/
/***** API *****/
/***************/
app.get('/api', (req, res) => {
    if (system == null || devices == null || functions == null) {
        res.status(400).json({ "error": "Missing config JSON file" });
        return;
    }
    res.json({"message": "Server is UP !"});
});
/***************/
app.get("/api/devices", (req, res, next) => {
    if (devices.devices == {}) {
        res.status(400).json({ "error": "No device"});
        return;
    }
    res.json({
        "message": "success",
        "data": devices
    })
});
app.get("/api/functions", (req, res, next) => {
    if (functions.functions == {}) {
        res.status(400).json({ "error": "No function"});
        return;
    }
    res.json({
        "message": "success",
        "data": functions
    })
});
app.get("/api/device/:name", (req, res, next) => {
    const name = req.params.name;
    if (devices.devices == {}) {
        res.status(400).json({ "error": "No device"});
        return;
    }
    for(const item of devices.devices) {
        if (item.name == name) {
            res.json({
                "message": "success",
                "data": item
            })
            return;
        }
    }
});
app.get("/api/device/:name", (req, res, next) => {
    const name = req.params.name;
    if (devices.devices == {}) {
        res.status(400).json({ "error": "No device"});
        return;
    }
    for(const item of devices.devices) {
        if (item.name == name) {
            res.json({
                "message": "success",
                "data": item
            })
            return;
        }
    }
    res.status(400).json({ "error": "No device"});
    return;
});
app.post("/api/device/:name", (req, res, next) => {
    const name = req.params.name;
    var errors = []
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    if (devices.devices == {}) {
        res.status(400).json({ "error": "No device"});
        return;
    }
    for (const item of devices.devices) {
        if (item.name == req.params.name) {
            if (!item.functions.includes(req.body.name)) {
                item.functions.push(req.body.name);
                fs.writeFile(devicesName, JSON.stringify(devices), function writeJSON(err) {
                    if (err) return console.log(err);
                });
                console.log(item.functions);
            }
            res.json({"message": "success"})
            return;
            
        } 
    }
    res.status(400).json({ "error": "No device"});
    return;
});
app.delete("/api/device/:name", (req, res, next) => {
    const name = req.body.name;
    var errors = []
    if (!name) {
        errors.push("No name specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    if (devices.devices == {}) {
        res.status(400).json({ "error": "No device"});
        return;
    }
    for (const item of devices.devices) {
        if (item.name == req.params.name) {
            if (item.functions.includes(name) && item.functions) {
                let counter = 0;
                for (const fct of item.functions) {
                    console.log();
                    console.log(req.body.name + "|" + fct);
                    if (fct == name) {
                        console.log(counter);
                        item.functions.splice(counter, 1);
                        fs.writeFile(devicesName, JSON.stringify(devices), function writeJSON(err) {
                            if (err) return console.log(err);
                        }); 
                        console.log(item.functions);
                        res.json({"message": "success"})
                        return;
                    }
                    counter = counter + 1;
                }
            }
            
        } 
    }
    res.status(400).json({ "error": "No device"});
    return;
    
});
/***************/
app.get('*', (req, res) => {
    res.status(404).json({ "error": "Path does not exist" })
    res.json({
        "message": "Path does not exist",
    });
});
/****************************/
/***** Server Listening *****/
/****************************/
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


// module.exports = { functions, devices, server, rest };


// const db = require("./database.js")

// const get = require("./api/get");
// const post = require("./api/post");
// const del = require("./api/delete");
// const patch = require("./api/patch");


// The body-parser middleware
// to parse form data
/* Run Build */
// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, './../com_manager/build')));

/* ----------- */
/* --- API --- */
/* ----------- */
// get.server(app)

// get.devices(app,db)
// post.devices(app,db)
// del.devices(app,db)
// patch.devices(app,db)

// get.functions(app,db)
// post.functions(app,db)
// del.functions(app,db)
// patch.functions(app,db)

// app.post("/api/run/max7219/:ip/:name", (req, res) => {
//     console.log("max7219");
//     try {
//         exec('python3 ../services/max7219/client_master.py '+req.params.ip + ' ' +req.params.name)
//     } catch {
//         console.log("error");
//     }
//     res.json({
//         "message": req.params.name + " is running ..."
//     });
// });
// app.post("/api/run/hmi/:ip/", (req, res) => {
//     console.log("hmi | ip :" + req.params.ip);
//     try {
//         exec('python3 ../services/hmi/client_master.py '+req.params.ip)
//     } catch {
//         console.log("error");
//     }
//     res.json({
//         "message": req.params.name + " is running ..."
//     });
// });
// app.post("/api/run/power/:option/:ip", (req, res) => {
//     console.log("power");
//     try {
//         exec('python3 ../services/power/client_master.py '+req.params.ip + ' ' + req.params.option)
//     } catch {
//         console.log("error");
//     }
//     res.json({
//         "message": req.params.ip + " is "+req.params.option+" ..."
//     });
// });
// app.get("/api/services", (req, res) => {
//     let resultat;
//     try {
//         const testFolder = '../services';
//         const fs = require('fs');
//         resultat = fs.readdirSync(testFolder);
//     } catch {
//         console.log("error");
//     }
//     res.json({
//         "message": req.params.ip + " is "+req.params.option+" ...",
//         "data": resultat
//     });
// });
// get.rest(app)
