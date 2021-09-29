const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/StudentPayments');
const Router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb) {
                cb(null, './files');
            },
            filename(req,file,cb){
                cb(null,`${new Date().getTime()}_${file.originalname}`);
            }
        
    }),
    limits:{
        fieldSize:1000000 //1MB
    },
    fileFilter(req,file,cb){

        let pattern = /jpg|png|svg/;
        if (pattern.test (path.extname (file.originalname))) {
            cb (null, true);
          } else {
            cb('Error: not a valid file');
          }
    }
});


Router.post(
    '/upload',
    upload.single('file_path'),
    async (req,res) => {
        try{
            const{ name,nic,email,subject,bank,amount,deposited_date} = req.body;
            const{path,mimetype}=req.file;
            const file = new File({
                name,
                nic,
                email,
                subject, 
                bank,
                amount,
                deposited_date,             
                file_path:path,
                file_mimetype:mimetype
             
            });
            await file.save();
            res.send('upload successfull');
        }catch(error) {
            res.status(400).send('Error while uploading file..');
        }
    }
);
 

Router.get('/get',async(req,res)=>{
    try{
        const files = await File.find({});
        const sortedByCreationDate= files.sort(
            (a,b)=> b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    }catch(error){
        res.status(400).send('Error of getting the view');
    }
}

);

Router.delete("/delete/:id",async (req, res) => {
    let id = req.params.id;
    await File.findByIdAndDelete(id)
    .then(() => {
        res.status(200).send({status: "Payment Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error in Payment Deleting" });

    })

})


Router.get('/download/:id',async (req,res)=>{
  try{
    const image= await File.findById(req.params.id);
    res.set({
      'content-Type':image.file_mimetype
    });
    res.sendFile(path.join(_dirname,'..',image.file_path));
  }catch (error){
    res.status(400).send('error');
  }
})



module.exports = Router;

