const isLogin = (req,res,next) => {
    console.log(req.session.users)
    if (req.session.users == null || req.session.users == undefined) {
        req.flash('alertMessage', 'Session telah habis')
        req.flash('alertStatus', 'info')
        res.redirect('/')
    } else  {
        next()
    }
}

module.exports = isLogin