const URL = require('../models/url');
const ImageURL = require('../models/image');

async function handleSignUp(req, res){
    await URL.create({
        email: req.body.email,
        password: req.body.password
    })
}

async function handleLogin(req, res){
    const {email,password} = req.body;
    mail = email;
    console.log(email,password);
    const user = await URL.findOne({email});
    if(user.password === password){
        res.send('Login Success'); 
    }
    
}

async function handleimage(req, res){
    console.log(`mail : ${mail}`)

    await ImageURL.create({
        image: req.body.image,
        user_id: mail
    })
}
module.exports = {handleSignUp, handleLogin, handleimage};