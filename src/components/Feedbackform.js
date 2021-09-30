import react,{ Component} from 'react';


import axios from 'axios';

export default class Feedbackform extends Component{

    constructor(props){
        super(props);
        this.state={

        sname:"",
        section:"",
        review:"",
        fdate:"",
        experience:"",
        support:"",
        satisfication:""
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

        const{sname,section,review,fdate,experience,support,satisfication} = this.state;

        const data ={
           
        sname:sname,
        section: section,
        review:review,
        fdate:fdate,
        experience:experience,
        support:support,
        satisfication:satisfication
           
        }
        console.log(data)

        axios.post("http://localhost:8070/feedback/fbadd",data).then((res)=>{

            alert("succesfully Feedback  was received,Thank You!");
                /* if(res.data.success){*/

                   
                     this.setState(
                         {
                            sname:"",
                            section:"",
                            review:"",
                            fdate:"",
                            experience:"",
                            support:"",
                            satisfication:""
                         }
                     )
                 /*}*/

        })
    }

    render(){
      
        
  return (

     <div className="container" >
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <div >
            
            <h1>Student  Feedback  Form</h1><br></br>

          <div>
         <div class="mb-3">
                <label class="form-label"> <b>Enter the Student Name : * </b></label>
                <input type="text" class="form-control"  name="sname"
                 placeholder="Enter the name " 
                 value={this.state.sname}
                 onChange={this.handleInputChange} 
                  required/>

                </div>
                  <br></br>

                <div class="mb-3">
                <label class="form-label"><b>Type Of the Feedback :</b> </label>
                        <select class="form-select"  name="section"
                         placeholder="Enter the name " 
                         value={this.state.section}
                         onChange={this.handleInputChange}
                         required >

                        <option>select sectionn as subject / other matter</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>Physics </option>
                        <option>Chemistry </option>
                        <option>Other Matters  </option>
                        </select>
                </div>

                   <br></br>
                 
                <div>
                <label  class="form-label"><b>Feedback review/Enquiry : </b> </label> 
                <textarea class="form-control" placeholder="Leave a comment here"  name="review"
                placeholder="Enter the name " 
                value={this.state.review}
                onChange={this.handleInputChange}
                required></textarea>
                </div>

                 <br></br>

                <div class="mb-3">
                <label  class="form-label">Enter the Date : *</label>
                <input type="text" class="form-control"  name="fdate" 
                placeholder="YY/MM/DD " 
                value={this.state.fdate}
                onChange={this.handleInputChange}
                required />
                </div>
                <br></br>


                <div class="mb-3">
                <label  class="form-label"> <b>How abut the Experience of the Institute Management: *</b></label>
                        <select class="form-select"  name="experience"
                         placeholder="Enter the name " 
                         value={this.state.experience}
                         onChange={this.handleInputChange}
                         required>

                        <option >choose</option>
                        <option>Good</option>
                        <option>Bad</option>
                        <option>Very Good</option>
                        <option> Best </option>
                        </select>
                </div>
                 <br></br>


                <div class="mb-3">
                <label class="form-label"> <b>How is the Support from the Institute Of Instructors  : *</b></label>
                        <select class="form-select"  name="support" 
                         value={this.state.support}
                         onChange={this.handleInputChange}
                         required>

                        <option >choose</option>
                        <option>Good</option>
                        <option>Bad</option>
                        <option>Very Good</option>
                        <option> Best </option>
                        </select>
                </div>

                 <br></br>

                <div class="mb-3">
                <label  class="form-label"><b> Overall Satisfication :* </b></label>
                        <select class="form-select" name="satisfication" 
                        placeholder="Enter the name " 
                        value={this.state.satisfication}
                        onChange={this.handleInputChange}
                        required>

                        <option  selected>choose</option>
                        <option >satisfied</option>
                        <option >Very satisfied</option>
                        <option >Not Satisfied</option>
                        </select>
                </div>

                 <div style={{marginTop:50, marginLeft:500}}>
                        
                 <button  class="btn btn-success" type="submit"  onClick={this.onSubmit}>Send Feedback</button>

                 </div>
                   <br></br>



        </div>


    </div>
    </div>
)
   
  }
}