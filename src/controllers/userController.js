const router = require('express').Router();

router.get('/login', (req, res) => {
    res.status(302).render('users/login');
});

router.get('/register', (req, res) => {
    res.status(302).render('users/register');
});
module.exports = router;