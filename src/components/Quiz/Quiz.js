import React,{useEffect, useState} from "react"
import axios from "axios"


export default function ViewQuestion(){
    
    const [Quiz, setQuiz]=useState([]);

    function getQuiz(){
        axios.get("http://localhost:8070/assessment/").then((res)=>{
            console.log(res.data);
            setQuiz(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    useEffect(()=>getQuiz(),[]);

    return(
        <div className="container">
            <h3>View Quiz</h3>

            <div>
                {Quiz.map(Quiz=>(
                    <p>{Quiz.name}</p>
                ))}
            </div>
        </div>
    )
}