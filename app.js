const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

//connect link 
const config = require('./config/config');
const userController = require('./controller/users.controller');
const postController = require('./controller/post.controller');
const contactController = require('./controller/contact.controller');

//connect with express
const app = express();


//connect mongodb
mongoose.connect(config.db,{useNewUrlParser: true, useCreateIndex: true})
        .then(()=>{
            console.log('database successfully connected');
        }),error =>{
            console.log('something went wrong with the databse'+ error);
        }

//middleware parser
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//middleware cors
app.use(cors());


//route controller
app.use('/api', userController);
app.use('/post', postController);
app.use('/api/contact', contactController);


//config Port and server
app.listen(config.port,()=>{
    console.log(`Server successfully start in ${config.port}`)
});