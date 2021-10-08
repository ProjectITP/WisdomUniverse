import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import background from './img/back.jpg'
import dateFormat from "dateformat";

export default function ViewSubmission(props) {

    const [Assignment, setAssignment]=useState([]);
    
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [FromDate,setFromdate] = useState("");
    const [ToDate,setTodate] = useState("");


    function getAssignment(){
        const id = props.match.params.id
        axios.get(`http://localhost:8070/assignment/${id}`).then((res)=>{
                console.log(res.data);
                setId(res.data.Assignment._id);
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
                <h2>{name}</h2>
            <br/><br/>
            <div>
                <ul>
                    <h5>Assignment Status</h5>
                </ul>
                Submission status	No attempt
                Grading status	Not graded
                Time remaining	9 days 10 hours
                Last modified	-
                <table class="table">
                    <tbody>
                        <tr>
                        
                        <td>Submission status</td>
                        <td>attempt</td>
      
                        </tr>
                        <tr>
                        
                        <td>Due date</td>
                        <td>{dateFormat(ToDate,"ddd mmm dd yyyy HH:MM:ss")}</td>
             
                        </tr>
                        <tr>
                        <td>Larry the Bird</td>
                        <td><Link className="btn btn-outline-danger" to={`/s/submission/upload/${id}`}  role="button">Add assignment</Link></td>
                        {/* onClick={() => deleteAssignment(`${Assignment._id}`)} */}
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>           
            
        </div>
    )
}