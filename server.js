const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});