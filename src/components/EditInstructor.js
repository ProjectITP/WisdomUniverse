import React, { Component } from 'react';
import axios from 'axios';

export default class EditInstructor extends Component {

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
        const id = this.props.match.params.id;

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
        axios.put(`http://localhost:8070/instructor/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Instructor's Data Updated Successfully")
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

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/instructor/${id}`).then((res) =>{
            if(res.data.success) {
                this.setState({
                    firstname:res.data.instructor.firstname,
                    lastname:res.data.instructor.lastname,
                    dob:res.data.instructor. dob,
                    gender:res.data.instructor.gender,
                    address:res.data.instructor.address,
                    nic:res.data.instructor.nic,
                    email:res.data.instructor.email,
                    phoneno:res.data.instructor.phoneno,
                    hequalification:res.data.instructor.hequalification,
                    subject:res.data.instructor.subject
                });

                console.log(this.state.instructor);
            }
        });
    }

    render() {
        return (
        <div className="col-md-8 mt-4 mx-auto">
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <h4 className="h3 mb-3 font-weight-normal">Profile</h4>
                <form className="needs-validation" noValidate>
                <div class="card shadow">
                <div class="card-header py-3">
                    <p class="text-primary m-0 font-weight-bold">User Settings</p>
                </div>
                <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >First Name</label>
                                <input type="text" class="form-control" name="firstname" placeholder="First name" value={this.state.firstname} onChange={this.handleInputChange} aria-label="First name"></input>
                        </div>
                    </div>

                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >Last Name</label>
                                <input type="text" class="form-control" name="lastname" placeholder="Last name" value={this.state.lastname} onChange={this.handleInputChange} aria-label="Last name"></input>
                    </div>
                    </div>
                </div>    

                <div class="row">
                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >DOB</label>
                                <input type="text" class="form-control" name="dob" placeholder="DOB" value={this.state.dob} onChange={this.handleInputChange} aria-label="DOB"></input>
                        </div>
                    </div>

                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >Gender</label>
                                <input type="text" class="form-control" name="gender" placeholder="Gender" value={this.state.gender} onChange={this.handleInputChange} aria-label="Gender"></input>
                        </div>
                    </div>
                </div>           

                <div class="row">
                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >Mobile Number</label>
                                <input type="text" class="form-control" name="phoneno" placeholder="Mobile Number" value={this.state.phoneno} onChange={this.handleInputChange} aria-label="Mobile Number"></input>
                        </div>
                    </div>

                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >NIC</label>
                                <input type="text" class="form-control" name="nic" placeholder="NIC" value={this.state.nic} onChange={this.handleInputChange} aria-label="NIC"></input>
                        </div>
                    </div>
                </div>   

                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >Address</label>
                                <input type="text" class="form-control" name="address" placeholder="Adress" value={this.state.address} onChange={this.handleInputChange} aria-label="Address"></input>
                        </div>
                    </div>
                
                <div class="row">
                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >Heighest Educational Qualification</label>
                                <input type="text" class="form-control" name="hequalification" placeholder="Heighest Educational Qualification" value={this.state.hequalification} onChange={this.handleInputChange} aria-label="Heighest Educational Qualification"></input>
                        </div>
                    </div>

                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Subject</label>
                                <input type="text" class="form-control" name="subject" placeholder="Subject" value={this.state.subject} onChange={this.handleInputChange} aria-label="Subject"></input>
                        </div>
                    </div>
                </div> 
                </div>
                </div>

                &nbsp;
                &nbsp;
                <div class="card shadow">
                <div class="card-header py-3">
                    <p class="text-primary m-0 font-weight-bold">User Settings</p>
                </div>

                <div class="card-body">
                    <div class="col">
                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}} >Email</label>
                                <input type="text" class="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} aria-label="Email"></input>
                        </div>
                    </div>
                </div>
                </div>
                
  
                <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Update
                </button>
            </form> 
        </div>
        </div>
        );
        }
}