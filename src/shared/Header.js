import React from 'react'
import {Link} from 'react-router-dom';

function Header(){

    return(
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
                      <a class="nav-link active" href="">Home</a>

                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="">Students</Link>
                        </li>


                       

                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Instructor
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">

                                <li><Link class="dropdown-item" to="">Instructor</Link></li>
                                <li><Link class="dropdown-item" to="/">All Instructors</Link></li>
                                <li><Link class="dropdown-item" to="/request">All Requests</Link></li>
                                <li><Link class="dropdown-item" to="/register">Sign-up</Link></li>
                                <li><Link class="dropdown-item" to="#">Update Instructor</Link></li>
                                <li><Link class="dropdown-item" to="#">Add Instructor</Link></li>
                                <li><Link class="dropdown-item" to="/reportgenerate">Report Generate</Link></li>                              
                            </ul>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="">Notices</Link> 
                        </li>

                                <li><a class="dropdown-item" href="/instructor">All Instructors</a></li>
                                <li><a class="dropdown-item" href="/request">All Requests</a></li>
                                <li><a class="dropdown-item" href="/register">Sign-up</a></li>
                                <li><a class="dropdown-item" href="/reportgenerate">Report Generate</a></li>
                                                                
                            </ul>
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
                      
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Resources</Link>
                        </li>

                        <li class="nav-item">
                            <Link class="nav-link" to="#">Subject</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="">Payements</Link>

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
                                <li><Link class="dropdown-item" to="#">Assignment</Link></li>
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
                </div>
            </div>
        </nav>
    </div>
    )
}

export default Header;