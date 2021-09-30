import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../utils/notification/notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  nic: "",
  address: "",
  phone: "",
  password: "",
  password2: "",
  err: "",
  success: "",
};

function StudentRegister() {
  const [student, setStudent] = useState(initialState);

  const [gender, setGender] = useState("Male");

  console.log(gender);
  const {
    firstName,
    lastName,
    email,
    nic,
    address,
    phone,
    password,
    password2,
    err,
    success,
  } = student;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(email) ||
      isEmpty(nic) ||
      isEmpty(address) ||
      isEmpty(phone) ||
      isEmpty(gender) ||
      isEmpty(password)
    )
      return setStudent({
        ...student,
        err: "Please fill in all fields",
        success: "",
      });

    if (!isEmail(email))
      return setStudent({
        ...student,
        err: "Invalid Email address",
        success: "",
      });

    if (isLength(password))
      return setStudent({
        ...student,
        err: "Password must be at least 6 characters",
        success: "",
      });

    if (!isMatch(password, password2))
      return setStudent({
        ...student,
        err: "Passwords do not match",
        success: "",
      });

    try {
      const res = await axios.post("/student/register", {
        firstName,
        lastName,
        email,
        nic,
        address,
        phone,
        gender,
        password,
      });

      setStudent({
        ...student,
        err: "",
        success: res.data.msg,
      });
    } catch (err) {
      err.response.data.msg &&
        setStudent({
          ...student,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <section className="content" id="studentRegister">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col">
            <h2 className="h4 text-center subtitle">Register as a student</h2>
            <p className="text-center desc-text">
              To access classes, please register using your details.
            </p>
            <div className="loginForm">
              {err && showErrorMsg(err)}
              {success && showSuccessMsg(success)}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="nic"
                    type="text"
                    placeholder="NIC"
                    value={nic}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="address"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="form-group mb-2">
                  <label id="genderLabel">Gender</label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      label="Male"
                      className="form-check-input"
                      id="male"
                      checked={gender === "Male"}
                      value="Male"
                      onClick={() => setGender("Male")}
                    />
                    Male
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      label="Female"
                      value="Female"
                      checked={gender === "Female"}
                      onClick={() => setGender("Female")}
                    />
                    Female
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="password2"
                    type="password"
                    placeholder="Retype password"
                    value={password2}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3 mt-1 d-flex align-items-center justify-content-between">
                  <button
                    type="submit"
                    className="btn d-inline-block btn-success"
                  >
                    Register
                  </button>
                </div>
                <div className="form-group">
                  <p className="mb-0">
                    Already have an account?
                    <Link to="/studentlogin" className="inline-link">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentRegister;
