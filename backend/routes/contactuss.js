const router = require("express").Router();
let Contactus = require("../models/contactus");


router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const question = req.body.question;

    const newContactus = new Contactus({

        name,
        email,
        phone,
        question
    })

    newContactus.save().then(()=>{
        res.json("Question succesfully added")
    }).catch(()=>{
        console.log(err);
    })

})


router.route("/view").get((req,res)=>{

    Contactus.find().then((contactuss)=>{
        res.json(contactuss)
    }).catch((err)=>{
        console.log(err)
    })


})


router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {name,email,phone,question} = req.body;

    const updateContactus = {
        name,
        email,
        phone,
        question
    }

    const update = await Contactus.findByIdAndUpdate(userId,updateContactus).then(()=> {
        
    res.status(200).send({status: "Contact updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
})


router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Contactus.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "contact us record deleted "});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete record",error: err.message});
    })

})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    const contact = await Contactus.findById(userId).then((contactuss)=>{
        res.status(200).send({status: "contact fetched",  contactuss})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with record",error: err.message})
    })
})

module.exports = router;