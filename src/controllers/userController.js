const { register, login } = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelper');

const router = require('express').Router();

router.get('/login', (req, res) => {
    res.status(302).render('users/login');
});

router.post('/login',async(req,res)=>{
    const username = req.body.username.toLowerCase().trim();
    const password = req.body.password.trim();

    try{
        const token = await login(username,password);
        res.cookie('auth',token);
        res.redirect('/');
    }
    catch(err){
        const error = getErrorMessage(err);
        res.render('users/login',{error,username});
    }
})

router.get('/register', (req, res) => {
    res.status(302).render('users/register');
});

router.post('/register',async(req,res)=>{
    const username = req.body.username.toLowerCase().trim();
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password.trim();
    const rePassword = req.body.rePassword.trim();

    try{
        const token = await register(username,email,password,rePassword);
        res.cookie('auth',token);
        res.redirect('/');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('users/register',{error,username,email});
    }

});
module.exports = router;