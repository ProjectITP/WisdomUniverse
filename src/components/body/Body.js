import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import StudentLogin from "./auth/StudentLogin";
import AdminLogin from "./auth/AdminLogin";
import StudentRegister from "./auth/StudentRegister";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/notfound/NotFound";

import ForgotPassword from "../body/auth/ForgotPassword";
import ResetStudentPassword from "../body/auth/resetStudentPassword";
import StudentProfile from "./studentProfile/StudentProfile";
import AdminProfile from "./adminProfile/AdminProfile";

import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <section id="content">
      <div className="container">
        <Switch>
          <Route
            path="/studentlogin"
            component={isLogged ? NotFound : StudentLogin}
            exact
          ></Route>
          <Route path="/adminlogin" component={AdminLogin} exact></Route>

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
        </Switch>
      </div>
    </section>
  );
}

export default Body;
