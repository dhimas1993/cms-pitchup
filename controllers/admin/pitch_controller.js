const Pitch = require('../../models/pitch.model')
const path = require('path')
const fs = require('fs-extra')

module.exports = {
    viewPitch: async (req,res) => {
        try {
            const pitch = await Pitch.find({}).populate('teams')
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const url = req.route.path
            res.render('admin/pitch/view_pitch', {
                pitch,
                alert,
                url
            })
        } catch (error) {
            res.render('admin/pitch/view_pitch')
        }
    },
    addPitch: async (req,res) => {
        // console.log("satu",req.body)
        // console.log("dua",req.file)
        // console.log("tiga",req.files)
        try {
            const {name, body, label} = req.body
            const file = req.files
            if(file){
                // console.log('file ada')
                if (file.length === 2){
                    // console.log('file ada 2',file)
                    await Pitch.create({
                        name : name,
                        body : body,
                        label : label,
                        file : file[0].filename,
                        portofolioLogo : file[1].filename
                    })
                    req.flash('alertMessage', 'Success add slider')
                    req.flash('alertStatus', 'success')
                    res.redirect('/pitch')
                } else {
                    var portofoliologoname = []
                    // console.log('file lebih dari 2', portofoliologoname)
                    for (let i = 1; i < file.length; i++) {
                        portofoliologoname.push(`image/pitch/${file[i].filename}`)
                    }
                    console.log('length', portofoliologoname)
                    await Pitch.create({
                    name : name,
                        body : body,
                        label : label,
                        file : `image/pitch/${req.files[0].filename}`,
                        portofolioLogo : portofoliologoname
                    })
                    req.flash('alertMessage', 'Success add slider')
                    req.flash('alertStatus', 'success')
                    res.redirect('/pitch')
                }
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/pitch')
        }
    },
    editPitch : async (req,res) => {
        try {
            const {id, name, label, body} = req.body
            const pitch = await Pitch.findOne({_id : id})
            if (req.files[0] === undefined){
                pitch.name = name;
                pitch.label = label;
                pitch.body = body;
                await pitch.save();
                req.flash('alertMessage', 'Success edit pitch')
                req.flash('alertStatus', 'success')
                res.redirect('/pitch')
            } else {
                await fs.unlink(path.join(`public/${pitch.file}`))
                pitch.name = name
                pitch.file = `image/pitch/${req.file.filename}`
                await pitch.save()
                req.flash('alertMessage', 'Success edit pitch')
                req.flash('alertStatus', 'success')
                res.redirect('/pitch')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/pitch')
        }
    },

    deletePitch: async (req,res) => {
        try {
            const {id} = req.params
            const pitch = await Pitch.findOne({_id : id});
            // console.log(pitch.portofolioLogo) 
            await fs.unlink(path.join(`public/${pitch.file}`))
            await pitch.portofolioLogo.map((item) => {
                fs.unlink(path.join(`public/${item}`))
            })
            await pitch.remove()
            req.flash('alertMessage', 'Success delete pitch')
            req.flash('alertStatus', 'success')
            res.redirect('/pitch')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/pitch')
        }
    },
}