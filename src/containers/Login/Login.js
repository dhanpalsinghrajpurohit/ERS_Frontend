import React from "react";
import {Link} from "react-router-dom";

import classes from './Login.module.css';

class SigninForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      toggleStage:1,
      form:null,
      username:null,
      email:null,
      password:null,
      name:null,
      signup:false,
      message:null,
      logged_in: localStorage.getItem('token') ? true : false,
    }
    this.Username = this.Username.bind(this);    
    this.Password = this.Password.bind(this);
    this.hrLogin = this.hrLogin.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    
  }

  Password(event){
    this.setState({password:event.target.value});
  }

  Username(event){
    this.setState({username:event.target.value});
  }

  componentDidMount(){
    this.toggleTab(1);
  }

 
  userLogin = async(event) => {
    event.preventDefault();
    const data = {
      username:this.state.username,
      password:this.state.password,
    }
    await fetch('http://localhost:8000/accounts/auth-token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.access,json.username, json.refresh)
        if(json.access && json.username && json.refresh){
          localStorage.setItem('token', json.access);
          localStorage.setItem('user', json.username)
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.username
          });
          this.props.history.push("/");
        }
        else{
          this.setState({
            message:(
            <div class="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:1+'%',borderRadius:5+'px'}}>
                {json.detail}
            </div>)
            });
        }
         
    });
  }

  hrLogin = async(event) => {
    event.preventDefault();
    const data = {
      username:this.state.username,
      password:this.state.password,
    }
    console.log(data);
    await fetch('http://localhost:8000/accounts/auth-token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if(json.access && json.username && json.refresh){
        localStorage.setItem('token', json.access);
        localStorage.setItem('user', json.username)
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
        this.props.history.push("/dashboard");
      }
      else{
        this.setState({
          message:(
          <div class="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
              {json.detail}
          </div>)
          });
      }
    });
  }

  userForm = () =>{
    this.setState({form: (<>
      <div className="card-header">
          <h1>SignIn Form</h1>
      </div>
      <div className="card-body">
        <form method="post" onSubmit={this.userLogin}>
          <div className="form-group m-2">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username"  onChange={e=>this.Username(e)} required minLength={8}/>
          </div>
          <div className="form-group m-2">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={e=>this.Password(e)} required minLength={8}/>
          </div>
        <button type="submit" className="btn btn-primary">SignIn</button>
        </form>
      </div>
      <div className="card-footer">
        <div>
        <Link to="/signup" className={classes.forgetPassword}>Or Sign-Up ?</Link>
        </div>
      </div>
    </>)});
  }

  hrForm = () =>{
    this.setState({form : (<>
      <div className="card-header">
          <h1>SignIn Form</h1>
      </div>
      <div className="card-body">
        <form method="post" onSubmit={this.hrLogin}>
          <div className="form-group m-2">
            <label htmlFor="email">Username</label>
            <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Username" onChange={e=>this.Username(e)} required minLength={8}/>
          </div>
          <div className="form-group m-2">
            <label htmlFor="password">Password</label>
            <input type="password"  className="form-control" id="password" placeholder="Password" onChange={e=>this.Password(e)} required minLength={8}/>
          </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
      <div className="card-footer">
        <div>
        <Link to="/signup" className={classes.forgetPassword}>Or Sign-Up ?</Link>
        </div>
      </div>
    </>)});
  }

  toggleTab = (index)  =>{
    this.setState({toggleStage:index})
    switch(index){
      case 1:
          this.setState({form:null});
          this.userForm();
          break;
      case 2:
          this.setState({form:null});
          this.hrForm();
          break;
    }
  }
  
  render(){
    return(
      <div>
        {this.state.message}
        <div className="card mx-auto" style={{width:30+'%',marginTop:10+'%',borderRadius:5+'px'}}>
          <ul class="nav nav-pills nav-justified">
                            <li className="nav-item">
                            <button className={this.state.toggleStage===1?"nav-link active":"nav-link "} 
                                id="pills-contact-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#pills-contact" 
                                type="button" role="tab" 
                                aria-controls="pills-contact" 
                                aria-selected="false"
                                onClick={() => this.toggleTab(1)}>User</button>
                            </li>

                            <li className="nav-item">
                            <button className={this.state.toggleStage===2?"nav-link active":"nav-link "} 
                                id="pills-contact-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#pills-contact" 
                                type="button" role="tab" 
                                aria-controls="pills-contact" 
                                aria-selected="false"
                                onClick={() => this.toggleTab(2)}>HR Manager</button>
                            </li>
          </ul>
        {this.state.form}
        </div>
      </div>
    )
  }
}

export default SigninForm;
