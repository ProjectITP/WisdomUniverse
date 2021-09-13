import "./App.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchStudent,
  dispatchGetStudent,
} from "./redux/actions/authAction";

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
    </Router>
  );
}

export default App;
