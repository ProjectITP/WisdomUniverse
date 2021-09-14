import axios from "axios";
import React,{Component} from "react"

export default class UpdateEnrollKey extends Component{

    constructor(props){
        
        super(props);
        this.state= {
            subject_name:"",
            enrollment_key: ""

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

        const {subject_name,enrollment_key}= this.state;

        const data ={
            subject_name:subject_name,
            enrollment_key: enrollment_key

        }
        console.log(data)

        axios.put(`http://localhost:8070/enrollKey/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Successfully Updated")
                this.setState(
                   { 
                    subject_name:"",
                    enrollment_key: ""
                }
                )
            }
        })
    }








    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8070/enrollKey/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                
                    subject_name:res.data.enrollKey.subject_name,
                    enrollment_key:res.data.enrollKey.enrollment_key
                });

            }
        });
    }

    render(){
        return(
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb=3 font-weight-normal">Update Enrollment Key</h1>
                <form className="needs-validation" noValidate>
                <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                            Subject </label>
                            <input type="text" className="form-control" name="subject_name" placeholder="Enter Subject"
                            value={this.state.subject_name} onChange={this.handleInputChange}/>
                            

                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                        Enrollment Key </label>
                            <input type="text" className="form-control" name="enrollment_key" placeholder="Enter Enrollment Key"
                            value={this.state.enrollment_key} onChange={this.handleInputChange}/>
                            

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


