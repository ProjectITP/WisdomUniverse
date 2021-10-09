import React, { Component } from 'react';
import axios from 'axios'
import '../instructor.css';


export default class CreateInstructor extends Component {
    constructor(props){
        super(props);
        this.state={
            firstname:"",
            lastname:"",
            dob:"",
            gender:"",
            address:"",
            nic:"",
            email:"",
            phoneno:"",
            hequalification:"",
            subject:""
        }
    }
    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) => {

        e.preventDefault();

        const {firstname,lastname,dob,gender,address,nic,email,phoneno,hequalification,subject} = this.state;

        const data ={
            firstname:firstname,
            lastname:lastname,
            dob:dob,
            gender:gender,
            address:address,
            nic:nic,
            email:email,
            phoneno:phoneno,
            hequalification:hequalification,
            subject:subject
        }
        console.log(data)
        axios.post("http://localhost:8070/lecturer/save",data).then((res) =>{
            if(res.data.success){
                this.setState(
                    {
                        firstname:"",
                        lastname:"",
                        dob:"",
                        gender:"",
                        address:"",
                        nic:"",
                        email:"",
                        phoneno:"",
                        hequalification:"",
                        subject:""
                    }
                )
            }
        })       
    }
    render() {
        return (
            <div className='bannerr-image'>
        <div className="col-md-8 mt-4 mx-auto">
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-header py-3">
          <p class="text-primary m-0 font-weight-bold">Apply For This Job</p>
        </div>
        <h4 className="h3 mb-3 font-weight-normal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Appilcation Form-Instructor</h4>
                <form onSubmit={this.onSubmit}>
                <div class="row">
                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >First Name</label>
                        <input type="text"
                        className="form-control"
                        name="firstname"
                        placeholder="Enter First Name"
                        pattern="[a-z A-Z .]+"
                        value={this.state.firstname}
                        onChange={this.handleInputChange} required/>
                    </div>
                    </div>

                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Last Name</label>
                        <input type="text"
                        className="form-control"
                        name="lastname"
                        placeholder="Enter Last Name"
                        pattern="[a-z A-Z .]+"
                        value={this.state.lastname}
                        onChange={this.handleInputChange} required/>
                    </div>
                    </div>
                    </div>

                    <div class="row">
                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >DOB</label>
                            <input type="date" 
                                //min="2020-10-05" 
                                max="2021-10-05"
                                class="datepicker" 
                                data-date-format="mm/dd/yyyy" 
                                className="form-control"
                                name="dob"
                                value={this.state.dob}
                                onChange={this.handleInputChange} required/>
                    </div>
                    </div>

                    <div class="col">
                    <label style={{marginBottom:'5px'}} >Gender</label>
                        <br/>
                        <select name="gender" 
                        style={{width:'400px',height:'34px'}}
                        required
                            value={this.state.gender}
                            onChange={this.handleInputChange}>
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    </div>
                          
                    
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Address</label>
                        <input type="text"
                        className="form-control"
                        name="address"
                        placeholder="Enter Address"
                        value={this.state.address}
                        onChange={this.handleInputChange} required/>
                    </div>


                    <div class="row">
                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >NIC</label>
                        <input type="text"
                        className="form-control"
                        name="nic"
                        placeholder="Enter NIC"
                        pattern="[0-9]{9}[vVxX]" 
                        value={this.state.nic}
                        onChange={this.handleInputChange} required/>
                    </div>
                    </div>

                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Phone No</label>
                        <input type="text"
                        className="form-control"
                        name="phoneno"
                        placeholder="Enter Phone no"
                        pattern="[0-9]{10}"
                        value={this.state.phoneno}
                        onChange={this.handleInputChange} required/>
                    </div>
                    </div>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Email</label>
                        <input type="email"
                        className="form-control"
                        name="email"
                        placeholder="example@gmail.com"
                        value={this.state.email}
                        onChange={this.handleInputChange} required/>
                    </div>                  

                    <div class="row">
                    <div class="col">
                    <label style={{marginBottom:'5px'}} >Highest Educational Qualification</label>
                    <br/>
                    <select name="hequalification" 
                    style={{width:'400px',height:'34px'}}
                    required
                    value={this.state.hequalification}
                    onChange={this.handleInputChange} required>
                    <option>Select Highest Edu: Qualification</option>
                    <option>Diploma</option>
                    <option>Higher Diploma</option>
                    <option>Bachelors Degree</option>
                    <option>Masters Degree</option>
                    <option>Doctorate</option>
                    </select>
                    </div>
                    
                    <div class="col">
                    <label style={{marginBottom:'5px'}} >Subject</label>
                    <br/>
                    <select name="subject" 
                    style={{width:'400px',height:'34px'}}
                    required
                    value={this.state.subject}
                    onChange={this.handleInputChange} required>
                    <option>Select Subject</option>
                    <option>Combined Maths</option>
                    <option>Physics</option>
                    <option>Biology</option>
                    <option>Statistics</option>
                    <option>Accounting</option>
                    <option>Econ</option>
                    <option>IT</option>
                    <option>History</option>
                    </select>
                    </div>
                    </div>

                
                        
                    <center>    
                        <button className="btn btn-success" type="submit" style={{marginTop:'15px', width: '100%'}}>
                            Send Application 
                        </button>
                    </center>

                   
                </form> 
                <center>    
                        <button className="btn btn-danger" style={{marginTop:'15px', width: '100%'}}
                        onClick={(e) => {
                            this.setState({
                                firstname:"Sanjaya",
                                lastname:"Kumbalathara",
                                dob:"1988-02-28",
                                gender:"Male",
                                address:"Kaluthara",
                                nic:"889878765V",
                                email:"sanjaya@gmail.com",
                                phoneno:"0712345768",
                                hequalification:"Masters Degree",
                                subject:"Biology"
                            });
                        }}>
                            Demo
                        </button>
                    </center>
            </div>
        </div>
        </div>
        );
        }
}