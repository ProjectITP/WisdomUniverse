const router = require("express").Router();
let Assignment = require("../models/Assignment.js");


//URL = http://localhost:8070/assignment/add
router.route("/add").post((req,res)=>{

    const name =req.body.name;
    const FromDate=req.body.FromDate;
    const ToDate=req.body.ToDate;

    const newAssignment = new Assignment({
        name,
        FromDate,
        ToDate
    })

    newAssignment.save().then(()=>{
        res.json("Assignment added")
    }).catch((err)=>{
        console.log(err);
    })
})

//URL = http://localhost:8070/assignment/
router.route("/").get((req,res)=>{
    Assignment.find().then((Assignments)=>{
        res.json(Assignments)
    }).catch((err)=>{
        console.log(err);
    })
})
//URL = http://localhost:8070/assignment/update/61399387b941900cf8fe6412
router.route("/update/:id").put(async(req,res)=>{
    let AssignmentId = req.params.id;
    const {name, duration, FromDate, ToDate, Attempts} = req.body;
    const updateAssignment = {
        name,
        duration,
        FromDate,
        ToDate,
        Attempts
    }

    await Assignment.findByIdAndUpdate(AssignmentId,updateAssignment)
    .then(()=>{
        res.status(200).send({status:"Assignment updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating assignment",error:err.message});
    })

})

//URL = http://localhost:8070/assignment/delete/61399387b941900cf8fe6412
router.route("/delete/:id").delete(async(req,res)=>{
    let AssignmentId = req.params.id;

    await Assignment.findByIdAndDelete(AssignmentId)
    .then(()=>{
        res.status(200).send({status:"Assignment deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete assignment",error:err.message});
    })
})

//URL = http://localhost:8070/assignment/61399387b941900cf8fe6412
router.route("/:id").get(async(req,res)=>{
    let AssignmentId = req.params.id;

    await Assignment.findById(AssignmentId)
    .then((Assignment)=>{
        res.status(200).send({status:"Assignment fetched",Assignment});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with fetch assignment",error:err.message});
    })

})
module.exports = router;