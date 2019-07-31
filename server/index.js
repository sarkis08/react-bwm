const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev')
const FakeDb = require('./fake-db');
const Rental = require('./models/rental');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

mongoose.connect(config.DB_URL, { useNewUrlParser: true })
    .then(() => {
        const fakeDb = new FakeDb();
        // fakeDb.seedDb();
        console.log('Connected to db');
    }).catch((err) => {
        console.log('Fail to connect to DB', err);
    });

const app = express();

// BODY PARSER MIDDLEWIRE
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

const port = process.env.PORT || 3001;
 
app.listen(port, () => {
    console.log(`Running on server ${port}`)
});