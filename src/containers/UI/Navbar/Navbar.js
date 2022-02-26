import React,{Component} from 'react';
import { Router, Link, Routes, Route,Switch } from 'react-router-dom';

import SignupForm from '../../Pages/SignUp/Signup';
import SigninForm from '../../Login/Login';
import Home from '../../Pages/Home/Home';
class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            logged_in : localStorage.getItem('user')?localStorage.getItem('user'):false,
            authLink : null,   
        }
    }
    logout(){
        localStorage.clear();
        window.location.href = '/';
    }
    componentDidMount(){
        
        this.setState({authLink : (
            <>
                <Link to="/signup"  className="btn btn-outline-primary mr-1">SignUp</Link>
                <Link to="/signin" className="btn btn-outline-primary ml-1">SignIn</Link>
            </>
          )});
        if(this.state.logged_in!=="undefined"){
            this.setState({authLink:
                (<Link to="/signup"  className="btn btn-outline-primary mr-1" onClick={this.logout}>Logout</Link>)
            });
        }
    }
    
    render(){
        return(
            <Router>
                {/* <Switch>
                    <Route path="/signin" component={SigninForm} />
                    <Route path="/signup" component={SignupForm} />
                    <Route path="/company" component={Company} />
                    <Route path="/job" component={Jobs} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/applicant" component={Applicant} />
                    <Route path="/shortlist" component={Shortlist} />
                    <Route path="/selected" component={Selected} />
                    <Route path="/" component={Home} />
                </Switch> */}
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
                {this.state.authLink}
                {/* <Link to="/signup"  className="btn btn-outline-primary mr-1">SignUp</Link>
                <Link to="/signin" className="btn btn-outline-primary ml-1">SignIn</Link> */}
                </nav>
              </Router>
        );
    }
}

export default Navbar;