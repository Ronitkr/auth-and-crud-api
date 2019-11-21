const router = require('express').Router();
const Joi = require('@hapi/joi');
const contactModal = require('../model/contact.modal');

//CREATE CONTACT 
router.post('/', async (req, res)=>{
    const contact = new contactModal({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        enquiry: req.body.enquiry
    });

    try{
        const savedContact = await contact.save();
        res.send(savedContact);
    }catch(err){
        res.status(400).send(err);
    }
});

//FATCH ALL DATA FROM DATABASE
router.get('/fetch',  (req, res) => {
    try{
        const getContact = contactModal.find();
        getContact.exec((err, data)=>{
            if(err) throw err;
            res.send(data);
        });
    }catch(err){
        res.status(400).send(err);
    }
})

//DELETE DATABSE WHERE USER_ID = ID
router.get('/fetch/delete/:id', (req, res) => {
    try{
        const contactId = req.params.id;
        const deleteContact = contactModal.findByIdAndDelete(contactId);
        deleteContact.exec(() => {
            res.redirect('/api/contact/fetch');
        });

    }catch(err){
        res.status(400).send(err);
    }
})

//EDIT DATABASE BY ID
router.get('/fetch/edit/:id', (req, res) => {
    try{
        const contactEdit = req.params.id;
        const editContact = contactModal.findById(contactEdit);
        editContact.exec((err, data) => {
            if (err) throw err;
            res.send(data);
        });
    }catch(err) {
        res.status(400).send(err);
    }
});

//UPDATE DATABASE BY ID
router.post('/fetch/edit/:id', (req, res) => {
    try{
        const contactUpdate = req.params.id;
        const updateContact = contactModal.findByIdAndUpdate(contactUpdate,{
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            enquiry: req.body.enquiry
        })
        updateContact.exec((err) => {
            if(err) throw err;
            res.redirect('/api/contact/fetch');
        })
    }catch(err) {
        res.status(400).send(err);
    }
})

module.exports = router;