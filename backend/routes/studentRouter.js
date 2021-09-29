const router = require("express").Router();
const studentCtrl = require("../controllers/studentCtrl");
const auth = require("../middleware/auth");

router.post("/register", studentCtrl.register);

router.post("/activation", studentCtrl.activateEmail);

router.post("/login", studentCtrl.login);

router.post("/refreshtoken", studentCtrl.getAccessToken);

router.post("/forgot", studentCtrl.forgotPassword);

router.post("/reset", auth, studentCtrl.resetPassword);

router.get("/profile", auth, studentCtrl.getStudentInfor);

router.get("/allstudents", studentCtrl.getAllStudents);

router.get("/logout", studentCtrl.logout);

router.patch("/update", auth, studentCtrl.updateStudent);

router.delete("/delete/:id", auth, studentCtrl.deleteStudent);

module.exports = router;
