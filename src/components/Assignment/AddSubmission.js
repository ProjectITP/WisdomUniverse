import React,{useEffect, useState} from "react"
import axios from "axios"
import background from './img/back6.jpg'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import valid from "./validations/startdate.js"
let FormData = require('form-data');

export default function AddSubmission(props){

    // const [name,setName] = useState("");
    // const [FromDate,setStartdate] = useState();
    // const [ToDate,setEnddate] = useState(new Date());

    const [Student,setStudent] = useState("");
    const [Assignment,setAssignment] = useState(props.match.params.id);
    const [AttemptDate,setAttemptDate] = useState(Date.now);
    const [file, setFile] = useState(null);

    //console.log(Assignment);

    const onChangeFile=(e)=>{
        //console.log(e.target.files[0])
        //const uploadedFile = e.target.files[0];
        // const uploadedFile = files;
        // setFile(uploadedFile)
        // setFile(uploadedFile);
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    function sendData(e){
    if (file) {
        const config= {
            headers:{
              'content-type':'multipart/form-data',
            }
          };
        e.preventDefault();

        const formData = new FormData();

        formData.append('file',file);
        formData.append("Student",Student);
        formData.append("Assignment",Assignment);
        formData.append("AttemptDate",AttemptDate);
        

        setAttemptDate(Date.now);
        axios.post("http://localhost:8070/attemptsass/add",formData,config).then(()=>{
            alert("Assignment Added")
            window.location = '/i/assignment';
        }).catch((err)=>{
            alert(err);
        })
    }
    else{
        alert("Errrrorrr!!!!")
    }
    }
    // var tovalid = function(current){
    //     return current.isAfter(FromDate);
    // };
    // let fdate = {
    //     name: "FromDate",
    //     placeholder: "From Date",
        
    // };
    // let tdate = {
    //     name: "ToDate",
    //     placeholder: "To Date"
    // };
    return(
        <div style={{ backgroundImage: `url(${background})` , height: "100vh", backgroundSize:"cover"}}>
        <div className="container-sm assign">
            <h2>Add Assignment file</h2>
            <br/><br/>
            <div>
                
            <form enctype="multipart/form-data" onSubmit={sendData} >
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Assignment</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="Assignment"
                            value={Assignment} disabled={true}/>
                            <div id="emailHelp" class="form-text">Type a assignment name</div>
                        </div>
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Student Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="Student"
                            onChange={(e)=>{
                                setStudent(e.target.value)}} />
                            <div id="emailHelp" class="form-text">Type a assignment name</div>
                        </div>
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Assignment Name</label>
                            <input type="file" class="form-control" name="file" id="exampleInputEmail1" filename="filename"
                            onChange={onChangeFile} />
                            <div id="emailHelp" class="form-text">Type a assignment name</div>
                        </div>
                    </div>
                </div>


                {/* <div class="row g-3">
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
                </div> */}
                <br/>
                <button class="btn btn-outline-success btn-lg" role="submit">Submit</button>
            </form>
            </div>
            <br/>
        </div>
        </div>
    )
}