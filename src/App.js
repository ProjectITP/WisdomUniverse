import './App.css';
import ViewQuiz from './components/Quiz';
import ViewResults from './components/ViewResults';
import ViewQuizResults from './components/ViewQuizResults';
import UpdateQuizResults from './components/UpdateQuizResults';
import Header from './shared/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (
    <Router>
    <div>
      <Header/>
      
      {/* <Route path="/" exact component={CounterClass} /> */}
    
      <Route path="/i/quiz" exact component={ViewQuiz}/>
    </div>
  



<Route path="/i/viewresults" exact component={ViewResults}/>
          <Route path="/i/viewquizresults/:id" exact component={ViewQuizResults}/>
          <Route path="/i/updateresults/:id" exact component={UpdateQuizResults}/>
    </Router>
  );
}

export default App;