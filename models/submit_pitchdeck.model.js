const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    file: {
        type: String
    },
    pitch: {
        type: String
    }
})

module.exports = mongoose.model('news', NewsSchema)