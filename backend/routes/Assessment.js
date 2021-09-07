const router = require("express").Router();
let Assessment = require("../models/Assessment.js");


//URL = http://localhost:8070/assessment/aadd
router.route("/aadd").post((req,res)=>{

    const name =req.body.name;

    const newAssessment = new Assessment({
        name
    })

    newAssessment.save().then(()=>{
        res.json("Assessment added")
    }).catch((err)=>{
        console.log(err);
    })
})

//URL = http://localhost:8070/assessment/
router.route("/").get((req,res)=>{
    Assessment.find().then((Assessments)=>{
        res.json(Assessments)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;