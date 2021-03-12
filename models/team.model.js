const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    title:{
        type: String
    },
    profilePhoto:{
        type: String
    },
    linkedinUrl:{
        type: String
    },
})

// UserSchema.methods.testing_methods = function () {
//     console.log('using schema methods')
// }


module.exports = mongoose.model('teams', TeamSchema)