/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const rootdir = path.join(__dirname,'..')
const mentorImageDir = path.join(rootdir,'/upload/mentor')
let Mentor = require('../models/mentor.model')

const mentorImage_storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null,mentorImageDir)
        },
        filename: function(req,file,cb){
            cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
        }
    }
)

// setting file upload
const upload_mentorImage = multer(
    {
        storage: mentorImage_storage,
        limits:{
            fileSize: 1000000000
        },
        fileFilter(req,file,cb){
            if(file.originalname.match(/\.(jpg|png|jpeg)$/)){
                cb(null,true)
            }else{
                cb(new Error('Please upload a .jpg .png or .jpeg file'))
            }
        }
    }
)

// list all user
router.route('/').get((req,res) => {
    Mentor.find()
    .then(users => {res.json(users)})
    .catch(err => json('Error: ' + err));
})

// list mentor by ID
router.route('/:id').get((req,res) => {
    Mentor.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.json('ERROR SAVE :' + err))
})

// add mentor
router.post('/create',upload_mentorImage.single('image'),(req, res) => {
    // let filename = 'icons8-image-64.png'
    console.log(req.file);
    if(req.file){
        const newMentor = new Mentor({
            name : req.body.name,
            job : req.body.job,
            body : req.body.body,
            date : req.body.date,
            label : req.body.label,
            profilePhoto : req.file.filename,
            mentorSession : req.body.mentorSession
        })

        newMentor.save()
        .then((saveMentor) => {
            res.json(
                'SUCCESS'
            )
        }).catch(err => res.json('ERROR SAVE :' + err))
    } else {
        res.send({
            'message' : 'FAIL',
            'filename': 'empty'
        })
    }
})

// delete mentor by ID
router.route('/:id').delete((req, res) => {
    Mentor.findByIdAndDelete(req.params.id)
      .then(() => res.json('SUCCESS'))
      .catch(err => json('ERROR SAVE :' + err));
});

// Update Mentor by ID
router.put('/update/:id',upload_mentorImage.single('image'),(req, res) => {
    if(req.file){
        Mentor.findById(req.params.id)
        .then(mentor => {
            mentor.name = req.body.name,
            mentor.job = req.body.job,
            mentor.body = req.body.body,
            mentor.date = req.body.date,
            mentor.label = req.body.label,
            mentor.profilePhoto = req.file.filename,
            mentor.mentorSession = req.body.mentorSession
            
            mentor.save()
            .then(() => res.json('SUCCESS'))
            .catch(err => res.json('ERROR SAVE :' + err))
        }).catch(err => res.json('ERROR ACCESS : ' + err))
    } else {
        Mentor.findById(req.params.id)
        .then(mentor => {
            // console.log(req.file.filename);
            // console.log(req.body.name);
            mentor.name = req.body.name
            mentor.job = req.body.job,
            mentor.body = req.body.body,
            mentor.label = req.body.label,
            mentor.mentorSession = req.body.mentorSession
            // slider.file = req.file.filename
            
            mentor.save()
            .then(() => res.json('SUCCESS'))
            .catch(err => res.json('ERROR SAVE :' + err))
        }).catch(err => res.json('ERROR ACCESS : ' + err))
    }
})

module.exports = router