const { createPet, getAllPets, getPetById, writeComment, getCommentsForPost, editPet, deletePetById } = require('../managers/petManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelper');

const router = require('express').Router();

router.get('/catalog',async(req,res)=>{
    const pets = await getAllPets().lean();
    const hasPets = pets.length>0;
    res.status(302).render('pets/catalog',{hasPets,pets});
});

router.get('/addPhoto',mustBeAuth,(req,res)=>{
    res.status(302).render('pets/create');
});

router.post('/addPhoto',mustBeAuth,async(req,res)=>{
    const name = req.body.name?.trim();
    const age = req.body.age?.trim();
    const description = req.body.description?.trim();
    const location = req.body.location?.trim();
    const imageUrl = req.body.imageUrl?.trim();
    
    try{
        const ownerId = req.user._id;

        const pet = await createPet(name,imageUrl,age,description,location,ownerId);
        
        res.redirect('/pets/catalog');

    }
    catch(err){
        const error = getErrorMessage(err);
        res.render('pets/create',{error,name,age,description,location,imageUrl})
    }
});

router.get('/:petId/details',async(req,res)=>{
    const petId = req.params.petId;
    const loggedUser = req.user?._id;
    try{
        const pet = await getPetById(petId).lean();
        if(!pet){
            throw new Error();
        }
        const comments = pet.commentsList;
        const hasComments = comments.length>0;
        const isOwner = loggedUser == pet.owner._id;
        const canComment = !isOwner && loggedUser;
        res.status(302).render('pets/details',{pet,isOwner,canComment,hasComments,comments});
    }catch(err){
        console.log(err);
        res.status(404).render('404');
    }
});

router.post('/:petId/details',mustBeAuth,async(req,res)=>{
    const comment = req.body.comment?.trim();
    const petId = req.params.petId;
    const loggedUser = req.user._id;

    try{
        const pet = await getPetById(petId);
        if(pet.owner._id == loggedUser){
            throw new Error();
        }
        const newComment = await writeComment(petId,loggedUser,comment);
        res.redirect(`/pets/${petId}/details`);
    }catch(err){
        console.log(err);
        res.status(404).render('404');
    }
});

router.get('/:petId/edit',mustBeAuth,async(req,res)=>{
    const petId = req.params.petId;
    const loggedUser = req.user._id;
    try{
        const pet = await getPetById(petId).lean();
        if(!pet){
            throw new Error();
        }
        if(loggedUser!=pet.owner._id){
            throw new Error();
        }

        res.status(302).render('pets/edit',{pet});
    }catch(err){
        res.status(404).render('404');
    }
});

router.post('/:petId/edit',mustBeAuth,async(req,res)=>{
    const petId = req.params.petId;
    const loggedUser = req.user._id;
    
    const name = req.body.name?.trim();
    const age = req.body.age?.trim();
    const description = req.body.description?.trim();
    const location = req.body.location?.trim();
    const imageUrl = req.body.imageUrl?.trim();

    const pet = {
        name,
        age,
        description,
        location,
        imageUrl
    }

    try{
        const pet = await getPetById(petId).lean();
        if(!pet){
            throw new Error();
        }
        if(loggedUser!=pet.owner._id){
            throw new Error();
        }

        await editPet(petId,name,imageUrl,age,description,location);

        res.redirect(`/pets/${petId}/details`);

    }catch(err){
        const error = getErrorMessage(err);
        res.status(404).render('pets/edit',{error,pet});
    }
});

router.get('/:petId/delete',mustBeAuth,async(req,res)=>{
    const petId = req.params.petId;
    const loggedUser = req.user._id;
    try{
        const pet = await getPetById(petId);
        if(!pet){
            throw new Error();
        }
        if(loggedUser != pet.owner._id){
            throw new Error();
        }
        await deletePetById(petId);
        res.redirect('/pets/catalog');
    }catch(err){
        res.status(404).render('404');
    }
});
module.exports = router;