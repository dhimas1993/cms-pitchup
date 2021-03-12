const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PitchSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    file:{
        type: String
    },
    body:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    label:[{
        type: String
    }],
    portofolioLogo:[{
        type: String
    }],
    teams:[{
        type: Schema.Types.ObjectId,
        ref: 'teams'
    }],
    news:[{
        type: Schema.Types.ObjectId,
        ref: 'news'
    }]
}, {usePushEach: true})

// UserSchema.methods.testing_methods = function () {
//     console.log('using schema methods')
// }


module.exports = mongoose.model('pitchs', PitchSchema)