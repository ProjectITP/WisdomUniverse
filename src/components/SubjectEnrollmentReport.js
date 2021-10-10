import React from "react";
import ReactToPrint from "react-to-print";
import axios from 'axios';

class StudentEnrollmentReport extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            enroll : []
        }
    }

    componentDidMount(){
        this.retrieveEnroll();
    }

    retrieveEnroll(){
        axios.get("http://localhost:8070/enroll/").then(res =>{
            if(res.data.success){
                this.setState({
                    enroll:res.data.existingEnroll
                });
                console.log(this.state.enroll)
            }
        })
    }

    filterData(enroll,searchkey){
        const result = enroll.filter((enroll)=>
        enroll.student_id.toLowerCase().includes(searchkey)||
        enroll.subject_id.toLowerCase().includes(searchkey)||
        enroll.month.toLowerCase().includes(searchkey)
        )
        this.setState({enroll:result})
    }

    handleSearchArea = (e) => {
        const searchKey= e.currentTarget.value;
        axios.get("http://localhost:8070/enroll/").then(res =>{
            if(res.data.success){
                this.filterData(res.data.existingEnroll,searchKey)
            }    
        })
    }
   

  render() {
    return(
        <div className="container" >
            &nbsp; &nbsp;
            <div className="row sreport-background"style={{height:'120px'}}>
                <div className="col justify-content-start" style={{marginTop:'30px'}}>
                <h1><b>Enrolled Students</b></h1>
                </div>
            </div>
            &nbsp;
            <div className="row">
                <div className="col-2 justify-content-start" >
                    <input className = "form-control"
                    type="search"
                    placeholder="Search..."
                    name="searchenroll"
                    onChange={this.handleSearchArea}>
                    </input>
                </div>            
            </div>               
            &nbsp; &nbsp;  
            <hr></hr>
            <table className="table table-striped"style={{width:'90%',padding:'50px',alignContent:'center'}}>
                <thead>
                    <tr>
                        <th scope="col">#</th>                        
                        <th scope="col">Month</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Student ID</th>                                          
                    </tr>
                </thead>

                <tbody>
                    {this.state.enroll.map((enroll,index) =>(
                    <tr>
                        <th scope = "row">{index+1} </th>                            
                            <td>{enroll.month}</td>
                            <td> {enroll.subject_id}</td>
                            <td> {enroll.student_id}</td>                                             
                    </tr>                                     
                    ))}
                    <tr scope = "row">
                    <td colspan="3">
                     <p style={{textAlign:'right',marginTop:'10px',fontWeight:'bold'}}>Total Number of Enrollments : </p>
                    </td>
                    <td colspan="1">
                    <p style={{textAlign:'left',marginTop:'10px',fontWeight:'bold'}}> {this.state.enroll.length}</p>                   
                    </td>
                    </tr> 
                </tbody>
            </table>               
        </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>         
        <ReactToPrint
          trigger={() => <a className="btn btn-primary" style={{position:'absolute',right:'90px', top:'210px'}}>
                            <i className="fas fa-download"></i> &nbsp; Download  The Report </a>}
          content={() => this.componentRef}
        />
        <StudentEnrollmentReport ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
