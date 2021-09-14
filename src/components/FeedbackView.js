import react,{ Component} from 'react';
import axios from 'axios';





export default class FeedbackView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            feedback : []
        }
    }
    componentDidMount(){
        this.getFeedback();
    }

    getFeedback(){

        axios.get("http://localhost:8070/feedback/fbview").then(Response=>{

              if(Response.data.success){

                this.setState({
                    feedback:Response.data.existingPosts
                });
                console.log(this.state.feedback)
              }

        });

    }
   


    onDelete =(id) =>{
        axios.delete(`http://localhost:8070/feedback/fbdelete/${id}`).then((res)=>{
            alert("Dlete Succesfully");
            this.componentDidMount();
        })
   }


   filterData(feedback,searchKey){

    const result = feedback.filter((feedback)=>
       
         feedback.section.toLowerCase().includes(searchKey)
    )
    this.setState({feedback:result})
   }
   
   handleSearchArea =(e) =>{

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8070/feedback/fbview")
        .then(Response =>{
            if(Response.data.success){
            this.filterData(Response.data.existingPosts,searchKey)
            }
            
        });

   }
    

    //Notices Viewing 
    
    render(){
       
        return(
            <div className="container">
            <div>
                <br/>

                <h1>All received  Feedback  details On all sections in Institute</h1><br/>

                <input type="search" className="myInput" 
                placeholder="Search for the feedbacks according to sections...." 
                title="Type in a name"
                onChange={this.handleSearchArea}
                /><br/><br/>

                

                 
                     <table className="table table-hover" >
                     <thead>
                         <tr>
                             <th scope="col">Name</th>
                             <th scope="col">Section</th>
                             <th scope="col">Date</th>
                             <th scope="col">Message</th>
                             <th scope="col">Experience</th>
                             <th scope="col">Support</th>
                             <th scope="col">Satisfication</th>
                             <th scope="col">Action</th>
      
                         </tr>
                      </thead>
                         {this.state.feedback.map(feedback=>(
 
                     
                     <tbody>
                               <tr>
                                   <td>{feedback.sname}</td>
                                   <td> {feedback.section}</td>
                                   <td>{feedback.fdate}</td>
                                   <td>{feedback.review}</td>
                                   <td>{feedback.experience}</td>
                                   <td>{feedback.support}</td>
                                   <td>{feedback.satisfication}</td>
                                   <td><button className="btn btn-danger" onClick={() =>this.onDelete(feedback._id)}>DELETE</button></td>
                               </tr>
                         
      
                         
                     </tbody>
                         ))}
                 </table>
                 
         </div> 

         <br></br>
         <br></br>
         <hr></hr>
         <br></br>

         <b>You can Generate the ReportClicking This Button :</b>
         <button className="btn btn-success" style={{marginLeft:100}}> Generate Report</button>

         <br></br>
         <br></br>

 </div>
     );
}
}
