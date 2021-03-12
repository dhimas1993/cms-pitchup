const Admin = require('../../models/users.model')
const Mentor = require('../../models/mentor.model')
const Pitch = require('../../models/pitch.model')
const Pitchdeck = require('../../models/pitchdeck.model')

module.exports = {
    viewDashboard: async (req,res) => {
        try {
            const admin = await Admin.find({role: 'startup'})
            const mentor = await Mentor.find()
            const pitch = await Pitch.find()
            const pitchdeck = await Pitchdeck.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/dashboard/view_dashboard',{
                admin, mentor, pitch, pitchdeck,
                alert
            })
        } catch (error) {
            res.render('admin/admin/view_admin')
        }
    },
    

    // viewUser: (req,res) => {
    //     res.render('admin/user/view_user')
    // },

}