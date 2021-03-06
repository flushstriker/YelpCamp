const User = require('../models/user');

module.exports.renderRegister = (req, res)=>{
    res.render('users/register');
}

module.exports.registerUser = async(req, res)=>{
    //console.log(req.body);
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        //callback functions cannot be awaited!!
        req.login(registeredUser, err=>{
            if(err){
                next(err);
            }else{
                req.flash('success', 'User registered successfully');
                res.redirect('/campgrounds');
            }
        })
        //console.log(req.body);
    }catch(e){
        req.flash('error', e.message);
        console.log(e.message);
        res.redirect('/register');
    }
}

module.exports.login = async(req, res)=>{
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success', "Welcome");
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res)=>{
    req.logout();
    req.flash('success', "You have been logged out successfully");
    res.redirect('/campgrounds');
}