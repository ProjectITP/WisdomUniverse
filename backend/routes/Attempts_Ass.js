const router = require("express").Router();
const multer = require("multer");  
let Attempts_Ass = require("../models/Attempts_Ass.js");
//let upload = require("../uploads/")

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads');
    },
    filename: (req,file,callback)=>{
        callback(null,new Date().toISOString().replace(/:/g,'-')+ '-' + file.originalname);
    },
    // fileFilter:(req,file,cb)=>{

    //     let pattern = /jpg|png|svg/;
    //     if (file.mimetype ===) {
    //         cb (null, true);
    //       } else {
    //         cb('Error: not a valid file');
    //       }
    // },
})
const upload = multer({storage:storage});

//URL = http://localhost:8070/attemptsass/add
router.route("/add",upload.single('file')).post( (req,res)=>{

    try{
        const file=req.file;
        console.log(file);
        res.status(201).send('File uploaded');
    }catch{
        res.status(404).send(error.message);
    }

    // const Student =req.body.Student;
    // const Subject=req.body.Subject;
    // const Instructor=req.body.Instructor;
    // const Assignment=req.body.Assignment;
    // const AttemptDate=req.body.AttemptDate;
    // const MarkingStatus=req.body. MarkingStatus;
    // const PublicationStatus=req.body.PublicationStatus;
    // const PlagarismStatus=req.body.PlagarismStatus;
    // const PlagarismScore=req.body.PlagarismScore;
    // const Marks=req.body.Marks;
    // const Grade=req.body.Grade;
    // const Status=req.body.Status;
    // const RescrutinyRequest=req.body.escrutinyRequest;
    // const RescrutinyNotification=req.body.RescrutinyNotification;
    // const PublishStatus=req.body.PublishStatus;
    //const file = req.file; 
    
        
    
    // const file_path = req.file.path;
    // const file_mimetype = req.file.mimetype;
    //console.log(req.file.path)


    // const newAttempts_Ass = new Attempts_Ass({
    //     Student,
    //     Subject,
    //     Instructor,
    //     Assignment,
    //     AttemptDate,
    //     MarkingStatus,
    //     PublicationStatus,
    //     PlagarismStatus,
    //     PlagarismScore,
    //     Marks,
    //     Grade,
    //     Status,
    //     RescrutinyRequest,
    //     RescrutinyNotification,
    //     PublishStatus,
    //     file_path,
    //     file_mimetype
    // })

    // newAttempts_Ass.save().then(()=>{
    //     res.json("Attempts_Ass added")
    // }).catch((err)=>{
    //     console.log(err);
    // })
})

//URL = http://localhost:8070/attemptsass/
router.route("/").get((req,res)=>{
    Attempts_Ass.find().then((Attempts_Assss)=>{
        res.json(Attempts_Assss)
    }).catch((err)=>{
        console.log(err);
    })
})

//URL = http://localhost:8070/attemptsass/update/61399387b941900cf8fe6412
router.route("/update/:id",upload.single("Subfile")).put(async(req,res)=>{
    let Attempts_AssId = req.params.id;
    const {Student,Subject,Instructor,Assignment,AttemptDate,MarkingStatus,PublicationStatus,PlagarismStatus,PlagarismScore,Marks,Grade,Status,RescrutinyRequest,RescrutinyNotification,PublishStatus} = req.body;
    const updateAttempts_Ass = {
        Student,
        Subject,
        Instructor,
        Assignment,
        AttemptDate,
        MarkingStatus,
        PublicationStatus,
        PlagarismStatus,
        PlagarismScore,
        Marks,
        Grade,
        Status,
        RescrutinyRequest,
        RescrutinyNotification,
        PublishStatus
    }

    await Attempts_Ass.findByIdAndUpdate(Attempts_AssId,updateAttempts_Ass)
    .then(()=>{
        res.status(200).send({status:"Attempts_Ass updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating assignment",error:err.message});
    })

})

//URL = http://localhost:8070/attemptsass/delete/61399387b941900cf8fe6412
router.route("/delete/:id").delete(async(req,res)=>{
    let Attempts_AssId = req.params.id;

    await Attempts_Ass.findByIdAndDelete(Attempts_AssId)
    .then(()=>{
        res.status(200).send({status:"Attempts_Ass deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete attempts_Ass",error:err.message});
    })
})

//URL = http://localhost:8070/attemptsass/61399387b941900cf8fe6412
router.route("/:id").get(async(req,res)=>{
    let Attempts_AssId = req.params.id;

    await Attempts_Ass.findById(Attempts_AssId)
    .then((Attempts_Ass)=>{
        res.status(200).send({status:"Attempts_Ass fetched",Attempts_Ass});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with fetch attempts_quiz",error:err.message});
    })

})
module.exports = router;