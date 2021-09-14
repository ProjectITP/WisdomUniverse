import './App.css';

import AllInstructor from './components/AllInstructor';
import EditInstructor from './components/EditInstructor';
import InstructorDetails from './components/InstructorDetails';
import GenerateReport from './components/GenerateReport';
import AllRequest from './components/AllRequest';
import EditLecturer from './components/EditLecturer';
import CreateInstructor from './components/CreateInstructor';
import ViewQuiz from './components/QuizViewAll';
import QuizAdd from './components/QuizAdd';
import QuizUpdate from './components/QuizUpdate';
import ViewAssignment from './components/AssignmentView'
import AssignmentAdd from './components/AssignmentAdd';




import Header from './shared/Header';
import Footer from './shared/Footer';


import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (
    <Router>
    <div>
      <Header/>
      
      {/* <Route path="/" exact component={CounterClass} /> */}

      <Route path="/" exact component={AllInstructor}/>
          <Route path="/edit/:id" exact component={EditInstructor}/>
          <Route path="/instructor/:id" exact component={InstructorDetails}/>
          <Route path="/reportgenerate" exact component={GenerateReport}/>
          <Route path="/request" exact component={AllRequest}/>
          <Route path="/editrequest/:id" exact component={EditLecturer}/>
          <Route path="/register" exact component={CreateInstructor}/>

          <Route path="/i/quiz" exact component={ViewQuiz}/>
          <Route path="/i/quizadd" exact component={QuizAdd}/>
          <Route path="/i/quizupdate/:id" component={QuizUpdate} exact/>
          <Route path="/i/assignment" exact component={ViewAssignment}/>
          <Route path="/i/assignmentadd" exact component={AssignmentAdd}/>
          
    </div>
    <Footer/>
    </Router>
  );
}

export default App;