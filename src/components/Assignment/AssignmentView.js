import React,{useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import background from './img/back6.jpg'
import './css/assign.css'
import { format } from "date-fns";
import pdf from "pdf-creator-node";


export default function ViewAssignment() {
    var fs = require('fs');
    var html = fs.readFileSync("template.html", "utf8");
    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };
    var users = [
        {
          name: "Shyam",
          age: "26",
        },
        {
          name: "Navjot",
          age: "26",
        },
        {
          name: "Vitthal",
          age: "26",
        },
      ];
      var document = {
        html: html,
        data: {
          users: users,
        },
        path: "./output.pdf",
        type: "",
      };
    function generate(){
        pdf
            .create(document, options)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
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
    function deleteAssignment(id){
            if(window.confirm("Want to delete it?")){
            axios.delete(`http://localhost:8070/assignment/delete/${id}`).then((res)=>{
                alert("Delete Succesfully");
            }).catch((err)=>{
                alert(err.message);
            })
        }
        window.location = '/i/assignment';
    }
    //console.log(Assignment[0].FromDate);
    //let changeddate = format(Assignment[0].FromDate,"MMMM do, yyyy HH:mma");
    return(
         <div style={{ backgroundImage: `url(${background})` , height: "100vh", backgroundSize:"cover"}}>
            <div className="container assign">
            <center><h2>Assignments</h2></center>
            <div class="row justify-content-end">
                <div class="col-4">
                    <Link onClick={generate} class="btn btn-warning btn-lg" role="button" >Generate Report</Link>
                </div>
            </div>
               
            <br/>
            <div>
                {Assignment.map((Assignment)=>(
                    <ul>
                        <div class="row g-3">
                            <div class="col-sm-2">
                                <h5><Link to={`/i/assignmentupdate/${Assignment._id}`} style={{textDecoration:'none'}}>{Assignment.name}</Link></h5>
                            </div>
                            {/* {Assignment.FromDate} */}
                            {/* {changeddate} */}
                            <div class="col-sm-4">
                                <Link className="btn btn-outline-danger btn-lg" onClick={() => deleteAssignment(`${Assignment._id}`)} role="button">Delete the assignment</Link>
                            </div>
                        </div>
                    </ul>
                ))}
            </div>
            <br/>

            {/* <div>
                {Quiz.map((Quiz)=>(
                    <ul>
                        <div class="row g-3">
                            <div class="col-sm-2">
                                <h5><Link to={`/i/quizupdate/${Quiz._id}`} style={{textDecoration:'none'}}>{Quiz.name}</Link></h5>
                            </div>
                            <div class="col-sm-4">
                            <div className="d-grid gap-2 mx-auto">
                                <Link className="btn btn-outline-danger btn-lg" onClick={() => deleteQuiz(`${Quiz._id}`)} role="button">Delete the quiz</Link>
                            </div>
                            </div>
                        </div>
                    </ul>
                ))}
            </div> */}


            <div class="d-grid gap-2 col-6 mx-auto">
            <Link to="/i/assignmentadd" class="btn btn-outline-success btn-lg" role="button" >Create New Assignment</Link>
            </div>            
            </div>
         </div>
    )
}