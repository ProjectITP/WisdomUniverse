import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Document, Page,pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pdfurl = "./sample.pdf"

export default class UpdateQuizResults extends Component {

    constructor(props){
        super(props);
        this.state={
            Student:"",
            Subject:"",
            Instructor:"",
            Assignment:"",
            AttemptDate:"",
            MarkingStatus:"",
            PublicationStatus:"",
            PlagarismStatus:"",
            PlagarismScore:"",
            Marks:"",
            Grade:"",
            Status:"",
            RescrutinyRequest:"",
            RescrutinyNotification:"",
            PublishStatus:"",
            numPages: (null),
            pageNumber:(1)
        };
      }

      componentDidMount(){

        const id = this.props.match.params.id

        axios.get(`http://localhost:8070/attemptsass/${id}`).then((res) => {
            this.setState({
                Student:res.data.Attempts_Ass.Student,
                Subject:res.data.Attempts_Ass.Subject,
                Instructor:res.data.Attempts_Ass.Instructor,
                Assignment:res.data.Attempts_Ass.Assignment,
                AttemptDate:res.data.Attempts_Ass.AttemptDate,
                MarkingStatus:res.data.Attempts_Ass.MarkingStatus,
                PublicationStatus:res.data.Attempts_Ass.PublicationStatus,
                PlagarismStatus:res.data.Attempts_Ass.PlagarismStatus,
                PlagarismScore:res.data.Attempts_Ass.PlagarismScore,
                Marks:res.data.Attempts_Ass.Marks,
                Grade:res.data.Attempts_Ass.Grade,
                Status:res.data.Attempts_Ass.Status,
                RescrutinyRequest:res.data.Attempts_Ass.RescrutinyRequest,
                RescrutinyNotification:res.data.Attempts_Ass.RescrutinyNotification,
                PublishStatus:res.data.Attempts_Ass.PublishStatus
            });
            console.log(res.data)
        });
      }

      handleInputChange=(e)=>{
          this.setState({
              ...this.state,
              [e.target.name]:e.target.value
          })
      }

      onSubmit=(e)=>{
        e.preventDefault();
        const id = this.props.match.params.id;
        const {Student,Subject,Instructor,Assignment,AttemptDate,MarkingStatus,PublicationStatus,PlagarismStatus,PlagarismScore,Marks,Grade,Status,RescrutinyRequest,RescrutinyNotification,PublishStatus} = this.state;

        const updateres = {
            Student:Student,
            Subject:Subject,
            Instructor:Instructor,
            Assignment:Assignment,
            AttemptDate:AttemptDate,
            MarkingStatus:MarkingStatus,
            PublicationStatus:PublicationStatus,
            PlagarismStatus:PlagarismStatus,
            PlagarismScore:PlagarismScore,
            Marks:Marks,
            Grade:Grade,
            Status:Status,
            RescrutinyRequest:RescrutinyRequest,
            RescrutinyNotification:RescrutinyNotification,
            PublishStatus:PublishStatus
        }

        console.log(updateres);

        axios.put(`http://localhost:8070/attemptsass/update/${id}`,updateres).then(()=>{
            alert("Results Updated")
            window.location = `/i/viewassignresults/${Assignment}`;
            this.setState({
                Student:"",
                Subject:"",
                Instructor:"",
                Assignment:"",
                AttemptDate:"",
                MarkingStatus:"",
                PublicationStatus:"",
                PlagarismStatus:"",
                PlagarismScore:"",
                Marks:"",
                Grade:"",
                Status:"",
                RescrutinyRequest:"",
                RescrutinyNotification:"",
                PublishStatus:""
            });
            
        }).catch((err)=>{
            alert(err);
        })
    }
    handleInputChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        })
    }
    
  
    onDocumentLoadSuccess({ numPages }) {
        this.state.numPages(numPages);
        this.state.pageNumber(1);
    }
    render(){
        
         return (
            <div className="container">
            <h2>Assignment Correction Page</h2>
            <br/><br/>
            <div>
            <Document
                file={pdfurl}>
                // onLoadSuccess={this.onDocumentLoadSuccess}
                
                <Page pageNumber={1} />
            </Document>
            <form>
                <div className="row g-3">
                    <div className="col-sm-7">
                        <div className="mb-3 col">
                            <label for="exampleInputEmail1" className="form-label">Student ID</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" name="name" disabled value={this.state.Student} onChange={this.handleInputChange} required={true} />
                            <div id="emailHelp" className="form-text">Type a quiz name</div>
                        </div>
                    </div>
                </div>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" name="MarkingStatus" id="flexSwitchCheckDefault" onChange={this.handleInputChange}/>
                    <h5><label for="exampleInputEmail1" name="MarkingStatus" className="form-label">Marking Status</label></h5>
                </div>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.handleInputChange}/>
                    <h5><label for="exampleInputEmail1" name="PlagarismStatus" className="form-label">Plagarism Status</label></h5>
                </div>
                
                <div className="row g-3">
                    <div className="col-sm-7">
                        <div className="mb-3 col">
                            <label for="exampleInputEmail1" className="form-label">Plagarism Score</label>
                            <input type="Number" className="form-control" id="exampleInputEmail1" name="PlagarismScore" value={this.state.PlagarismScore} onChange={this.handleInputChange} required={true} />
                            <div id="emailHelp" className="form-text"></div>
                        </div>
                    </div>
                </div>
                
                <div className="row g-3">
                    <div className="col-sm-7">
                        <div className="mb-3 col">
                            <label for="exampleInputEmail1" className="form-label">Marks</label>
                            <input type="Number" className="form-control" id="exampleInputEmail1" value={this.state.Marks} name="Marks" onChange={this.handleInputChange} required={true} />
                            <div id="emailHelp" className="form-text"></div>
                        </div>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-sm-7">
                        <div className="mb-3 col">
                            <label for="exampleInputEmail1" className="form-label">Grade</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" value={this.state.Grade} name="Grade" onChange={this.handleInputChange} required={true} />
                            <div id="emailHelp" className="form-text"></div>
                        </div>
                    </div>
                </div>
                
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.handleInputChange}/>
                    <h5><label for="exampleInputEmail1" name="PublicationStatus" className="form-label">Publication Status</label></h5>
                </div>
                

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  onChange={this.handleInputChange}/>
                    <h5><label for="exampleInputEmail1" name="Status" className="form-label">Status</label></h5>
                </div>

                <br/>
                
                
            </form>
            
            </div>
            <br/>
            <div className="d-grid gap-2 col-6 mx-auto">
                <Link to="" className="btn btn-success btn-lg" role="submit" onClick={this.onSubmit} >Update The Results</Link>
            </div>
            
        </div>
        )
    }
}