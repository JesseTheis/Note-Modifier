

const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );



    app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        res.json(JSON.parse(data));
    });
});

const dbPath = path.join(__dirname, 'db', 'db.json');



app.post('/api/notes', (req, res) => {
    const newNote = {
        id: Date.now(), // Generate a unique ID based on the current timestamp
        title: req.body.title,
        text: req.body.text
    };
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).json({ error: 'Failed to write note' });
            }
            res.json(newNote);
        });
    });
});





app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
    );


app.listen(PORT, () =>
    console.log(`App listening-at-http:localhost:${PORT}`)
    );















