const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required!'],
        minLength:[2,'Name must be atleast 2 characters long!']
    },
    imageUrl:{
        type:String,
        required:[true,'Image is required!']
    },
    age:{
        type:Number,
        required:[true,'Age is required!'],
        min: [1, 'Age must be atleast 1!'],
        max: [100, 'Age must not exceed 100!']
    },
    description:{
        type:String,
        required:[true,'Description is required!'],
        minLength: [5, 'Description must be atleast 5!'],
        maxLength: [50, 'Description must not exceed 50!']
    },
    location:{
        type:String,
        required:[true,'Location is required!'],
        minLength: [5, 'Location must be atleast 5!'],
        maxLength: [50, 'Location must not exceed 50!']
    },
    commentsList:[{
        userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },
        comment:String
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Pet = mongoose.model('Pet',petSchema);

module.exports = Pet;