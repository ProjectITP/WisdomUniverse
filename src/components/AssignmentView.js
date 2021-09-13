import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"


export default function ViewAssignment() {
    
    const [Assignment, setAssignment]=useState([]);

    function getAssignment(){
        axios.get("http://localhost:8070/assignment/").then((res)=>{
            console.log(res.data);
            setAssignment(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    useEffect(()=>getAssignment(),[]);

    return(
        <div className="container">
            <h2>Assignmentzes</h2>
            <br/><br/>
            <div>
                
                {Assignment.map((Assignment)=>(
                    <ul>
                        <h5><Link to={`/i/assignmentupdate/${Assignment._id}`} style={{textDecoration:'none'}}>{Assignment.name}</Link></h5>
                        
                    </ul>
                    
                ))}
                
                
            </div>
            <br/>
            <div class="d-grid gap-2 col-6 mx-auto">
            <Link to="/i/assignmentadd" class="btn btn-outline-success btn-lg" role="button" >Create New Assignment</Link>
            </div>            
            
        </div>
        
       
      
    )
}