const router = require("express").Router();
const uploadImage = require("../middleware/uploadImage");
const uploadCtrl = require("../controllers/uploadImgCtrl");
const auth = require("../middleware/auth");

router.post("/uploadthumbnail", uploadImage, auth, uploadCtrl.uploadThumbnail);

module.exports = router;
