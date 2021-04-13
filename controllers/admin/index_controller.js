const Users = require('../../models/users.model')
const bcrypt = require('bcrypt')

module.exports = {
    viewIndex: async (req,res) => {
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            if (req.session.users == null || req.session.users == undefined) {
                res.render('index.ejs', {
                    title : "PitchUp CMS | Login",
                    alert
                })
            } else  {
                res.redirect('/dashboard')
            }
        } catch (error) {
            res.render('index.ejs')
        }
    },

    actionSignin : async (req,res) => {
        try {
            const { email, password } = req.body
            const users = await Users.findOne({
                email: email,
                role: 'admin'
            })
            if (!users) {
                req.flash('alertMessage', 'User atau password yang anda masukan salah!!')
                req.flash('alertStatus', 'info')
                res.redirect('/')
            } 
            const match = await bcrypt.compare(password, users.password)
            if (match) {
                req.session.users = {
                    id : users.id,
                    firstName : users.firstName,
                    lastName : users.lastName,
                    
                }  
                res.redirect('/dashboard')
            } else {
                req.flash('alertMessage', 'User atau password yang anda masukan salah!!')
                req.flash('alertStatus', 'info')
                res.redirect('/')
            }
        } catch (error) {
            req.flash('alertMessage', 'User atau password yang anda masukan salah!!')
            req.flash('alertStatus', 'info')
            res.redirect('/')
        }
    },

    actionLogout : async (req,res) => {
        req.session.destroy()
        res.redirect('/')
    }
}