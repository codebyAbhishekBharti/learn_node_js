const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json')
const { matchesGlob } = require('path')
const app = express()
const port = 8000
const mongoose = require('mongoose')
const { time } = require('console')

// Connection to MongoDB
mongoose.connect('mongodb://localhost:27017/youtube-app-1', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {console.log("Connected to MongoDB")}).catch((err)=>{console.log(err)})    

// Schema
const userSchema = new mongoose.Schema(
    {
        first_name:{
            type: String,
            required: true
        },
        last_name:{
            type: String,
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        gender:{
            type: String,
            required: true
        },
        job_title:{
            type: String,
            required: true
        },
    },
    {timestamps: true}
);

// Model
const User = mongoose.model('User', userSchema)

// Middlewares - Plugin
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
    fs.appendFile('log.txt',`${Date.now()}: Request Method: ${req.method}, Request URL: ${req.url}\n`,(err)=>{})
    // console.log('Hello from Middle ware 1')
    req.myUserName = "Abhishek Bharti"
    next()
})
app.use((req,res,next)=>{
    // console.log('Hello from Middle ware 2')
    // console.log(req.myUserName)
    // return res.end("Hello from Middle ware 2")
    next()
})
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to our API')
})

app.get("/users", async(req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map(user => `<li>${user.first_name} - ${user.email}</li>`)}
    </ul>
    `;
    res.send(html)
})

app.get("/api/users", async(req, res) => {
    // console.log(req.headers)
    res.setHeader('X-myName', 'Abhishek Bharti')
    const allDbUsers = await User.find({})
    return res.status(200).json(allDbUsers)
})

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     if (!user) {
//         return res.status(404).send("User not found")
//     }
//     return res.json(user)
// })

app.post("/api/users",async(req,res)=>{
    // ToDO: Create a new user
    const body = req.body;
    // console.log('Body',body)
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({message:"All fields are required"})
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    console.log(result)
    return res.status(201).json("User created")
})

// app.patch("/api/users/:id",(req,res)=>{
//     // ToDo: Edit user with id
//     return res.json({message:"User edit pending"})
// })

// app.delete("/api/users/:id",(req,res)=>{
//     //TODO: Delete user with id
//     return res.json({message:"User delete pending"})
// })

app.route("/api/users/:id")
    .get(async(req,res)=>{
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        return res.json(user)
    })
    .patch(async(req,res)=>{
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        const body = req.body;
        // console.log('Id',id)
        // console.log('Body',body)
        if(body.first_name){
            user.first_name = body.first_name
        }
        if(body.last_name){
            user.last_name = body.last_name
        }
        if(body.email){
            user.email = body.email
        }
        if(body.gender){
            user.gender = body.gender
        }
        if(body.job_title){
            user.job_title = body.job_title
        }
        await user.save();
        return res.status(201).json({message:"User updated"});
    })
    .delete(async(req,res)=>{
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        return res.status(200).json({message:"User deleted"})
    })

app.listen(port, () => { console.log(`Server is running on port ${port}`) })
