// Importing express to access Router method
const router = require('express').Router();
const path = require('path');
const fs = require('fs');
// Displaying notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// Displaying notes page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});


module.exports = router;