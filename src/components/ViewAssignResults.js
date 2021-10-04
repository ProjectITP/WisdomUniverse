import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class QuizUpdate extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            Quiz:[],
            Attempts_Ass:[],
            name:''
            
        };
      }

      componentDidMount(){
        const id = this.props.match.params.id;
        const req01=axios.get(`http://localhost:8070/attemptsass/`);
        const req02=axios.get(`http://localhost:8070/assignment/${id}`);

        axios.all([req01,req02]).then(axios.spread((res1,res2) => {
            this.setState({
                Attempts_Ass:res1.data,
                name:res2.data.Assignment.name
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

            //this.readInsts();
        }

    // readInsts(){
    //     axios.get("http://localhost:8070/instructors").then((res) => {
            
    //         this.setState({
    //             Instructor:res.data.existingInstructors
    //         });
    //         console.log(this.state.Instructor);
    //     });
    // }
    // filterInst(Instructor,searchKey){
    //     const result = Instructor.filter((Insts) =>
    //       Insts.firstname.includes(searchKey)
    //     )
    //     this.setState({Instructor:result})
    // }
    // handleSearchInst = (e)=>{
    //     const searchKey=e.currentTarget.value;
  
    //     axios.get("http://localhost:8070/instructors").then((res) => {
    //         this.filterInst(res.data , searchKey)
    //     });
    // }

    // filterData(Attempts_Ass,searchKey){
    //     const result = Attempts_Ass.filter((Insts) =>
    //       Insts.Instructor.includes(searchKey)
    //     )
    //     this.setState({Attempts_Ass:result})
    // }
    handleSearchArea = (e)=>{

      const searchKey=e.currentTarget.value;

      axios.get("http://localhost:8070/attemptsass/").then((res) => {
          this.filterData(res.data , searchKey)
      });
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
    render(){
        
         return (
            <div className="container">
            <h2>{this.state.name} Results</h2><br/><br/>
            <h3>Assignment Details</h3>
            {/* <h6>Duration:{this.state.ToDate}</h6> */}

            <br/><br/>
            <div>
            
            {/* <table>
                <tbody>
                    {this.state.Instructor.map((inst)=>(
                        <tr>
                            <td>
                                {inst.firstname}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <table className="table">
                <thead>
                    <th>Student</th>
                    <th>Marking Status</th>
                    <th>Instructor</th>
                    <th>Plagarism Score</th>
                    <th>Marks</th>
                </thead>
                <tbody>
                    {this.state.Attempts_Ass.map((attempts_Ass)=>(
                            <tr class="table-secondary">
                                <td>{attempts_Ass.Student} </td>
                                <td>{attempts_Ass.MarkingStatus}</td>
                                <td>{attempts_Ass.Instructor}</td>
                                <td>{attempts_Ass.PlagarismScore}</td>
                                <td>{attempts_Ass.Marks}</td>
                                <td><div className="">
                                    <Link className="btn btn-warning" to={`/i/updateassignresults/${attempts_Ass._id}`} role="button">Update the results</Link>
                                </div></td>
                                <td><div className="d-grid gap-2 mx-auto">
                                    <Link className="btn btn-outline-danger" onClick={() => this.deleteQuiz((attempts_Ass._id))} role="button">Delete the results</Link>
                                </div></td>
                            </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        )
    }
}