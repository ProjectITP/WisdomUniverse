import React,{Component} from "react"
import axios from "axios";


export default class ViewEnroll extends Component{
    constructor(props){
        super(props);

        this.state={
            enroll:[]

        };
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



    onDelete=(id)=>{
        axios.delete(`http://localhost:8070/enroll/delete/${id}`).then((res)=>{
            alert("Successfully Deleted");
            this.retrieveEnroll();
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


    render(){
        return(
            <div className="container" >
                
                    <div style={{marginTop:'30px', textAlign:'left'}}>
                    <h1><b>Enrolled Students</b></h1>
                    </div>
                    &nbsp;

                    <div className="row">
                        <div className="col-lg-3 mt-2 mb-2" >
                            <input className = "for,-control"
                            type="search"
                            placeholder="Search..."
                            name="searchenroll"
                            onChange={this.handleSearchArea}>
                            </input>
                        </div>

                        <div  style={{marginLeft:'89%'}} >
                            <button className="btn btn-primary"><a href="/enroll/add" style={{color:'white',padding:'0'}} >Add Students </a></button>&nbsp;
                        </div>
                        
                    </div>
                
                
                
                <hr></hr>
                <table className="table table-striped">
                    <thead>

                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Subject ID</th>
                            <th scope="col">Month</th>
                            <th scope="col"></th>
                            
                        </tr>

                    </thead>

                    <tbody>
                        {this.state.enroll.map((enroll,index) =>(
                        <tr>
                            <th scope = "row">{index+1} </th>
                                <td> {enroll.student_id}</td>
                                <td> {enroll.subject_id}</td>
                                <td>{enroll.month}</td>
                                <td>
                                    <a className="btn btn-warning" href={`/update/${enroll._id}`}>
                                    <i className="fas fa-edit"/> &nbsp;Edit </a>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    
                                    <a  className="btn btn-danger" href="#" onClick={() => this.onDelete(enroll._id)}>
                                    <i className="fas fa-edit"/> &nbsp;Delete </a>
                                </td>
                        
                        </tr>
                      
                      ))}
                    </tbody>


                    </table>
               
            </div>
        )
    }
}