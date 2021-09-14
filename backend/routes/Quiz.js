const router = require("express").Router();
let Quiz = require("../models/Quiz.js");


//URL = http://localhost:8070/quiz/addquiz
router.route("/addquiz").post((req,res)=>{

    const name =req.body.name;
    const duration=Number(req.body.duration);
    const FromDate=req.body.FromDate;
    const ToDate=Date(req.body.ToDate);
    const Attempts=Number(req.body.Attempts);
    
    const newQuiz = new Quiz({
        name,
        duration,
        FromDate,
        ToDate,
        Attempts
    })

    newQuiz.save().then(()=>{
        res.json("Quiz added")
    }).catch((err)=>{
        console.log(err);
    })
})

//URL = http://localhost:8070/quiz/
router.route("/").get((req,res)=>{
    Quiz.find().then((Quiz)=>{
        res.json(Quiz)
    }).catch((err)=>{
        console.log(err);
    })
})

//URL = http://localhost:8070/quiz/update/61399387b941900cf8fe6412
router.route("/update/:id").put(async(req,res)=>{
    let QuizId = req.params.id;
    const {name, duration, FromDate, ToDate, Attempts} = req.body;
    const updateQuiz = {
        name,
        duration,
        FromDate,
        ToDate,
        Attempts
    }

    await Quiz.findByIdAndUpdate(QuizId,updateQuiz)
    .then(()=>{
        res.status(200).send({status:"Quiz updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating quiz",error:err.message});
    })

})

//URL = http://localhost:8070/quiz/delete/61399387b941900cf8fe6412
router.route("/delete/:id").delete(async(req,res)=>{
    let QuizId = req.params.id;

    await Quiz.findByIdAndDelete(QuizId)
    .then(()=>{
        res.status(200).send({status:"Quiz deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete quiz",error:err.message});
    })
})

//URL = http://localhost:8070/quiz/get/61399387b941900cf8fe6412
router.route("/get/:id").get(async(req,res)=>{
    let QuizId = req.params.id;

    await Quiz.findById(QuizId)
    .then((Quiz)=>{
        return res.status(200).send({status:"Quiz fetched",Quiz});
    }).catch((err)=>{
        console.log(err);
        return res.status(500).send({status:"Error with fetch quiz",error:err.message});
    })

})
module.exports = router;