'use strict';

let fs = require('fs');
let path = require('path');
let express = require('express');
let pug = require('pug');
let config = require('./config.json');
let app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(`./${config.http.publicRoot}/markups/_pages`));

app.use(express.static(path.resolve(config.http.publicRoot)));

// routes =========
app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html;charset=utf8');
    res.end('It works!');
});
// ================

app.use((req, res, next) => res.status(404).send('Page cannot be found!'));

app.use((err, req, res, next) => {
    res.status(500);
    res.render('error', {error: err.message});
    console.error(err.message, err.stack);
});

app.listen(config.http.port, config.http.host, () => {
    let uploadDir = path.resolve(config.http.publicRoot, 'upload');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    console.log(`Server is up on ${config.http.host}:${config.http.port}!`);
});