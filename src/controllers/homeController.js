const router = require('express').Router();

router.get(['/','/index'],(req,res)=>{
    res.send('Server is working properly!');
});

module.exports = router;