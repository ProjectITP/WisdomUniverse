import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"

export default function ViewResults() {
    
    const [Quiz, setQuiz]=useState([]);
    const [Ass,setAss]=useState([]);

    function getQuiz(){
        axios.get("http://localhost:8070/quiz/").then((res)=>{
            console.log(res.data);
            setQuiz(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    useEffect(()=>getQuiz(),[]);

    function getAss(){
        axios.get("http://localhost:8070/assignment/").then((res)=>{
            console.log(res.data);
            setAss(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    useEffect(()=>getAss(),[]);

    
    
    return(
        <div className="container">
            <br/>

            <h2>Students Results</h2>

            <br/><br/>
            <div>
                {Quiz.map((Quiz)=>(
                    <ul>
                        <div class="row g-3">
                            <div class="col-sm-2">
                                <h5><Link to={`/i/viewquizresults/${Quiz._id}`} style={{textDecoration:'none'}}>{Quiz.name}</Link></h5>

                            </div>
                        </div>
                    </ul>
                ))}
            </div>
            <div>
                {Ass.map((Ass)=>(
                    <ul>
                        <div class="row g-3">
                            <div class="col-sm-2">
                                <h5><Link to={`/i/viewassignresults/${Ass._id}`} style={{textDecoration:'none'}}>{Ass.name}</Link></h5>

                            </div>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    )
}