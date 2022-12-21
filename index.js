const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const imageUpload = require('./imageUpload.js');
const fileUpload = require('express-fileupload');
const app = express();
const URI = process.env.URI;
//'mongodb+srv://root-instaclone:instacloneHKA@cluster0.vqsgmeu.mongodb.net/?retryWrites=true&w=majority'

const Posts = require('./models/posts')

const PORT = process.env.PORT;
dotenv.config()


app.use(cors());

app.use(express.json({ limit: "25mb" }));

app.use(express.urlencoded({ limit: "25mb" }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use(fileUpload({ useTempFiles: true }))


app.get("/",async(req,res)=>{
    try{
        let userPosts = await Posts.find();
        res.json(userPosts)
    }catch(e){
        res.json(e.message)
    }
})


app.post("/uploads", async (req, res) => {
    
    try {
        const file = req.files.PostImage
        console.log(file);
        const result = await imageUpload.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "images"
        })
        let userPosts = await Posts.create({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            PostImage: result.secure_url
        })

        res.json(userPosts)

    } catch (e) {
        console.log(e.message)
        res.json(e.message)
    }


})


mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true} ,
    () => {
      console.log("connected to DB");
    }
  );


app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}.....`);
})
