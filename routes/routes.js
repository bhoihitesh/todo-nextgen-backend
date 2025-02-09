const express = require('express');
const Records = require('../models/records');
const routes = express.Router();


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
    const record = await Records.insertMany(req.body);
    res.json(record);
    try {
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
module.exports = routes;
