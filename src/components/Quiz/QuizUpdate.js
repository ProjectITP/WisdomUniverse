import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';
import moment from 'mo'


const today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
export default class QuizUpdate extends Component {

    constructor(props) {
        super(props);
        this.state={
            name:"",
            duration:"",
            FromDate:"",
            ToDate:"",
            Attempts:"",
            today
        };
      }

      componentDidMount(){

        const id = this.props.match.params.id
        //http://localhost:8070/Quiz/get/${id}
        //http://localhost:8070/assignment/613ddc2eddc0bc5078269d14
        axios.get(`http://localhost:8070/assignment/613ddc2eddc0bc5078269d14`).then((res) => {
            this.setState({
                // name:res.data.Quiz.name,
                // duration:res.data.Quiz.duration,
                // FromDate:res.data.Quiz.FromDate,
                // ToDate:dateFormat(res.data.Quiz.ToDate,"yyyy-mm-dd"),
                // Attempts:res.data.Quiz.Attempts
                 FromDate:res.data.Assignment.FromDate,
                 cuDate:new Date()
            });
            console.log(res.data);
            console.log(dateFormat(today,))
            //console.log(dateFormat(res.data.Quiz.FromDate, "yyyy-mm-dd HH:mm:ss"))
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
        const {name, duration, FromDate, ToDate, Attempts} = this.state;

        const updateQuiz = {
            name:name,
            duration:duration,
            FromDate:FromDate,
            ToDate:ToDate,
            Attempts:Attempts
        }

        console.log(updateQuiz);

        axios.put(`http://localhost:8070/quiz/update/${id}`,updateQuiz).then(()=>{
            alert("Quiz Updated")
            this.setState({
                name:"",
                duration:"",
                FromDate:"",
                ToDate:"",
                Attempts:""
            });
            window.location = '/i/quiz';
        }).catch((err)=>{
            alert(err);
        })
    }
    render(){
        
         return (
            <div className="container">
            <h2>Edit The Quiz Details</h2>
            <br/><br/>
            <div>
                
            <form>
                <div className="row g-3">
                    <div className="col-sm-7">
                        <div className="mb-3 col">
                            <label for="exampleInputEmail1" className="form-label">Quiz Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" name="name"  value={this.state.name} onChange={this.handleInputChange} required={true} />
                            <div id="emailHelp" className="form-text">Type a quiz name</div>
                        </div>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-sm-7">
                        <div className="mb-3 col">
                            <label for="exampleInputEmail1" className="form-label">Duration</label>
                            <input type="Number" className="form-control" id="exampleInputEmail1" value={this.state.duration} name="duration" onChange={this.handleInputChange} required={true} />
                            <div id="emailHelp" className="form-text">Type the duration in mintues</div>
                        </div>
                    </div>
                </div>
                
                <div className="row g-3">
                    <div className="col-sm-3" id="datetimepicker1">
                            <label for="exampleInputEmail1" className="form-label">Quiz Availability</label>
                            <input type="datetime-local" className="form-control" id="enddate" placeholder="To date" name="FromDate" min={this.state.cuDate}  value={this.state.FromDate} onChange={this.handleInputChange} required={true}/>
                            <div id="emailHelp" className="form-text">From date (Unhide the quiz)</div>
                    </div>
                    <div className="col-sm-4">
                            <label for="exampleInputEmail1" className="form-label col-form-label-lg"></label>
                            <input type="datetime-local" className="form-control" id="enddate" placeholder="To date" name="ToDate" min={this.state.FromDate} value={this.state.ToDate} onChange={this.handleInputChange} required={true}/>
                            <div id="emailHelp" className="form-text">To date (Expire the quiz)</div>
                    </div>
                </div>
                <br/>
                <div className="row g-3">
                    <div className="col-sm-7">
                        <div className="mb-3 col">
                            <label for="exampleInputEmail1" className="form-label">Number Of Attempts</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" min="1" name="Attempts" value={this.state.Attempts} onChange={this.handleInputChange} required={true}/>
                            <div id="emailHelp" className="form-text">Minimum 1 attempt</div>
                        </div>
                    </div>
                </div>
                
            </form>
            
            </div>
            <br/>
            <div className="d-grid gap-2 col-6 mx-auto">
                <Link to="" className="btn btn-outline-success btn-lg" role="submit" onClick={this.onSubmit} >Update the Quiz</Link>
            </div>
            
        </div>
        )
    }
}
