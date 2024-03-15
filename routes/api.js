// Importing express to access Router method
const router = require('express').Router();
// Importing fs to use to read and create files
const fs = require('fs');
// Importing uniqid to generate an new 'id' for new user posts.
const uniqid = require('uniqid');

// Displaying/accessing notes api
router.get('/notes', (req, res) => {
    // Reading file where database notes are saved
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json({ status: 'error', msg: 'Error in posting review'})
        } else {
            // Parsing the json objects into a new constant 
            const notes = JSON.parse(data);
            // Now strigifiying the constant to send to the user
            res.send(JSON.stringify(notes));
        }
    })
})

// Posting a new note
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        // parsing json objects, from the notes database, into a 'notes' constant
        const notes = JSON.parse(data);
    // Using whatever the users input was to create a new note '(...req.body)', and also adding a second key of 'id' with a uniqid to generate a new id for this new post!
        const newNote = {...req.body, id: uniqid()};
    // Adding the new note to the database
        notes.push(newNote);
    // Now rewrite the notes database file (db.json) to have the new note (newNote) we added to our original read data (notes)
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ status: 'error', msg: 'Error in posting review' })
            }
            // return updated notes including the new note created
            res.json(notes);
        })
    });
})

// Deleting an existing note
router.delete('/notes/:id', (req, res) => {
    // Read notes database file
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        // Parsing the data from the file
        const notes = JSON.parse(data);
        // We Created a copy of 'notes' and whatever users ':id' was entered will not be included in the 'noteUpdate' constant
        const noteUpdate = notes.filter(note => note.id !== req.params.id)
        // Writing a new file without the freshly deleted id. 
        fs.writeFile('./db/db.json', JSON.stringify(noteUpdate), (err) => {
            res.json(noteUpdate);
        })
    })
})

module.exports = router;