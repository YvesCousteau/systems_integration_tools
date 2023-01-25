const express = require("express")
const path = require('path');
const bodyParser = require("body-parser");
const { sensitiveHeaders } = require("http2");
const { exec } = require('child_process')

const PORT = process.env.PORT || 3001
const app = express()


app.use(bodyParser.urlencoded({
    extended: true
}));


/* Run Build */
// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, './../com_manager/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Server is UP !" });
});

app.post("/close", (req, res) => {
    res.json({ message: "closing ..." });
    exec('ls', (err, output) => {
        if (err) {
            console.error("could not execute command: ", err)
            return
        }
        console.log("Output: \n", output)
    })
});

// Handle GET requests to /test route
app.post("/max7219_scrolling", (req, res) => {
    res.json({ message: "Max7219 scrolling is running ..." });
/*
    exec('killall python3', (err, output) => {
        if (err) {
            console.error("could not execute command: ", err)
            return
        }
        console.log("Output: \n", output)
    })
*/
/*
    exec('python3 sender_uart.py 1', (err, output) => {
        if (err) {
            console.error("could not execute command: ", err)
            return
        }
        console.log("Output: \n", output)
    })
*/
});

app.post("/led_blinking", (req, res) => {
    res.json({ message: "LED blancking is running ..." });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.json({ message: "Error" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
