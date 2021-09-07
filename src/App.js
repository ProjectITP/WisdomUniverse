import './App.css';
import ViewQuiz from './components/Quiz';
import Header from './shared/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (
    <Router>
    <div>
      <Header/>
      
      {/* <Route path="/" exact component={CounterClass} /> */}
    
      <Route path="" exact component={ViewQuiz}/>
    </div>
    
    </Router>
  );
}

export default App;