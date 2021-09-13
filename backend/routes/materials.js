const { request, response } = require('express');
const express = require('express');
const Materials = require('../models/materials');

const router = express.Router();


//save materials

router.post('/material/save',(req,res) =>{

    let newMaterial = new Materials(req.body);

    newMaterial.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Material saved succesfully"
        });
    });
});


//get materials related to a subject
//URL = http://localhost:8070/materials?subjectName=Physics
router.get('/materials',(req,res) =>{
const subjectName = req.query.subjectName;
    
    Materials.find({"subjectName":subjectName}).exec((err,materials) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMaterials:materials
        });
    });
});

/*
//get a specific material

router.get("/material/:id",(req,res) =>{

    let materialId = req.params.id;

    Materials.findById(materialId,(err,material) =>{
        if(err){
            return res.status(400).json({sucess:false, err});
        }
        return res.status(200).json({
            success:true,
            material
        });
    });
});
*/

//update material

router.put('/material/update/:id',(req,res) => {
    Materials.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,material) =>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated succesfully"
            });
        }
    );
});


//delete material

router.delete('/material/delete/:id',(req,res) => {
    Materials.findByIdAndRemove(req.params.id).exec((err,deletedMaterial) => {

        if(err)return res.status(400).json({
            message:"Delete unsuccesful",err
        });

        return res.json({
            message:"Delete succesful",deletedMaterial
        });
    });
});


module.exports = router;