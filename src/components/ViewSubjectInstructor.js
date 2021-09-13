import React, { Component } from 'react';
import axios from 'axios';

export default class ViewSubjectInstructor extends Component {
constructor(props){
  super(props);

  this.state={
    subjects:[]
  };
  /*this.state={
    materials:{}
  }*/
}

componentDidMount(){
  this.retrieveSubjects();
  this.retrieveMaterials();
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

retrieveMaterials(){
  axios.get("http://localhost:8070/materials").then(res =>{
    if(res.data.success){
      this.setState({
        materials:res.data.existingMaterials
      });

      console.log(this.state.materials)
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
           <h1 className="text-uppercase font-weight-bold">View Subjects</h1>
           <div className="col-lg-3 mt-2 mb-2">
           <input
             className="form-control"
             type="search"
             placeholder="subjectName/instructorName"
             name="searchQuery"
             onChange={this.handleSearchArea}>               
             </input>
             </div>
           </div>
         </div>
          <table className="table table-hover" style={{marginTop:'40px',width:'100%'}}>
            <thead class="header__item">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Subject Name</th>
                    <th scope="col">Instructor Name</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Starting Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.subjects.map((subjects,index) =>(
                    <tr key={index}>
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
                      <a className="btn btn-success" href={`/viewMaterialInstructor/${subjects._id}`}>
                          <i className="fas fa-angle-double-right"></i> &nbsp; View
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-warning" href={`/editStudent/${subjects._id}`}>
                          <i className="fas fa-edit"></i> &nbsp; Edit
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-danger" href="#" onClick={() => this.onDelete(subjects._id)}>
                          <i className="far fa-trash-alt"></i> &nbsp; Delete
                        </a>
                      </td>
                    </tr>

                    ))}
                </tbody>
            </table>
            <button className="btn btn-success"><a href="/addSubject" style={{textDecoration:'none',color:'white'}}>Create new subject</a></button>

          </div>
    )
  }
}
