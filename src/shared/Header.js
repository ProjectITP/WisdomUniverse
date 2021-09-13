import React from 'react'

function Header(){

    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" style={{color:"red"}}>Wisdom Universe</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Students</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Instructor
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="">Instructor</a></li>
                                <li><a class="dropdown-item" href="/">All Instructors</a></li>
                                <li><a class="dropdown-item" href="/request">All Requests</a></li>
                                <li><a class="dropdown-item" href="/register">Sign-up</a></li>
                                <li><a class="dropdown-item" href="#">Update Instructor</a></li>
                                <li><a class="dropdown-item" href="#">Add Instructor</a></li>
                                <li><a class="dropdown-item" href="/reportgenerate">Report Generate</a></li>
                                                                
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Notices</a> 
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Resources</a>
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
                        <li class="nav-item">
                            <a class="nav-link" href="">Payements</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Assessments
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="">Quiz</a></li>
                                <li><a class="dropdown-item" href="/i/quiz">View Quiz(I)</a></li>
                                <li><a class="dropdown-item" href="/i/quiz">View Quiz(S)</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Assignment</a></li>
                                <li class="dropdown-item">Assignment</li>
                                <li><a class="dropdown-item" href="#">Assignment</a></li>
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