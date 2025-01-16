const User = require('../models/user')

async function handleGetAllUsers(req,res) {
    const allDbUsers = await User.find({})
    return res.status(200).json(allDbUsers)
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).send("User not found")
    }
    return res.json(user)
}

async function handleUpdateById(req,res){
    const body = req.body;
    const user = await User.findByIdAndUpdate(req.params.id,{
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    if (!user) {
        return res.status(404).send("Update unsuccessful")
    }
    return res.status(201).json({message:"User updated"});
}

async function handleDeleteUserByID(req,res) {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
        return res.status(404).send("User not found")
    }
    return res.status(200).json({message:"User deleted"})
}
async function handleCreateNewUser(req,res) {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({message:"All fields are required"})
    }
    const check_email_exist = await User.find({email: body.email})
    if(check_email_exist.length > 0){
        return res.status(400).json({message:"Email already exist"})
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    console.log(result)
    return res.status(201).json({msg:"User created", id:result._id})
}
module.exports = { 
    handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateById, 
    handleDeleteUserByID, 
    handleCreateNewUser }