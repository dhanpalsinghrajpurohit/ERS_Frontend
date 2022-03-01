import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes ,
    Route,
    Link,
    Switch
  } from "react-router-dom";
  
import AdminNavbar from "../../UI/Navbar/AdminNavbar";
class Dashboard extends Component{
    constructor(props){
    
        super(props);
        this.state = {
          toggleStage:1,
          form:null, 
        }
        this.errorMessage = null;
    }

    toggleTab = (index)  =>{
        this.setState({toggleStage:index})
        switch(index){
            case 1:
                this.userForm();
                break;
            case 2:
                this.hrForm();
                break;
        }
    }

    render(){
        return(
            <React.Fragment>
                <AdminNavbar />   
                <div className="container-fluid w-80 m-5">
                    {this.errorMessage}
                    <div className="row">
                    <div class="card bg-light m-2" style={{maxWidth:18+"rem"}}>
                        <div class="card-header">Post A Job Opening</div>
                            <div class="card-body">
                            <h5 class="card-title">Job Operation</h5>
                            <p class="card-text">Perform operation likes Post a Job Opening, Remove Job Opening, Update Job Opening</p>
                        </div>
                        <div className="card-footer"><Link to="/job"  className="btn btn-primary">Click Here</Link></div>
                    </div>

                    <div class="card bg-light m-2" style={{maxWidth:18+"rem"}}>
                        <div class="card-header">Applicant</div>
                            <div class="card-body">
                            <h5 class="card-title">View Applicant</h5>
                            <p class="card-text">See the details of applicants and profile. Also perform shortlisting and filtering the application.</p>
                        </div>
                        <div className="card-footer"><Link to="/applicant"  className="btn btn-primary">Click Here</Link></div>

                    </div>
                    
                    <div class="card bg-light m-2" style={{maxWidth:18+"rem"}}>
                        <div class="card-header">Shortlist</div>
                            <div class="card-body">
                            <h5 class="card-title">View Shortlist Candidate</h5>
                            <p class="card-text">View the details of shortlist candidate and Perfom the selection operations.</p>
                        </div>
                        <div className="card-footer"><Link to="/shortlist"  className="btn btn-primary">Click Here</Link></div>
                    </div>

                    <div class="card bg-light m-2" style={{maxWidth:18+"rem"}}>
                        <div class="card-header">Selected Candiate</div>
                            <div class="card-body">
                            <h5 class="card-title">Light card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div className="card-footer"><Link to="/selected"  className="btn btn-primary">Click Here</Link></div>
                    </div>

                    </div>
                </div>
            </React.Fragment>
          
        );
    }
}

export default Dashboard;