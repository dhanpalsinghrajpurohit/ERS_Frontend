import React,{Component} from 'react';
import { Router, Link, Routes, Route,Switch } from 'react-router-dom';

import SignupForm from '../../Pages/SignUp/Signup';
import SigninForm from '../../Login/Login';
import Home from '../../Pages/Home/Home';
class Navbar extends Component{
    render(){
        return(
        <div>
        <Router>
            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd",fontWeight:"bold"}}>
            <a class="navbar-brand" href="#">Navbar</a>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a class="nav-item nav-link" href="#">Home</a>
                <a class="nav-item nav-link" href="#">Features</a>
                <a class="nav-item nav-link" href="#">Pricing</a>
                <a class="nav-item nav-link" href="#">Disabled</a>
                </div>
            </div>
            
            <Link to="/signin"  className="btn btn-outline-primary mr-1">Signin</Link>
            <Link to="/signup" className="btn btn-outline-primary ml-1">SignUp</Link>
            </nav>
            
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
            </Router>
        </div>   
        );
    }
}

export default Navbar;