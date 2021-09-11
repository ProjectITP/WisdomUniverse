const express = require('express');
const Lecturers = require('../models/lecturers');

const router = express.Router();

//save

router.post('/lecturer/save',(req,res)=>{

    let newLecturer = new Lecturers(req.body);

    newLecturer.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Lecturers saved successfully"
        });
    });

});

//get

router.get('/lecturers',(req,res) =>{
    Lecturers.find().exec((err,lecturers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingLecturers:lecturers
        });
    });
});


//get specific 

router.get("/lecturer/:id",(req,res) =>{

    let lecturerId = req.params.id;

    Lecturers.findById(lecturerId,(err,lecturer) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            lecturer
        });
    });

    
});

//update

router.put('/lecturer/update/:id',(req,res)=>{
    Lecturers.findByIdAndUpdate(
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

router.delete('/lecturer/delete/:id',(req,res) =>{
    Lecturers.findByIdAndRemove(req.params.id).exec((err,deletedLecturer) =>{

        if(err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });

        return res.json({
            message:"Delete Succesful",deletedLecturer
        });
    });
});


module.exports = router;