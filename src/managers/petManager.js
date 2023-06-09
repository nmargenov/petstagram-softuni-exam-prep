const Pet = require("../models/Pet");

const pattern = /^https?:\/\//;

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

module.exports = {
    createPet,
}