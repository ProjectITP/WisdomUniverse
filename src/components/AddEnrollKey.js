import React,{Component} from "react"
import axios from "axios";

export default class AddEnrollKey extends Component{
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

        const {subject_name,enrollment_key}= this.state;

        const data ={
            subject_name :subject_name,
            enrollment_key : enrollment_key,
            

        }
        console.log(data)

        axios.post("http://localhost:8070/enrollKey/save",data).then((res) =>{
            if(res.data.success){
                alert("Successfully added")
                this.setState(
                   { 
                    subject_name:"",
                    enrollment_key: ""
                }
                )
            }
        })
    }



    
    render(){
        return(
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb=3 font-weight-normal"><b>Add Enrollment Keys</b></h1> <hr></hr>
                <form className="needs-validation" style={{backgroundColor:'#f2f2f2',padding:'30px 30px'}}>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                         <b>   Subject</b> </label>
                            <input type="text" className="form-control" name="subject_name" placeholder="Enter Subject"
                            value={this.state.subject_name} onChange={this.handleInputChange}/>
                            

                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>
                      <b>  Enrollment Key </b> </label>
                            <input type="text" className="form-control" name="enrollment_key" placeholder="Enter Enrollment Key"
                            value={this.state.enrollment_key} onChange={this.handleInputChange}/>
                            

                    </div>

                  

                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                        <i className="far fa-check-square"/>
                        &nbsp; Save
                    </button>
                </form>
               
            </div>
        )
    }
}

