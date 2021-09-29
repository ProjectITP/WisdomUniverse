import react,{useState, Component} from 'react';
import axios from 'axios';




export default class View extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            notice : []
        }
    }
    componentDidMount(){
        axios.get("http://localhost:8070/notice/feedview")
        .then(Response =>{
            this.setState({notice:Response.data})
            console.log(Response)
        }).catch(function(err){
            console.log(err);
        })
      
        
    }

    /*onDelete =(id) =>{
         axios.delete(`http://localhost:8070/notice/feeddelete/${id}`).then((res)=>{
             alert("Dlete Succesfully");
             this.componentDidMount();
         })
    }*/
    

    //Notices Viewing 
    
    render(){
        return(
           <div>
          <h1 style={{textAlign:"center", marginBottom:30, marginTop:30}}><b>NOTICES</b></h1><br/>
               <div className="container32">
                   <br/>

                   
                    {this.state.notice.map(notice=>(

                            <div class="alert alert-success" style={{backgroundColor:"#ECF0F1"}}>
                            <h4 class="alert-heading"><b>{notice.title}</b></h4>
                            <p style={{color:"black"}}> {notice.notice}</p>
                            <p>By:</p>
                                    <span style={{color:"red"}}>{notice.uploader}   </span><br></br>
                                    <span style={{color:"red"}} >   {notice.date}</span>
                                    
                            <hr></hr>
                            
                            </div>
                     
                    ))}
            </div> 
    </div>
        );
        
    }
}
