import React,{Component} from "react"
import axios from "axios";

export default class AddEnroll extends Component{
    constructor(props){
        
        super(props);
        this.state= {
            student_id: "",
            subject_id:"",
            month: ""

        }

    }

    handleInputChange = (e) =>{
        const{name,value}= e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit= (e) =>{
        e.preventDefault();

        const {student_id,subject_id,month}= this.state;

        const data ={
            student_id :student_id,
            subject_id : subject_id,
            month : month

        }
        console.log(data)

        axios.post("http://localhost:8070/enroll/save",data).then((res) =>{
            if(res.data.success){
                alert("Successfully added")
                this.setState(
                   { 
                    student_id: "",
                    subject_id:"",
                    month: ""
                }
                )
            }
        })
    }



    
    render(){
        return(
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb=3 font-weight-normal"><b>Add Student</b></h1>  <hr/>

                <form className="needs-validation" style={{backgroundColor:'#f2f2f2',padding:'30px 30px'}}>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                            <b>Student ID</b> </label>
                            <input type="text" className="form-control" name="student_id" placeholder="Enter student id"
                            value={this.state.student_id} onChange={this.handleInputChange}/>
                            

                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                        <b> Subject ID</b></label>
                            <input type="text" className="form-control" name="subject_id" placeholder="Enter subject id"
                            value={this.state.subject_id} onChange={this.handleInputChange}/>
                            

                    </div>

                  <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                        <b> Month </b></label>
                            <input type="text" className="form-control" name="month" placeholder="Enter month"
                            value={this.state.month} onChange={this.handleInputChange}/>
                            

        </div>  

                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                        <i className="far fa-check-square"/>
                        &nbsp;Save
                    </button>
                </form>
               
            </div>
        )
    }
}

