const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MentorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    job:{
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
    profilePhoto:{
        type: String
    },
    mentorSession:{
        type: String
    }
})

// UserSchema.methods.testing_methods = function () {
//     console.log('using schema methods')
// }


module.exports = mongoose.model('mentors', MentorSchema)