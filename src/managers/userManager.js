const bcrypt = require('bcrypt');

const User = require("../models/User");

async function login(username,password){
    const user = await User.findOne({username});

    if(!user){
        throw new Error("Username or password don't match!");
    }

    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword){
        throw new Error("Username or password don't match!");
    }

    return user;
}

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
    register,
    login
}