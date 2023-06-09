const router = require('express').Router();

const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const petController = require("./controllers/petController");
const profileController = require("./controllers/profileController");

router.use(homeController);
router.use(userController);
router.use('/pets',petController);
router.use('/profile',profileController);

router.get('*',(req,res)=>{
    res.status(404).render('404');
})

module.exports = router;