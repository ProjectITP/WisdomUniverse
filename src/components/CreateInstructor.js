import React, { Component } from 'react';
import axios from 'axios'


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
        <div className="col-md-8 mt-4 mx-auto">
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-header py-3">
          <p class="text-primary m-0 font-weight-bold">Apply For This Job</p>
        </div>
        <h4 className="h3 mb-3 font-weight-normal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Appilcation Form-Instructor</h4>
                <form className="needs-validation" noValidate>
                <div class="row">
                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >First Name</label>
                        <input type="text"
                        className="form-control"
                        name="firstname"
                        placeholder="Enter First Name"
                        value={this.state.firstname}
                        onChange={this.handleInputChange}/>
                    </div>
                    </div>

                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Last Name</label>
                        <input type="text"
                        className="form-control"
                        name="lastname"
                        placeholder="Enter Last Name"
                        value={this.state.lastname}
                        onChange={this.handleInputChange}/>
                    </div>
                    </div>
                    </div>

                    <div class="row">
                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >DOB</label>
                            <input type="date" 
                                class="datepicker" 
                                data-date-format="mm/dd/yyyy" 
                                className="form-control"
                                name="dob"
                                value={this.state.dob}
                                onChange={this.handleInputChange}/>
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
                        onChange={this.handleInputChange}/>
                    </div>


                    <div class="row">
                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >NIC</label>
                        <input type="text"
                        className="form-control"
                        name="nic"
                        placeholder="Enter NIC"
                        value={this.state.nic}
                        onChange={this.handleInputChange}/>
                    </div>
                    </div>

                    <div class="col">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Phone No</label>
                        <input type="text"
                        className="form-control"
                        name="phoneno"
                        placeholder="Enter Phone no"
                        value={this.state.phoneno}
                        onChange={this.handleInputChange}/>
                    </div>
                    </div>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Email</label>
                        <input type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputChange}/>
                    </div>                  

                    <div class="row">
                    <div class="col">
                    <label style={{marginBottom:'5px'}} >Highest Educational Qualification</label>
                    <br/>
                    <select name="hequalification" 
                    style={{width:'400px',height:'34px'}}
                    required
                    value={this.state.hequalification}
                    onChange={this.handleInputChange}>
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
                    onChange={this.handleInputChange}>
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

                
                        
                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                        
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Send Application &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                </form> 
            </div>
        </div>
        );
        }
}