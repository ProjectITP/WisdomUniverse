import React, { Component } from "react";
import axios from 'axios';


export default class ViewMaterialsInstructor extends Component {

    constructor(props){
        super(props);
        
        this.state={
          materials:[]
        };
      }
    
      componentDidMount(){
        this.retrieveMaterials();
      }
      
      retrieveMaterials(){
        axios.get("http://localhost:8070/materials?subjectName=Physics").then(res =>{
          if(res.data.success){
            this.setState({
              materials:res.data.existingMaterials
            });
      
            console.log(this.state.materials)
          }
        })
      }
    
      onDelete = (id) =>{

        axios.delete(`http://localhost:8070/material/delete/${id}`).then((res) =>{
          alert("Deleted Successfully");
          this.retrieveMaterials();
        })
      }



  render() {
    return (
      <div className="container">        
       <table className="table table-hover" style={{marginTop:'40px'}}>
         <thead className="header__item">
               <tr>
                 <th scope="col">#</th>
                 <th scope="col">Subject Name</th>                 
                 <th scope="col">Topic</th>
                 <th scope="col">Notes</th>
                 <th scope="col">Additional Notes</th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
               {this.state.materials.map((materials,index) =>(
                 <tr key={index}>
                   <th scope="row">{index+1}</th>
                   <td  className="fw-bolder">
                     <a href={`/material/${materials._id}`} style={{textDecoration:'none',color:'#1e6fa0',fontFamily:'Lucida Sans,sans-serif'}}>
                     {materials.subjectName}
                     </a>
                     </td>                   
                   <td>{materials.topic}</td>
                   <td>{materials.notes}</td>
                   <td>{materials.additionalNotes}</td>
                   <td>
                     <a className="btn btn-warning" href={`/editMaterial/${materials._id}`}>
                       <i className="fas fa-edit"></i> &nbsp; Edit
                     </a>
                     &nbsp; &nbsp; &nbsp;
                     <a className="btn btn-danger" href="#" onClick={() => this.onDelete(materials._id)}>
                       <i className="far fa-trash-alt"></i> &nbsp; Delete
                     </a>
                   </td>
                 </tr>
                 ))}
             </tbody>
         </table>
         <button className="btn btn-success"><a href="/uploadMaterial" style={{textDecoration:'none',color:'white'}}>Upload new material</a></button>

       </div>
    )
  }
}
