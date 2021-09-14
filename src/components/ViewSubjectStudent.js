import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css';

export default class ViewSubjectStudent extends Component {
constructor(props){
  super(props);

  this.state={
    subjects:[]
  };
}

componentDidMount(){
  this.retrieveSubjects();
}

retrieveSubjects(){
  axios.get("http://localhost:8070/subjects").then(res =>{
    if(res.data.success){
      this.setState({
        subjects:res.data.existingSubjects
      });

      console.log(this.state.subjects)
    }
  })
}

onDelete = (id) =>{

  axios.delete(`http://localhost:8070/subject/delete/${id}`).then((res) =>{
    alert("Deleted Successfully");
    this.retrieveSubjects();
  })
}

filterData(subjects,searchKey){
  const result = subjects.filter((subject) =>
  subject.subjectName.toLowerCase().includes(searchKey)||
  subject.instructorName.toLowerCase().includes(searchKey)
  
  )

  this.setState({subjects:result})
}

handleSearchArea= (e) =>{

  const searchKey = e.currentTarget.value;

  axios.get("http://localhost:8070/subjects").then(res =>{
    if (res.data.success){
      this.filterData(res.data.existingSubjects,searchKey)
    }
  });

}

  render() {
    return (
      <div className="container">
          <div className="row">
           <div className="col-lg-9 mt-2 mb-2">
           <h1 className="text-uppercase font-weight-bold">All Subjects</h1>
           <div className="col-lg-3 mt-2 mb-2">
           <input
             className="form-control"
             type="search"
             placeholder="Subject / Instructor"
             name="searchQuery"
             onChange={this.handleSearchArea}>               
             </input>
             </div>
           </div>
         </div>
          <table className="table table-hover"style={{marginTop:'40px',width:'100%'}}>
              <thead className="header__item">
                  <tr >
                  <th scope="col">#</th>
                    <th scope="col">Subject Name</th>
                    <th scope="col">Instructor Name</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">starting Date</th>
                    <th></th>
                  </tr>
              </thead>
              <tbody>
              {this.state.subjects.map((subjects,index) =>(
                    <tr key={index} >
                      <th scope="row">{index+1}</th>
                      <td className="fw-bolder">
                        <a href={`/subject/${subjects._id}`} style={{textDecoration:'none',color:'#1e6fa0',fontFamily:'Lucida Sans,sans-serif'}}>
                        {subjects.subjectName}
                        </a>
                        </td>
                      <td>{subjects.instructorName}</td>
                      <td>{subjects.contNumber}</td>
                      <td>{subjects.startDate}</td> 
                      <td>
                      <a className="btn btn-warning" href={`/subjectDetails/${subjects._id}`}>
                        View &nbsp;<i className="fas fa-angle-double-right"></i>
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
