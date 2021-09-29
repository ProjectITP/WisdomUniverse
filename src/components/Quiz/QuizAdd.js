import React,{useEffect, useState} from "react"
import axios from "axios"

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
        }).catch((err)=>{
            alert(err);
        })
    }

    

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
                            <input type="text" class="form-control" id="exampleInputEmail1" 
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
                            <input type="Number" class="form-control" id="exampleInputEmail1" 
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
                            <input type="datetime-local" class="form-control date" id="txtDate" placeholder="From date" 
                            onChange={(e)=>{
                                setStartdate(e.target.value);
                            }}
                             />
                            <div id="emailHelp" class="form-text">From date (Unhide the quiz)</div>
                    </div>
                    
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label col-form-label-lg"></label>
                            <input type="datetime-local" class="form-control" id="enddate" placeholder="To date" 
                            onChange={(e)=>{
                                setEnddate(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">To date (Expire the quiz)</div>
                    </div>
                </div>
                <br/>
                <div class="row g-3">
                    <div class="col-sm-7">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Number Of Attempts</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" min="1"
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