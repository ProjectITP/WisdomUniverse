import React,{useEffect, useState} from "react"
import axios from "axios"

export default function AssignmentAdd(){

    const [name,setName] = useState("");
    const [FromDate,setStartdate] = useState("");
    const [ToDate,setEnddate] = useState("");

    function sendData(e){
        e.preventDefault();

         const newAssignment = {
            name,
            FromDate,
            ToDate
         }

        axios.post("http://localhost:8070/assignment/add",newAssignment).then(()=>{
            alert("Assignment Added")
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        <div className="container-sm">
            <h2>Add Assignment Link</h2>
            <br/><br/>
            <div>
                
            <form onSubmit={sendData}>
                <div class="row g-3">
                    <div class="col-sm-7">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Assignment Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" 
                            onChange={(e)=>{
                                setName(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">Type a assignment name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-3">
                            <label for="exampleInputEmail1" class="form-label">Assignment Availability</label>
                            <input type="date" class="form-control date" id="startdate" placeholder="From date" 
                            onChange={(e)=>{
                                setStartdate(e.target.value);
                            }}
                             />
                            <div id="emailHelp" class="form-text">From date (Unhide the assignment)</div>
                    </div>
                    
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label col-form-label-lg"></label>
                            <input type="date" class="form-control" id="enddate" placeholder="To date" 
                            onChange={(e)=>{
                                setEnddate(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">To date (Expire the assignment)</div>
                    </div>
                </div>
                <br/>
                <button class="btn btn-outline-success btn-lg" role="submit"  >Create New Assignment</button>
            </form>
            </div>
            <br/>
        </div>
    )
}