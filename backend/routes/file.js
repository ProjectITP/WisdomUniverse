const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/file');
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './ReferenceBooks');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/uploadbook',
  upload.single('file'),
  async (req, res) => {
    try {
      const { subject, title, auther, edition } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        subject,
        title,
        auther,
        edition,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});








//update starts
//update starts
Router.put('/update', async (req,res) => {

  const newSubject =req.body.newSubject;
  const newTitle = req.body.newTitle;
  const newAuther = req.body.newAuther;
  const newEdition = req.body.newEdition;
  const id = req.body.id;
  console.log(newSubject,newTitle,newAuther,newEdition,id);
  
    try {
    
      await File.findById(id, (error,updateRecord)=>{
        updateRecord.subject = newSubject;
        updateRecord.title = newTitle;
        updateRecord.auther = newAuther;
        updateRecord.edition = Number(newEdition);
        updateRecord.save();
      });
      
    } catch (error) {
      console.log(error);
    }
    res.send('file updated successfully.');
  });
  



//update end

//update end



//getone starts here
Router.get('/getAllFile/:id', async (req, res) => {
  try {
    const id= req.params.id
    const files = await File.findById(id);
   // const sortedByCreationDate = files.sort(
   //   (a, b) => b.createdAt - a.createdAt
   //);
   // res.send(sortedByCreationDate);
   res.send({status:"Resource fetched" ,files});
  } catch (error) {
    console.log(error);
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});



//getone ends here




//delete starts here
Router.delete('/delete/:id', async (req,res) =>{
  const id = req.params.id
  await File.findByIdAndRemove(id).exec()
  res.send("Resource Deleted");
})



//delete ends here




//search starts
Router.get('/search', (req, res,next) => {

    const searchField= req.query.subject;
    File.find({subject:{$regex: searchField, $options: '$i'}}).then(data=>{
      res.send(data);
    })
  
})







//search end



module.exports = Router;