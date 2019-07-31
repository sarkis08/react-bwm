const express = require('express');
const router = express.Router();
const Rental = require('../models/rental')

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {

    res.json({"secret" : true});
});

router.get('/', (req, res) => {
    Rental.find({})
        .select('-bookings') // exclude bookings collection
        .exec(function(err, foundRentals) {

            if (err) {
                res.status(422).send({err:err})
            }

            res.json(foundRentals)
        })
});

router.get('/:id', function(req, res) {
    const rentalId = req.params.id;

    Rental.findById(rentalId)
        .populate('user', 'username -_id') // Don't send a user id but username
        .populate('bookings', 'startAt endAt -_id') // Send booking startAt and endAt but no booking id
        .exec(function(err, foundRental){
            if (err) {

                return res.status(422).send({errors: [{
                    title: 'Rental Error',
                    detail: 'Could not find Rental'
                }]});

            }
                return res.json(foundRental);
            
        });
});

module.exports = router;