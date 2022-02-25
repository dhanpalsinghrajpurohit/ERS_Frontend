import React from "react";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
  Switch
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
// import Navbar from './containers/UI/Navbar/Navbar';
import Home from './containers/Pages/Home/Home';
import SigninForm from "./containers/Login/Login";
import SignupForm from "./containers/Pages/SignUp/Signup";
import Company from "./containers/Pages/Company/Company";
import Jobs from "./containers/Pages/Jobs/Jobs";
import Dashboard from "./containers/Pages/Dashboard/Dashboard";
import Applicant from "./containers/Pages/Applicant/Applicant";
import Shortlist from "./containers/Pages/Shortlist/Shortlist";

function App() {
  function logout(){
      localStorage.clear();
      window.location.href = '/';
  }
  let logged_in = localStorage.getItem('user')?localStorage.getItem('user'):false;
  let authLink = (
    <>
        <Link to="/signup"  className="btn btn-outline-primary mr-1">SignUp</Link>
        <Link to="/signin" className="btn btn-outline-primary ml-1">SignIn</Link>
    </>
  );
  if(logged_in){
    authLink=<Link to="/signup"  className="btn btn-outline-primary mr-1" onClick={logout}>Logout</Link>
  }
  
  return (
    <div className="App">
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd",fontWeight:"bold"}}>
            <Link className="navbar-brand" to="/dashboard">ERS</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link to="/"  className="nav-item nav-link">Home</Link>
                <Link to="/job"  className="nav-item nav-link">Jobs</Link>
                <Link to="/company"  className="nav-item nav-link">Companies</Link>
                <Link to="/user"  className="nav-item nav-link">User</Link>
                </div>
            </div>
            {authLink}
            {/* <Link to="/signup"  className="btn btn-outline-primary mr-1">SignUp</Link>
            <Link to="/signin" className="btn btn-outline-primary ml-1">SignIn</Link> */}
            </nav>
            <Switch>
                <Route path="/signin" component={SigninForm} />
                <Route path="/signup" component={SignupForm} />
                <Route path="/company" component={Company} />
                <Route path="/job" component={Jobs} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/applicant" component={Applicant} />
                <Route path="/shortlist" component={Shortlist} />
                <Route path="/" component={Home} />
            </Switch>
            </Router>
    </div>
  );
}

export default App;
