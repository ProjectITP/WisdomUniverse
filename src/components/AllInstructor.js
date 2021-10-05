import React, { Component } from 'react';
import axios from 'axios';

export default class AllInstructor extends Component{
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

  onDelete = (id) =>{
    axios.delete(`http://localhost:8070/instructor/delete/${id}`).then((res) =>{
      alert("Delete Successfully");
      this.retrieveInstructors();
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
  return(
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Instructors</h4>
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
        &nbsp;
        &nbsp;
        <div class="card-header py-3" style={{background:'LightGray'}}>
          <p class="text-primary m-0 font-weight-bold" style={{background:'LightGray'}}>Instructors info</p>
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
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {this.state.instructors.map((instructors,index) =>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <a href={`/instructor/${instructors._id}`} style={{textDecoration:'none'}}>
                  {instructors.firstname}
                  </a>
                
                </td>
                <td>{instructors.lastname}</td>
                <td>{instructors.dob}</td>
                <td>{instructors.gender}</td>
                <td>{instructors.address}</td>
                <td>{instructors.nic}</td>
                <td>{instructors.email}</td>
                <td>{instructors.phoneno}</td>
                <td>{instructors.hequalification}</td>
                <td>{instructors.subject}</td>
                <td>
                  <a className="btn btn-warning" href={`/edit/${instructors._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(instructors._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success"><a href="/request" style={{textDecoration:'none', color:'white'}}>Add New Instructor</a></button>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <button className="btn btn-success"><a href="/reportgenerate" style={{textDecoration:'none', color:'white'}}>Generate Report</a></button>
    </div>
  )
}
}