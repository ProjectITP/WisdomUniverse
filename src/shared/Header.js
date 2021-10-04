
import React from 'react'
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const auth = useSelector((state) => state.auth);

  const { student, isLogged } = auth;

  const studentLogout = async () => {
    try {
      await axios.get("/student/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/studentlogin";
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
          <p onClick={studentLogout} className="logout">
            Logout
          </p>
        </p>
      </div>
    );
  };

  return (
    <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/" style={{color:"red"}}>Wisdom Universe</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <Link class="nav-link active" to="/">Home</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Instructor
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link class="dropdown-item" to="/instructor">Instructor</Link></li>
                                <li><Link class="dropdown-item" to="/instructor">All Instructors</Link></li>
                                <li><Link class="dropdown-item" to="/request">All Requests</Link></li>
                                <li><Link class="dropdown-item" to="/register">Sign-up</Link></li>
                                <li><Link class="dropdown-item" to="#">Update Instructor</Link></li>
                                <li><Link class="dropdown-item" to="#">Add Instructor</Link></li>
                                <li><Link class="dropdown-item" to="/reportgenerate">Report Generate</Link></li>                              
                            </ul>
                        </li>                        
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Resources</Link>
                        </li>
                        
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Notices 
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="/feedview">Notices</a></li>
                                <li><a class="dropdown-item" href="/feedAdminview">Admin Notices</a></li>
                                <li><a class="dropdown-item" href="/feedadd"> Notices add</a></li>
                            </ul>
                        </li>
                        <li class="nav-item  dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Subject
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="/ViewSubjectStudent">View Subjects(Student)</a></li>
                                <li><a class="dropdown-item" href="/ViewSubjectInstructor">View Subjects(Instructor)</a></li>
                                <li><a class="dropdown-item" href="/ViewMaterialsStudent">View Materials(Student)</a></li>
                                <li><a class="dropdown-item" href="/ViewMaterialsInstructor">View Materials(Instructor)</a></li>
                                
                            </ul>    
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Payments
                          </a>
                          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/upload">Payments</a></li>
                                <li>< a href="/getPayments" class="dropdown-item" >All Payments</a></li>
                    
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Enrollment
                          </a>
                          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">                        
                                <li><a href ="/viewEnroll" class="dropdown-item" >Enrolled Students</a></li>
                                <li><a href="/enrollKey" class="dropdown-item">Enrolled Keys</a></li>
                                <li><a href="/enrollSub" class="dropdown-item" >Enrollment</a></li>                    
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Assessments
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link class="dropdown-item" to="">Quiz</Link></li>
                                <li><Link class="dropdown-item" to="/i/quiz">View Quiz(I)</Link></li>
                                <li><Link class="dropdown-item" to="/i/quiz">View Quiz(S)</Link></li>
                                <li><Link class="dropdown-item" to="#">Another action</Link></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><Link class="dropdown-item" to="#">Assignment</Link></li>
                                <li><Link class="dropdown-item" to="/i/assignment">View Assignments(I)</Link></li>
                                <li><Link class="dropdown-item" to="/s/assignment">View Assignments(S)</Link></li>
                            </ul>
                        </li> 
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Results
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link class="dropdown-item" to="">Quiz Results</Link></li>
                                <li><Link class="dropdown-item" to="/i/viewresults">View Results(I)</Link></li>
                                <li><Link class="dropdown-item" to="/s/viewresults">View Results(S)</Link></li>
                                <li><Link class="dropdown-item" to="/i/quiz">Add Results(I)</Link></li>
                                <li><Link class="dropdown-item" to="/i/quiz">Update Results(I)</Link></li>
                                <li><Link class="dropdown-item" to="#">Another action</Link></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><Link class="dropdown-item" to="#">Assignment</Link></li>
                                <li><Link class="dropdown-item" to="/i/assignment">View Submissions(I)</Link></li>
                                <li><Link class="dropdown-item" to="#">Assignment</Link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                FeedBack
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="/fbadd">Feedback form</a></li> 
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="/fbview">Feedback View </a></li>
                                <li><a class="dropdown-item" href="/view">Contactus View</a></li>
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
