import React,{useEffect, useState} from "react"
import axios from "axios"
import background from './img/back6.jpg'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import valid from "./validations/startdate.js"

export default function AssignmentAdd(){

    
    const [name,setName] = useState("");
    const [subject,setSubject] = useState("");
    const [instructor,setInst] = useState("");
    const [FromDate,setStartdate] = useState();
    const [ToDate,setEnddate] = useState(new Date());

    function sendData(e){
        e.preventDefault();

         const newAssignment = {
            name,
            subject,
            instructor,
            FromDate,
            ToDate
         }

        axios.post("http://localhost:8070/assignment/add",newAssignment).then(()=>{
            alert("Assignment Added")
            window.location = '/i/assignment';
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
        <div style={{ backgroundImage: `url(${background})` , height: "100vh", backgroundSize:"cover"}}>
        <div className="container-sm assign">
            <h2>Add Assignment Link</h2>
            <br/><br/>
            <div>
                
            <form onSubmit={sendData}>
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Assignment Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="name" required={true} 
                            onChange={(e)=>{
                                setName(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">Type a assignment name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Subject Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="subject" required={true} 
                            onChange={(e)=>{
                                setSubject(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">Type the subject name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Instructor Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="name" required={true} 
                            onChange={(e)=>{
                                setInst(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">Type the instructor name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label">Assignment Availability</label>
                            <Datetime isValidDate={valid} dateFormat="DD-MM-YYYY"  inputProps={fdate} onChange={ e=>setStartdate(e)}/>
                            <div id="emailHelp" class="form-text">From date (Unhide the assignment)</div>
                    </div>
                   
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label col-form-label-lg"></label>
                            <Datetime isValidDate={tovalid} dateFormat="DD-MM-YYYY" selectsEnd inputProps={tdate} minDate={FromDate} onChange={ e=>setEnddate(e)}/>
                            <div id="emailHelp" class="form-text">To date (Expire the assignment)</div>
                    </div>
                </div>
                <br/>
                <button class="btn btn-outline-success btn-lg" role="submit">Create New Assignment</button>
            </form>
            </div>
            <br/>
        </div>
        </div>
    )
}