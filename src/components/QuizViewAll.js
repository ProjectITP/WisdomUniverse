import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"

export default function ViewQuiz() {
    
    const [Quiz, setQuiz]=useState([]);

    function getQuiz(){
        axios.get("http://localhost:8070/quiz/").then((res)=>{
            console.log(res.data);
            setQuiz(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    useEffect(()=>getQuiz(),[]);

    return(
        <div className="container">
            <h2>Quizzes</h2>
            <br/><br/>
            <div>
                
                {Quiz.map((Quiz)=>(
                    <ul>
                        <h5><Link to={`/i/quizupdate/${Quiz._id}`} style={{textDecoration:'none'}}>{Quiz.name}</Link></h5>
                        
                    </ul>
                    
                ))}
                
            </div>
            <br/>
            <div class="d-grid gap-2 col-6 mx-auto">
            <Link to="/i/quizadd" class="btn btn-outline-success btn-lg" role="button" >Create New Quiz</Link>
            </div>
            <h5>Quiz Duration</h5>
            <h5>Quiz Availability</h5>
            <h5>Numbers of Attempts</h5>
            
            
            
        </div>
        
       
      
    )
}