import React, {Component} from 'react';

class Applicant extends Component{
    constructor(props){
        super(props);
        this.jobList = null;
        this.applicantList = null;
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
            form:null,
            jobs:null,
            value:null,
            applicantList:null,
            message:null,
            jobid:null,
            username : localStorage.getItem('user')?localStorage.getItem('user'):false,
        };
        this.JobId = this.JobId.bind(this);
        this.Company = this.Company.bind(this);
        this.get_applicant = this.get_applicant.bind(this);
        this.post_reject = this.post_reject.bind(this);
        this.post_select = this.post_select.bind(this);
    }
    Company(event){
        this.setState({value:event.target.value});
    }

    JobId(event){
        this.setState({jobid:event.target.value})
    }
    componentDidMount(){
        this.get_jobs();
    }
    get_jobs = async() => {
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

    get_applicant = (event) => {
        event.preventDefault();
        const data = {
            jobid : this.state.value
        };
        fetch('http://localhost:8000/jobs/get_applicantdetails/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
        })
        .then(res => res.json())
      .then(res => {
          if(res.status==="success"){
              console.log(res.data);
            this.setState({
                applicantList:res.data
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

    post_reject = async(userid) => {
        const body = {
            'job':this.state.value,
            'id':userid
        }
        console.log(body);
        await fetch("http://localhost:8000/jobs/delete_applicant/",{
            method:'delete',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            if(res.status==="success"){
                this.setState({
                    message:(
                    <div className="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {res.message}
                    </div>)
                });
            }
            else{
                this.setState({
                    message:(
                    <div className="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {res.message}
                    </div>)
                });
            }
        });
        this.applicant = null;
    }

    post_select = async(userid) => {
        const body = {
            'job':this.state.value,
            'user':userid
        }
        console.log(body);
        await fetch("http://127.0.0.1:8000/jobs/insert_shortlist/",{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(async()=> {
            const body = {
                'job':this.state.value,
                'id':userid
            }
            await fetch("http://localhost:8000/jobs/delete_applicant/",{
                method:'delete',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(body),
            })
            .then(res => res.json())
            .then(res => {
                if(res.status==="success"){
                    this.setState({
                        message:(
                        <div className="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                            {res.message}
                        </div>)
                    });
                }
                else{
                    this.setState({
                        message:(
                        <div class="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                            {res.message}
                        </div>)
                    });
                }
            });
        })
    }
    jobpostForm = () => {
        this.setState({form:( 
        <div className="card-body">
            <div className='card'>
                <div className="card-body mx-auto" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                <form className="row g-3" method="post" onSubmit={this.jobpost}>
                    <div className="col-auto">
                        <label forhtml="title" className='btn btn-primary'>POST TITLE</label>
                    </div>
                    <div class="col-auto">
                        <select id="title" className="form-select form-control-plaintext">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-success mb-3">Confirm identity</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        )});
    }
    render(){
        this.applicant = null;
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
        if(this.state.applicantList!==null && this.state.applicantList.length>0){
            this.applicant = (
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
                            <th>contact Number</th>
                            <th>Skill</th>
                            <th>Resume Link</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.applicantList.map((applicant,index)=>{
                        return (<tr key={applicant.id}>
                                <td>{index+1}</td>
                                <td>{applicant.fullname}</td>
                                <td>{applicant.email}</td>
                                <td>{this.DEGREE_CHOICE[applicant.degree]}</td>
                                <td>{applicant.college}</td>
                                <td>{this.experienceArray[applicant.experience]}</td>
                                <td>{applicant.contactNumber}</td>
                                <td>{applicant.skills}</td>
                                <td>{applicant.ResumeLink}</td>
                                <td><button className="btn btn-success" onClick={()=>this.post_select(applicant.user)}>Select</button></td>
                                <td><button className="btn btn-danger" onClick={()=>this.post_reject(applicant.user)}>Reject</button></td>
                                </tr>
                    )})
                    }
                    </tbody>
                    </table>
            </div>
            );
        }
        else{
            this.applicant = (<div><p>There is no data available</p></div>)
        }
        return( 
            <React.Fragment>
                <div className='card'>
                {this.state.message}
                <div className="card-body mx-auto" 
                    style={{width:50+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                <form className="row g-3" method="post" onSubmit={this.get_applicant}>
                    <div className="col-4">
                        <label forhtml="title" className='btn btn-primary'>POST TITLE</label>
                    </div>
                    <div class="col-4">
                        <select id="title" className="form-select form-control-plaintext" 
                            defaultValue={{ label: "Select an Option", value: 0 }}
                            onChange={(e) => this.Company(e)}>
                                <option selected disabled hidden>Select an Option</option>
                                {this.jobList}
                        </select>
                    </div>
                    <div class="col-4">
                        <button type="submit" className="btn btn-success mb-3">Search</button>
                    </div>
                </form>
                </div>
            </div>
            <div>
                <div className="card mx-auto" style={{width:100+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {this.applicant}
                </div>
            </div>
            </React.Fragment>
            
            
        );
    }
}

export default Applicant;