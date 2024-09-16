const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    cover: {
        type: String
    },
}, {
    timestamps: true
});


const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;