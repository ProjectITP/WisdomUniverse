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
    
   datePicker = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};

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
            <div class="container-fluid upload-background ">
            <div class="container testbox">

                <form className="forms needs-validation" style={{position:'static' }} noValidate>
                    <h4 className="subject-h4" style={{textAlign:'center'}}>Edit Subject Profile</h4>

                    <div className="form-group sitem" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}} >Subject Name:<span class="required">*</span></p>
                    <input type="text" className="position-item" name="subjectName" placeholder="Enter subject Name"
                        value={this.state.subjectName} onChange={this.handleInputChange} required/>
                    <div style={{fontSize:12, color:"red"}}>{this.state.subjectError}</div>    
                </div>

                <div className="form-group sitem" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>Instructor Name:<span class="required">*</span></p>  {/*use value atribute to set name*/}
                    <input type="text" className="position-item" name="instructorName" placeholder="Enter Instructor Name"
                        value={this.state.instructorName} onChange={this.handleInputChange} required/>
                    <div style={{fontSize:12, color:"red"}}>{this.state.instructorError}</div> 
                </div>

                <div className="form-group sitem" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>Contact Number:<span class="required">*</span></p>
                    <input type="tel" className="position-item" name="contNumber" placeholder="Enter Contact Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={this.state.contNumber} onChange={this.handleInputChange} required/>
                    <div style={{fontSize:12, color:"red"}}>{this.state.phoneError}</div> 
                </div>
                

                <div class="row position-item">
                    <div class="col sitem"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>Starting Date of the Class:</p>                      
                        <div><input type="date" name="date" className="col-3" name="startDate" placeholder="Enter Starting Date" style={{width:'90%'}}
                            value={this.state.startDate} onChange={this.handleInputChange} min={this.datePicker()}/>  &nbsp;<i class="far fa-calendar-alt fa-lg"></i>
                        </div>
                    </div>

                    <div class="col sitem"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>Duration of the Class:</p>
                        <input type="String" className="position-item" name="duration" placeholder="Enter Duration" 
                            value={this.state.duration} onChange={this.handleInputChange}/>
                    </div>
                </div>
                

                <div class="row position-item">
                    <div class="col sitem"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>Shedule:</p>
                    <input type="String" className="position-item" name="shedule" placeholder="Enter Shedule"
                            value={this.state.shedule} onChange={this.handleInputChange}/>
                    </div>

                    <div class="col sitem"  style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>Class Fee:</p>
                        <input type="String" className="position-item" name="fee" placeholder="Enter Class Fee" 
                            value={this.state.fee} onChange={this.handleInputChange}/>
                    </div>
                </div>

                <div className="form-group sitem" style={{marginBottom:'15px'}}>
                    <p style={{marginBottom:'5px'}}>About Class:</p>
                    <div class="container-fluid">
                    <textarea className="position-item" name="aboutClass" value={this.state.aboutClass} onChange={this.handleInputChange} rows={5} cols={85} />
                    </div>
                </div>

                <button className="sbutton" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i> &nbsp;Update
                </button>

                </form>
            </div>
            </div> 
        )
    }

}