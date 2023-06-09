const { createPet, getAllPets, getPetById } = require('../managers/petManager');
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
    try{
        const pet = await getPetById(petId).lean();
        if(!pet){
            throw new Error();
        }
        console.log(pet);
        res.status(302).render('pets/details',{pet});
    }catch(err){
        res.status(404).render('404');
    }
});

module.exports = router;