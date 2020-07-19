// Downloads

var express = require("express");
var path = require("path");
var fs = require("fs")

// Setting up server

var app = express()
var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT)
})

// Create routes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})





