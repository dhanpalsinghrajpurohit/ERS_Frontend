import React, { Component } from "react";

import AdminNavbar from "../../UI/Navbar/AdminNavbar";
class Selected extends Component{
    constructor(props){
        super(props);
        this.jobList = null;
        this.candidateListView = null;
        this.experienceArray = {
            '0':"Fresher",
            '1':"1 Year Exp",
            '2':"2 Year Exp",
            '3':"3 Year Exp",
        }
        this.DEGREE_CHOICE = {
            '0':'B.Tech',
            '1':'M.Tech',
            '2':'MCA',
            '3':'BCA',
            '4':'B.Sc',
            '5':'M.Sc',
        }
        this.state = {
            jobtitle:null,
            jobs:null,
            candidateList:null,
            message:null,
        }
        this.JobTitle = this.JobTitle.bind(this)
    }

    componentDidMount(){
        this.get_jobs();
    }

    JobTitle(event){
        this.setState({jobtitle:event.target.value})
    }

    // get job and display in dropdown
    get_jobs = async(event) => {
        await fetch('http://localhost:8000/jobs/get_jobs/', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(res => res.json())
      .then(res => {
          if(res.status==="success"){
            this.setState({
                jobs:res.data
            });
          }
            else{
                this.setState({
                message:(
                <div className="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                    Something went wrong!!!
                </div>)
                });
            }
        });
    }

    //fetching selected candidate 
    get_candidate = async(event) => {
        event.preventDefault();
        const data = {
            job : this.state.jobtitle
        };
        console.log(data);
        await fetch('http://localhost:8000/jobs/get_selectedlist/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            if(res.status==="success"){
                this.setState({
                    candidateList:res.data
                });
            }
        else{
            this.setState({
            message:(
            <div class="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                Something went wrong!!!
            </div>)
            });
        }
        });
    }

    render(){
        if(this.state.jobs!==null){
            this.jobList = (<>
                    {this.state.jobs.map((job)=>{
                        return (<option key={job.id} value={job.id}>
                                {job.title}
                                </option>
                    )})
                    }
            </>);
        }
        if(this.state.candidateList!==null){
            this.candidateListView = (
                <div>
                    <table className="table" style={{border:2+"px"}}>
                    <thead>
                        <tr>
                            <th>SR.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Degree</th>
                            <th>College</th>
                            <th>Experience</th>
                            <th>Contact No</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.candidateList.map((applicant,index)=>{
                        return (<tr key={applicant.id}>
                                <td>{index+1}</td>
                                <td>{applicant.fullname}</td>
                                <td>{applicant.email}</td>
                                <td>{this.DEGREE_CHOICE[applicant.degree]}</td>
                                <td>{applicant.college}</td>
                                <td>{this.experienceArray[applicant.experience]}</td>
                                <td>{applicant.contactNumber}</td>
                                <td>{applicant.skills}</td>
                                </tr>
                    )})
                    }
                    </tbody>
                    </table>
            </div>
            );
        }
        return(
            <React.Fragment>
                <AdminNavbar />
                <div className='card'>
                {this.state.message}
                <h2>Selected Candidate</h2>
                <div className="card-body mx-auto" 
                    style={{width:50+'%',marginTop:1+'%',borderRadius:5+'px'}}>
                    
                <form className="row g-3" method="post" onSubmit={this.get_candidate}>
                    <div className="col-4">
                        <label forhtml="title" className='btn btn-primary'>POST TITLE</label>
                    </div>
                    <div className="col-4">
                        <select id="title" className="form-select form-control-plaintext" 
                            defaultValue={{ label: "Select an Option", value: 0 }}
                            onChange={(e) => this.JobTitle(e)}>
                                <option selected disabled hidden>Select an Option</option>
                                {this.jobList}
                        </select>
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-success mb-3">Search</button>
                    </div>
                </form>
                </div>
                </div>
                <div>
                    <div className="card mx-auto" style={{width:100+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {this.candidateListView}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Selected;