const URL = require('../models/url');
const ImageURL = require('../models/image');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = 'SuperSoup'

async function handleSignUp(req, res){
    const hashedpassword = await bcrypt.hash(req.body.password,10)
    await URL.create({
        email: req.body.email,
        password: hashedpassword
    })
}

async function handleLogin(req, res){
    const {email,password} = req.body;
    // mail = email;
    console.log(email,password);
    const user = await URL.findOne({email});

    if (user){
        console.log(user.password);
        const check = await bcrypt.compare(password,user.password)
        if (check){
            const token = jwt.sign({email : email,password : user.password},secret)
            res.json({message : "Login Successful", token})
        }
        else{
            res.json({message : "Failed"})
        }
    }
    
}

async function handleimage(req, res){
    // console.log(`mail : ${mail}`)

    await ImageURL.create({
        image: req.body.image,
        user_id: req.user.email
    })
}
module.exports = {handleSignUp, handleLogin, handleimage};