const Category = require('../../models/category.model')

module.exports = {
    viewCategory: async (req,res) => {
        try {
            const category = await Category.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const url = req.route.path
            res.render('admin/category/view_category', {
                category,
                alert,
                url
            })
        } catch (error) {
            res.render('category/view_category')
        }
    },
    
    addCategory: async (req,res) => {
        try {
            const {name} = req.body
            await Category.create({
                name: name
            })
            req.flash('alertMessage', 'Success add category')
            req.flash('alertStatus', 'success')
            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    editCategory: async (req,res) => {
        try {
            const {id,name} = req.body
            const category = await Category.findOne({
                _id : id
            });
            category.name = name
            await category.save()
            req.flash('alertMessage', 'Success update category')
            req.flash('alertStatus', 'success')
            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    deleteCategory: async (req,res) => {
        try {
            const {id} = req.params
            const category = await Category.findOne({
                _id : id
            });
            // console.log(req.params)
            await category.remove()
            req.flash('alertMessage', 'Success delete category')
            req.flash('alertStatus', 'success')
            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    }
}