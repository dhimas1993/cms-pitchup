const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    headlinePicture:{
        type: String
    },
    companyName:{
        type: String
    },
    companyLogo:{
        type: String
    },
    companyUrl:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
})

// UserSchema.methods.testing_methods = function () {
//     console.log('using schema methods')
// }

module.exports = mongoose.model('news', NewsSchema)