import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../subject-styles.css';
//import '../styles.scss'

const UploadMaterial = (props) => {
 
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  
  const [state, setState] = useState({
    subjectName: '',
    topic: '',
    notes: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #1c87c9';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #1c87c9';
    }
  };
  
  const handleOnSubmit = async (event) => {
    event.preventDefault();  
    try {
      const { subjectName, topic, notes,} = state;
      if (subjectName.trim() !== '' && topic.trim() !== '' && notes.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('subjectName', subjectName);
          formData.append('topic', topic);
          formData.append('notes', notes);
          
          setErrorMsg('');
          await axios.post(`http://localhost:8070/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/viewMaterialsStudent');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid upload-background ">
      <div class="container-fluid  testbox">  
      <form className="forms" style={{position:'static',width:'600px', height:'700px'}} onSubmit={handleOnSubmit} >
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <h4 className="subject-h4" style={{textAlign:'center'}}>Upload Study Materials</h4>&nbsp;
          <div className="form-group sitem" style={{marginBottom:'30px'}}>       
            <div controlId="subjectName" style={{marginBottom:'5px'}}>
              <p style={{marginBottom:'5px'}} >Subject Name :</p>
              <input className="form-control"
                type="text"
                name="subjectName"
                value={state.subjectName || ''}
                placeholder="Enter Subject"
                onChange={handleInputChange}
                required/>
            </div>         
          </div>
        
          <div className="form-group sitem" style={{marginBottom:'30px'}}>  
            <div controlId="topic" style={{marginBottom:'5px'}}>
            <p style={{marginBottom:'5px'}} >Lesson :</p>
              <input className="form-control"
                type="text"
                name="topic"
                value={state.topic || ''}
                placeholder="Enter lesson topic"
                onChange={handleInputChange}
                required/>
            </div>
          </div>
          
          <div className="form-group sitem" style={{marginBottom:'30px'}}>  
            <div controlId="notes" style={{marginBottom:'5px'}}>
              <p style={{marginBottom:'5px'}} >Additional Notes :</p>
              <input className="form-control"
                type="text"
                name="notes"
                value={state.notes || ''}
                placeholder="Enter additional notes"
                onChange={handleInputChange}
                required/>
            </div>
          </div>

          <p style={{marginBottom:'5px'}} >Upload :</p>
          <div className="upload-section">
            <Dropzone
              onDrop={onDrop}
              onDragEnter={() => updateBorder('over')}
              onDragLeave={() => updateBorder('leave')}>            
              {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>          
        </div>

        <div className="d-grid gap-2" style={{marginTop:'30px'}}>
        <button className="sbutton btn btn-primary" type="submit">
        <i class="fas fa-upload"></i> &nbsp;Upload
        </button>
        </div>
      </form>
      </div>
      </div>
    </React.Fragment>
  );
};export default UploadMaterial;