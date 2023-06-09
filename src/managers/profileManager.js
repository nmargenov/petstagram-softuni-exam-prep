const Pet = require("../models/Pet")
const User = require("../models/User")

exports.getUserInfo = (profileId) =>{
    return User.findById(profileId);
};

exports.getAllPostsByUser = (profileId) =>{
    return Pet.find({owner: profileId});
};