const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OnlinePitchSchema = new Schema({
   users: {
      type: Schema.Types.ObjectId,
      ref: 'users'
   },
   file: {
      type: String
   },
   isCurrated: {
      type: Boolean,
      default: false
   },
   date: {
      type: Date,
      default: Date.now()
   },
}, { usePushEach: true })

// UserSchema.methods.testing_methods = function () {
//     console.log('using schema methods')
// }


module.exports = mongoose.model('online-pitchs', OnlinePitchSchema)