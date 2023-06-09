const cookieParser = require('cookie-parser');
const express = require('express');

function expressConfig(app){
    app.use(express.static('src'));
    app.use(express.urlencoded({extended:false}));
    app.use(cookieParser());

    app.set('view engine','hbs');
    app.set('views','src/views');
}

module.exports = expressConfig;