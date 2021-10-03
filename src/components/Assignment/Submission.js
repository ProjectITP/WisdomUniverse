import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import background from './img/back.jpg'

export default function ViewSubmission(props) {
    
    const [name,setName] = useState("");
    const [FromDate,setFromdate] = useState("");
    const [ToDate,setTodate] = useState("");


    function getAssignment(){
        axios.get("http://localhost:8070/assignment/${id}").then((res)=>{
            console.log(res.data);
                setName(res.data.Assignment.name);
                setFromdate(res.data.Assignment.FromDate);
                setTodate(res.data.Assignment.ToDate);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    useEffect(()=>getAssignment(),[]);


    // useEffect(() => { 
    //     const getall = ()=>{
    //     const id = props.match.params.id

    //         axios.get(`http://localhost:8070/assignment/${id}`).then((res)=>{
    //             //alert("Assignment Fetch")
    //             console.log(res.data);
    //             setName(res.data.Assignment.name);
    //             setFromdate(res.data.Assignment.FromDate);
    //             setTodate(res.data.Assignment.ToDate);
    //         }).catch((err)=>{
    //             alert(err);
    //         })
    //     }
    //     getall();
    // },[]);

    return(
        // <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <div className="container">
            <h2>Assignment Status</h2>
            <br/><br/>
            <div>
                
                    <ul>
                        <h5><Link to={`/s/submission/`} style={{textDecoration:'none'}}>{name}</Link></h5>
                    </ul>
                
            </div>
            <br/>           
            
        </div>
    )
}