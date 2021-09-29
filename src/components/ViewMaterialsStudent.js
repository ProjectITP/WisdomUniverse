import React, { Component } from "react";
import axios from 'axios';
import '../subject-styles.css';

export default class  ViewMaterialsStudent extends Component {

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


  render() {
    return (
      <div className="container">  
      <div className="row">
           <div className="col-lg-9 mt-2 mb-2">
           <h1 className="subject-h1 text-uppercase font-weight-bold">Subject Materials</h1>           
           </div>
         </div>      
       <table className="table table-hover" style={{marginTop:'40px',width:'100%'}}>
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
                     <a className="btn btn-success" href="#">
                       <i className="fas fa-eye"></i> &nbsp; View
                     </a>
                     &nbsp; &nbsp; &nbsp;
                     <a className="btn btn-warning" href="#" >
                       <i className="fas fa-download"></i> &nbsp; Download
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
