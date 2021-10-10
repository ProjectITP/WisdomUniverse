import React, { Component } from 'react';
import axios from 'axios';
import '../subject-styles.css';

export default class ViewSubjectInstructor extends Component {
  constructor(props){
    super(props);

    this.state={
      subjects:[]
    };
    
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
      &nbsp; &nbsp;       
        <div className="row subject-background"style={{height:'120px'}}>
          <div className="col justify-content-start" style={{marginTop:'30px'}}>
            <h1 className="text-uppercase font-weight-bold">Subjects List</h1>
          </div>

          <div className="col-3 justify-content-end" style={{marginTop:'40px'}}>
            <input
              className="form-control"
              type="search"
              placeholder="Subject / Instructor"
              name="searchQuery"
              onChange={this.handleSearchArea}>               
             </input>
          </div>           
         </div>
          <table className="table table-hover shover" style={{marginTop:'40px',width:'100%'}}>
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
                        <a href={`/subjectDetails/${subjects._id}`} style={{textDecoration:'none',color:'#1e6fa0',fontFamily:'Lucida Sans,sans-serif'}}>
                        {subjects.subjectName}
                        </a>
                        </td>
                      <td>{subjects.instructorName}</td>
                      <td>{subjects.contNumber}</td>
                      <td>{subjects.startDate}</td>
                      <td>                      
                      <a className="btn btn-success" href={`/viewMaterialsInstructor/${subjects._subjectName}`}>
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
            <button className="sbutton btn btn-primary"><a href="/addSubject" style={{textDecoration:'none',color:'white'}}>Create new subject</a></button>
          </div>
    )
  }
}
