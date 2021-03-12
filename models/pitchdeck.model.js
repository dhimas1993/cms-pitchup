const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PitchDeckSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    file:{
        type: String
    },
    name:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    isCurated:{
        type: Boolean,
        default: false
    },
    feedbacks:[{
        type: Schema.Types.ObjectId,
        ref: 'feedbacks'
    }]
}, {usePushEach: true})

module.exports = mongoose.model('pitchdecks', PitchDeckSchema)