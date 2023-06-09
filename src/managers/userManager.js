const bcrypt = require('bcrypt');

const User = require("../models/User");

async function register(username,email,password,rePassword){
    const existingUsername = await User.findOne({username});
    if(existingUsername){
        throw new Error("Username is already in use!");
    }

    const existingEmail = await User.findOne({email});
    if(existingEmail){
        throw new Error("Email is already in use!");
    }

    if(password.length<4){
        throw new Error("Password must be atleast 4 characters long!");
    }
    
    if(password != rePassword){
        throw new Error("Passwords don't match!");
    }

    const hashPass = await bcrypt.hash(password,10);

    const user = {
        username,
        email,
        password:hashPass
    }

    const newUser =await User.create(user);

    return newUser;
}

module.exports = {
    register
}