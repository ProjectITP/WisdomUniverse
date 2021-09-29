import React, { useState } from "react";
import axios from "axios";


const AddPayment=()=> {

  const [file_path,setFile_path]=useState(null);
  const[name,setName] = useState('');
  const[nic,setNic] = useState('');
  const[email,setEmail] = useState('');
  const[subject,setSubject] = useState('');
  const[bank,setBank] = useState('');
  const[amount,setAmount] = useState('');
  const[deposited_date,setDeposited_date] = useState('');


 /* const[state,setState]=useState({
      name:'',
      nic:'',
      email:'',
      subject:'',
      bank:'',
      amount:'',
      deposited_date:''
  });*/

  const handleOnSubmit = (e) =>{
    e.preventDefault();
  /* const{ name,nic,email,subject,bank,amount,deposited_date}=state;*/
    const formData=new FormData();

    formData.append('file_path',file_path);
    formData.append('name',name);
    formData.append('nic',nic);
    formData.append('email',email);
    formData.append('subject',subject);
    formData.append('bank',bank);
    formData.append('deposited_date',deposited_date);


    const config= {
      headers:{
        'content-type':'multipart/forem-data',
      }
    };
    
    axios.post('http://localhost:8070/payment/upload', formData,config).then((response)=>{
        alert('Payment Details submitted successfully')
  }).catch((err)=>{
    console.log('err',err);

  })
};


  /*  const handleInputChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value});
    };*/

  const handleInputfileChange=(e)=>{
    setFile_path(e.target.files[0])
  }


  return(
    <div className ="container">
        <h1>Payment Details </h1> <hr></hr>
        <form onSubmit={handleOnSubmit}> 

        <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name='name' placeholder="Enter name"
                onChange = {(e) =>{
                  setName(e.target.value);
              }}
                 />
        </div>

        <div className="form-group">
            <label htmlFor="nic">NIC Number</label>
            <input type="text" className="form-control" name="nic"  placeholder="Enter NIC Number"
            onChange = {(e) =>{
              setNic(e.target.value);
          }}/>
        </div>

        <div className="form-group">
            <label htmlFor="email">Email </label>
            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"
            onChange = {(e) =>{
              setEmail(e.target.value);
          }}/>
        </div>

        <div className="form-group">
            <label className="mr-sm-2" htmlFor="subject">Subject</label>
            <select className="custom-select mr-sm-2" name="subject" onChange = {(e) =>{
                    setSubject(e.target.value);
                }}>
                <option defaultValue>Choose a Subject</option>
                <option value="Combined Maths"> Combined Maths</option>
                <option value="Biology" > Biology</option>
                <option value="Physics" > Physics</option>
                <option value="Chemestry" > Chemestry</option>
                <option value="Economics" > Economics</option>
            </select>
        </div>

        <div className="form-group">
            <input className="form-control" type='file'  name='file_path' onChange={handleInputfileChange}/>
        </div>

        <div className="form-group">
            <label htmlFor="bank">Bank</label>
            <input type="text" className="form-control" name="bank"
            onChange = {(e) =>{
              setBank(e.target.value);
          }} />
        </div>

        <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="text" className="form-control" name="amount" 
            onChange = {(e) =>{
              setAmount(e.target.value);
          }}/>
        </div>

        <div className="form-group">
            <label htmlFor="deposited_date">Deposited Date</label>
            <input type="text" className="form-control" name="deposited_date"
                onChange = {(e) =>{
                  setDeposited_date(e.target.value);
              }}/>
        </div>
    
    
        <button className="btn btn-primary" type='submit'>Submit</button>
    
      </form>    
    </div>
  
  )
};

export default  AddPayment;


























