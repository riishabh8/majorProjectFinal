const express = require('express');
const router = express.Router();
router.use(express.json());
const auth = require('../middleware/auth');


router.delete('/me', (req,res) => {

    delete req.session.userId;
    res.status(204).send();
})

router.get('/currentSession', (req,res) => {

    if(req.session.userId){res.status(200).send({'userId' : req.session.userId});}
    else {
        res.status(204).send();
    }
    
})


module.exports = router;
