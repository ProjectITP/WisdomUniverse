const router = require("express").Router();
let Attempts_Quiz = require("../models/Attempts_Quiz.js");


//URL = http://localhost:8070/attemptsquiz/add
router.route("/add").post((req,res)=>{

    const Student =req.body.Student;
    const Subject=req.body.Subject;
    const Quiz=req.body.Quiz;
    const AttemptDate=req.body.AttemptDate;

    const newAttempts_Quiz = new Attempts_Quiz({
        Student,
        Subject,
        Quiz,
        AttemptDate
    })

    newAttempts_Quiz.save().then(()=>{
        res.json("Attempts_Quiz added")
    }).catch((err)=>{
        console.log(err);
    })
})

//URL = http://localhost:8070/attemptsquiz/
router.route("/").get((req,res)=>{
    Attempts_Quiz.find().then((Attempts_Quizss)=>{
        res.json(Attempts_Quizss)
    }).catch((err)=>{
        console.log(err);
    })
})

//URL = http://localhost:8070/attemptsquiz/delete/61399387b941900cf8fe6412
router.route("/delete/:id").delete(async(req,res)=>{
    let Attempts_QuizId = req.params.id;

    await Attempts_Quiz.findByIdAndDelete(Attempts_QuizId)
    .then(()=>{
        res.status(200).send({status:"Attempts_Quiz deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete attempts_quiz",error:err.message});
    })
})

//URL = http://localhost:8070/updateattemptsquiz/61399387b941900cf8fe6412
router.route("/:id").get(async(req,res)=>{
    let Attempts_QuizId = req.params.id;

    await Attempts_Quiz.findById(Attempts_QuizId)
    .then((Attempts_Quiz)=>{
        res.status(200).send({status:"Attempts_Quiz fetched",Attempts_Quiz});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with fetch attempts_quiz",error:err.message});
    })

})
module.exports = router;