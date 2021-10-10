const { request, response } = require('express');
const express = require('express');
const Subjects = require('../models/subjects');

const router = express.Router();

//save subjects

router.post('/subject/save',(req,res) =>{

    let newSubject = new Subjects(req.body);

    newSubject.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Subject saved succesfully"
        });
    });
});


//get subjects

router.get('/subjects',(req,res) =>{
    Subjects.find().exec((err,subjects) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingSubjects:subjects
        });
    });
});


//get a specific subject

router.get("/subject/:id",(req,res) =>{

    let subjectId = req.params.id;

    Subjects.findById(subjectId,(err,subject) =>{
        if(err){
            return res.status(400).json({sucess:false, err});
        }
        return res.status(200).json({
            success:true,
            subject
        });
    });
});


//update subject

router.put('/subject/update/:id',(req,res) => {
    Subjects.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,subject) =>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated succesfully"
            });
        }
    );
});


//delete subject

router.delete('/subject/delete/:id',(req,res) => {
    Subjects.findByIdAndRemove(req.params.id).exec((err,deletedSubject) => {

        if(err)return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete succesful",deletedSubject
        });
    });
});

module.exports = router;

