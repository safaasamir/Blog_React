const express = require('express')
var cookieParser = require('cookie-parser')
const app = express()
const mongoose = require('mongoose');
const userRouter=require("./routes/users.router")
const postsRouter=require("./routes/posts.router")
const cors=require('cors')
app.use(cors({credentials:true, origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))
require('dotenv').config()


mongoose.connect(process.env.URL).then(()=>{
  console.log("mongo connection started");
});
app.listen(4000)

app.use("/users",userRouter)
app.use("/posts",postsRouter)
