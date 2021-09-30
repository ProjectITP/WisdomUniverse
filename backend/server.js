const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors= require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB Connection success!");
});

app.listen(PORT, ()=>{
    console.log('Server is up and running on port number: ',PORT)
})


//Postman check
//URL = http://localhost:8070/assessment/

const AssessmentRouter = require("./routes/Assessment.js");
app.use("/Assessment",AssessmentRouter);

//URL = http://localhost:8070/quiz/
const QuizRouter = require("./routes/Quiz.js");
app.use("/quiz",QuizRouter);

//URL = http://localhost:8070/instructor/
const instructorRoutes = require('./routes/instructors');
app.use(instructorRoutes);

//URL = http://localhost:8070/lecturer/
const lecturerRoutes = require('./routes/lecturers');
app.use(lecturerRoutes);


// students routes

app.use("/student", require("./routes/studentRouter"));
app.use("/admin", require("./routes/adminRouter"));
app.use("/api", require("./routes/uploadImg"));

//URL = http://localhost:8070/attemptsquiz/

const Attempts_QuizRouter = require("./routes/Attempts_Quiz.js");
app.use("/attemptsquiz",Attempts_QuizRouter);

//URL = http://localhost:8070/attemptsass/

const Attempts_AssRouter = require("./routes/Attempts_Ass.js");
app.use("/attemptsass",Attempts_AssRouter);

//URL = http://localhost:8070/assignment/

const Assignment = require("./routes/Assignment.js");
app.use("/assignment",Assignment);


//payment
//http://localhost:8070/file/
const file=require('./routes/StudentPayments');
app.use('/file',file)

//enroll
//http://localhost:8070/enroll/
const enrollRoutes = require(`./routes/Enrolls`);
app.use(enrollRoutes);

//enrollKeys
//http://localhost:8070/enrollKey
const enrollKeyRoutes = require(`./routes/EnrollKeys`);
app.use(enrollKeyRoutes);


//URL = http://localhost:8070/contactus/
const contactusRouter = require("./routes/contactuss.js");
app.use("/contactus",contactusRouter);

//URL = http://localhost:8070/notice/
const noticeRouter = require("./routes/notices.js");
app.use("/notice",noticeRouter);


//URL = http://localhost:8070/feedback/
const feedbackRouter = require("./routes/feedbacks.js");
app.use("/feedback",feedbackRouter);


//URL = http://localhost:8070/subject/
const subjectRoutes = require('./routes/subjects');
app.use(subjectRoutes);

//URL = http://localhost:8070/material/
const materialRoutes = require('./routes/materials');
app.use(materialRoutes);




