import './App.css';

import ViewQuiz from './components/Quiz';

import AllInstructor from './components/AllInstructor';
import EditInstructor from './components/EditInstructor';
import InstructorDetails from './components/InstructorDetails';
import GenerateReport from './components/GenerateReport';
import AllRequest from './components/AllRequest';
import EditLecturer from './components/EditLecturer';
import CreateInstructor from './components/CreateInstructor';



import Header from './shared/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (
    <Router>
    <div>
      <Header/>
      
      {/* <Route path="/" exact component={CounterClass} /> */}
    
      <Route path="/i/quiz" exact component={ViewQuiz}/>

      <Route path="/instructor" exact component={AllInstructor}/>
          <Route path="/edit/:id" exact component={EditInstructor}/>
          <Route path="/instructor/:id" exact component={InstructorDetails}/>
          <Route path="/reportgenerate" exact component={GenerateReport}/>
          <Route path="/request" exact component={AllRequest}/>
          <Route path="/editrequest/:id" exact component={EditLecturer}/>
          <Route path="/register" exact component={CreateInstructor}/>

      
    </div>
    
    </Router>
  );
}

export default App;