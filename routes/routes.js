const express = require('express');
const Model = require('../models/model');

const router = express.Router()
module.exports = router;


//Post Method
router.post('/addLot', async (req, res) => {
    const data = new Model({
        lotType: req.body.lotType,
        lotName: req.body.lotName,
        lotNumber: req.body.lotNumber,
        totalSpaces: req.body.totalSpaces,
    });

    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/getTypes', async (req, res) => {
    try{
        types = await Model.distinct('lotType');
        res.json(types);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getParking/:type/:day', async (req, res) => {
    try{
        let data = await Model.find().byType(req.params.type);
        
        // Return values for a specific day.
        data = data.map(lot => {
            // deep clone.
            let newLot = JSON.parse(JSON.stringify(lot));
            delete newLot.days;
            newLot.day = lot.days[req.params.day];
            return newLot;
        });

        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})