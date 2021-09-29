import React,{useState, useEffect} from "react";
import download from 'downloadjs';

import axios from "axios";

export default function ViewUpload(){

    const[ upload,setUpload] = useState([]);

    useEffect(() => {
        const getUpload=async()=>{
            try{
                const{data}=await axios.get('http://localhost:8070/file/get');
                setUpload(data);
            }catch(error){
                
            }

        };
       

        getUpload();

    },[]);


  function downloadImage(id,path,mimetype){
        try{
            const result =axios.get(`http://localhost:8070/file/download/${id}`,{
                responseType:'blob'
            });
            const split= path.split('/');
            const filename= split[split.length -1];
            return download(result.data,filename,mimetype);
        }catch(error){
                alert('error downloading');
            
        }
    };

 function deletePayment(id){
    axios.delete(`http://localhost:8070/file/delete/${id}`).then((res)=>{
        alert("Successfully Deleted");
        setUpload(
            upload.filter((val)=>{
                return val._id != id;
            })
        )
        
    })
    
  }
 
    return(
        <div  >
            <h1 style={{textAlign:'center',marginTop:'30px'}}> Students Payments </h1>
<br></br>
            <table className="table table-striped" style={{marginLeft: '50px',width:'90%'}}>
            <thead>
                <tr>
                    <th >Name</th>
                    <th >NIC</th>
                    <th >Email</th>
                    <th >Subject</th>
                    <th >Bank</th>
                    <th >Amount</th>
                    <th>Deposited_Date</th>
                    <th> Deposite Slip</th>
                    
                </tr>
            </thead>

            <tbody>
                {upload.map(
                    ({_id,name,nic,email,subject,bank,amount,deposited_date,file_path,file_mimetype}) => (
                    
                        <tr key={_id} >
                            <td>{name}</td>
                            <td>{nic}</td>
                            <td>{email}</td>
                            <td>{subject}</td>
                            <td>{bank}</td>
                            <td>{amount}</td>
                            <td>{deposited_date}</td>
                            <td>
                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="Download Bank deposite slip"
                      href="#/"
                      onClick={() =>
                        downloadImage(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a></td>
                            <td>
                            <a className="btn btn-danger" style={{color:'white'}} onClick={() => deletePayment(_id)}>Delete</a>
                            </td>   
                        </tr>
                    ))
                        
                    }
            </tbody>
            
            </table>
        </div>
    )
    
}


 