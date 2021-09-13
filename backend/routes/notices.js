const router = require("express").Router();
let Notice = require("../models/notice");


router.route("/feedadd").post((req,res)=>{

    const title = req.body.title;
    const notice = req.body.notice;
    const uploader = req.body.uploader;
    const date = req.body.date;
    

    const newNotice = new Notice({

        title,
        notice,
        uploader,
        date
    })

    newNotice.save().then(()=>{
        res.json("Notice succesfully added")
    }).catch(()=>{
        console.log(err);
    })

})


router.route("/feedview").get((req,res)=>{

    Notice.find().then((notices)=>{
        res.json(notices)
    }).catch((err)=>{
        console.log(err)
    })


})

router.route("/feedAdminview").get((req,res)=>{

    Notice.find().then((notices)=>{
        res.json({
            success:true,
            existingPosts:notices
        });
    }).catch((err)=>{
        console.log(err)
    })


})


router.route("/feedupdate/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {title,notice,uploader,date} = req.body;

    const updateNotice = {
        title,
        notice,
        uploader,
        date
    }

    const update = await Notice.findByIdAndUpdate(userId,updateNotice).then(()=> {
        
    res.status(200).send({status: "Notices wass updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
})


router.route("/feeddelete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Notice.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "Notice  record deleted "});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete record",error: err.message});
    })

})

router.route("/feedget/:id").get(async(req,res)=>{
    let userId = req.params.id;
    const contact = await Notice.findById(userId).then((notices)=>{
        res.status(200).send({status: "Notice is  fetched",  notices})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with record",error: err.message})
    })
})

module.exports = router;
