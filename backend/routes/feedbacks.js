const router = require("express").Router();
let Feedback = require("../models/feedback");


router.route("/fbadd").post((req,res)=>{

    const sname = req.body.sname;
    const section = req.body.section;
    const review = req.body.review;
    const fdate = req.body.fdate;
    const experience = req.body.experience;
    const support = req.body.support;
    const satisfication = req.body.satisfication;
    

    const newFeedback = new Feedback({

        sname,
        section,
        review,
        fdate,
        experience,
        support,
        satisfication

    })

    newFeedback.save().then(()=>{
        res.json("Feedback succesfully added")
    }).catch(()=>{
        console.log(err);
    })

})


router.route("/fbview").get((req,res)=>{

    Feedback.find().then((feedbacks)=>{
        res.json({
            success:true,
            existingPosts:feedbacks

        });
    }).catch((err)=>{
        console.log(err)
    })


})


router.route("/fbupdate/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {sname,section,review,fdate,experience,support,satisfication} = req.body;

    const updateFeedback = {
        sname,
        section,
        review,
        fdate,
        experience,
        support,
        satisfication
    }

    const update = await Feedback.findByIdAndUpdate(userId,updateFeedback).then(()=> {
        
    res.status(200).send({status: "Feedback updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
})


router.route("/fbdelete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Feedback.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "Feedback us record deleted "});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete record",error: err.message});
    })

})

router.route("/fbget/:id").get(async(req,res)=>{
    let userId = req.params.id;
    const contact = await Feedback.findById(userId).then((feedbacks)=>{
        res.status(200).send({status: "feedback fetched",  feedbacks})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with record",error: err.message})
    })
})

module.exports = router;
