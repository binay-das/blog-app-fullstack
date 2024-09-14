const express = require('express');
const app = express();
const cors = require('cors');
const User = require('../api/models/user');
const { default: mongoose } = require('mongoose');
const connectToMongoDB = require('./connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

var salt = bcrypt.genSaltSync(10);

connectToMongoDB('mongodb://localhost/blog-fullstack')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(`Error ${err}`);
    })

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc);

    } catch (err) {
        console.log(err);
        res.send(`Error in registering: ${err}`);
    }
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
        const userDoc = await User.findOne({username});
        const passOk = bcrypt.compareSync(password, userDoc.password);

        res.json(passOk);

        if (passOk) {
            jwt.sign({username, id: userDoc._id}, secret, {}, (err) => {
                if (err) {
                    throw err;
                } 

                res.cookie('token', token).json('ok');
            })
        } else {
            alert("Wrong username or password");
        }

})

const port = 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})