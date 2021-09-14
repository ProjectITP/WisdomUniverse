const express = require(`express`);
const Enroll = require(`../models/enroll`);

const router= express.Router();


//save
router.post(`/enroll/save`,(req,res) =>{
    let newEnroll = new Enroll(req.body);

    newEnroll.save((err) =>{

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
router.get(`/enroll`,(req,res) =>{
    Enroll.find().exec((err,enroll)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEnroll:enroll
        });
    });
});



//update
router.put(`/enroll/update/:id`,(req,res) =>{
    Enroll.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,enroll)=>{
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
router.delete(`/enroll/delete/:id`, (req,res) =>{
    Enroll.findByIdAndRemove(req.params.id).exec((err,deletedEnroll)=>{
        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete Successful",deletedEnroll
        });
    });
});



//view specific
router.get("/enroll/:id",(req,res) => {
    let enrollId = req.params.id;

    Enroll.findById(enrollId,(err,enroll) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            enroll
        });
    });

});


module.exports = router;