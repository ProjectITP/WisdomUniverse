import React, { Component } from 'react';
import axios from 'axios';

export default class GenerateReport extends Component{
  constructor(props){
    super(props);

    this.state={
      instructors:[]
    };

  }
  componentDidMount(){
    this.retrieveInstructors();
  }

  retrieveInstructors(){
    axios.get("http://localhost:8070/instructors").then(res =>{
      if(res.data.success){
        this.setState({
          instructors:res.data.existingInstructors
        });
      
        console.log(this.state.instructors)
      }
  
      
    });
  }

render() {
  return(
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Instructors</h4>
          </div>
        </div>
        
        <table className="table table-hover" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">DOB</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">NIC</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No</th>
              <th scope="col">Highest Edu:</th>
              <th scope="col">Subject</th>
            </tr>
          </thead>

          <tbody>
            {this.state.instructors.map((instructors,index) =>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{instructors.firstname}</td>
                <td>{instructors.lastname}</td>
                <td>{instructors.dob}</td>
                <td>{instructors.gender}</td>
                <td>{instructors.address}</td>
                <td>{instructors.nic}</td>
                <td>{instructors.email}</td>
                <td>{instructors.phoneno}</td>
                <td>{instructors.hequalification}</td>
                <td>{instructors.subject}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
    </div>
  )
}
}