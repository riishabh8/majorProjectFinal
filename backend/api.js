const express = require('express');

const router = express.Router();
const movie = require('./routes/movies');
const rating = require('./routes/rating');
const review = require('./routes/reviews');
const users = require('./routes/users');
const sessions = require('./routes/sessions');

router.use(express.json());



router.use('/movie',movie);
router.use('/rating',rating);
router.use('/review', review);
router.use('/users',users);
router.use('/sessions',sessions);



module.exports = router;