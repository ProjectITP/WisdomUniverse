import react,{useState, Component} from 'react';
import axios from 'axios';




export default class AdminContactView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            contactus : []
        }
    }
    componentDidMount(){
        axios.get("http://localhost:8070/contactus/view")
        .then(Response =>{
            this.setState({contactus:Response.data})
            console.log(Response)
        }).catch(function(err){
            console.log(err);
        })
      
        
    }


    onDelete =(id) =>{
        axios.delete(`http://localhost:8070/contactus/delete/${id}`).then((res)=>{
            alert("Dlete Succesfully");
            this.componentDidMount();
        })
   }
   


   
    

    //Notices Viewing 
    
    render(){
       
        return(
            <div className = "container">
                <br/>

                <h1>All received Contact us details </h1><br/><br></br>
               

                
                     <table class="table table-hover">
                     <thead>
                         <tr>
                             <th scope="col">Name</th>
                             <th scope="col">E-Mail</th>
                             <th scope="col">Phone Number</th>
                             <th scope="col">Questions</th>
                             <th scope="col">Action</th>
      
                         </tr>
                     </thead>

                     {this.state.contactus.map(contactus=>(
                     <tbody>
                         
                     
      
      
                               <tr>
                                   <td>{contactus.name}</td>
                                  <td><a href="https://mail.google.com/mail/" style={{color:'black'}}>
                                    {contactus.email}</a></td>
                                   <td>{contactus.phone}</td>
                                   <td>{contactus.question}</td>
                                   
                                   <td><button  class= "btn btn-danger" onClick={() =>this.onDelete(contactus._id)}>DELETE</button></td>
                               </tr>
                        
      
                         
                     </tbody>
                   
                     ))}
                     
                 </table>
                 
         </div> 
 
     );
}
}
/*
{notice.output.map(output=>(
                                    <div>{output.comment}</div>
                                ))}*/