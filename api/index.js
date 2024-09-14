const express = require('express');
const app = express();


app.post('/register', (req, res) => {
    res.json('server test ok');
})

const port = 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})