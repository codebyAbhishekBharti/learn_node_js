const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json')
const app = express()
const port = 8000

// Middlewares - Plugin
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to our API')
})

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`)}
    </ul>
    `;
    res.send(html)
})

app.get("/api/users", (req, res) => {
    return res.json(users)
})

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     if (!user) {
//         return res.status(404).send("User not found")
//     }
//     return res.json(user)
// })

app.post("/api/users",(req,res)=>{
    // ToDO: Create a new user
    const body = req.body;
    console.log('Body',body)
    users.push({...body, id: users.length+1})
    // return res.json({message:"User creation pending"})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        if(err){
            console.log(err)
        }
        return res.json({message:"User created", id: users.length})
    })
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
    .get((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(404).send("User not found")
        }
        return res.json(user)
    })
    .patch((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
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
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
            if(err){
                console.log(err)
            }
            return res.json({message:"User edited"})
        })
    })
    .delete((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(404).send("User not found")
        }
        users.pop(user)
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
            if(err){
                console.log(err)
            }
            return res.json({message:"User deleted"})
        })
    })

app.listen(port, () => { console.log(`Server is running on port ${port}`) })
