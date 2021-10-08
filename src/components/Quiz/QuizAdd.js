import React,{useEffect, useState} from "react"
import axios from "axios"
//import background from './img/back6.jpg'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import valid from "./validations/startdate.js";


export default function QuizAdd(){

    const [name,setName] = useState();
    const [duration,setDuration] = useState();
    const [FromDate,setStartdate] = useState();
    const [ToDate,setEnddate] = useState();
    const [Attempts,setAttempts] = useState();

    function sendData(e){
        e.preventDefault();

         const newQuiz = {
            name,
            duration,
            FromDate,
            ToDate,
            Attempts
        }

        axios.post("http://localhost:8070/quiz/addquiz",newQuiz).then(()=>{
            alert("Quiz Added")
            window.location = '/i/quiz';
        }).catch((err)=>{
            alert(err);
        })
    }
    var tovalid = function(current){
        return current.isAfter(FromDate);
    };
    let fdate = {
        name: "FromDate",
        placeholder: "From Date",
        required:true
        
    };
    let tdate = {
        name: "ToDate",
        placeholder: "To Date",
        required:true
    };
    

    return(
        <div className="container-sm">
            <h2>Add New Quiz</h2>
            <br/><br/>
            <div>
                
            <form className="needs-validation" novalidate onSubmit={sendData}>
                <div class="row g-3">
                    <div class="col-sm-7">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Quiz Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" required={true} 
                            onChange={(e)=>{
                                setName(e.target.value);
                            }} required={true} />
                            <div id="emailHelp" class="form-text">Type a quiz name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-7">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Duration</label>
                            <input type="Number" class="form-control" id="exampleInputEmail1" required={true} 
                            onChange={(e)=>{
                                setDuration(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">Type the duration in mintues</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-3">
                            <label for="exampleInputEmail1" class="form-label">Quiz Availability</label>
                             <Datetime isValidDate={valid} dateFormat="DD-MM-YYYY"  inputProps={fdate} onChange={ e=>setStartdate(e)}/>
                            <div id="emailHelp" class="form-text">From date (Unhide the quiz)</div>
                    </div>
                    
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label col-form-label-lg"></label>
                            <Datetime isValidDate={tovalid} dateFormat="DD-MM-YYYY" selectsEnd inputProps={tdate} minDate={FromDate} onChange={ e=>setEnddate(e)} />
                            <div id="emailHelp" class="form-text">To date (Expire the quiz)</div>
                    </div>
                </div>
                <br/>
                <div class="row g-3">
                    <div class="col-sm-7">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Number Of Attempts</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" min="1" required={true} 
                             onChange={(e)=>{
                                setAttempts(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">Minimum 1 attempt</div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-outline-success btn-lg" role="submit"  >Create New Quiz</button>
            </form>
            </div>
            <br/>
        </div>
    )
}