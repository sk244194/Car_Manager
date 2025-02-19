const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        
        email:{
            type: String,
            required: true,

        },

        password:{
            type: String,
            required: true,
        }

});

const url = mongoose.model('url',urlSchema);
module.exports = url;