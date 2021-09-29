import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../utils/notification/notification";

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const RequestPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid email address", success: "" });
    try {
      const res = await axios.post("/student/forgot", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <section className="content" id="forgotStudentPassword">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="h3 subtitle text-center">Forgot password?</h2>
            <p className="desc-text text-center">
              Enter correct email address to get the verification link.
            </p>
            <div className="loginForm">
              {err && showErrorMsg(err)}
              {success && showSuccessMsg(success)}

              <div className="form-group">
                <label htmlFor="email" className="mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form-group mt-1">
                <button onClick={RequestPassword} className="btn btn-success">
                  Verify your email address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
