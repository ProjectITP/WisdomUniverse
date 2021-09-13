import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { API_URL } from '../utils/constants';


const PastpaperUpload = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    subject: '',
    type: '',
    year: '',
    
    
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

    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
        const { subject, type, year } = state;
        if (subject.trim() !== '' && type.trim() !== '' && year.trim() !== '') {
          if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('subject', subject);
            formData.append('type', type);
            formData.append('year', year);
    
    
            setErrorMsg('');
            await axios.post(`${API_URL}/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            props.history.push('/list');
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
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <div className="container">
            <br></br>
        </div>

        
       

        <div>
            <h3>Add Past Paper</h3>
            <br></br>
        </div>
        <Row>
          <Col>
            <Form.Group controlId="subject">
              <Form.Control
                type="text"
                name="subject"
                value={state.subject || ''}
                placeholder="Enter subject"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="type">
              <Form.Control
                type="text"
                name="type"
                value={state.type || ''}
                placeholder="Enter paper type"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="year">
              <Form.Control
                type="number"
                name="year"
                value={state.auther || ''}
                placeholder="Enter year"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
       
        <div className="upload-section">
  <Dropzone onDrop={onDrop}
   onDragEnter={() => updateBorder('over')}
   onDragLeave={() => updateBorder('leave')}
  >
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
  {/*{previewSrc ? (
    isPreviewAvailable ? (
      <div className="image-preview">
        <img className="preview-image" src={previewSrc} alt="Preview" />
      </div>
    ) : (
      <div className="preview-message">
        <p>No preview available for this file</p>
      </div>
    )
  ) : (
    <div className="preview-message">
      <p>Image preview will be shown here after selection</p>
  </div>
  )}*/}
  </div>
        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default  PastpaperUpload;