const Pet = require("../models/Pet");

const pattern = /^https?:\/\//;

function getAllPets(){
    return Pet.find().populate('owner');
}

function createPet(name, imageUrl, age, description, location, owner) {
    if (!pattern.test(imageUrl)) {
        throw new Error('Invalid image URL!');
    }

    const pet = {
        name,
        imageUrl,
        age,
        description,
        location,
        owner
    }

    return Pet.create(pet);
}

function getPetById(petId){
    return Pet.findById(petId).populate('owner').populate('commentsList').populate({path:'commentsList.userID',model:'User'});
}

function writeComment(petId,userId,comment){
    return Pet.findByIdAndUpdate(petId,{$push:{commentsList:{userID:userId,comment}}});
}

function editPet(petId,name,imageUrl,age,description,location){
    if (!pattern.test(imageUrl)) {
        throw new Error('Invalid image URL!');
    }

    const pet = {
        name,
        imageUrl,
        age,
        description,
        location
    }

    return Pet.findByIdAndUpdate(petId,pet,{runValidators:true});
}



module.exports = {
    createPet,
    getAllPets,
    getPetById,
    writeComment,
    editPet
}