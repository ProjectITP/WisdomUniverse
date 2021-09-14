import React, { Component } from "react";
import axios from 'axios';
import '../styles.css';

export default class EditMaterial extends Component {

  constructor(props){
    super(props)
    this.state={
      subjectName:"",
      topic:"",
      //notes:"",
      additionalNotes:""

    }
  }

  handleInputChange = (e) =>{
    const{name,value} = e.target;

    this.setState({
        ...this.state,  
        [name]:value
    })
  }

  
  onSubmit = (e) =>{

    e.preventDefault();
    const id = this.props.match.params.id;
    const{subjectName,topic,notes,additionalNotes} = this.state;

    const data={
      subjectName:subjectName,
      topic:topic,
      //notes:notes,
      additionalNotes:additionalNotes
    }
    console.log(data)

    axios.put(`http://localhost:8070/material/update/${id}`,data).then((res) =>{
        if(res.data.success){
          alert("Study material updated sucesssfully")
            this.setState(
                {
                  subjectName:"",
                  topic:"",
                  //notes:"",
                  additionalNotes:""
                }
            )
        }
    })
  }


  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8070/material/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
              subjectName:res.data.material.subjectName,
              topic:res.data.material.topic,
              //notes:res.data.material.notes,
              additionalNotes:res.data.material.notes,
            });
            console.log(this.state.material);
        }
    });
  
  }


  render() { 
    return (
      <div class="container">  

      <h4 style={{textAlign:'center'}}>Edit Study Materials</h4>
      <div class="container-fluid  testbox">  
        <form style={{position:'static',width:'500px', height:'500px'}}>
          <div className="form-group item" style={{marginBottom:'30px'}}>
            <p style={{marginBottom:'5px'}} >Subject Name :</p>
            <input type="text" name="subjectName" className="form-control" placeholder="Subject Name" required
                  value={this.state.subjectName} onChange={this.handleInputChange}/>
          </div>
          
          {/*<div className="form-group item" style={{marginBottom:'30px'}}>
            <p style={{marginBottom:'5px'}} >Lesson :</p>
            <input type="text" name="topic" className="form-control" placeholder="Lesson topic" required
                  value={this.state.topic} onChange={this.handleInputChange}/>
          </div>*/}
          
          <div className="form-group item" style={{marginBottom:'30px'}}>
            <p style={{marginBottom:'5px'}} >Additional Notes :</p>
            <input type="text" name="additionalNotes" className="form-control"
                  value={this.state.additionalNotes} onChange={this.handleInputChange}/>
          </div>
             
          <div className="form-group item" style={{marginBottom:'15px'}}>
            <p style={{marginBottom:'5px'}} >Upload :</p>
            <input type="file" name="notes"
                    value={this.state.notes} onChange={this.handleInputChange}/>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
            <i className="far fa-check-square"></i> &nbsp;Update
            </button>
          </div>
        </form>
        </div>
    </div>
    )
  }
}