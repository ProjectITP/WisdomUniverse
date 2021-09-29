import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"

export default function ViewQuiz() {
    
    const [students, setStudents] = useState([]);    //students is an empty array 

    useEffect(()=>{getStudents()}, [])
        function getStudents() {
            axios.get("http://localhost:8070/student/").then((res)=> {
                //console.log(res.data);
                setStudents(res.data);      //setStudents is the method used to set the data to the array
            }).catch((err)=> {
                alert(err.message);
            })
        }

    return(
        <div>

            <div className="container">
                <h2>Assignment</h2>
                <br/><br/>
                <div>
                    
                
                    
                </div>
                <br/>
                <div class="d-grid gap-2 col-6 mx-auto">
                <Link to="/i/quizadd" class="btn btn-outline-success btn-lg" role="button" >Create New Quiz</Link>
                </div>
                <h5>Quiz Duration</h5>
                <h5>Quiz Availability</h5>
                <h5>Numbers of Attempts</h5>

        </div>

        </div>
        
       
      
    )
}