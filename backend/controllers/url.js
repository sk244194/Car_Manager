const URL = require('../models/url');

async function handleSignUp(req, res){
    await URL.create({
        email: req.body.email,
        password: req.body.password
    })
}

async function handleLogin(req, res){
    const {email,password} = req.body;
    console.log(email,password);
    const user = await URL.findOne({email});
    if(user.password === password){
        res.send('Login Success'); 
    }
}
module.exports = {handleSignUp,handleLogin};