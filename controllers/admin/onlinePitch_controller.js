const Pitch = require('../../models/pitch.model')
const onlinePitch = require('../../models/onlinePitch.model')
const path = require('path')
const fs = require('fs-extra')

module.exports = {
   viewPitch: async (req, res) => {
      try {
         const pitch = await onlinePitch.find({}).populate('users')
         const alertMessage = req.flash('alertMessage')
         const alertStatus = req.flash('alertStatus')
         const alert = { message: alertMessage, status: alertStatus }
         const url = req.route.path
         res.render('admin/onlinePitch/view_onlinePitch', {
            pitch,
            alert,
            url
         })
         console.log(pitch)
      } catch (error) {
         res.render('admin/onlinePitch/view_onlinePitch')
      }
   },
   editPitch: async (req, res) => {
      try {
         const { id, isCurrated } = req.body
         const _onlinePitch = await onlinePitch.findOne({
            _id: id
         });
         console.log(req.body)
         _onlinePitch.isCurrated = isCurrated
         await _onlinePitch.save()
         req.flash('alertMessage', 'Success update onlinePitch')
         req.flash('alertStatus', 'success')
         res.redirect('/online-pitch')
      } catch (error) {
         req.flash('alertMessage', `${error.message}`)
         req.flash('alertStatus', 'danger')
         res.redirect('/online-pitch')
      }
   },

   deletePitch: async (req, res) => {
      try {
         const { id } = req.params
         const pitch = await Pitch.findOne({ _id: id });
         // console.log(pitch.portofolioLogo) 
         await fs.unlink(path.join(`public/${pitch.file}`))
         await pitch.portofolioLogo.map((item) => {
            fs.unlink(path.join(`public/${item}`))
         })
         await pitch.remove()
         req.flash('alertMessage', 'Success delete pitch')
         req.flash('alertStatus', 'success')
         res.redirect('/onlie-pitch')
      } catch (error) {
         req.flash('alertMessage', `${error.message}`)
         req.flash('alertStatus', 'danger')
         res.redirect('/online-pitch')
      }
   },
}