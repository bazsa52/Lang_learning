// include express
const express = require("express")
const gen = require("./mod.js")
const fs = require("fs")

// Create server
const server = express()

// Bind /slice
server.get("/slice", (req, res) => {
    let text = req.query.text
    let a = req.query.a
    let b = req.query.b

    if (text == undefined || text == "" || a == undefined || b == undefined) {
        res.send("Kérem, adja meg az összes paramétert!")
    } else {
        res.send(text.slice(a, b))
    }
})

// Bind /lista
server.get("/lista", (req, res) => {
    let max = 10
    let min = 2
    let a = Math.floor(Math.random() * (max - min)) + min
    let b = Math.floor(Math.random() * (max - min)) + min

    res.send(gen.generate(7, 6))

})

// Bind /log
server.get("/log", (req, res) => {
    let logs = []

    // Get current time
    let time = Intl.DateTimeFormat("HU-hu", { year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(Date.now())

    try {
        logs = fs.readFileSync("logfile", { encoding: "utf-8" }).trimEnd().split("\n")
    } catch { }
    finally {
        fs.appendFileSync("logfile", time + "\n", { encoding: "utf-8" })
    }
    logs.push(time)
    res.send(logs.join("<br>"))
})

// Bound * path
server.get("*", (req, res) => {
    res.send("Default message")
})

// Start server on port 1212
server.listen(1212, () => {
    console.log("Server is listening on http://127.0.0.1:1212/")
})
