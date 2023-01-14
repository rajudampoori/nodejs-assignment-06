const express = require("express");
const methodOverride = require('method-override');
const Blog = require("./src/models/Blog");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const blogroute = require("./src/routes/blog")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser())
app.use(express.json());
// app.use(require('./src/routes/blog'))
 app.use("/",blogroute)
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.static("public"))
mongoose.connect(process.env.DATABASE_URL, 
    () => {
        console.log("Connected to DB")
    })

app.listen(8000, () => {
    console.log("Server is running at 8000")
})









