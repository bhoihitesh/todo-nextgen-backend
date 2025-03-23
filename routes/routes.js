const express = require('express');
const Records = require('../models/records');
const Users = require('../models/users');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// get records
routes.get('/records',async(req,res)=>{
    try {
        const records = await Records.find();
        console.log('records',records)
        res.json(records);
    } catch (error) {
        res.status(500).json({message:'Error while getting records',error})
    }
})

// add records
routes.post('/add-record',async(req,res)=>{
    try {
        const record = await Records.insertMany(req.body);
        res.json(record);
    } catch (error) {
        res.status(500).json({message: 'Error while adding records',error});
    }
});

// update record by id
routes.put('/update-record/:id',async(req,res)=>{
    const id = req.params.id;
    const payload = req.body.payloadToUpdate
    try {
        const record = await Records.findByIdAndUpdate(id,payload)
        res.json(record);
    } catch (error) {
        res.status(500).json({message:'Error while getting record',error});
    }
})

// delete record
routes.delete('/delete-record/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        const record = await Records.findByIdAndDelete(id);
        res.json(record);
    } catch (error) {
        res.status(500).json({message: 'Error while deleting record'});
    }
})

// get all users
routes.get('/users', async(req,res)=>{
    const users = await Users.find();
    return res.json(users);
})

// update user
routes.put('/user', async(req,res)=>{
    const payload = req.body;
    const users = await Users.find({},'username');
    const findUser = users.find((user)=>{
    return user.username === payload.username
    })
    const id = findUser._id.toString();
    try {
        const user = await Users.findByIdAndUpdate(id, payload)
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Error while updating user"});
        console.error("Error while updating user", error);
    }
})

// user login
routes.post('/login', async(req,res)=>{
    const payload = req.body;
    const secretKey = process.env.SECRET_KEY;
    try {
    const users = await Users.find({},'username password');
    const findUser = users.find((user)=>{
    return user.username === payload.username
    })
    if(!findUser) {
        res.status(400).json({message: "User does't registered"})
    }
    else if(findUser && findUser.password !== payload.password) {
        res.status(400).json({message: 'Invalid password'})
    }
    else {
        const {_id} = findUser
        const token = jwt.sign({_id}, secretKey, { expiresIn: '30m'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            path: '/',
            maxAge: 30* 60* 1000
        })

        res.status(200).json({message: 'Login successful'})
    }
    } catch (error) {
        res.status(500).json({message: "Error while updating user"});
        console.error("Error while updating user", error);
    }
})

//user logout
routes.delete("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while logging out" });
  }
});

module.exports = routes;
