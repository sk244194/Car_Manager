const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    user_id : {
        type : String,
        required : true
    }
});

const imageUrl = mongoose.model('imageUrl',imageSchema);

module.exports = imageUrl;