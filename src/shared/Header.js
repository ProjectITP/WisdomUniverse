import React from 'react'

function Header(){

    return(
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#" style={{color:"red"}}>Wisdom Universe</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">Notices</a> 
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Resources</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Subject</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Payements</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Assessments
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="">Quiz</a>
                        <a class="dropdown-item" href="/aadd">Add Quiz</a>
                        <a class="dropdown-item" href="">View Quiz</a>
                        
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Assignment</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            
        </div>
    </nav>
    )
}

export default Header;