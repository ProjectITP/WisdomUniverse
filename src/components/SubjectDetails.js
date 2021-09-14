import React, { Component } from "react";
import axios from 'axios';
import '../styles.css';
import Image from '../students-doing-exam.jpg';

export default class SubjectDetails extends Component {
  constructor(props){
    super(props);
    
    this.state={
        subject:{}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8070/subject/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                subject:res.data.subject
            });
            console.log(this.state.subject);
        }
    });
  
  }


  render() {
  const {subjectName,instructorName,contNumber,startDate,duration,shedule,fee,aboutClass} = this.state.subject;

    return(
      <div>
        <div className="banner">
          <img src={Image} height='100%' width='50%'  alt="Image"/>
        </div>
        <div className="container">
            <div className="text-uppercase" style={{marginTop:'20px' }}>        
              <h4 style={{fontSize:'50px',fontFamily:'serif',color:'#1e6fa0',textShadow:'1px 1px 1px blue'}}>{subjectName}</h4>
              <hr width='50%'/>
            </div>
            <table style={{width:'80%'}}><tr>
              <td scope="row">
            <div>            
            <table class="table table-borderless"  style={{width:'100%'}}>
                <tbody >
                <p scope="row" className="col-sm-12 text-uppercase" style={{fontSize:'18px' , color:'black', fontWeight:'bold'}}>Instructor Details</p>              
                  <tr style={{lineHeight: '24px'}}>                    
                    <td className="col-sm-1">Instructor Name :</td>
                    <td className="col-sm-3">{instructorName}</td>                    
                  </tr>
                  <tr style={{lineHeight: '24px'}}>
                    <td className="col-sm-1">Contact Number :</td>
                    <td className="col-sm-3">{contNumber}</td> 
                  </tr>
                  <br/>
                  <tr>
                    
                  </tr>  
                  <p scope="row" className="col-sm-12 text-uppercase" style={{fontSize:'18px' , color:'black', fontWeight:'bold'}}>Class Details</p>
                  
                  <tr style={{lineHeight: '24px'}}>                    
                    <td className="col-sm-1">Starting Date :</td>
                    <td className="col-sm-3">{startDate}</td>                    
                  </tr>
                  <tr style={{lineHeight: '24px'}}>                    
                    <td className="col-sm-1">Class Duration :</td>
                    <td className="col-sm-3">{duration}</td>                    
                  </tr>
                  <tr style={{lineHeight: '24px'}}>
                    <td className="col-sm-1">Class Shedule :</td>
                    <td className="col-sm-3">{shedule}</td> 
                  </tr>
                  <tr style={{lineHeight: '24px'}}>
                    <td className="col-sm-1">Class Fee :</td>
                    <td className="col-sm-3">{fee}</td> 
                  </tr>
                  <tr style={{lineHeight: '24px'}}>
                    <td className="col-sm-1">About Class :</td>
                    <td className="col-sm-3">{aboutClass}</td> 
                  </tr>
                </tbody>
            </table>
            </div>
            </td>
            <td scope="row">
              <div className="button" style={{width:'100%'}}>
              <button className="btn btn-primary btn-lg" type="submit" href="/">Enroll Now</button>
              </div>              
            </td>           
            </tr>
            </table>
        </div>
      </div>
        
    )
  }
}
