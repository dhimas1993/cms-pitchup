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
        try {
            const {name, body, label} = req.body
            const file = req.files
            if(file.length < 2){
                req.flash('alertMessage', 'Logo and Portofolio Logo')
                req.flash('alertStatus', 'danger')
                res.redirect('/pitch')
            } else {
                if (file.length === 2){
                    let _label = []
                    let result = label.split(",")
                    result.map((item) => {
                        _label.push(item.trim())
                    })
                    await Pitch.create({
                        name : name,
                        body : body,
                        label : _label,
                        file : `image/pitch/${file[0].filename}`,
                        portofolioLogo : `image/pitch/${file[1].filename}`
                    })
                    req.flash('alertMessage', 'Success add pitch')
                    req.flash('alertStatus', 'success')
                    res.redirect('/pitch')
                } else {
                    let portofoliologoname = []
                    let _label = []
                    let result = label.split(",")

                    for (let i = 1; i < file.length; i++) {
                        portofoliologoname.push(`image/pitch/${file[i].filename}`)
                    }

                    result.map((item) => {
                        _label.push(item.trim())
                    })

                    await Pitch.create({
                    name : name,
                        body : body,
                        label : _label,
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
            console.log(req.body)
            console.log(req.files)
            if (req.files[0] === undefined){
                let _label = []
                let result = label.split(",")

                result.map((item) => {
                    _label.push(item.trim())
                })

                pitch.name = name;
                pitch.label = _label;
                pitch.body = body;
                await pitch.save();
                req.flash('alertMessage', 'Success edit pitch')
                req.flash('alertStatus', 'success')
                res.redirect('/pitch')
            } else if(req.files.length == 1){
                await fs.unlink(path.join(`public/${pitch.file}`))
                let _label = []
                let result = label.split(",")

                result.map((item) => {
                    _label.push(item.trim())
                })

                pitch.name = name;
                pitch.label = _label;
                pitch.body = body;
                pitch.file = `image/pitch/${req.files[0].filename}`
                await pitch.save()
                req.flash('alertMessage', 'Success edit pitch')
                req.flash('alertStatus', 'success')
                res.redirect('/pitch')
            } else {
                await fs.unlink(path.join(`public/${pitch.file}`))

                pitch.portofolioLogo.map( async (item) => {
                    await fs.unlink(path.join(`public/${item}`))
                })

                let portofoliologoname = []
                let _label = []
                let result = label.split(",")

                for (let i = 1; i < req.files.length; i++) {
                    portofoliologoname.push(`image/pitch/${req.files[i].filename}`)
                }

                result.map((item) => {
                    _label.push(item.trim())
                })

                pitch.name = name;
                pitch.label = _label;
                pitch.body = body;
                pitch.file = `image/pitch/${req.files[0].filename}`
                pitch.portofolioLogo = portofoliologoname
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