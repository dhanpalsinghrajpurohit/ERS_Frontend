import React,{ Component } from "react";
import { Button,Modal} from 'react-bootstrap';  
import { Redirect } from "react-router";

class Jobs extends  Component{
    constructor(props){
        super(props);
        this.jobList = null;
        this.state = {
            username: localStorage.getItem('user')?localStorage.getItem('user'):null,
            description:null,
            id:null,
            title:null,
            salary:null,
            skills:null,
            vacancy:null,
            message:null,
            jobs:null,
            toggleStage:1,
            applicants:null,
            modal:false,
            applicantDetails:null,
        }
        this.Title = this.Title.bind(this);
        this.Salary = this.Salary.bind(this);
        this.Skills = this.Skills.bind(this);
        this.Vacancy = this.Vacancy.bind(this);
        this.Description  = this.Description.bind(this);
        this.jobpost = this.jobpost.bind(this);
        this.update_job = this.update_job.bind(this);
        
    }

    Title(event){
        this.setState({title:event.target.value});
    }
    Salary(event){
        this.setState({salary:event.target.value});
    }
    Skills(event){
        this.setState({skills:event.target.value});
    }
    Vacancy(event){
        this.setState({vacancy:event.target.value});
    }
    Description(event){
        this.setState({description:event.target.value});
    }
    
    componentDidMount(){
        
        setTimeout(()=>this.setState({message:null}),9000);
        this.toggleTab(1);
        this.get_jobs();
    }

    jobpostForm = () => {
        this.setState({applicants:null});
        this.setState({form:( 
            <div className="card mx-auto" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
            <div className="card-header">
                <h1>Add Job Description</h1>
            </div>
        <div className="card-body">
            <form method="post" onSubmit={this.jobpost}>
            <div className="form-group m-2">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter Title Name"  onChange={e=>this.Title(e)}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" placeholder="Enter Description"  onChange={e=>this.Description(e)}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="skill">Skills</label>
                <input type="text" className="form-control" id="skill" placeholder="Enter Skills"  onChange={e=>this.Skills(e)}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="salary">Salary</label>
                <input type="number" className="form-control" id="salary" placeholder="Enter Salary"  onChange={e=>this.Salary(e)}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="vacancy">Vacancy</label>
                <input type="number" className="form-control" id="vacancy" placeholder="Enter Vacancy"  onChange={e=>this.Vacancy(e)}/>
            </div>
            <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </div>
            </div>
        )});
    }

    update_jobForm = () => {
        this.setState({form:( 
            <div className="card mx-auto" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
            <div className="card-header">
                <h1>Update Job Description</h1>
            </div>
        <div className="card-body">
            <form method="post" onSubmit={this.update_job}>
            <div className="form-group m-2">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" defaultValue={this.state.title} placeholder="Enter Title Name"  onChange={this.Title}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" placeholder="Enter Description" defaultValue={this.state.description}  onChange={this.Description}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="skill">Skills</label>
                <input type="text" className="form-control" id="skill" placeholder="Enter Skills" defaultValue={this.state.skills} onChange={this.Skills}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="salary">Salary</label>
                <input type="number" className="form-control" id="salary" placeholder="Enter Salary" defaultValue={this.state.salary}  onChange={this.Salary}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="vacancy">Vacancy</label>
                <input type="number" className="form-control" id="vacancy" placeholder="Enter Vacancy" defaultValue={this.state.vacancy} onChange={this.Vacancy}/>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
            </div>
        )});
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
          console.log(res);
          if(res.status==="success"){
            this.setState({
                jobs:res.data
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

    get_singlejob = async(job) => {
        const data = {
            username:this.state.username,
            id:job
        }
        await fetch('http://localhost:8000/jobs/get_singlejob/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
        })
        .then(res => res.json())
      .then(res => {
          if(res.status==="success"){
            this.setState({
                id:res.data[0]['id'],
                title:res.data[0]['title'],
                salary:res.data[0]['salary'],
                skills:res.data[0]['skills'],
                description:res.data[0]['description'],
                vacancy:res.data[0]['vacancy'],
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
        this.update_jobForm();
    }

    update_job = async(event) =>{
        event.preventDefault();
        const data = {
            username:this.state.username,
            id:this.state.id,
            title:this.state.title,
            salary:this.state.salary,
            skills:this.state.skills,
            vacancy:this.state.vacancy,
            description : this.state.description,
            
        };
        await fetch('http://localhost:8000/jobs/update_job/', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
      .then(res => {
          console.log(res);
          if(res.status==="success"){
            this.setState({
                message:(
                    <div class="alert alert-success mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                      Successfully Updated!!!
                    </div>)
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
        this.jobList = null;
        this.setState({jobs:null});
        this.get_jobs();
    }

    jobpost = async(event) =>{
        event.preventDefault();
        const data = {
            username:this.state.username,
            title:this.state.title,
            salary:this.state.salary,
            skills:this.state.skills,
            vacancy:this.state.vacancy,
            description : this.state.description,
            
        };
        console.log(data);
        await fetch('http://localhost:8000/jobs/insert_job/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
      .then(res => {
          console.log(res);
          if(res.status===200){
            this.setState({
                message:(
                    <div className="alert alert-success mx-auto" 
                        role="alert" 
                        style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                      Successfully Posted!!!
                    </div>)
            });
          }
            else{
                this.setState({
                message:(
                <div className="alert alert-primary mx-auto" 
                    role="alert" 
                    style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                    Something went wrong!!!
                </div>)
                });
            }
        });
        this.jobList = null;
        this.get_jobs();
    }
    
    delete_job = async(jobid) => {
        const data = {
            username:this.state.username,
            id:jobid,            
        };
        await fetch('http://localhost:8000/jobs/delete_job/', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
      .then(res => {
          console.log(res);
          if(res.status==="success"){
            this.setState({
                message:(
                    <div class="alert alert-success mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                      Successfully Deleted!!!
                    </div>)
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
        this.get_jobs();
        this.jobList = null;
        this.toggleTab(1);
    }
    

    

    get_applicant = async() =>{
        await fetch("http://localhost:8000/jobs/get-applicant/",{
            method: 'get',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res =>{
            if(res.status==="success"){
              const json = res;
              this.setState({applicants:json.data})
            }
            else{
                this.errorMessage = (
                <div class="alert alert-primary mx-auto" 
                    role="alert" 
                    style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                </div>);
            }
        });
    }

    handle_modal(){
        this.setState({modal:!this.state.modal});
    }
    
    get_applicantdetail = async(applicant) => {
        this.setState({applicantDetails:null})
        const body = {
            'jobid':applicant.id
        };
        console.log(body);
        await fetch("http://localhost:8000/jobs/get-applicantdetails/",{
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res =>{
            console.log(res);
            if(res.status==="success"){
              const json = res;
              console.log(json);
              this.setState({applicantDetails:json.data})
            }
            else{
                this.errorMessage = (
                <div class="alert alert-primary mx-auto" 
                    role="alert" 
                    style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                </div>);
            }
        });        
    }

    toggleTab = (index)  =>{
        this.setState({toggleStage:index})
        switch(index){
            case 1:
                this.jobpostForm();
                break;
            case 2:
                this.get_applicant();
                break;
            case 3:
                this.hrForm();
                break;
        }
    }

    render(){
        let applicantsList = null;
        if(this.state.jobs!==null){
            this.jobList = (<div>
                <table className="table" style={{border:2+"px"}}>
                    <thead>
                        <tr>
                            <th>SR.No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Skill</th>
                            <th>Salary</th>
                            <th>Vacancy</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.jobs.map((job,index)=>{
                        return (<tr key={job.id}>
                                <td>{index+1}</td>
                                <td>{job.title}</td>
                                <td>{job.description}</td>
                                <td>{job.skills}</td>
                                <td>{job.salary}</td>
                                <td>{job.vacancy}</td>
                                <td><button className="btn btn-primary" key={job.id} onClick={()=>this.get_singlejob(job.id)}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={()=>this.delete_job(job.id)}>Delete</button></td>
                                </tr>
                    )})
                    }
                    </tbody>
                </table>
            </div>);
        }
        // if(this.state.jobs!==null){
        //     applicantsList=(<div>
        //         <table class="table">
        //             <tr>
        //                 <th>Name</th>
        //                 <th>Email</th>
        //             </tr>
        //             <tr>
        //             {this.state.jobs.map(applicantDetail=>{
        //                 return (<tr key={applicantDetail.id}>
        //                         <td>{applicantDetail.name}</td>
        //                         <td>{applicantDetail.email}</td>
        //                         </tr>
        //             )})
        //             }
        //             </tr>
        //         </table>
        //     </div>);
        // }
        return(
            <React.Fragment>
                <div>
                    {this.state.message}
                    {this.state.form}
                    {/* {this.state.errorMessage}
                    {this.state.applicants===null?
                    this.state.form: */}
                    {/* this.state.applicants.map(applicant => {
                        return (
                                <div className="mx-auto" 
                                    style={{width:30+'%',marginTop:1+'%',borderRadius:5+'px'}}>
                                    <ul class="list-group">
                                        <button type="button" 
                                            className="btn btn-primary" 
                                            data-toggle="modal" 
                                            data-target="#exampleModalLong" 
                                            onClick={this.handle_modal.bind(this)}>
                                            {applicant.title}
                                        </button>
                                        <Modal show={this.state.modal} onHide={()=>this.handle_modal()}>  
                                        <Modal.Header closeButton>Applicants List</Modal.Header>  
                                        <Modal.Body>
                                            <Button className="mx-auto" onClick={()=>this.get_applicantdetail(applicant)}>View</Button>
                                            {   
                                                this.state.applicantDetails!==null?applicantsList:null
                                            }
                                        </Modal.Body>  
                                        <Modal.Footer>  
                                            <Button onClick={()=>this.handle_modal()}>Close</Button>  
                                            <Button onClick={()=>this.handle_modal()}>Save</Button>  
                                        </Modal.Footer>  
                                        </Modal>  
                                    </ul>
                                </div>)
                        })} */}
                </div>
                <div>
                    <div className="card mx-auto" style={{width:80+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {this.jobList}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Jobs;