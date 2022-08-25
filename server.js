// Dependencies
const express = require('express');

// Point Server to the route files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Create an express server
const app = express();

// Set PORT
const PORT = process.env.PORT || 3001;

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());


app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Listener
router.get('/notes', function (req, res) {
    saveData
        .retrieveNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

// POST request
router.post('/notes', (req, res) => {
    saveData
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

// Bonus - DELETE request
router.delete('/notes/:id', function (req, res) {
    saveData
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// If no matching route is found default to home page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});