import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import '../subject-styles.css';


const ViewMaterialsInstructor = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(''); 
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8070/getAllFiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    
    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:8070/download/${id}`, {
        responseType: 'blob'
      });
        const split = path.split('/');
        const filename = split[split.length - 1];
        setErrorMsg('');
        return download(result.data, filename, mimetype);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while downloading file. Try again later');
        }
      }
    };

    const deleteFile=(id)=>{
      axios.delete(`http://localhost:8070/delete/${id}`).then(()=>{
          alert("Successfully Deleted")
          setFilesList(
            filesList.filter((val)=>{
              return val._id != id;
            })
          )    
      })        
    }


  return (
    <div className="container">
      &nbsp; &nbsp;
    <div className="row material-background" style={{height:'120px'}}>
         <div className="col justify-content-start" style={{marginTop:'30px'}}>
         <h1 className="text-uppercase font-weight-bold">Study Materials</h1>           
         </div>
    </div>   
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}     
       <table className="table table-hover shover" style={{marginTop:'40px'}}>
            <thead className="header__item">
               <tr>
                 <th scope="col">&nbsp;</th>
                 <th scope="col">Subject Name</th>                 
                 <th scope="col">Topic</th>
                 <th scope="col">Additional Notes</th>
                 <th></th>
               </tr>
             </thead>
              <tbody>
                {filesList.length > 0 ? (
                filesList.map(
                  ({ _id, subjectName, topic, notes, material_path, material_mimetype }) => (
                    <tr key={_id}>
                      <th scope="row">&nbsp;&nbsp;</th>
                      <td className="fw-bolder">{subjectName}</td>
                      <td>{topic}</td>
                      <td>{notes}</td>
                      <td style={{textAlign:'center'}}>

                        <a className="btn btn-warning" href="#/"
                        onClick={() =>
                          downloadFile(_id, material_path, material_mimetype)}>
                        <i className="fas fa-download"></i> &nbsp;Download
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        {/*<a className="btn btn-warning" href={`/editMaterial/${_id}`}>
                          <i className="fas fa-edit"></i> &nbsp; Edit
                        </a>
                        &nbsp;&nbsp;&nbsp;*/}
                        <a className="btn btn-danger" href="#" onClick={() => deleteFile(_id)} >
                          <i className="far fa-trash-alt"></i> &nbsp; Delete
                        </a>
                      </td>
                    </tr>
                 )
                 )
               ) : (
                 <tr>
                   <td colSpan={4} style={{ fontWeight: '300' }}>
                     No files found. Please add some.
                   </td>
                 </tr>
               )}
             </tbody>
        </table>
        <button className="sbutton btn btn-primary"><a href="/uploadMaterial" style={{textDecoration:'none',color:'white'}}>Upload new material</a></button>
    </div>
  );
};export default ViewMaterialsInstructor;