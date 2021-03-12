const Pitchdeck = require('../../models/pitchdeck.model')

module.exports = {
    viewPitchdeck: async (req,res) => {
        try {
            const _pitch = await Pitchdeck.find().populate('user')
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            console.log(_pitch)
            res.render('admin/pitchdeck/view_pitchdeck', {
                _pitch,
                alert
            })
        } catch (error) {
            console.log(error)
            res.render('admin/pitchdeck/view_pitchdeck')
        }
    },
    
    // addAdmin: async (req,res) => {
    //     try {
    //         const {firstName, lastName, linkedinProfile, status, email, password, confirmPassword} = req.body
    //         // console.log(req.body)
    //         if(password === confirmPassword && status !== ''){
    //             const _admins = await Admin.findOne({email: email, role: 'admin'})
    //             // console.log(_admins)
    //             if(_admins){
    //                 req.flash('alertMessage', 'Make sure password is correct and status canot be null !!')
    //                 req.flash('alertStatus', 'danger')
    //                 res.redirect('/admin/admin-user')
    //             } else {
    //                 await Admin.create({
    //                     firstName,
    //                     lastName,
    //                     linkedinProfile,
    //                     status,
    //                     email,
    //                     password : bcrypt.hashSync(password, 6),
    //                     role: 'admin',
    //                     startupName: 'Admin User BUBU',
    //                 })
    //                 req.flash('alertMessage', 'Success add Admin User')
    //                 req.flash('alertStatus', 'success')
    //                 res.redirect('/admin/admin-user')
    //             }
    //         } else {
    //             req.flash('alertMessage', 'Make sure password is correct and status canot be null !!')
    //             req.flash('alertStatus', 'danger')
    //             res.redirect('/admin/admin-user')
    //         }
    //     } catch (error) {
    //         req.flash('alertMessage', `${error.message}`)
    //         req.flash('alertStatus', 'danger')
    //         res.redirect('/admin/admin-user')
    //     }
    // },
    // editAdmin: async (req,res) => {
    //     try {
    //         const {id,firstName, lastName, linkedinProfile, status, email, password, confirmPassword} = req.body
    //         const admin = await Admin.findOne({
    //             _id : id
    //         });
    //         console.log(req.body)
    //         if( password !== '' && password === confirmPassword){
    //             console.log('satu')
    //             admin.firstName = firstName
    //             admin.lastName =  lastName
    //             admin.linkedinProfile =  linkedinProfile
    //             admin.status =  status
    //             admin.email =  email
    //             admin.password =  bcrypt.hashSync(password, 6)
    //             await admin.save()
    //             req.flash('alertMessage', 'Success update Admin User')
    //             req.flash('alertStatus', 'success')
    //             res.redirect('/admin/admin-user')
    //         } else {
    //             console.log('dua', admin)
    //             admin.firstName = firstName
    //             admin.lastName =  lastName
    //             admin.linkedinProfile =  linkedinProfile
    //             admin.status =  status
    //             admin.email =  email
    //             await admin.save()
    //             req.flash('alertMessage', 'Success update Admin User')
    //             req.flash('alertStatus', 'success')
    //             res.redirect('/admin/admin-user')
    //         }
    //     } catch (error) {
    //         req.flash('alertMessage', `${error.message}`)
    //         req.flash('alertStatus', 'danger')
    //         res.redirect('/admin/admin-user')
    //     }
    // },
    // deleteAdmin: async (req,res) => {
    //     try {
    //         const {id} = req.params
    //         const admin = await Admin.findOne({
    //             _id : id
    //         });
    //         // console.log(req.params, admin)
    //         await admin.remove()
    //         req.flash('alertMessage', 'Success delete admin')
    //         req.flash('alertStatus', 'success')
    //         res.redirect('/admin/admin-user')
    //     } catch (error) {
    //         req.flash('alertMessage', `$error.message`)
    //         req.flash('alertStatus', 'danger')
    //         res.redirect('/admin/admin-user')
    //     }
    // }
}
