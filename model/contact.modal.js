const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number
    },
    enquiry: {
        type: String
    }, 
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('contact', contactSchema);