import React,{ Component } from "react"
import axios from "axios"
import background from './img/back6.jpg'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import valid from "./validations/startdate.js"
import dateFormat from "dateformat";
import moment from "moment";
import Select from 'react-select';


const options = [
    { value: 'true', label: 'Publish' },
    { value: 'false', label: 'Not Publish' }
  ];
export default class AssignmentUpd extends Component{
     
    constructor(props) {
        super(props);
        this.state={
            name:"",
            subject:"",
            instructor:"",
            FromDate:"",
            ToDate:"",
            PublishStatus:""
        };
    }


    componentDidMount(){

        const id = this.props.match.params.id
        //http://localhost:8070/Quiz/get/${id}
        //http://localhost:8070/assignment/613ddc2eddc0bc5078269d14
        // axios.get(`http://localhost:8070/Quiz/get/${id}`).then((res) => {
        //     this.setState({
        //         name:res.data.Quiz.name,
        //         duration:res.data.Quiz.duration,
        //         FromDate:res.data.Quiz.FromDate,
        //         ToDate:dateFormat(res.data.Quiz.ToDate,"yyyy-mm-dd"),
        //         Attempts:res.data.Quiz.Attempts
        //         //  FromDate:res.data.Assignment.FromDate,
        //         //  cuDate:new Date()
        //     });
        //     console.log(res.data);
        //     // console.log(dateFormat(today,))
        //     //console.log(dateFormat(res.data.Quiz.FromDate, "yyyy-mm-dd HH:mm:ss"))
        // });
        axios.get(`http://localhost:8070/assignment/${id}`).then((res)=>{
            this.setState({
                //alert("Assignment Fetch")
                name:res.data.Assignment.name,
                subject:res.data.Assignment.subject,
                instructor:res.data.Assignment.instructor,
                FromDate:res.data.Assignment.FromDate,
                ToDate:res.data.Assignment.ToDate,
                PublishStatus:res.data.Assignment.PublishStatus
            });
            console.log(res.data)
        });
    }

    // handleInputChange=(e)=>{
    //     this.setState({
    //         ...this.state,
    //         [e.target.name]:e.target.value
    //     })
    // }
    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ 
            PublishStatus: selectedOption
        });
        console.log(`Option selected:`, selectedOption);
    };

    handleFromDate=(event)=>{
        this.setState({...this.state, FromDate: event})
    };
    handleToDate=(event)=>{
        this.setState({...this.state, ToDate: event}) 
    };
    sendData=(e)=>{
        const id = this.props.match.params.id
        const {name,subject,instructor,FromDate,ToDate, PublishStatus} = this.state
        const updass={
            name:name,
            subject:subject,
            instructor:instructor,
            FromDate:FromDate,
            ToDate:ToDate,
            PublishStatus:PublishStatus,
        }

        axios.put(`http://localhost:8070/assignment/update/${id}`,updass).then((res)=>{
            this.setState({
                //alert("Assignment Fetch")
                name:"",
                subject:"",
                instructor:"",
                FromDate:"",
                ToDate:"",
                PublishStatus:""
                
            });
            alert("Assignment Updated")
            console.log(res.data);
            window.location = '/i/assignment';
        }).catch((err)=>{
            alert(err);
        })
    }
    valid = function(current) {
        var yesterday = moment().add(1, 'hours');
        return current.isAfter(yesterday);
    }
    tovalid =(current)=>{
        return current.isAfter(this.state.FromDate);
    };
    fdate = {
        name: "FromDate",
        placeholder: "From Date",
        required: true
        
    };
    tdate = {
        name: "ToDate",
        placeholder: "To Date",
        required: true
    };
    render(){
        // const { selectedOption } = this.state;
    return(
        <div style={{ backgroundImage: `url(${background})` , height: "100vh", backgroundSize:"cover"}}>
        <div className="container-sm assign">
            <h2>Assignment Update</h2>
            <br/><br/>
            <h4>Assignment Availability</h4>
            <h5>From {dateFormat(this.state.FromDate,"dd/mm/yyyy HH:MM:ss")} - To {dateFormat(this.state.ToDate,"dd/mm/yyyy HH:MM:ss")}</h5>
            <br/>
            <div>
                
            <form>
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Assignment Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="name" value={this.state.name} onChange={this.handleInputChange} required={true}/>
                            <div id="emailHelp" class="form-text">Type a assignment name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Subject Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" value={this.state.subject} name="subject" onChange={this.handleInputChange} required={true}/>
                            <div id="emailHelp" class="form-text">Type the subject name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-8">
                        <div class="mb-3 col">
                            <label for="exampleInputEmail1" class="form-label">Instructor Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" name="instructor" value={this.state.instructor} onChange={this.handleInputChange} required={true}/>
                            <div id="emailHelp" class="form-text">Type the instructor name</div>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label">Assignment Availability</label>
                            <Datetime isValidDate={this.valid} dateFormat="DD-MM-YYYY"  inputProps={this.fdate} value={this.state.FromDate} onChange={this.handleFromDate} required={true}/>
                            <div id="emailHelp" class="form-text">From date (Unhide the assignment)</div>
                    </div>
                   
                    <div class="col-sm-4">
                            <label for="exampleInputEmail1" class="form-label col-form-label-lg"></label>
                            <Datetime isValidDate={this.tovalid} dateFormat="DD-MM-YYYY" selectsEnd inputProps={this.tdate} minDate={this.state.FromDate} onChange={this.handleInputChange} required={true}/>
                            <div id="emailHelp" class="form-text">To date (Expire the assignment)</div>
                    </div>
                </div>
                <div class="row g-3">
                <div class="col-sm-8">
                <label for="exampleInputEmail1" class="form-label col-form-label-lg">Publication Status: <b>{this.state.PublishStatus.toString()}</b></label>
                {/* <Select value={this.state.PublishStatus} onChange={this.handleChange} options={options}/> */}
                <select class="form-select" value={this.state.PublishStatus} name="PublishStatus" onChange={this.handleInputChange}  aria-label="Default select example">
                    <option>true</option>
                    <option>false</option>
                </select>
                {/* <select name="gender" 
                        style={{width:'400px',height:'34px'}}
                        required
                            value={this.state.gender}
                            onChange={this.handleInputChange}>
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select> */}
                
                </div>
                </div>
                <br/>
                <button class="btn btn-outline-success btn-lg" role="submit" onClick={this.sendData}>Update the Assignment</button>
            </form>
            </div>
            <br/>
        </div>
        </div>
    )
    }
}