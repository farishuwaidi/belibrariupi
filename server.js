const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//route
app.get('/', (req,res)=>{
    res.send('hello this is library')
})

//get all user
app.get('/user', async(req,res)=>{
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//get one uer
app.get('/user/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//post user
app.post('/user', async(req,res)=>{
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//update user
app.put('/user/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id, req.body)
        //cannot find any user in database
        if(!user){
            return res.status(404).json({message: `cannot find user with ID ${id}`})
        }
        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete user
app.delete('/user/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        //cannot find any user in database
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:libraryUPI@librariapi.hlsnqau.mongodb.net/library-upi?retryWrites=true&w=majority')
.then(()=>{
    console.log('connect to mongodb')
    app.listen(3000, ()=>{
        console.log('Node API run in port 3000')
    })
}).catch((error)=>{
    console.log(error)
})