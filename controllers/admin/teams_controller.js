const fs = require('fs-extra')
const path = require('path')
const Teams = require('../../models/team.model')
const Pitch = require('../../models/pitch.model')

module.exports = {
    viewTeams: async (req,res) => {
        try {
            const pitch = await Pitch.find()
            const teams = await Teams.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/teams/view_teams', {
                title: 'PitchUp | teams',
                teams, pitch,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.render('/teams')
        }
    },
    addTeams: async (req,res) => {
        try {
            const {name, title, linkedinUrl, pitchId} = req.body
            const pitch = await Pitch.findOne({_id : pitchId})
            console.log("pitch",pitch.id)

            const dataTeams = {
                name: name,
                title : title,
                linkedinUrl : linkedinUrl,
                profilePhoto : `image/teams/${req.file.filename}`
            }
            
            const _teams = await Teams.create(dataTeams);
            console.log("teams",_teams.id)
            pitch.teams.push({ _id: _teams._id})
            await pitch.save()
            req.flash('alertMessage', 'Success add teams')
            req.flash('alertStatus', 'success')
            res.redirect('/teams')    
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/teams')
        }
    },
    editTeams : async (req,res) => {
        try {
            const {id, name, title, linkedinurl } = req.body
            console.log(req.file)
            const teams = await Teams.findOne({_id : id})
            if (req.file === undefined){
                teams.name = name;
                teams.title = title;
                teams.linkedinUrl = linkedinurl
                await teams.save();
                req.flash('alertMessage', 'Success edit teams')
                req.flash('alertStatus', 'success')
                res.redirect('/teams')
            } else {
                await fs.unlink(path.join(`public/${teams.profilePhoto}`))
                teams.name = name;
                teams.title = title;
                teams.linkedinUrl = linkedinurl;
                teams.profilePhoto = `image/teams/${req.file.filename}`
                await teams.save()
                req.flash('alertMessage', 'Success edit teams')
                req.flash('alertStatus', 'success')
                res.redirect('/teams')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/slider')
        }
    },
    deleteTeams: async (req,res) => {
        try {
            const {id} = req.params
            const teams = await Teams.findOne({_id : id});
            await fs.unlink(path.join(`public/${teams.profilePhoto}`))
            await teams.remove()
            req.flash('alertMessage', 'Success delete teams')
            req.flash('alertStatus', 'success')
            res.redirect('/teams')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/teams')
        }
    },
}