import React, { Component } from 'react';
import axios from 'axios';

export default class InstructorDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            instructor:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/instructor/${id}`).then((res) =>{
            if(res.data.success) {
                this.setState({
                    instructor:res.data.instructor
                });

                console.log(this.state.instructor);
            }
        });
    }
    render() {

        const {firstname,lastname,dob,gender,address,nic,email,phoneno,hequalification,subject} = this.state.instructor;
        return (
            <div className="container">
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
        

        <div class="shadow-lg p-3 mb-5 bg-white rounded" style={{width:'900px'}}>
            <div class="card shadow">
                <div class="card-header py-3">
                    <p class="text-primary m-0 font-weight-bold"><div style={{marginTop:'20px'}}><h4>{firstname} {lastname}</h4></div>
                    </p>
            
                <hr/>
            <d1 className="row">
                <dt className="col-sm-3">First Name</dt>
                <dd className="col-sm-9">{firstname}</dd>
                <dt className="col-sm-3">Last Name</dt>
                <dd className="col-sm-9">{lastname}</dd>
                <dt className="col-sm-3">DOB</dt>
                <dd className="col-sm-9">{dob}</dd>
                <dt className="col-sm-3">Gender</dt>
                <dd className="col-sm-9">{gender}</dd>
                <dt className="col-sm-3">Address</dt>
                <dd className="col-sm-9">{address}</dd>
                <dt className="col-sm-3">NIC</dt>
                <dd className="col-sm-9">{nic}</dd>
                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{email}</dd>
                <dt className="col-sm-3">Phone No</dt>
                <dd className="col-sm-9">{phoneno}</dd>
                <dt className="col-sm-3">Highest Edu:</dt>
                <dd className="col-sm-9">{hequalification}</dd>
                <dt className="col-sm-3">Subject</dt>
                <dd className="col-sm-9">{subject}</dd>
            </d1>
            </div>
            </div>
            </div>
            </div>
        )
    }
}