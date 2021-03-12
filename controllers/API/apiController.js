const Slider = require('../../models/slider.model')
const Pitch = require('../../models/pitch.model')
const News = require('../../models/newstech.model')
const Category = require('../../models/category.model')
const Teams = require('../../models/team.model')

const path = require('path')
const rootdir = path.join(__dirname, '../../')
const sliderImageDir = path.join(rootdir,'./public/image/slider/')

module.exports = {
    dashboard:  async (req,res) => {
        try {
            const data = await Slider.find()
            .select('_id name file fileId')
            .limit(5)
            .populate({path: 'fileId', select: '_id fileUrl'})
            
            res.status(200).json({data})
        } catch (error) {
            
        }
    },

    imageSlider: async (req,res) => {
        try {
            const a = sliderImageDir + "image/slider/1608652803365.jpg"
            const options = {
                root: sliderImageDir
            }
            const fileName = req.params.imageName

            res.sendFile(fileName, options, function(err){
                if(err) return res.send(err)
            })
        } catch (error) {
            const a = sliderImageDir + "image/slider/1608652803365.jpg"
            res.status(200).json({a})
            
        }
    },

    topvc: async (req,res) => {
        try {
            const data = await Pitch.find()
            .limit(3)
            res.status(200).json({data})
        } catch (error) {
            res.status(500).json("Network Error")
        }
    },

    pitch: async (req,res) => {
        try {
            const data = await Pitch.find()
            res.status(200).json({data})
        } catch (error) {
            res.status(500).json("Network Error")
        }
    },

    news: async (req,res) => {
        try {
            const data = await News.find()
            .limit(3)
            res.status(200).json({data})
        } catch (error) {
            res.status(500).json("Network Error")
        }
    },

    recommended: async (req,res) => {
        try {
            const data = await Pitch.find()
            .limit(3)
            res.status(200).json({data})
        } catch (error) {
            res.status(500).json("Network Error")
        }
    },
    directory: async (req,res) => {
        try {
            const data = await Pitch.find()
            res.status(200).json({data})
        } catch (error) {
            res.status(500).json("Network Error")
        }
    },

    detailPitch: async (req,res) => {
        try {
            const id = req.params.id
            const result = await Pitch.findById({ _id : id})
            .populate('teams')
            if(result){
                res.status(200).json(result)
            } else {
                res.status(202).json("data tidak ditemukan")
            }
        } catch (error) {
            res.status(201).json("Gagal connect")
        }
    },
    category: async (req,res) => {
        try {
            const data = await Category.find()
            res.status(200).json({data})
        } catch (error) {
            res.status(201).json(error.message)
        }
    }
}