import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../utils/notification/notification";
import { isLength, isMatch } from "../../utils/validation/Validation";

const initialState = {
  password: "",
  password2: "",
  err: "",
  success: "",
};

function ResetStudentPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, password2, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPassword = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters",
        success: "",
      });
    if (!isMatch(password, password2))
      return setData({
        ...data,
        err: "Passwords do not match",
        success: "",
      });

    try {
      const res = await axios.post(
        "/student/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      return setData({
        ...data,
        err: "",
        success: res.data.msg,
      });
    } catch (err) {
      err.response.data.msg &&
        setData({
          ...data,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="h3 text-center subtitle">Reset Password</h2>
        <p className="text-center desc-text">Create your new password here</p>
        <div className="loginForm">
          {err && showErrorMsg(err)}
          {success && showSuccessMsg(success)}

          <div className="form-group">
            <label htmlFor="password" className="mb-2">
              Enter new password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2" className="mb-2">
              Verify new password
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
              className="form-control"
              placeholder="Retype password"
              value={password2}
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group mt-1">
            <button onClick={handleResetPassword} className="btn btn-success">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetStudentPassword;
