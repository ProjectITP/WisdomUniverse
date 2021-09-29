import "./App.css";


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchStudent,
  dispatchGetStudent,
} from "./redux/actions/authAction";


import ViewResults from './components/ViewResults';
import ViewQuizResults from './components/ViewQuizResults';
import UpdateQuizResults from './components/UpdateQuizResults';




import axios from "axios";

import StudentLogin from "./components/body/auth/StudentLogin";


import AdminLogin from "./components/body/auth/AdminLogin";
import StudentRegister from "./components/body/auth/StudentRegister";
import ActivationEmail from "./components/body/auth/ActivationEmail";
import NotFound from "./components/utils/notfound/NotFound";

import ForgotPassword from "./components/body/auth/ForgotPassword";
import ResetStudentPassword from "./components/body/auth/resetStudentPassword";
import StudentProfile from "./components/body/studentProfile/StudentProfile";
import AdminProfile from "./components/body/adminProfile/AdminProfile";

import ViewQuiz from "./components/Quiz";

import AllInstructor from "./components/AllInstructor";
import EditInstructor from "./components/EditInstructor";
import InstructorDetails from "./components/InstructorDetails";
import GenerateReport from "./components/GenerateReport";
import AllRequest from "./components/AllRequest";
import EditLecturer from "./components/EditLecturer";
import CreateInstructor from "./components/CreateInstructor";

import Header from "./shared/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ViewSubjectStudent from "./components/ViewSubjectStudent";
import ViewSubjectInstructor from "./components/ViewSubjectInstructor";
import CreateSubject from "./components/CreateSubject";
import EditSubject from "./components/EditSubject";
import SubjectDetails from "./components/SubjectDetails";
import ViewMaterialsStudent from "./components/ViewMaterialsStudent";
import UploadMaterial from "./components/UploadMaterial";
import EditMaterial from "./components/EditMaterial";
import ViewMaterialsInstructor from './components/ViewMaterialsInstructor';


import AddEnroll from './components/AddEnroll';
import UpdateEnroll from './components/UpdateEnroll';
import ViewEnroll from './components/ViewEnroll';
import ViewEnrollKey from './components/ViewEnrollKey';
import AddEnrollKey from './components/AddEnrollKey';
import UpdateEnrollKey from './components/UpdateEnrollKey';
import ViewEnrollSub from './components/EnrollSubject';
import Upload from './components/Upload';
import ViewUpload from './components/ViewUpload';

import QuizAdd from './components/Quiz/QuizAdd';
import QuizUpdate from './components/Quiz/QuizUpdate';
import ViewAssignment from './components/Assignment/AssignmentView'
import AssignmentAdd from './components/Assignment/AssignmentAdd';
import ViewQuiz from './components/Quiz/QuizViewAll';
import AssignmentSView from './components/Assignment/AssignmentSView';

import Feedbackform from './components/Feedbackform';
import View from './components/Notice';
import ViewAdmin from './components/AdminNoticeView';
import FeedbackView from './components/FeedbackView';
import NoticeUpload from './components/NoticeUpload';
import AdminContactView from './components/AdminContactView';
import NoticeUpdate from './components/NoticeUpdate';
import InsertContactus from './components/InsertContactus';


import Header from './shared/Header';
import Footer from './shared/Footer';


import {BrowserRouter as Router, Route} from "react-router-dom"



function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/student/refreshtoken", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getStudent = () => {
        dispatch(dispatchLogin());
        return fetchStudent(token).then((res) => {
          dispatch(dispatchGetStudent(res));
        });
      };
      getStudent();
    }
  }, [token, dispatch]);

  return (
    <Router>

      <Header />
      <section id="content">
        <div className="container">
          {/* <Route path="/" exact component={CounterClass} /> */}

          <Route path="/i/quiz" exact component={ViewQuiz} />

          <Route
            path="/studentlogin"
            component={isLogged ? NotFound : StudentLogin}
            exact
          ></Route>
          <Route
            path="/adminlogin"
            component={isLogged ? NotFound : AdminLogin}
            exact
          ></Route>

          <Route
            path="/studentregister"
            component={isLogged ? NotFound : StudentRegister}
            exact
          ></Route>

          <Route
            path="/forgotpassword"
            component={isLogged ? NotFound : ForgotPassword}
            exact
          ></Route>

          <Route
            path="/student/reset/:token"
            component={isLogged ? NotFound : ResetStudentPassword}
            exact
          ></Route>

          <Route
            path="/profile"
            component={isLogged ? StudentProfile : NotFound}
            exact
          ></Route>

          <Route
            path="/adminprofile"
            component={isLogged ? AdminProfile : NotFound}
            exact
          ></Route>

          <Route
            path="/student/activate/:activation_token"
            component={ActivationEmail}
            exact
          ></Route>

          <Route path="/" exact component={AllInstructor} />
          <Route path="/edit/:id" exact component={EditInstructor} />
          <Route path="/instructor/:id" exact component={InstructorDetails} />
          <Route path="/reportgenerate" exact component={GenerateReport} />
          <Route path="/request" exact component={AllRequest} />
          <Route path="/editrequest/:id" exact component={EditLecturer} />
          <Route path="/register" exact component={CreateInstructor} />
        </div>
      </section>

    <div>
      <Header/>
      
      {/* <Route path="/" exact component={CounterClass} /> */}

      <Route path="/instructor" exact component={AllInstructor}/>
          <Route path="/edit/:id" exact component={EditInstructor}/>
          <Route path="/instructor/:id" exact component={InstructorDetails}/>
          <Route path="/reportgenerate" exact component={GenerateReport}/>
          <Route path="/request" exact component={AllRequest}/>
          <Route path="/editrequest/:id" exact component={EditLecturer}/>
          <Route path="/register" exact component={CreateInstructor}/>


          {/*Subject*/}
          <Route path="/ViewSubjectStudent" exact component={ViewSubjectStudent}></Route>
          <Route path="/ViewSubjectInstructor" exact component={ViewSubjectInstructor}></Route>
          <Route path="/addSubject" component={CreateSubject}></Route>
          <Route path="/editStudent/:id" component={EditSubject}></Route>
          <Route path="/subjectDetails/:id" component={SubjectDetails}></Route>
          <Route path="/viewMaterialsStudent" component={ViewMaterialsStudent}></Route>
          <Route path="/uploadMaterial" component={UploadMaterial}></Route>
          <Route path="/editMaterial/:id" component={EditMaterial}></Route>
          <Route path="/viewMaterialsInstructor" component={ViewMaterialsInstructor}></Route>


          <Route path="/i/quiz" exact component={ViewQuiz}/>
          <Route path="/i/quizadd" exact component={QuizAdd}/>
          <Route path="/i/quizupdate/:id" component={QuizUpdate} exact/>
          <Route path="/i/assignment" exact component={ViewAssignment}/>
          <Route path="/i/assignmentadd" exact component={AssignmentAdd}/>
          <Route path="/s/assignment" exact component={AssignmentSView}/>
          



          <Route path="/viewEnroll" exact component={ViewEnroll}/>  
            <Route path="/enroll/add" exact component={AddEnroll}/>
            <Route path="/Update/:id" exact component={UpdateEnroll}/>
            <Route path="/enrollKey" exact component={ViewEnrollKey}/>
            <Route path="/enrollKey/add" exact component={AddEnrollKey}/>
            <Route path="/enrollKey/update/:id" exact component={UpdateEnrollKey}/>
            <Route path="/enrollSub" exact component={ViewEnrollSub}/>
            <Route path = "/upload" exact component={Upload}/>
            <Route path="/getPayments" exact component={ViewUpload}/>          
      


          <Route path="/add" exact component={InsertContactus} />
          <Route path="/view" exact component={AdminContactView} />
          <Route path="/fbview" exact component={FeedbackView} />
          <Route path="/fbadd" exact component={Feedbackform} />
          <Route path="/feedadd" exact component={NoticeUpload} />
          <Route path="/feeddelete/:id" exact component={ViewAdmin} />
         <Route path="/feedview" exact component={View} />
         <Route path="/feedAdminview" exact component={ViewAdmin} />
         <Route path="/feedupdate/:id" exact component={NoticeUpdate} />

      
          <Route path="/i/viewresults" exact component={ViewResults}/>
          <Route path="/i/viewquizresults/:id" exact component={ViewQuizResults}/>
          <Route path="/i/updateresults/:id" exact component={UpdateQuizResults}/>


    </div>

  



           

    <Footer/>


    </Router>
  );
}

export default App;
