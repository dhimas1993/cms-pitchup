const Pitchdeck = require('../../models/pitchdeck.model')

module.exports = {
    viewPitchdeck: async (req,res) => {
        try {
            const _pitch = await Pitchdeck.find().populate('user')
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const url = req.route.path
            res.render('admin/pitchdeck/view_pitchdeck', {
                _pitch,
                alert,
                url
            })
        } catch (error) {
            console.log(error)
            res.render('admin/pitchdeck/view_pitchdeck')
        }
    },
    
    editPitchdeck: async (req,res) => {
        try {
            const {id,status} = req.body
            const pitchdeck = await Pitchdeck.findOne({
                _id : id
            });
            pitchdeck.isCurated = status
            await pitchdeck.save()
            
            req.flash('alertMessage', 'Success update category')
            req.flash('alertStatus', 'success')
            res.redirect('/pitchdeck')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/pitchdeck')
        }
    }
}
