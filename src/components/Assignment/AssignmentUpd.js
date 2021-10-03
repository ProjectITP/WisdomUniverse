import React,{useEffect, useState} from "react"
import axios from "axios"
import background from './img/back6.jpg'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import valid from "./validations/startdate.js"
import dateFormat from "dateformat";

export default function AssignmentUpd(props){
    
    const [name,setName] = useState("");
    const [FromDate,setFromdate] = useState("");
    const [ToDate,setTodate] = useState("");

    useEffect(() => { 
        const getall = ()=>{
        const id = props.match.params.id

            axios.get(`http://localhost:8070/assignment/${id}`).then((res)=>{
                //alert("Assignment Fetch")
                console.log(res.data);
                setName(res.data.Assignment.name);
                setFromdate(res.data.Assignment.FromDate);
                setTodate(res.data.Assignment.ToDate);
            }).catch((err)=>{
                alert(err);
            })
        }
        getall();
    },[]);
    
    var tovalid = function(current){
        return current.isAfter(FromDate);
    };
    function sendData(e){
        const id = this.props.match.params.id

        axios.put(`http://localhost:8070/assignment/update/${id}`).then((res)=>{
            alert("Assignment Updated")
            console.log(res.data);
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
        placeholder: "From Date"
        
    };
    let tdate = {
        name: "ToDate",
        placeholder: "To Date"
    };
    return(
        <div style={{ backgroundImage: `url(${background})` , height: "100vh", backgroundSize:"cover"}}>
        <div className="container-sm assign">
            <h2>Assignment Update</h2>
            <br/><br/>
            <h4>Assignment Availability</h4>
            <h5>From {dateFormat(FromDate,"dd/mm/yyyy HH:MM:ss")} - To {dateFormat(ToDate,"dd/mm/yyyy HH:MM:ss")}</h5>
            <br/>
            <div>
                
            {/* <form onSubmit={sendData}> */}
            <form>
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Assignment Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="name" value={name}
                            onChange={(e)=>{
                                setName(e.target.value);
                            }} />
                            <div id="emailHelp" class="form-text">Type a assignment name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label">Assignment Availability</label>
                            <Datetime isValidDate={valid} dateFormat="DD-MM-YYYY"  inputProps={fdate} onChange={ e=>setFromdate(e)} value={FromDate}/>
                            <div id="emailHelp" class="form-text">From date (Unhide the assignment)</div>
                    </div>
                   
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label col-form-label-lg"></label>
                            <Datetime isValidDate={tovalid} dateFormat="DD-MM-YYYY" selectsEnd inputProps={tdate} minDate={FromDate} onChange={ e=>setTodate(e)}/>
                            <div id="emailHelp" class="form-text">To date (Expire the assignment)</div>
                    </div>
                </div>
                <br/>
                <button class="btn btn-outline-success btn-lg" role="submit">Update the Assignment</button>
            </form>
            </div>
            <br/>
        </div>
        </div>
    )
}