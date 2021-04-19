const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SliderSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    file:{
        type: String,
    },
    url: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

// UserSchema.methods.testing_methods = function () {
//     console.log('using schema methods')
// }

module.exports = mongoose.model('sliders', SliderSchema)