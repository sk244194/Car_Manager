const express = require('express');
const mongoose = require('mongoose');
const URL = require('./models/url');
const cors = require('cors');
const connectToMongoDB = require('./connect');
const { handleSignUp , handleLogin, handleimage } = require('./controllers/url');

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



app.post('/api/auth/signup', async (req, res) => {
    console.log(req.body)
    await handleSignUp(req, res);

    res.send("User Submitted Successfully");
});

app.post('/api/auth/login', async (req, res) => {
    await handleLogin(req, res);
    
});

app.post('/api/auth/imageUpload', async (req, res) => {
    await handleimage(req,res);

    res.send('Image Uploaded');
})

app.listen(5000,() => {
    console.log('Server Started');
})