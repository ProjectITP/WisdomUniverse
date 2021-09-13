import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../utils/constants';



const Resources = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [search, setSearch] = useState('')
  
  const [name,setName] = useState('');
  const [email,setemail] = useState('');


  //for newsletter
  function sendData(e){
    e.preventDefault();
    const NewsLetter = {
      name,
      email
    }
      axios.post(`${API_URL}/addRecord`,NewsLetter).then(()=>{
      alert("You have successfully subscribed the News Letter")
    }).catch((err)=>{
      alert(err)
    })
  }
  
  



  //end newsletter
  



//for search
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/search`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
//search end

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
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
      const result = await axios.get(`${API_URL}/download/${id}`, {
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


//extra
const filterData = filesList.filter( item => {
  return item.subject.toLowerCase().includes(search.toLowerCase())

})
  

//end extra

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <div>
        <br></br>
        <h2>Reference Books</h2>
        <br></br>
      <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Enter subject here" aria-label="Search" onChange={ e => setSearch(e.target.value)}/>
      <button class="btn btn-success " type="submit">Search</button>
    </form>
    <br></br>
      </div>
      <table className="files-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Title</th>
            <th>Auther</th>
            <th>Edition</th>
            <th>Reference Book</th>
            
          </tr>
        </thead>
        <tbody>
          {filterData.length > 0 ? (
            filterData.map(
              ({ _id, subject, title, auther, edition, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-subject">{subject}</td>
                  <td className="file-title">{title}</td>
                  <td className="file-auther">{auther}</td>
                  <td className="file-edition">{edition}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                 
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>

<hr></hr>
      <br></br>
      <br></br>
      <br></br>
<div >
<h4>  NewsLetter </h4>
  <form onSubmit={sendData} >
  <div class="mb-3">

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputPassword1"
    onChange={(e)=>{

      setName(e.target.value);

  }}/>
  </div>

    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    onChange={(e)=>{

      setemail(e.target.value);

  }}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  
  
  <button type="submit" class="btn btn-primary">SUBSCRIBE</button>
</form>
</div>
   
  
 





</div>
    

  );


};


export default Resources;