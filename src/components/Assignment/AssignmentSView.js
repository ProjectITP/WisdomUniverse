import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import {saveAs} from 'file-saver';
import background from './img/back6.jpg'
import './css/assign.css'


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
        <div style={{ backgroundImage: `url(${background})` , height: "100vh", backgroundSize:"cover"}}>
        <div className="container assign">
            <h2>Assignments</h2>
            
            <br/><br/>
            <div>
                {Assignment.map((Assignment)=>(
                    <ul>
                        <h5><Link to={`/s/submission/${Assignment._id}`} style={{textDecoration:'none'}}>{Assignment.name}</Link></h5>
                    </ul>
                ))}
            </div>
            <br/>           
            
        </div>
        </div>
    )
}