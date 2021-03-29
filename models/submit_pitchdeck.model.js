const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubmitPitchdeck = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    file: {
        type: Schema.Types.ObjectId,
        required: true
    },
    pitch: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('submit_pitchdeck', SubmitPitchdeck)