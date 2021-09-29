import React, {Component} from "react";
import axios from 'axios';
import '../subject-styles.css';

export default class EditSubject extends Component {

    constructor(props){
        super(props)
        this.state={
            subjectName:"",
            instructorName:"",
            contNumber:"",
            startDate:"",
            duration:"",
            shedule:"",
            fee:"",
            aboutClass:""
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
        const{subjectName,instructorName,contNumber,startDate,duration,shedule,fee,aboutClass} = this.state;

        const data={
            subjectName:subjectName,
            instructorName:instructorName,
            contNumber:contNumber,
            startDate:startDate,
            duration:duration,
            shedule:shedule,
            fee:fee,
            aboutClass:aboutClass
        }
        console.log(data)

        axios.put(`http://localhost:8070/subject/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Subject profile updated sucesssfully")
                this.setState({
                        subjectName:"",
                        instructorName:"",
                        contNumber:"",
                        startDate:"",
                        duration:"",
                        shedule:"",
                        fee:"",
                        aboutClass:""
                    });
            }
        })
    }


    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/subject/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({                
                    subjectName:res.data.subject.subjectName,
                    instructorName:res.data.subject.instructorName,
                    contNumber:res.data.subject.contNumber,
                    startDate:res.data.subject.startDate,
                    duration:res.data.subject.duration,
                    shedule:res.data.subject.shedule,
                    fee:res.data.subject.fee,
                    aboutClass:res.data.subject.aboutClass,
                });
                console.log(this.state.subject);
            }
        });
    }

    


    render(){ 
        return(
            <div class="container">
                <div class="container"><h3 style={{marginTop:'15px'}}>Edit Subject Profile</h3></div>
                <div class="container-fluid testbox">
                    <form className="forms needs-validation" style={{position:'static' }} noValidate>
                        <div className="form-group item" style={{marginBottom:'15px'}}>
                            <p style={{marginBottom:'5px'}} >SubjectName<span class="required">*</span></p>
                            <input type="text" className="position-item" name="subjectName" placeholder="Enter subjectName"
                            value={this.state.subjectName} onChange={this.handleInputChange} required/>
                
                        </div>

                        <div className="form-group item" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>instructorName<span class="required">*</span></p>  {/*use value atribute to set name*/}
                    <input type="text" className="position-item" name="instructorName" placeholder="Enter instructorName"
                        value={this.state.instructorName} onChange={this.handleInputChange} required/>
                </div>

                <div className="form-group item" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>contNumber<span class="required">*</span></p>
                    <input type="tel" className="position-item" name="contNumber" placeholder="Enter contNumber" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        value={this.state.contNumber} onChange={this.handleInputChange} required/>
                </div>

                <div class="row position-item">
                    <div class="col item"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>startDate</p>
                        <input type="date" className="position-item" name="startDate" placeholder="Enter startDate"
                            value={this.state.startDate} onChange={this.handleInputChange}/>
                        <i class="fas fa-calendar-alt"></i>&nbsp;
                    </div>

                    <div class="col item"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>duration</p>
                        <input type="String" className="position-item" name="duration" placeholder="Enter duration" 
                            value={this.state.duration} onChange={this.handleInputChange}/>
                    </div>
                </div>

                <div class="row position-item">
                    <div class="col item"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>shedule</p>
                    <input type="String" className="position-item" name="shedule" placeholder="Enter shedule"
                            value={this.state.shedule} onChange={this.handleInputChange}/>
                    </div>

                    <div class="col item"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>fee</p>
                        <input type="String" className="position-item" name="fee" placeholder="Enter fee" 
                            value={this.state.fee} onChange={this.handleInputChange}/>
                    </div>
                </div>

                <div className="form-group item" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>aboutClass</p>
                    <input type="String" className="position-item" name="aboutClass" placeholder="Enter aboutClass"
                        value={this.state.aboutClass} onChange={this.handleInputChange}/>
                </div>

                {/*<div className="form-group item" style={{marginBottom:'15px'}}>
                    <p>Advertisement:</p>
                    <input type="text" name="providing"/>
                    <input type="file" name="file" accept="file/*"/>
                </div>*/}

                        <button className="sbutton" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i> &nbsp;Update
                        </button>

                    </form>
                </div>
            </div>  
        )
    }

}