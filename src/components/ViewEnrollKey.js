import React,{Component} from "react"
import axios from "axios";


export default class ViewEnrollKey extends Component{
    constructor(props){
        super(props);

        this.state={
            enrollKey:[]

        };
    }


    componentDidMount(){
        this.retrieveSubject();

    }

    retrieveSubject(){
        axios.get("http://localhost:8070/enrollKey").then(res =>{
            if(res.data.success){
                this.setState({
                    enrollKey:res.data.existingSubject
                });

                console.log(this.state.enrollKey)
            }
        })
    }



    onDelete=(id)=>{
        axios.delete(`http://localhost:8070/enrollKey/delete/${id}`).then((res)=>{
            alert("Successfully Deleted");
            this.retrieveSubject();
        })
    }




    filterData(enrollKey,searchkey){
        const result = enrollKey.filter((enrollKey)=>
     
        enrollKey.subject_name.toLowerCase().includes(searchkey)
        )
        this.setState({enrollKey:result})
    }


    handleSearchArea = (e) => {
        const searchKey= e.currentTarget.value;

        axios.get("http://localhost:8070/enrollKey").then(res =>{
            if(res.data.success){
                this.filterData(res.data.existingSubject,searchKey)
            }
                
        })
    }


    render(){
        return(
            <div className="container">
                
              
                    <div style={{marginTop:'30px', textAlign:'left'}}>
                    <h1><b>Enrollment Keys</b></h1>
                    </div>
                    <br></br>

                    <div className="row">
                        <div className="col-lg-3 mt-2 mb-2">
                            <input className = "for,-control"
                            type="search"
                            placeholder="Search"
                            name="searchenroll"
                            onChange={this.handleSearchArea}>

                            </input>
                        </div>
                        
                        <div style={{marginLeft:'85%'}} >
                            <button className="btn btn-primary"><a href="/enrollKey/add" style={{textDecoration:'none',color:'white'}} >Add Enrollment Key  </a></button>&nbsp;
                        </div>
                    </div>
                    <hr></hr>

                
                <table className="table">
                    <thead>

                        <tr>
                            <th scope="col">#</th>

                            <th scope="col">Subject </th>
                            <th scope="col">Enrollment Keys</th>
                        </tr>

                    </thead>

                    <tbody>
                        {this.state.enrollKey.map((enrollKey,index) =>(
                        <tr>
                            <th scope = "row">{index+1} </th>
                         
                                <td> {enrollKey.subject_name}</td>
                                <td>{enrollKey.enrollment_key}</td>
                                <td>

                                 <a className="btn btn-warning" href={`/enrollKey/update/${enrollKey._id}`}>
                                    <i className="fas fa-edit"/> &nbsp;Edit </a> 
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a className="btn btn-danger" href="#" onClick={() => this.onDelete(enrollKey._id)}>
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