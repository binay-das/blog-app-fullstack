const express = require('express');
const app = express();
const cors = require('cors');
const User = require('../api/models/user');
const Post = require('../api/models/post');
const mongoose = require('mongoose');
const connectToMongoDB = require('./connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
require('dotenv').config();

// Middleware setup
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

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

    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json({ error: 'User not found' });
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);

        // res.json(passOk);

        if (passOk) {

            // Sign asynchronously
            jwt.sign({ username, id: userDoc._id }, secret, (err, token) => {
                if (err) throw err;

                res.cookie('token', token).json({
                    id: userDoc._id,
                    username
                });
            });

        } else {
            res.status(400).json({ error: 'Wrong username or password' });
        }
    } catch (err) {
        console.log(`Error in login: ${err}`);
        res.status(500).json({ error: `Error in login: ${err}` });
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
    // res.json(req.cookies);
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const coverUrl = `http://localhost:8080/uploads/${path.split('/').pop()}`;

        const { title, summary, content } = req.body;

        const postDoc = await Post.create({
            // title, summary, content, cover: newPath
            title, summary, content, cover: coverUrl
        });
        res.json({ ext });
    } catch (err) {
        console.log(`Error in creating post: ${err}`);
        res.status(500).json({ error: `Error in creating post: ${err}` });
    }
})

app.get('/post', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.log(`Error in fetching posts: ${err}`);
        res.status(500).json({ error: `Error in fetching posts: ${err}` });
    }
})
const port = 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})