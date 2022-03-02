import React,{ Component } from "react";
import { ThemeProvider } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../UI/Navbar/Navbar";
import Jobs from "../Jobs/Jobs";

class Profile extends  Component{
    constructor(props){
        super(props);
        this.profileList = null;
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
            logged_in:localStorage.getItem('user')?true:false,
            username: localStorage.getItem('user')?localStorage.getItem('user'):false,
            id:null,
            fullname:null,
            email:null,
            contactnumber:null,
            college:null,
            experience:null,
            degree:null,
            skills:null,
            resumeLink:null,
            message:null,
            profile:null,
        }
        this.FullName = this.FullName.bind(this);
        this.Email = this.Email.bind(this);
        this.ContactNumber = this.ContactNumber.bind(this);
        this.College = this.College.bind(this);
        this.Experience  = this.Experience.bind(this);
        this.Degree  = this.Degree.bind(this);
        this.Skills = this.Skills.bind(this);
        this.ResumeLink  = this.ResumeLink.bind(this);
        this.update_profile = this.update_profile.bind(this);
        this.insert_profile = this.insert_profile.bind(this);
    }

    FullName(event){
        this.setState({fullname:event.target.value});
    }
    Email(event){
        this.setState({email:event.target.value});
    }
    ContactNumber(event){
        this.setState({contactnumber:event.target.value});
    }
    College(event){
        this.setState({college:event.target.value});
    }
    Experience(event){
        this.setState({experience:event.target.value});
    }
    Degree(event){
        this.setState({degree:event.target.value});
    }
    ResumeLink(event){
        this.setState({resumeLink:event.target.value});
    }
    Skills(event){
        this.setState({skills:event.target.value})
    }
    
    componentDidMount(){
        if(this.state.logged_in){
            this.get_profile();
            this.profileForm();
            setTimeout(()=>this.setState({message:null}),9000);    
        }
        else{
            this.props.history.push("/signin");  

        }
                
    }
    
    get_profile(){
        const body = {
            user : localStorage.getItem('user')
        }
        fetch("http://localhost:8000/accounts/get_user/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            if(res.status==="success"){
                console.log(res.data)
                if(res.data.length!==0){
                    this.setState({
                        profile:res.data,
                        id:res.data[0].user,
                        fullname:res.data[0].fullname,
                        email:res.data[0].email,
                        contactnumber:res.data[0].contactNumber,
                        college:res.data[0].college,
                        experience:res.data[0].experience,
                        degree:res.data[0].degree,
                        skills:res.data[0].skills,
                        resumeLink:res.data[0].ResumeLink,
                    });
                    this.profileForm();
                }
                else{
                    this.insert_profileForm()
                }
            }
            else{
                this.setState({
                    message:res.message
                })
            }
        })
    }

    async update_profile(event){
        event.preventDefault();
        const body = {
            'user':this.state.id,
            'username': localStorage.getItem('user'),
            'fullname':this.state.fullname,
            'email':this.state.email,
            'contactNumber':this.state.contactnumber,
            'college':this.state.college,
            'experience':this.state.experience,
            'skills':this.state.skills,
            'degree':this.state.degree,
            'ResumeLink':this.state.resumeLink,
        }
        console.log(body);
        await fetch("http://localhost:8000/accounts/update_user/",{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.status==="success"){
                this.props.history.push("/");
            }
            else{
                this.setState({message:res.message})
            }
        })
    }
    
    async insert_profile(event){
        event.preventDefault();
        const body = {
            'user': localStorage.getItem('user'),
            'fullname':this.state.fullname,
            'email':this.state.email,
            'contactNumber':this.state.contactnumber,
            'college':this.state.college,
            'experience':this.state.experience,
            'skills':this.state.skills,
            'degree':this.state.degree,
            'ResumeLink':this.state.resumeLink,
        }
        console.log(body);
        await fetch("http://localhost:8000/accounts/insert_user/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.status==="success"){
                this.setState({message:res.message})
            }
            else{
                this.setState({message:res.message})
            }
        })
    }

    profileForm = () => {
        this.setState({form:( 
            <div className="card mx-auto" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
            <div className="card-header">
                <h1>Profile</h1>
            </div>
        <div className="card-body">
            <form method="post" onSubmit={this.update_profile}>

                <div className="form-group m-2">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" placeholder="Enter Full Name" defaultValue={this.state.fullname} onChange={this.FullName} required minLength={8}  maxLength={30}/>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" defaultValue={this.state.email} onChange={this.Email} required />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="contactnumber">Contact Number </label>
                    <input type="text" className="form-control" id="contactnumber" placeholder="Enter Contact Number" defaultValue={this.state.contactnumber} onChange={this.ContactNumber} required minLength={10} maxLength={10}/>
                </div>

                <div className="form-group m-2">
                <label htmlFor="degree">Degree</label>
                    <select className="form-select mb-3" id="degree" onChange={this.Degree} defaultValue={this.state.degree} required>
                        <option value="0">B.TECH</option>
                        <option value="1">M.TECH</option>
                        <option value="2">MCA</option>
                        <option value="3">BCA</option>
                        <option value="4">B.Sc</option>
                        <option value="5">M.Sc</option>
                    </select>   
                </div>
                
                <div className="form-group m-2">
                    <label htmlFor="college">College</label>
                    <input type="text" className="form-control" id="college" placeholder="Enter College" defaultValue={this.state.college} onChange={this.College} required/>
                </div>
                
                <div className="form-group m-2">
                    <label htmlFor="experience">Experience</label>
                    <select className="form-select mb-3" id="experience" defaultValue={this.state.experience} onChange={this.Experience} required>
                        <option value="0">FRESHER</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Year</option>
                        <option value="3">3+ Year</option>
                        <option value="4">5+ Year</option>
                    </select>            
                </div>

                <div className="form-group m-2">
                    <label htmlFor="skills">Skills</label>
                    <input type="text" className="form-control" id="skills" defaultValue={this.state.skills} placeholder="Enter Skills"  onChange={this.Skills} required />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="resumelink">Resume Link</label>
                    <input type="text" className="form-control" id="resumelink" defaultValue={this.state.resumeLink} placeholder="Enter Resume Link"  onChange={this.ResumeLink} required />
                </div>
            
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>
            </div>
        )});
    }

    insert_profileForm = () => {
        console.log("insert_profileForm")
        this.setState({form:( 
            <div className="card mx-auto" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                <div className="card-header">
                    <h1>Profile</h1>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={this.insert_profile}>

                        <div className="form-group m-2">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" className="form-control" id="fullname" placeholder="Enter Full Name" onChange={(e)=>this.FullName(e)} required minLength={8}  maxLength={30}/>
                        </div>

                        <div className="form-group m-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={(e)=>this.Email(e)} required />
                        </div>

                        <div className="form-group m-2">
                            <label htmlFor="contactnumber">Contact Number </label>
                            <input type="text" className="form-control" id="contactnumber" placeholder="Enter Contact Number" onChange={(e)=>this.ContactNumber(e)} required minLength={10} maxLength={10}/>
                        </div>

                        <div className="form-group m-2">
                        <label htmlFor="degree">Degree</label>
                            <select className="form-select mb-3" id="degree" onChange={(e)=>this.Degree(e)} required>
                                <option value="0">B.TECH</option>
                                <option value="1">M.TECH</option>
                                <option value="2">MCA</option>
                                <option value="3">BCA</option>
                                <option value="4">B.Sc</option>
                                <option value="5">M.Sc</option>
                            </select>   
                        </div>
                        
                        <div className="form-group m-2">
                            <label htmlFor="college">College</label>
                            <input type="text" className="form-control" id="college" placeholder="Enter College" onChange={(e)=>this.College(e)} required/>
                        </div>
                        
                        <div className="form-group m-2">
                            <label htmlFor="experience">Experience</label>
                            <select className="form-select mb-3" id="experience" onChange={(e)=>this.Experience(e)} required>
                                <option value="0">FRESHER</option>
                                <option value="1">1 Year</option>
                                <option value="2">2 Year</option>
                                <option value="3">3+ Year</option>
                                <option value="4">5+ Year</option>
                            </select>            
                        </div>

                        <div className="form-group m-2">
                            <label htmlFor="skills">Skills</label>
                            <input type="text" className="form-control" id="skills" placeholder="Enter Skills"  onChange={(e)=>this.Skills(e)} required />
                        </div>

                        <div className="form-group m-2">
                            <label htmlFor="resumelink">Resume Link</label>
                            <input type="text" className="form-control" id="resumelink" placeholder="Enter Resume Link"  onChange={(e)=>this.ResumeLink(e)} required />
                        </div>
                    
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>

                </div>
            </div>
        )});
    }

    render(){
        return(
            <React.Fragment>
                <Navbar />
                <div>
                    {this.state.message}
                    {this.state.form?this.state.form:null}
                </div>
                <div>
                    <div className="card mx-auto" style={{width:80+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                        {this.profileList}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;