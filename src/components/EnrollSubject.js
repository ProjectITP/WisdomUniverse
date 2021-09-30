import React,{Component} from "react"
import axios from "axios";


export default class ViewEnrollSub extends Component{
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
                
                <div  style={{marginTop:'25px'}}>
                    <div >
                    <h1><b>Enroll in Subjects</b></h1>
                    </div>
                    
                    <div style={{marginLeft:'85%'}}>
                        <input className = "for,-control"
                        type="search"
                        placeholder="Search"
                        name="searchenroll"
                        onChange={this.handleSearchArea}>

                        </input>
                    </div>
                </div><hr></hr>
                

             
                <table className="table" style={{backgroundColor:'#f2f2f2'}}>
                    <tbody>
                        {this.state.enrollKey.map((enrollKey,index) =>(
                        <tr>
                            <th scope = "row">{index+1} </th>
                                <td style={{fontSize:'20px'}}> <i>{enrollKey.subject_name}</i></td>
                                <td> <div className="input-group">
                                    <input className="form-control" style={{width:'35px'}}
                                            type="text" 
                                            placeholder="Enter Enrollment key" 
                                            name="enrollment_key"  required/> &nbsp;&nbsp;&nbsp;&nbsp;                          

                                 <button className="btn btn-warning" href="#" >
                                    <i className="fas fa-edit" /> &nbsp;Enroll Me </button>
                                    </div>
                                </td>


                             {/*}   <td>

                                <a className="btn btn-warning" href={`/enrollKey/update/${enrollKey._id}`}>
                                    <i className="fas fa-edit"/> &nbsp;Edit </a> 
                                    &nbsp;
                                    <a className="btn btn-warning" href="#" onClick={() => this.onDelete(enrollKey._id)}>
                                    <i className="fas fa-edit"/> &nbsp;Delete </a>
                        </td> */}
                        
                        </tr>
                      
                      ))}
                    </tbody>


                    </table>
               
            </div>
        )
    }
}