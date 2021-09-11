const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors= require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
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