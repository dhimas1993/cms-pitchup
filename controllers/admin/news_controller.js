const News = require('../../models/newstech.model')
const path = require('path')
const fs = require('fs-extra')

module.exports = {
    viewNews: async (req,res) => {
        try {
            const news = await News.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const url = req.route.path
            res.render('admin/news/view_news', {
                news,
                alert,
                url
            })
        } catch (error) {
            res.render('admin/news/view_news')
        }
    },
    addNews: async (req,res) => {
        try {
            const {title, companyName, companyUrl} = req.body
            // console.log(req.body)
            await News.create({
                title : title,
                companyName : companyName,
                companyUrl : companyUrl,
                companyLogo : `image/newstech/${req.files[0].filename}`,
                headlinePicture : `image/newstech/${req.files[1].filename}`
            })
            req.flash('alertMessage', 'Success add slider')
            req.flash('alertStatus', 'success')
            res.redirect('/news')
        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.redirect('/news')
        }
    },
    editNews : async (req,res) => {
        // console.log(req.body)
        try {
            const {id, title, companyName, companyUrl} = req.body
            const news = await News.findOne({_id : id})
            // console.log(req.files.image)
            if (req.files[0] === undefined){
                news.title = title;
                news.companyName = companyName;
                news.companyUrl = companyUrl;
                await news.save();
                req.flash('alertMessage', 'Success edit news')
                req.flash('alertStatus', 'success')
                res.redirect('/news')
            } else {
                await fs.unlink(path.join(`public/${news.companyLogo}`))
                await fs.unlink(path.join(`public/${news.headlinePicture}`))
                news.title = title;
                news.companyName = companyName;
                news.companyUrl = companyUrl;
                news.companyLogo = `image/newstech/${req.files[0].filename}`
                news.headlinePicture = `image/newstech/${req.files[1].filename}`
                await news.save()
                req.flash('alertMessage', 'Success edit news')
                req.flash('alertStatus', 'success')
                res.redirect('/news')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/news')
        }
    },
    deleteNews: async (req,res) => {
        try {
            const {id} = req.params
            const news = await News.findOne({_id : id});
            // console.log(news.companyLogo)
            await fs.unlink(path.join(`public/${news.companyLogo}`))
            await fs.unlink(path.join(`public/${news.headlinePicture}`))
            await news.remove()
            req.flash('alertMessage', 'Success delete news')
            req.flash('alertStatus', 'success')
            res.redirect('/news')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/news')
        }
    },
}