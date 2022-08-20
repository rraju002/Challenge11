/* Importing the express module. */
const express = require('express');

/* This is a way to set the port number. The first part is for when the app is deployed to Heroku. The
second part is for when the app is run locally. */
const PORT = process.env.PORT || 3001;

/* Creating an instance of the express module. */
const app = express();

/* This is requiring the path module. */
const path = require('path');

/* This is requiring the fs module. */
const fs = require('fs');

/* This is requiring the db.json file. */
const data = require('./db/db.json');

/* This is a package that is used to create a unique id for each note. */
const uniqid = require('uniqid');

/* This is telling the app to use the public folder as a static directory. */
app.use(express.static('public'));

/* This is a middleware that is used to parse the body of the request. */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/* This is telling the app to send the index.html file when the user goes to the root route. */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

/* This is telling the app to send the notes.html file when the user goes to the note file route*/
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

/* This is reading db.JSON encoding it in UTF8, and if there is an err, console.log(err)
 else parse data then res.json(userData) */
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const userData = JSON.parse(data);
            res.json(userData);
        }
    })
})

/* This is creating a post request to the api/notes route. */
app.post('/api/notes', (req, res) => {
    const { text, title } = req.body;

    /* This is checking to see if the text and title are present. If they are, then it is creating a note
    object with the title, text, and id. */
    if (text && title) {
        const note = {
            title,
            text,
            id: uniqid()
        }

        /* This is reading the db.json file, encoding it in UTF8, and if there is an error, console.log(err)
        else parse data then res.json(userData) !FS only takes in string! */
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const dataObject = JSON.parse(data);
                dataObject.push(note);
                fs.writeFile('./db/db.json', JSON.stringify(dataObject), err =>
                    err ? console.error(err) : console.log('Success! Notes written'))

                res.json(`${note.title} has been added to db.json`)
            }
        })

    } else {
        res.error('Error')
    }
})

/* This is telling the app to send the index.html file when the user types in anything that is not a correct route */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

/* This is telling the app to listen on the port number that is set. */
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`))