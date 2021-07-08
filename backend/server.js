require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const db = require('./src/models');
const PORT = process.env.PORT || 3000;
const path = require('path');

// Configure logger
app.use(logger('dev'));

// Configure body parser
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// Set public folder path
app.use(express.static(path.join(__dirname, 'src/public')));

// Configure and connect to database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Connect to database successfully!!!');
    })
    .catch(err => {
        throw new Error(err.message || 'Connect to database failure!!!');
    })


// Configure routing
require('./src/routers')(app);

// Configure listening
app.listen(PORT, () => {
    console.log(`Server starts listening on http://localhost:${PORT}`)
})