const router = require("express").Router();
let NewsLetter = require("../models/NewsLetter");

router.post(
    '/addRecord',
    async (req, res) => {
      try {
        const { name,email } = req.body;
        const newsletter = new NewsLetter({
          name,
          email,
        });
        await newsletter.save();
        res.send('Data added successfully.');
      } catch (error) {
        res.status(400).send('Error while adding data. Try again later.');
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
  );
  

module.exports = router;
