const fs = require('fs');
const path = require('path');
require('dotenv').config();

const express = require('express');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const reciverRoutes = require('./routes/reciever');

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
    );
    next();
});
app.use(helmet());
app.use(compression());
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'acess.log'),
    { flags: 'a' },
);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(reciverRoutes);

app.listen(process.env.PORT || 4010, () => {
    console.log('listen port');
});
