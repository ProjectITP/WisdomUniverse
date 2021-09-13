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

import Feedbackform from './components/Feedbackform';
import View from './components/Notice';
import ViewAdmin from './components/AdminNoticeView';
import FeedbackView from './components/FeedbackView';
import NoticeUpload from './components/NoticeUpload';
import AdminContactView from './components/AdminContactView';
import NoticeUpdate from './components/NoticeUpdate';
import InsertContactus from './components/InsertContactus';



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
          <Route path="/i/quizupdate/:id" component={QuizUpdate} exact></Route>
          <Route path="/i/assignment" exact component={ViewAssignment}/>
          <Route path="/i/assignmentadd" exact component={AssignmentAdd}/>


          <Route path="/add" exact component={InsertContactus} />
          <Route path="/view" exact component={AdminContactView} />
          <Route path="/fbview" exact component={FeedbackView} />
          <Route path="/fbadd" exact component={Feedbackform} />
          <Route path="/feedadd" exact component={NoticeUpload} />
          <Route path="/feeddelete/:id" exact component={ViewAdmin} />
         <Route path="/feedview" exact component={View} />
         <Route path="/feedAdminview" exact component={ViewAdmin} />
         <Route path="/feedupdate/:id" exact component={NoticeUpdate} />

      

      
    </div>
    <Footer/>
    </Router>
  );
}

export default App;