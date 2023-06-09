const { getAllPostsByUser, getUserInfo } = require('../managers/profileManager');

const router = require('express').Router();

router.get('/:profileId',async(req,res)=>{
    const profileId = req.params.profileId;
    try{
        const user = await getUserInfo(profileId).lean();
        if(!user){
            throw new error();
        }
        const posts = await getAllPostsByUser(profileId).lean();

        const isCurrentUsersProfile = req.user?._id == profileId;
        const hasPosts = posts.length>0;
        const postsCount = posts.length;
        res.status(302).render('profile',{user,posts,hasPosts,isCurrentUsersProfile,postsCount});
    }catch(err){
        console.log(err);
        res.status(404).render('404');
    }
});


module.exports = router;