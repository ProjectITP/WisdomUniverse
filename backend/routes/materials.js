const path = require('path');
const express = require('express');
const multer = require('multer');
const Material = require('../models/materials');

const router = express.Router();

//save materials

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './materials');
    },
    filename(req, files, cb) {
      cb(null, `${new Date().getTime()}_${files.originalname}`);
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


  //upload material

  router.post(
    '/upload',
    upload.single('file'),
    async (req, res) => {
      try {
        const { subjectName, topic, notes} = req.body;
        const { path, mimetype } = req.file;
        const file = new Material({
          subjectName,
          topic,
          notes,
          material_path: path,
          material_mimetype: mimetype
        });
        await file.save();
        res.send('File uploaded successfully.');
      } catch (error) {
        /*res.status(400).send('Error while uploading file. Try again later.');*/
        res.status(500).send(error.message);
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
  );


  //get materials

  router.get('/getAllFiles', async (req, res) => {
    try {
      const files = await Material.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  });
  

  //download materials

  router.get('/download/:id', async (req, res) => {
    try {
      const file = await Material.findById(req.params.id);
      res.set({
        'Content-Type': file.material_mimetype
      });
      res.sendFile(path.join(__dirname, '..', file.material_path));
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
  });


  //delete materials

  router.delete("/delete/:id",async (req, res) => {
    const id = req.params.id;
    await Material.findByIdAndDelete(id).exec()
    res.send("Material deleted");
    
  });

  //view materials
  
  module.exports = router;