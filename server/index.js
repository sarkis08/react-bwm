const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev')
const FakeDb = require('./fake-db');
const Rental = require('./models/rental');

const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.DB_URL)
    .then(() => {
        const fakeDb = new FakeDb();
        fakeDb.seedDb();
    }).catch((err) => {
        console.log('Fail to connect to DB', err);
    });

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const port = process.env.PORT || 3001;
 
app.listen(port, () => {
    console.log(`Running on server ${port}`)
});