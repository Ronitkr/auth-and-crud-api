const router = require('express').Router();
const User = require('../model/users.model');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Validating
const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
}


router.post('/register',async (req,res)=>{
    //Let validate
    const {error} = Joi.validate(req.body, schema);
    
    if(error) return res.status(400).send(error.details[0].message);
    

    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if( emailExist ) return res.status(400).send('Email already exists');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user =new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
        // res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);

    }
});

//Validating
const schemas = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
}

//Login
router.post('/login', async (req, res) => {
    
    //LET VALIDATE THE DATA BEFORE WE A USER
    const { error } = Joi.validate(req.body, schemas);
    if ( error ) return res.status(400).send(error.details[0].message);


    //CHECK IF THE EMAIL IS NOT EXIST    
    const user = await User.findOne({ email: req.body.email });
    if( !user ) return res.status(400).send('Email or password is wrong');

    //PASSWORD IS CORRECT
    const validatePass = await bcrypt.compare(req.body.password, user.password);
    if( !validatePass ) return res.status(400).send('Invalid Password')
    

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id: user._id}, config.secrete)
    res.header('auth-token', token).send(token);
    // res.send('You are Logged in');
});


module.exports = router;