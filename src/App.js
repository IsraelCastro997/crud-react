
import './App.css';

import ToList from './components/ToList';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="nav navbar-nav">
                <Link className="nav-item nav-link active" to={"/"}>Home <span className="sr-only">(current)</span></Link>
                <Link className="nav-item nav-link" to={"/create"}>Create Employee</Link>
                
            </div>
        </nav>
        <div className ="container mt-5">
         
          <Route exact path="/" component={ToList}></Route>
          <Route path="/create" component={Create}></Route>
          <Route path="/edit/:id" component={Edit}></Route>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
