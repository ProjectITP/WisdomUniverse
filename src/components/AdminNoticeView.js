import react,{useState, Component} from 'react';
import axios from 'axios';




export default class ViewAdmin extends Component{
    
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

    onDelete =(id) =>{
         axios.delete(`http://localhost:8070/notice/feeddelete/${id}`).then((res)=>{
             alert("Dlete Succesfully");
             this.componentDidMount();
         })
    }



    filterData(notice,searchKey){

        const result = notice.filter((notice)=>
           
             notice.uploader.toLowerCase().includes(searchKey)
        )
        this.setState({notice:result})
       }
       
       handleSearchArea =(e) =>{
    
        const searchKey = e.currentTarget.value;
    
        axios.get("http://localhost:8070/notice/feedAdminview")
            .then(Response =>{
                if(Response.data.success){
                this.filterData(Response.data.existingPosts,searchKey)
                }
                
            });
    
       }
    

    //Notices Viewing 
    
    render(){
        return(
           <div>
          <h1 style={{textAlign:"center" ,marginTop:10}}><b>NOTICES</b></h1><br/><br></br>

          <input type="search" className="myInput"
                            placeholder="Search for the Notices according to uploader...." 
                            title="Type in a name"
                            onChange={this.handleSearchArea}
                            /><br/><br/>

               <div className="container32">
                   <br/>

                   

                   
                    {this.state.notice.map(notice=>(

                            <div class="alert alert-success" style={{backgroundColor:"#ECF0F1"}}>
                            <h4 class="alert-heading"><b>{notice.title}</b></h4>
                            <p style={{color:"black"}}> {notice.notice}</p>
                            <p>By:</p>
                                    <span style={{color:"red"}}>{notice.uploader}   </span><br></br>
                                    <span  style={{color:"red"}}>   {notice.date}</span>
                                    
                            <hr></hr>

                            <button  className="btn btn-danger" style={{padding:1}}>  <a class="caption-helper btn btn-round" onClick={() =>this.onDelete(notice._id)}>DELETE</a></button>
                            <button className="btn btn-success" style={{marginLeft:10 ,padding:1}}><a class="caption-helper btn btn-round" href={`/feedupdate/${notice._id}`} >UPDATE</a></button>
                            
                            </div>
                     
                    ))}
            </div> 
    </div>
        );
        
    }
}
