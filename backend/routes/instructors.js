const express = require('express');
const Instructors = require('../models/instructors');

const router = express.Router();

//save

router.post('/instructor/save',(req,res)=>{

    let newInstructor = new Instructors(req.body);

    newInstructor.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Instructors saved successfully"
        });
    });

});

//get

router.get('/instructors',(req,res) =>{
    Instructors.find().exec((err,instructors) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingInstructors:instructors
        });
    });
});


//get specific 

router.get("/instructor/:id",(req,res) =>{

    let instructorId = req.params.id;

    Instructors.findById(instructorId,(err,instructor) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            instructor
        });
    });

    
});

//update

router.put('/instructor/update/:id',(req,res)=>{
    Instructors.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,instructor)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});

//delete

router.delete('/instructor/delete/:id',(req,res) =>{
    Instructors.findByIdAndRemove(req.params.id).exec((err,deletedInstructor) =>{

        if(err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });

        return res.json({
            message:"Delete Succesful",deletedInstructor
        });
    });
});


module.exports = router;