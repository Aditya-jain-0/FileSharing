const express = require('express');
const app = express()
const multer = require('multer');
const crypto = require('crypto')

require('dotenv').config()

app.set("view engine","ejs")

app.use(express.urlencoded({extended:true }))        //d

const upload = multer({dest : "uploads"})

app.get("/",(req,res)=>{
    res.render('index')
})

var path,originalName

app.post("/upload",upload.single("file"),async(req,res)=>{
    path = req.file.path
    originalName = req.file.originalname

    const buf = (crypto.randomBytes(10)).toString('hex')

    res.render("index",{fileLink:`${req.headers.origin}/file/${buf}`})
})  


app.get('/file/:id',(req,res)=>{
    res.download(path,originalName)
})

app.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`)
})