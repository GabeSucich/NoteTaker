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



app.get("/api/notes", (req, res) => {
    console.log(get_notes())
    return res.json(get_notes())
})

app.post("/api/notes", (req, res) => {
    var new_note = req.body
    add_note(new_note)
    console.log(new_note)
    return res.json(new_note)
})

app.delete("/api/notes/:id", (req, res) => {
    var id = parseInt(req.params.id)
    delete_note(id)
    res.end()

})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})
// Helper functions

function get_notes() {
    var notes_raw = fs.readFileSync(path.join(__dirname, "db", "db.json"))
    return JSON.parse(notes_raw)
}

function get_all_ids(notes_array) {
    var id_array = [];
    for (var i=0; i<notes_array.length; i++) {
        id_array.push(notes_array[i].id)
    }

    return id_array
}

function get_next_id(notes_array) {
    var ids = get_all_ids(notes_array)
    if (ids.length === 0) {
        return 1
    }
    else {
        var max = Math.max(...ids)
        return max + 1
    }
}

function update_notes(updated) {
    fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(updated), err => {
        if (err) throw err
    })
}

function add_note(new_note) {
    var notes = get_notes()
    var new_id = get_next_id(notes)
    console.log(new_id)
    new_note['id'] = new_id
    notes.push(new_note)
    update_notes(notes)
}

function delete_note(id) {

    var notes = get_notes();
    for (var i=0; i<notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1)
        }
    }
    update_notes(notes)

}
