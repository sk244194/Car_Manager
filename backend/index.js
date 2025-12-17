const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { storage } = require('./utils/cloudinary');
const ImageURL = require('./models/image');
const cors = require('cors');
const connectToMongoDB = require('./connect');
const { handleSignUp, handleLogin } = require('./controllers/url');
const cloudinary = require('./utils/cloudinary');
const upload = require('./utils/multer');
const jwt = require('jsonwebtoken')
const secret = 'SuperSoup';



const app = express();

// Connection
// mongoose.connect('mongodb://localhost/dbname', function(err) {
//     if (err) throw err;
//     else console.log('Database Connected');
// });
connectToMongoDB(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((error) => console.log('Database Connection Failed:', error));

app.use(cors({
    origin: 'https://car-manager-six.vercel.app',
    credentials: true
}));
app.use(express.json());

//JWT

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

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/auth/imageUpload', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.cloudinary.uploader.upload(req.file.path, {
            folder: 'car_manager'
        });

        await ImageURL.create({
            image: result.secure_url, // Store Cloudinary URL
            user_id: req.user.email,
            description: req.body.description,
            contact: req.body.contact
        });

        // Optional: Delete local file after upload
        // const fs = require('fs');
        // fs.unlinkSync(req.file.path);

        return res.send('Image Uploaded');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error uploading image');
    }
})

app.get('/api/cars', async (req, res) => {
    try {
        const cars = await ImageURL.find({});
        return res.json(cars)
    }
    catch (err) {
        console.error(err);
    }
})

app.get('/api/mycars', authenticateToken, async (req, res) => {
    try {
        const userCars = await ImageURL.find({ user_id: req.user.email });
        console.log(userCars);
        res.json(userCars);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving your cars');
    }
});

app.delete('/api/mycars/:id', authenticateToken, async (req, res) => {
    try {
        const car = await ImageURL.findOne({ _id: req.params.id, user_id: req.user.email });
        if (!car) return res.status(404).send('Car not found or unauthorized');
        await ImageURL.deleteOne({ _id: req.params.id });
        res.send('Car deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting car');
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server Started');
})