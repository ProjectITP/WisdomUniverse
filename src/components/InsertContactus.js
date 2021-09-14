import react,{useState, Component} from 'react';
import axios from 'axios';

export default class InsertContactus extends Component{

    constructor(props){
        super(props);
        this.state={
         
         name: "",
         email:"",
         phone : "",
         question: ""

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

        const{name,email,phone,question} = this.state;

        const data ={

            name: name,
            email:email,
            phone : phone,
            question: question
            
        }
        console.log(data)

        axios.post("http://localhost:8070/contactus/add",data).then((res)=>{

            alert("succesfully Your Qyestion  was Inserted.");
                /* if(res.data.success){*/

                   
                     this.setState(
                         {
                            name: "",
                            email:"",
                            phone : "",
                            question: ""
                         }
                     )
                /* }*/

        })
    }

    render(){

        return(
    

          <div>
            
            <h1 className="titleC">  GET TOUCH WITH US ...   </h1><br></br>

          <div  className="container">

          <div className="row">
            <div class="col-md-3" style={{backgroundColor:"#ff9b00",borderRadius:10,padding:30,marginBottom:20}}>
              <div class="contact-info">
                <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
                <h2>Contact Us</h2>
                <h4>We are for you ... Come and Get knowledge  !</h4><br></br>

                <h4 style={{marginTop:70}}>E-Mail- wisdom@gmail.com </h4><br></br>
              </div>
            </div>

            <div class="col-md-9" style={{backgroundColor:"#fff",borderRadius:10,padding:30,marginBottom:20}}>
              <div class="contact-form2">

                <div class="form-group">
                  <label class= "lable-Contct" for="name"> Name: </label>
                  <div class="col-sm-10">          
                  <input type="text" class="form-control"   name="name"   placeholder="Please enter your name " 
                   value={this.state.name}
                   onChange={this.handleInputChange}
                   required />
                  </div>
                </div>

                <div class="form-group">
                  <label class="lable-Contct" for="email">Email :</label>
                  <div class="col-sm-10">          
                  <input type="email" class="form-control"  name="email"  
                   placeholder="Please enter your  Valid E-Mail " 
                   value={this.state.email}
                   onChange={this.handleInputChange}
                   required/>
                  </div>
                </div>

                <div>
                  <label class="lable-Contct"  for="phone">Phone  Number :</label>
                  <div class="col-sm-10">
                  <input type="text" class="form-control"  name="phone" 
                   placeholder="Please enter your Current Phone Number "  
                   value={this.state.phone} 
                   onChange={this.handleInputChange} 
                   required/> 
                  </div>
                </div>

                <div>
                  <label class="lable-Contct" >Question :</label>
                  <div class="col-sm-10">
                  <textarea class="form-control" rows="10" id="question" name="question" 
                   placeholder="You are feel free to ask Anything " 
                   value={this.state.question}
                   onChange={this.handleInputChange}
                   required></textarea>
                  </div>
                </div>

                <div class="form-group">        
                  <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="btn btn-default" onClick={this.onSubmit}>Submit</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        </div>
           
          
        )
        
        }
    }
