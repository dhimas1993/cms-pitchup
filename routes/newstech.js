/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const rootdir = path.join(__dirname,'..')
const newsImageDir = path.join(rootdir,'./upload/newstech')
let News = require('../models/newstech.model')

const newsImage_storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null,newsImageDir)
        },
        filename: function(req,file,cb){
            cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
        }
    }
)

// setting file upload
const upload_newsImage = multer(
    {
        storage: newsImage_storage,
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

// list all slider
router.route('/').get((req,res) => {
    News.find()
    .then(news => {res.json(news)})
    .catch(err => json('Error: ' + err));
})

// get news by ID
router.route('/:id').get((req,res) => {
    News.findOne({_id : req.params.id})
    .then(news => {res.json(news)})
    .catch(err => json('Error: ' + err));
})

// create news 
router.post('/create',upload_newsImage.array('image',2),(req, res) => {
    let filename = 'icons8-image-64.png'
    console.log(req.files);
    if(req.files){
        const newNews = new News({
            title : req.body.title,
            headlinePicture : req.files.headlinePicture,
            companyName : req.files.companyName,
            companyLogo : filename
        })

        newNews.save()
        .then((saveNews) => {
            // console.log(saveSlider);
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

// delete news
router.route('/:id').delete((req, res) => {
    Newstech.findByIdAndDelete(req.params.id)
      .then(() => res.json('SUCCESS'))
      .catch(err => json('ERROR SAVE :' + err));
});

module.exports = router