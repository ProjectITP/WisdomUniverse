const express = require(`express`);
const enrollKey = require("../models/enrollKey");
const Subject = require(`../models/enrollKey`);

const router= express.Router();


//save
router.post(`/enrollKey/save`,(req,res) =>{
    let newEnrollKey = new Subject(req.body);

    newEnrollKey.save((err) =>{

        if(err){ 
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"saved Successfully"
        });
    });
});




//view
router.get(`/enrollKey`,(req,res) =>{
    Subject.find().exec((err,enrollKey)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingSubject:enrollKey
        });
    });
});



//update
router.put(`/enrollKey/update/:id`,(req,res) =>{
    Subject.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,enrollKey)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"

            });
        }
    );
});


//delete
router.delete(`/enrollKey/delete/:id`, (req,res) =>{
    Subject.findByIdAndRemove(req.params.id).exec((err,deletedSubject)=>{
        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete Successful",deletedSubject
        });
    });
});



//view specific
router.get("/enrollKey/:id",(req,res) => {
    let enrollKeyId = req.params.id;

    enrollKey.findById(enrollKeyId,(err,enrollKey) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            enrollKey
        });
    });

});


module.exports = router;