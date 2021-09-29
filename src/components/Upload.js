import React, { useState } from "react";
import axios from "axios";


const Upload=()=> {

  const [file_path,setFile_path]=useState(null);
  const[state,setState]=useState({
    name:'',
    nic:'',
    email:'',
    subject:'',
    bank:'',
    amount:'',
    deposited_date:''
  });

  const inputOnChange=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    });
  };


  const handleOnSubmit = (e) =>{
    e.preventDefault();

    const{name,nic, email, subject,bank,amount,deposited_date}=state;
    const formData=new FormData();

    formData.append('file_path',file_path);
    formData.append('name',name);
    formData.append('nic',nic);
    formData.append('email',email);
    formData.append('subject',subject);
    formData.append('bank',bank);
    formData.append('amount',amount);
    formData.append('deposited_date',deposited_date);

    const config= {
      headers:{
        'content-type':'multipart/forem-data',
      }
    };
    ///////////
    axios.post('http://localhost:8070/file/upload',formData,config).then((response)=>{
        alert('Payement Details submitted successfully..')
        
      
  }).catch((err)=>{
    console.log('err',err);

  })
};

  const handleInputChange=(e)=>{
    setFile_path(e.target.files[0])
  }


  return(
    
    <div className ="container">
      
   <form   style={{backgroundColor:'#f2f2f2',padding:'30px 30px',width:'800px',margin:'30px 220px'}} onSubmit={handleOnSubmit} novalidate> 
   <h1 style={{textAlign:'center'}}>Payment Details </h1> <hr></hr>
   <div className="form-group">
                <label htmlFor="name"><b>Name</b></label>
                <input className="form-control" type="text" name='name' placeholder="Enter name.."
                onChange = {inputOnChange}
                required />
        </div>
        <br></br>
        <div className="form-group">
                <label htmlFor="nic"><b>NIC Number</b></label>
                <input className="form-control" type="text" name='nic' placeholder="Enter NIC number.."
                onChange = {inputOnChange}
                required/>
        </div>
<br></br>
        <div className="form-group">
                <label htmlFor="email"><b>Email</b></label>
                <input className="form-control" type="email" name='email' placeholder="Enter email (ex:- name@example.com)"
                onChange = {inputOnChange}
               required  />
        </div>
        <br></br>
        <div className="form-group">
            <label  htmlFor="subject"><b>Subject</b></label>
            <select  className="form-control"  name="subject" onChange = {inputOnChange} required >
                <option Value="">Choose a Subject</option>
                <option value="Combined Maths"> Combined Maths</option>
                <option value="Biology" > Biology</option>
                <option value="Physics" > Physics</option>
                <option value="Chemestry" > Chemestry</option>
                <option value="Economics" > Economics</option>
            </select>
        </div>


        <br></br>
        

        <div className="form-group">
        <label htmlFor="file_path" class="form-label"><b>Upload your bank deposite slip </b>&nbsp;&nbsp;&nbsp;  (maximum file size 2MB)</label>
            <input className="form-control" type='file'  name='file_path' onChange={handleInputChange}  required/>
        </div>
        <br></br>

        <div className="form-group">
                <label htmlFor="bank"><b>Bank</b></label>
                <input className="form-control" type="text" name='bank' placeholder="Enter bank"
                onChange = {inputOnChange}
                required/>
        </div>
        <br></br>
        <div className="form-group">
                <label htmlFor="amount"><b>Amount</b></label>
                <input className="form-control" type="text" name='amount'  placeholder="Enter amount"
                onChange = {inputOnChange}
                required  />
        </div>
        <br></br>
        <div className="form-group">
                <label htmlFor="deposited_date"><b>Deposited date</b></label>
                <input className="form-control" type="text" name='deposited_date' placeholder="Enter deposited date"
                onChange = {inputOnChange}
                required  />
        </div>



        <br></br>

   <button className="btn btn-primary" type='submit'>Submit</button>
    
    
    </form>
    
     </div>)
}
;



export default  Upload;