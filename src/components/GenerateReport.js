import React from "react";
import ReactToPrint from "react-to-print";

import axios from 'axios';

const thStyle = {
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal"
};

class GenerateReportInstructor extends React.Component {

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

  
  filterData(instructors,searchKey){
    const result = instructors.filter((instructor) =>
    instructor.firstname.toLowerCase().includes(searchKey)||
    instructor.lastname.toLowerCase().includes(searchKey)
    )
    this.setState({instructors:result})
  }

  handleSearchArea = (e) =>{
    const searchKey=e.currentTarget.value;

    axios.get("http://localhost:8070/instructors").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingInstructors, searchKey)
  
      }
    })
  }
  
  render() {
    return (
      <div className="container">
          <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <br></br><br></br>
            <h4>All Instructors Report</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            style={{background:'#e5e6dc'}}
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={this.handleSearchArea}></input>
          </div>
        </div>
        
        <table className="table table-hover" style={{marginTop:'40px',background:'LightGray'}}>
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

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h5 style={{color:"red"}}>Total Number of Instructors : {this.state.instructors.length}</h5>
        
    </div>
    );
  }
}



class Example extends React.Component {
  render() {
    return (
      <div style={{marginTop:'50px', marginLeft:'40px'}}>
        <ReactToPrint
          trigger={() => <button style={{background:'#d0d1a3'}}>Print Report</button>}
          content={() => this.componentRef}
        />
        <GenerateReportInstructor ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}


export default Example;
