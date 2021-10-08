import React, { Component } from 'react';
import axios from 'axios';

export default class AllRequest extends Component{
    constructor(props){
        super(props);
    
        this.state={
            lecturers:[]
        };
    }

    componentDidMount(){
        this.retrieveLecturers();
    }

    retrieveLecturers(){
        axios.get("http://localhost:8070/lecturers").then(res =>{
            if(res.data.success){
                this.setState({
                    lecturers:res.data.existingLecturers
                });

                console.log(this.state.lecturers)
            }
        });
    }

    onDelete = (id) =>{
        axios.delete(`http://localhost:8070/lecturer/delete/${id}`).then((res) =>{
          alert("Delete Successfully");
          this.retrieveLecturers();
        });
      }
    
      filterData(lecturers,searchKey){
        const result = lecturers.filter((lecturer) =>
        lecturer.firstname.toLowerCase().includes(searchKey)||
        lecturer.lastname.toLowerCase().includes(searchKey)||
        lecturer.firstname.toUpperCase().includes(searchKey)||
        lecturer.lastname.toUpperCase().includes(searchKey)
        )
        this.setState({lecturers:result})
      }
    
      handleSearchArea = (e) =>{
        const searchKey=e.currentTarget.value;
    
        axios.get("http://localhost:8070/lecturers").then(res =>{
          if(res.data.success){
            this.filterData(res.data.existingLecturers, searchKey)
      
          }
        })
      }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 mt-2 mb-2">
                        <h4>All Requests</h4>
                    </div>
                    <div className="col-lg-3 mt-2 mb-2">
                        <input
                            className="form-control"
                            style={{background:'#e5e6dc'}}
                            type="search"
                            placeholder="Search"
                            name="searchQuery"
                            onChange={this.handleSearchArea}>
                        </input>
                    </div>
                </div>
                &nbsp;
                &nbsp;
                <div class="card-header py-3" style={{background:'LightGray'}}>
                    <p class="text-primary m-0 font-weight-bold" style={{background:'LightGray'}}>Requests info</p>
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
                        {this.state.lecturers.map((lecturers,index) =>(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                    <td>{lecturers.firstname}</td>
                                    <td>{lecturers.lastname}</td>
                                    <td>{lecturers.dob}</td>
                                    <td>{lecturers.gender}</td>
                                    <td>{lecturers.address}</td>
                                    <td>{lecturers.nic}</td>
                                    <td>{lecturers.email}</td>
                                    <td>{lecturers.phoneno}</td>
                                    <td>{lecturers.hequalification}</td>
                                    <td>{lecturers.subject}</td>
                                    <td>
                                        <a className="btn btn-warning" href={`/editrequest/${lecturers._id}`}>
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </a>
                                        &nbsp;
                                        <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(lecturers._id)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;
                                        </a>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )

    }
}