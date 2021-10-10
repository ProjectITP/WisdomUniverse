import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GenerateReport from './Assignment/report/GenerateResReport';
//mport { Bar } from 'react-chartjs-2';
import './Assignment/css/results2.css'
import background from './Assignment/img/back10.jpg'

export default class QuizUpdate extends Component {
    
    constructor(props) {
        super(props);
        //this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state={
            Quiz:[],
            Attempts_Ass:[],
            name:'',
            PublishStatus:'',
            Assid:this.props.match.params.id,
            labal:[]
            
        };
      }

      componentDidMount(){
        const id = this.props.match.params.id;
        const req01=axios.get(`http://localhost:8070/attemptsass/`);
        const req02=axios.get(`http://localhost:8070/assignment/${id}`);

        axios.all([req01,req02]).then(axios.spread((res1,res2) => {
            const result = res1.data.filter((Insts) =>
                      Insts.Assignment.includes(id)
            )
            this.setState({
                Attempts_Ass:result,
                name:res2.data.Assignment.name,
                PublishStatus:res2.data.Assignment.PublishStatus,
    
                // FromDate,
                // ToDate

                // name:res2.data.Quiz.name,
                // duration:res2.data.Quiz.duration,
                // FromDate:res2.data.Quiz.FromDate,
                // ToDate:res2.data.Quiz.ToDate,
                // Attempts:res2.data.Quiz.Attempts
            });
            console.log(this.state.Attempts_Ass,this.state.name);
        }));
        this.Chart();
        console.log(this.state.Attempts_Ass[0])
        }

    deleteQuiz = (id)=>{
            if(window.confirm("Want to delete it?")){
            axios.delete(`http://localhost:8070/attemptsass/delete/${id}`).then((res)=>{
                alert("Delete Succesfully");
            }).catch((err)=>{
                alert(err.message);
            })
        }
        const qid = this.props.match.params.id
        window.location = `/i/viewquizresults/${qid}`;
    }
    GenerateRepo = () =>{
        GenerateReport(this.state.Attempts_Ass,this.state.name)
    }
    Chart=()=>{
        this.state.Attempts_Ass.map((stds)=>(
            this.setState({
            labal:stds.Student
        })
        ))
        
    }
    
    render(){
        
        if (this.state.PublishStatus===true) {
         return (
             <div style={{ backgroundImage: `url(${background})`  ,height: "100vh", backgroundSize:"cover"}}>
            <div className="container results" >
            <h2>{this.state.name} Results</h2><br/><br/>
            <h3>Assignment Details</h3>
            {/* <h6>Duration:{this.state.ToDate}</h6> */}

            <br/><br/>
            <div>
            
            <table className="table .col-md-8">
                <thead>
                    <th>Student</th>
                    <th>Pass Status</th>
                    <th>Marks</th>
                </thead>
                <tbody>
                    {this.state.Attempts_Ass.map((attempts_Ass)=>(
                            <tr class="table-secondary">
                                <td>{attempts_Ass.Student} </td>
                                <td>{attempts_Ass.Status}</td>
                                <td>{attempts_Ass.Marks}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        )
    }
    else{
        return(
            <div style={{ backgroundImage: `url(${background})`  ,height: "100vh", backgroundSize:"cover"}}>
            <div className="container results" >
            <h2>{this.state.name} Results</h2><br/><br/>
            
            {/* <h6>Duration:{this.state.ToDate}</h6> */}

            <br/><br/>
            <div>
            
            <h1>Coming Soon...</h1>
            </div>
        </div>
        </div>
        );
    }
    }
    
}