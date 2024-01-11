const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let animals = [
 { name: 'Lion', votes: 0 },
 { name: 'Tiger', votes: 0 },
 { name: 'Bear', votes: 0 },
];

app.get('/animals', (req, res) => {
 res.json(animals);
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});
