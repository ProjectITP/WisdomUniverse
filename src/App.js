import './App.css';
import ViewQuiz from './components/QuizViewAll';
import QuizAdd from './components/QuizAdd';
import QuizUpdate from './components/QuizUpdate';
import ViewAssignment from './components/AssignmentView'
import AssignmentAdd from './components/AssignmentAdd';
import Header from './shared/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Footer from './shared/Footer';

function App() {
  return (
    <Router>
    <div>
      <Header/>
      
      {/* <Route path="/" exact component={CounterClass} /> */}
    
      <Route path="/i/quiz" exact component={ViewQuiz}/>
      <Route path="/i/quizadd" exact component={QuizAdd}/>
      <Route path="/i/quizupdate/:id" component={QuizUpdate} exact></Route>
      <Route path="/i/assignment" exact component={ViewAssignment}/>
      <Route path="/i/assignmentadd" exact component={AssignmentAdd}/>
      
    </div>
    <Footer/>
    </Router>
  );
}

export default App;