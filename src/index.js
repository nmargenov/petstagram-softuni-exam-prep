const express = require('express');
const { PORT } = require('./config/config');


const app = express();

app.get(['/','/index'],(req,res)=>{
    res.send('Server is working properly!');
});

app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}...`));