const express = require('express');
const mongoose = require('mongoose');
const ImageURL = require('./models/image');
const cors = require('cors');
const connectToMongoDB = require('./connect');
const { handleSignUp , handleLogin } = require('./controllers/url');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const secret = 'SuperSoup';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname) 
    }
  })
  
  const upload = multer({ storage: storage })

const app = express();

// Connection
// mongoose.connect('mongodb://localhost/dbname', function(err) {
//     if (err) throw err;
//     else console.log('Database Connected');
// });
connectToMongoDB('mongodb://localhost:27017/Car_Manager')
.then(() => console.log('Database Connected'))
.catch((error) => console.log('Database Connection Failed:', error));

app.use(cors());
app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) { 
        return res.status(401).send('Access Denied')
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.send('Invalid Token')
        }
    req.user = user;
    next();
    })
};


app.post('/api/auth/signup', async (req, res) => {
    console.log(req.body)
    await handleSignUp(req, res);

    return res.send("User Submitted Successfully");
});

app.post('/api/auth/login', async (req, res) => {
    await handleLogin(req, res);
    
});
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/auth/imageUpload', authenticateToken, upload.single('image'),  async (req, res) => {
    await ImageURL.create({
        image: req.file.path,
        user_id: req.user.email 
    });

    return res.send('Image Uploaded');
})

app.get('/api/cars',async (req,res) => {
    try{
        const cars = await ImageURL.find({});
        return res.json(cars)
    }
    catch (err){
        console.error(err);
    }
})

app.listen(5000,() => {
    console.log('Server Started');
})