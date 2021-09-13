import './App.css';

import ViewQuiz from './components/Quiz';

import AllInstructor from './components/AllInstructor';
import EditInstructor from './components/EditInstructor';
import InstructorDetails from './components/InstructorDetails';
import GenerateReport from './components/GenerateReport';
import AllRequest from './components/AllRequest';
import EditLecturer from './components/EditLecturer';
import CreateInstructor from './components/CreateInstructor';

import ViewSubjectStudent from "./components/ViewSubjectStudent";
import ViewSubjectInstructor from "./components/ViewSubjectInstructor";
import CreateSubject from "./components/CreateSubject";
import EditSubject from "./components/EditSubject";
import SubjectDetails from "./components/SubjectDetails";
import ViewMaterialsStudent from "./components/ViewMaterialsStudent";
import UploadMaterial from "./components/UploadMaterial";
import EditMaterial from "./components/EditMaterial";
import ViewMaterialsInstructor from './components/ViewMaterialsInstructor';



import Header from './shared/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"


function App() {
  return (
    <Router>
    <div>
      <Header/>
      
      {/* <Route path="/" exact component={CounterClass} /> */}
    
      <Route path="/i/quiz" exact component={ViewQuiz}/>

      <Route path="/" exact component={AllInstructor}/>
          <Route path="/edit/:id" exact component={EditInstructor}/>
          <Route path="/instructor/:id" exact component={InstructorDetails}/>
          <Route path="/reportgenerate" exact component={GenerateReport}/>
          <Route path="/request" exact component={AllRequest}/>
          <Route path="/editrequest/:id" exact component={EditLecturer}/>
          <Route path="/register" exact component={CreateInstructor}/>

          {/*Subject*/}
          <Route path="/ViewSubjectStudent" exact component={ViewSubjectStudent}></Route>
          <Route path="/ViewSubjectInstructor" exact component={ViewSubjectInstructor}></Route>
          <Route path="/addSubject" component={CreateSubject}></Route>
          <Route path="/editStudent/:id" component={EditSubject}></Route>
          <Route path="/subjectDetails/:id" component={SubjectDetails}></Route>
          <Route path="/viewMaterialsStudent" component={ViewMaterialsStudent}></Route>
          <Route path="/uploadMaterial" component={UploadMaterial}></Route>
          <Route path="/editMaterial/:id" component={EditMaterial}></Route>
          <Route path="/viewMaterialsInstructor" component={ViewMaterialsInstructor}></Route>


    </div>
    
    </Router>
  );
}

export default App;