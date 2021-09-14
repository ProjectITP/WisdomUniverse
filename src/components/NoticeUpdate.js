import react,{ Component} from 'react';
import axios from 'axios';

export default class NoticeUpdate extends Component{



   /* constructor(props){
        super(props);
        this.state={
            title:"",
            notice:"",
            uploader:"",
            date:""
        }
    }*/
  
    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({

            ...this.state,
            [name]:value
        })
    }


    onSubmit = (e) =>{

        e.preventDefault();
        const id = this.props.match.params.id;

        const{title,notice,uploader,date} = this.state;

        const data ={
            title:title,
            notice:notice,
            uploader:uploader,
            date:date
        }
        console.log(data)

        axios.put(`http://localhost:8070/notice/feedupdate/${id}`,data).then((res)=>{

          alert("succesfully Notices were updated")
                 if(res.data.success){
                    alert("succesfully Notices were updated")
                   
                     this.setState(
                         {
                            title:"",
                            notice:"",
                            uploader:"",
                            date:""  
                         }
                     )
                 }

        });
    }

    constructor(props){
      super(props);
      this.state = {
          notice : []
      }
  }
  componentDidMount(){
    const id = this.props.match.params.id;

      axios.get(`http://localhost:8070/notice/feedget/${id}`)
      .then(Response =>{
          this.setState({
            
            title:Response.data.notices.title,
            notice:Response.data.notices.notice,
            uploader:Response.data.notices.uploader,
            date:Response.data.notices.date
          })
          console.log(Response)
      }).catch(function(err){
          console.log(err);
      })
    
      
  }
  
   /* componentDidMount(){

      const id = this.props.match.params.id;
      /*const{title,notice,uploader,date} = this.state;
      const data ={
        title:title,
        notice:notice,
        uploader:uploader,
        date:date
    }*/

     /* axios.get(`http://localhost:8070/notice/feedget/${id}`).then((res) =>{

          if(res.data.succes){

            alert("succesfully Notices were updated")
              this.setState({
                
                 title:res.data.notices.title,
                 notice:res.data.notices.notice,
                 uploader:res.data.notices.uploader,
                 date:res.data.notices.date

              });

              console.log(this.state.notices)
          }
      });
    }*/
    
    render(){

      
      return(

        <div>
          
        <h1 style={{marginLeft:480}}> <u> To Upadte The Notices</u>   </h1>

      

                              <div className="row">
                                <div class="col-md-30">
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
                                            required value={this.state.notice}
                                            onChange={this.handleInputChange}
                                            required ></textarea>
                                          </div>

                                            <div class="mb-3">
                                            <label for="uploader" class="form-label"><b> Uploader Name : :</b></label>
                                              <input type="text" class="form-control" id="uploader" name="uploader" placeholder="Uploader name "
                                               required
                                               value={this.state.uploader}
                                               onChange={this.handleInputChange}
                                               required />
                                            </div>

                                            <div class="mb-3">
                                            <label for="date" class="form-label"><b>Enter the Date :</b></label>
                                              <input type="email" class="form-control" id="date" name ="date" placeholder="YY/MM/DD" 
                                              required
                                              value={this.state.date}
                                              onChange={this.handleInputChange}
                                              required />
                                            </div>

                                           

                                          <div class="mb-3">
                                          <button type="button" class="btn btn-success"  onClick={this.onSubmit}> UPLOAD </button>
                                          </div>


                                          <br></br><br></br>

                                            <span> clickng this ,You can check  updated notices !.</span><br></br>
                                            <br></br>

                                              <div className="col-md-12">
                                                  <button type="submit" className="vnote" value="UPDATE"><a href={`/feedAdminview`} style={{color:"white"}}>View Updated Notices</a> </button>
                                                </div>
                                                                                      

                                  </div>
                                </div>

                                
                            </div>
                            </div>
                            

      )}



      }


    












    
