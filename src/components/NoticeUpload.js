import react,{useState, Component} from 'react';
import axios from 'axios';

export default class NoticeUpload extends Component{

    constructor(props){
        super(props);
        this.state={
            title:"",
            notice:"",
            uploader:"",
            date:""
        }
    }
  
    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({

            ...this.state,
            [name]:value
        })
    }


    onSubmit = (e) =>{

        e.preventDefault();

        const{title,notice,uploader,date} = this.state;

        const data ={
            title:title,
            notice:notice,
            uploader:uploader,
            date:date
        }
        console.log(data)

        axios.post("http://localhost:8070/notice/feedadd",data).then((res)=>{

            alert("succesfully Notices were uploaded.");
                /* if(res.data.success){*/

                   
                     this.setState(
                         {
                            title:"",
                            notice:"",
                            uploader:"",
                            date:""  
                         }
                     )
                 /*}*/

        })
    }

    render(){

        return(

          <div>
            
          <h1 className="titleC">  To Upload The Notices...   </h1>

        

                                <div className="row">
                                  <div class="col-md-23">
                                    <div>
                                      
                                              <div class="mb-3">
                                              <label for="title" class="form-label"><b>Title of the Notice  :</b></label>
                                                <input type="text" class="form-control" id="title" name="title" placeholder="Enter the Title "
                                               
                                                 value={this.state.title}
                                                 onChange={this.handleInputChange}
                                                 required />
                                              </div>


                                              <div class="mb-3">
                                              <label for="notice " class="form-label"><b>Enter the Notice :</b></label>
                                              <textarea class="form-control" id="notice" name="notice" placeholder="Enter the Notice" rows="5"  
                                              value={this.state.notice}
                                              onChange={this.handleInputChange}
                                              required ></textarea>
                                            </div>

                                              <div class="mb-3">
                                              <label for="uploader" class="form-label"><b> Uploader Name : :</b></label>
                                                <input type="text" class="form-control" id="uploader" name="uploader" placeholder="Uploader name "
                                                
                                                 value={this.state.uploader}
                                                 onChange={this.handleInputChange}
                                                 required />
                                              </div>

                                              <div class="mb-3">
                                              <label for="date" class="form-label"><b>Enter the Date :</b></label>
                                                <input type="text" class="form-control" id="date" name ="date" placeholder="YY/MM/DD" 
                                               
                                                value={this.state.date}
                                                onChange={this.handleInputChange}
                                                required />
                                              </div>

                                             

                                            <div class="mb-3">
                                            <button type="button" class="btn btn-success"  onClick={this.onSubmit}> UPLOAD </button>
                                            </div>

                                          

                                    </div>
                                  </div>

                                  <div class="col-md-29">
                                    <div   class="alert alert-success">

                                      <h5> Instructions : </h5><br></br>

                                      <p>1. Fill the form inputting notice </p>
                                      <p>2. click upload button</p>
                                      <p>3.check whether notice is succesfully upload .clicking view button</p> 

                                      <p>When You Uploading the notice please Put all Informations Correctly . It will easy for students. As well as 
                                        ,if you want to edit or delete some notice . You want only to click delete and update butons . If you wand to see the current notices 
                                        click the following "view Notices " Button.Clicking that you can reach for update and delete buttons also.</p>
                                        <br></br>
                                        <hr></hr>
                                        <br></br>

                                        <button className="btn btn-primary" ><a style={{color:"white"}} href={`/feedAdminview`}>View Notices </a></button>
                                      
                                    
                              </div>
                              </div>
                              </div>
                              </div>
                              

        )}
}
