const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    likes: {
        type: Number,
        default: Math.floor(Math.random() * 100)
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    PostImage: {
        type: String
    }
})


const Posts = mongoose.model("posts", blogSchema);

module.exports = Posts;