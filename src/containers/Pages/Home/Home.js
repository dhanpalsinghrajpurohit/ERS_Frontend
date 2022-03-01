import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Navbar from "../../UI/Navbar/Navbar";
import Spinner from "../../UI/Spinner/Spinner";
class Home extends Component{
    constructor(props){
        super(props);
        this.jobList = [];
        this.state = {
            form:null,
            jobs:null,
            show:false,
            logged_in:localStorage.getItem('user')?localStorage.getItem('user'):null,
            username:null,
            token:localStorage.getItem('token')?localStorage.getItem('token'):null,
        }
    }
    componentDidMount(){
     if(this.state.logged_in!==undefined && this.state.token!==undefined){
         this.setState({username:this.state.logged_in});
     }
     this.viewJob();     
    }
    
    viewJob = async() =>{
        if(this.state.logged_in){
            const data  = {
                username:localStorage.getItem('user')
            }
            await fetch('http://localhost:8000/jobs/get_job/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            })
            .then(res => res.json())
            .then(res => {
                console.log();
                if(res.status==="success"){
                    if(res.data.length){
                        this.setState({
                            jobs:res.data
                        });
                        this.setState({show:true})
                    }
                }
                else{
                    this.setState({errorMessage:(
                        <div className="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {res.message}
                        </div>)})
                }
            });
        }
        else{
            console.log("called")
            await fetch('http://localhost:8000/jobs/get_jobs/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.status==="success"){
                    this.setState({
                        jobs:res.data
                    });
                    this.setState({show:true})
                }
                else{
                    this.setState({errorMessage:(
                        <div className="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {res.message}
                    </div>)})
                }
            });
        }
    }

    jobApply = async(job) => {
        if(this.state.logged_in){
            const data = {
                username:localStorage.getItem("user"),
                job:job.id,
                user:job.id
            }
            console.log(data);
            await fetch('http://localhost:8000/jobs/apply_job/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(res=>res.json())
            .then(res => {
                this.setState({
                    errorMessage:(
                        <div className="alert alert-success mx-auto" 
                            role="alert" 
                            style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                          Successfully Applied!!!
                        </div>)
                });
            });
        }
        this.setState({show:false});
        this.viewJob();
    }
    
    render(){
        return(
            <React.Fragment>
                <Navbar />
                {this.state.errorMessage}
                {this.state.show?
                this.state.jobs.map(job=>{
                    return (
                    <div key={job.id}>
                        <div className="card mx-auto text-left" style={{width:30+'%',marginTop:1+'%',borderRadius:5+'px',textAlign:"left"}}>
                            <h5 className="card-header">{job.title}</h5>
                            <div className="card-body">
                                <h5 className="card-title">Description: {job.description}</h5>
                                <p className="card-text">Skill:{job.skills}</p>
                                <p className="card-text">Vacancy: {job.vacancy}</p>
                                <p className="card-text">Salary: {job.salary}</p>
                            </div>
                            <div className="card-footer">
                            {this.state.logged_in?
                                <button className="btn btn-primary" onClick={()=>this.jobApply(job)}>Apply</button>:
                                <Link to="/signin"  className="btn btn-outline-primary">Signin</Link>
                            }</div>                                
                        </div>
                    </div>)
                }):<div>No Data Available</div>}
                <Spinner isActive={!this.state.show} />
            </React.Fragment>
        );
    }
}

export default Home;