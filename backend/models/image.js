const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image : {
        type : String,
        required : True
    },
    user_id : {
        type : String,
        required : True
    }
});

const imageUrl = mongoose.model('imageUrl',imageSchema);

module.exports = imageUrl;