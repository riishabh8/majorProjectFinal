const express = require('express');
const router = express.Router();
const movieDb = require('../models/movies');
router.use(express.json());
const auth = require('../middleware/auth');



router.put('/',auth.authenticate,(req,res)=> {

    const data = req.body;
    const {rating,id} = data;
    var average_rating='';
    var rating_count ='';
    const userId = req.session.userId;
   const rat = {userId : userId,
                rating : rating
};

    movieDb.findOne({'_id':id}).then((response) => {

        average_rating = parseInt(response['average_rating']);
        rating_count = parseInt(response['rating_count']);
        rating_count = rating_count+1;
        total_ratings = response['ratings_submitted'].length;
        average_rating = ((parseInt(rating) + average_rating)/(total_ratings+1)).toFixed(1);

   
        

        movieDb.findOneAndUpdate({'_id': id},{'average_rating':average_rating , 'rating_count': rating_count, $addToSet : {ratings_submitted
 : rat} }).then((response)=> {

        if(response){
            res.status(201).send("Update Completed");
        }
        if(! response){
            res.status(204).send("No movie with provided ID");
        }
    })
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);

    


});
})


router.get('/:ID',(req,res) => {

    const movieId = req.params['ID'];
    
    movieDb.findOne({'_id':movieId}).then((response) => {

        res.status(200).send({'rating' : response['rating']});
       
    }).catch((err) => {
        res.status(500).send(err);
    })
})


router.post('/me',auth.authenticate, (req,res) => {


    const {movieId} = req.body;
    const userId = req.session.userId;
  

        movieDb.find(

           { "_id": movieId,

            "ratings_submitted": {

                "$elemMatch": {
                    "userId" : userId
                }
            }
        }).then((data) => {

            
        if(data.length>0) {
            
        res.status(200).send();
}
        else if(data.length === 0){

            res.status(204).send();
        }
}).catch((err) => {
    res.status(500).send(err);
})

});



module.exports = router;