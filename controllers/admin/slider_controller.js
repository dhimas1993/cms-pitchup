const fs = require('fs-extra')
const path = require('path')
const Slider = require('../../models/slider.model')

module.exports = {
    viewSlider: async (req,res) => {
        try {
            const slider = await Slider.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const url = req.route.path
            res.render('admin/slider/view_slider', {
                title: 'PitchUp | slider',
                slider,
                alert,
                url
            })
        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.render('/slider')
        }
    },

    addSlider: async (req,res) => {
        try {
            const {name, url} = req.body
            await Slider.create({
                name : name,
                url : url,
                file : `image/slider/${req.file.filename}`
            })
            req.flash('alertMessage', 'Success add slider')
            req.flash('alertStatus', 'success')
            res.redirect('/slider')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/slider')
        }
    },
    editSlider : async (req,res) => {
        try {
            const {id, name,url} = req.body
            const slider = await Slider.findOne({_id : id})
            if (req.file === undefined){
                slider.name = name;
                slider.url = url;
                await slider.save();
                req.flash('alertMessage', 'Success edit slider')
                req.flash('alertStatus', 'success')
                res.redirect('/slider')
            } else {
                await fs.unlink(path.join(`public/${slider.file}`))
                slider.name = name
                slider.file = `image/slider/${req.file.filename}`
                await slider.save()
                req.flash('alertMessage', 'Success edit slider')
                req.flash('alertStatus', 'success')
                res.redirect('/slider')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/slider')
        }
    },
    deleteSlider: async (req,res) => {
        try {
            const {id} = req.params
            const slider = await Slider.findOne({_id : id});
            // console.log(slider)
            await fs.unlink(path.join(`public/${slider.file}`))
            await slider.remove()
            req.flash('alertMessage', 'Success delete slider')
            req.flash('alertStatus', 'success')
            res.redirect('/slider')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/slider')
        }
    },
}