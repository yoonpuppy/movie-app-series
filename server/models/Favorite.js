const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// #9 3:20 1.Favorite Model 만들기
const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestapms: true })



const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }