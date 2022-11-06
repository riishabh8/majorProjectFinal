const express = require('express');
const router = express.Router();
const movieDb = require('../models/movies')
router.use(express.json());



router.get('/', (req,res) => {

    const movies = movieDb.find().then((data) => {res.status(200).send(data)}).catch((err) => {
        res.status(500).send(`Error in retriecing data from Database ${err}`);
    });

    
})

router.get('/:movieId', (req,res) => {

    const movieId = req.params['movieId'];

    
    movieDb.findOne({'_id' : movieId}).then((data) => {
        if(data){
            
            res.status(200).send(data);
        }
        }).catch((err) => {
        (res.status(404).send(`Error in retrieving Data ${err}`));
    });
})




module.exports = router;