import axios from "axios";
import React,{Component} from "react"

export default class UpdateEnroll extends Component{

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
        const id = this.props.match.params.id;

        const {student_id,subject_id,month}= this.state;

        const data ={
            student_id :student_id,
            subject_id : subject_id,
            month : month

        }
        console.log(data)

        axios.put(`http://localhost:8070/enroll/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Successfully Updated")
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








    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8070/enroll/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    student_id:res.data.enroll.student_id,
                    subject_id:res.data.enroll.subject_id,
                    month:res.data.enroll.month
                });

            }
        });
    }

    render(){
        return(
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb=3 font-weight-normal">UPDATE Student</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                            Student ID </label>
                            <input type="text" className="form-control" name="student_id" placeholder="Enter student id"
                            value={this.state.student_id} onChange={this.handleInputChange}/>
                            

                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                            Subject ID </label>
                            <input type="text" className="form-control" name="subject_id" placeholder="Enter subject id"
                            value={this.state.subject_id} onChange={this.handleInputChange}/>
                            

                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                            Month </label>
                            <input type="text" className="form-control" name="month" placeholder="Enter month"
                            value={this.state.month} onChange={this.handleInputChange}/>
                            

                    </div>

                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                        <i className="far fa-check-square"/>
                        &nbsp; Update
                    </button>
                </form>
               
            </div>
        )
    }
}


