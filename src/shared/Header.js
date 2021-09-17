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
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Resources</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Subject</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="">Payements</Link>
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
                                <li><Link class="dropdown-item" to="#">Assignment</Link></li>
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