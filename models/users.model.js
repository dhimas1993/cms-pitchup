const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    jobTitle:{
        type: String,
    },
    startupName:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        default: 'pending'
    },
    linkedinProfile:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String
    },
    confirmationCode : {
        type: String, 
        unique: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    shortDescription:{
        type: String
    },
    websiteLink:{
        type: String
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    startupLocation:{
        type: String
    },
    startupStage:{
        type: String
    },
    mockup:{
        type: Array
    },
    hearAboutUs:{
        type: String
    },
    startupLogo:{
        type: String
    },
    isCurated: {
        type: Boolean,
        default: false
    },
    pitch_isActive: {
        type: Boolean,
        default: false
    },
    mentor_isActive: {
        type: Boolean,
        default: false
    },
    perks_isActive: {
        type: Boolean,
        default: false
    },
    subscribe_status: {
        type: Boolean,
        default: false
    },
    package_plan : {
        type: String
    },
    elevatorPitch : {
        type: String
    },
    isTerm : {
        type: Boolean
    }
})

module.exports = mongoose.model('users', UserSchema)