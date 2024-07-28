const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//
// tips.get('/', (req, res) =>
//     Storage.getNotes().then(notes => res.json(notes))
//     .catch(err => res.status(500).json(err))
//     );

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );


app.get('/api/notes', (req, res) =>
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(JSON.parse(data));
    })
    );

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), err => {
            if (err) {
                console.error(err);
                return;
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















// const express = require('express');
// const api = require('./routes/apiRoutes');
// const path = require('path');
// // app.use('/api', api);
// // const tips = require('./db/store');

// const PORT = process.env.PORT || 3001;

// const app = express();



// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use('/api', api);

// app.use(express.static('public'));

// app.get('/notes', (req, res) =>
//     res.sendFile(path.join(__dirname, 'public/notes.html'))
//     );

//     app.get('/api/notes', (req, res) =>
//         fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             res.json(JSON.parse(data));
//         })
//         );

// app.post('/api/notes', (req, res) => {
//     const { notes } = req.body;
//     console.log(notes);

//     // Save notes to database here (not shown)

//     // Send the notes data to the client
//     res.json(notes);
// });



// app.post('/api/notes', (reg, res) => {
//     const{ notes } = req.body;
//     console.log(notes);
//     res.json(notes);
//     }
// );
// const Store = require('./db/store');

// tips.get('/', (req, res) => {
//     Store.getNotes().then((notes) =>{ res.json(notes)})
//     .catch((err) => res.status(500).json(err));
  
   
// });
   
  





// error line
// app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, 'public/index.html'))
//   );

// 
// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT}`)
// );