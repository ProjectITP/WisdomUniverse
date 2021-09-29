const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const studentCtrl = require("../controllers/studentCtrl");
const auth = require("../middleware/auth");

router.post("/register", adminCtrl.register);

router.post("/activation", adminCtrl.activateEmail);

router.post("/login", adminCtrl.login);

router.post("/refreshtoken", adminCtrl.getAccessToken);

router.post("/forgot", adminCtrl.forgotPassword);

router.post("/reset", auth, adminCtrl.resetPassword);

router.get("/profile", adminCtrl.getAdminInfor);

router.get("/allstudents", studentCtrl.getAllStudents);

router.get("/logout", adminCtrl.logout);

router.patch("/updatestudent/:id", adminCtrl.updateStudent);

router.delete("/delete/:id", auth, adminCtrl.deleteAdmin);

module.exports = router;
