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

    function deleteQuiz(id){
            if(window.confirm("Want to delete it?")){
            axios.delete(`http://localhost:8070/quiz/delete/${id}`).then((res)=>{
                alert("Delete Succesfully");
            }).catch((err)=>{
                alert(err.message);
            })
        }
        window.location = '/i/quiz';
    }
    
    return(
        <div className="container">
            <h2>Quizzes</h2>
            <br/><br/>
            <div>
                
                {Quiz.map((Quiz)=>(
                    <ul>
                        <div class="row g-3">
                            <div class="col-sm-2">
                                <h5><Link to={`/i/quizupdate/${Quiz._id}`} style={{textDecoration:'none'}}>{Quiz.name}</Link></h5>
                            </div>
                            <div class="col-sm-4">
                            <div className="d-grid gap-2 mx-auto">
                                <Link className="btn btn-outline-danger btn-lg" onClick={() => deleteQuiz(`${Quiz._id}`)} role="button">Delete the quiz</Link>
                            </div>
                            </div>
                        </div>
                    </ul>
                ))}
            </div>
            <br/>
            <div class="d-grid gap-2 col-6 mx-auto">
                <Link to="/i/quizadd" class="btn btn-outline-success btn-lg" role="onSubmit">Create New Quiz</Link>
            </div>
        </div>
        
       
      
    )
}