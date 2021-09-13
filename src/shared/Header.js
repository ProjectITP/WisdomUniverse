import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const auth = useSelector((state) => state.auth);

  const { student, isLogged } = auth;

  const studentLogout = async () => {
    try {
      await axios.get("/student/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const studentLink = () => {
    return (
      <div className="profilePic">
        <img src={student.thumbnail} alt="" className="img-fluid" />
        <p>
          <Link to="/profile" className="personName">
            {student.firstName}
          </Link>
          <Link to="/" onClick={studentLogout} className="logout">
            Logout
          </Link>
        </p>
      </div>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ color: "red" }}>
            Wisdom Universe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Students
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Instructor
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="">
                      Instructor
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      All Instructors
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/request">
                      All Requests
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Sign-up
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Update Instructor
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Add Instructor
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/reportgenerate">
                      Report Generate
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Notices
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Resources
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Subject
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Payements
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Assessments
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="">
                      Quiz
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/i/quiz">
                      View Quiz(I)
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/i/quiz">
                      View Quiz(S)
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Assignment
                    </Link>
                  </li>
                  <li className="dropdown-item">Assignment</li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Assignment
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {isLogged ? (
              studentLink()
            ) : (
              <ul className="signupBlock">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Student
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/studentlogin">
                        Login
                      </Link>
                    </li>
                    <Link className="dropdown-item" to="/studentregister">
                      Register
                    </Link>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
