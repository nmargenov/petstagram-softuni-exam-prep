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
    return Pet.findById(petId).populate('owner');
}

module.exports = {
    createPet,
    getAllPets,
    getPetById
}