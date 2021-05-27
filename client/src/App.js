import './App.css';
import { Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/chat" component={Chat}></Route>
        <Route path="/" component={Login}></Route>
      </Switch>
      
      </Router>
    </div>
  );
}

export default App;
