import React,{Component} from 'react';
import { Router, Link, Routes, Route,Switch } from 'react-router-dom';

class AdminNavbar extends Component{
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
          console.log(this.state.logged_in)
        if(this.state.logged_in!=="undefined" && this.state.logged_in!==false){
            this.setState({authLink:(
                    <React.Fragment>
                        <span className='m-1'>Welcome, {this.state.logged_in}</span>
                        <Link to="/signup"  className="btn btn-outline-primary mr-1" onClick={this.logout}>Logout</Link>)
                    </React.Fragment>)
            });
        }
    }
    
    render(){
        return(
                <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd",fontWeight:"bold"}}>
                <Link className="navbar-brand" to="/dashboard">ERS</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  {/* <div className="navbar-nav">
                  <Link to="/"  className="nav-item nav-link">Home</Link>
                  <Link to="/jobstatus"  className="nav-item nav-link">Status</Link>
                  <Link to="/profile"  className="nav-item nav-link">Profile</Link>
                  </div> */}
                </div>
                {this.state.authLink}
                </nav>
        );
    }
}

export default AdminNavbar;