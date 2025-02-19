const URL = require('../models/url');

async function handleSignUp(req, res){
    await URL.create({
        email: req.body.email,
        password: req.body.password
    })
}

module.exports = {handleSignUp};