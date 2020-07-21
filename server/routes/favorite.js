const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
// const favorite = require('../models/Favorite');

// #10 4:00
router.post('/favoriteNumber', (req, res) => {

    // req.body.movieId

    // mongoDB 에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            // 프론트에 다시 숫자 정보를 보내주기
            res.status(200).json({ success: true, favoriteNumber: info.length })

        })

})

// #11 1:50 /favorited API
router.post('/favorited', (req, res) => {

    // 내가 이 영화를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기

    // mongoDB 에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            // 프론트에 다시 숫자 정보를 보내주기            
            let result = false;

            if(info.length !==0 ) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })

        })

})



// #12 3:45

router.post('/removeFromFavorite', (req, res) => {

    // #12 8:00
    // add 했던 거 지워주기만 하면 됨
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, doc })

        })

})

router.post('/addFavorite', (req, res) => {

    // 영화 정보들을 front에서 보내줄 때 같이 보내줘서 DB에 정보를 넣어주면 됨
    // #12 5:50
    
    const favorite = new Favorite(req.body)

    // save 메소드 이용 -> favorite doc에 다 들어감
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})

// #13 7:00
router.post('/getFavoritedMovie', (req, res) => {


    Favorite.find({ 'userFrom': req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })

})



// #14 6:50
router.post('/api/favorite/removeFromFavorite', (req, res) => {


    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, results) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true})
        })

})


module.exports = router;