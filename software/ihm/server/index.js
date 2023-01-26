const express = require("express")
const path = require('path');
const bodyParser = require("body-parser");
const { exec } = require('child_process')
const app = express()

const PORT = process.env.PORT || 3001

// The body-parser middleware
// to parse form data
app.use(bodyParser.urlencoded({extended: true}));

/* Run Build */
// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, './../com_manager/build')));
/* --------------------------------------------- */
app.get("/api", (req, res) => {
    res.json({ message: "Server is UP !" });
});

/* Need opti */
app.post("/close_uart", (req, res) => {
    res.json({ message: "closing ..." });
    exec('kill -9 `ps aux | grep ../../uart/sender.py | awk \'{print $2}\' | head -n 1`');
    exec('sleep 1');
    exec('kill -9 `ps aux | grep ../../uart/sender.py | awk \'{print $2}\' | head -n 1`');
});

app.post("/max7219_scrolling", (req, res) => {
    res.json({ message: "Max7219 scrolling is running ..." });
    exec('python3 ../../uart/sender.py A')
});

app.post("/led_blinking", (req, res) => {
    res.json({ message: "LED blancking is running ..." });
    exec('python3 ../../uart/sender.py C')
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body

    const addedRecord = await repo.createNewRecord({ email, password })

    console.log(`Added Record : ${JSON.stringify(addedRecord, null, 4)}`)

    res.send("Information added to the database successfully.")
});

app.get('*', (req, res) => {
    res.json({ message: "Error" });
});
/* --------------------------------------------- */
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
