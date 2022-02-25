import React from "react";
import ReactDOM from 'react-dom';
import  { Navigate,Redirect } from 'react-router-dom'
import classes from './Signup.module.css';
class SignupForm extends React.Component{
  constructor(props){
    
    super(props);
    this.state = {
      toggleStage:1,
      form:null,
      username:null,
      email:null,
      password:null,
      name:null,
      logged_in: localStorage.getItem('token') ? true : false,
      authMessage:null,
    }
    this.errorMessage = null;
    this.Username = this.Username.bind(this);
    this.Email = this.Email.bind(this);
    this.Password = this.Password.bind(this);
    this.Name = this.Name.bind(this);
    this.userSignup = this.userSignup.bind(this);
  }

  Name(event){
    this.setState({name:event.target.value});
  }

  Email(event){
    this.setState({email:event.target.value});
  }

  Password(event){
    this.setState({password:event.target.value});
  }

  Username(event){
    this.setState({username:event.target.value});
  }

  componentDidMount(){
    if (this.state.logged_in) {
        fetch('http://localhost:8000/accounts/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
    this.userForm();
  }

  userSignup= async(event)=>{
      event.preventDefault();
      const data = {
        username:this.state.username,
        first_name : this.state.name,
        email : this.state.email,
        password  : this.state.password
      };
      fetch('http://localhost:8000/accounts/users/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if(res.status!=400){
            const json = res.json();
            localStorage.setItem('token', json.token);
            this.setState({
              logged_in: true,
              displayed_form: '',
              username: json.username
            });
            this.props.history.push("/signin");  
          }
          else{
            this.errorMessage = (
              <div class="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                This is a primary alert—check it out!
              </div>);
          }
      });
  }

  hrSignup = async(event) => {
    event.preventDefault();
    const data = {
      username:this.state.username,
      first_name : this.state.name,
      email : this.state.email,
      password  : this.state.password
    };
     fetch('http://localhost:8000/accounts/users/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        const json = res.json();
        console.log(json);
        if(json.status===200){
          const json = res.json();
          localStorage.setItem('token', json.token);
          localStorage.setItem('user', json.username);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.username
          });
          this.props.history.push("/company");  
        }
        else{
          this.errorMessage = (
            <div class="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
              Something went wrong!!!
            </div>);
        }
      });
  }

  hrForm = () =>{
    this.setState({form : (<>
            <div className="card-header">
            <h1>SignUp Form</h1>
            </div>
            <div className="card-body">
            <form method="post" onSubmit={this.hrSignup}>
            <div className="form-group m-2">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter Name" onChange={e=>this.Username(e)}/>
                </div>
                <div className="form-group m-2">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter Name" onChange={e=>this.Name(e)}/>
                </div>
                <div className="form-group m-2">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" onChange={e=>this.Email(e)}/>
                </div>
                <div className="form-group m-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={e=>this.Password(e)}/>
                </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            </div>
            <div className="card-footer">
            <div>
            <a href="#" className={classes.forgetPassword}>Or SignIn ?</a>
            </div>
            </div>
    </>)
    });
  }

  userForm = () =>{
    this.setState({form:(<>
            <div className="card-header">
            <h1>SignUp Form</h1>
            </div>
            <div className="card-body">
            <form onSubmit={this.userSignup}>
                <div className="form-group m-2">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter Name" onChange={e=>this.Username(e)}/>
                </div>
                <div className="form-group m-2">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter Name" onChange={e=>this.Name(e)}/>
                </div>
                <div className="form-group m-2">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" onChange={e=>this.Email(e)}/>
                </div>
                <div className="form-group m-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={e=>this.Password(e)}/>
                </div>
            <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
            </div>
            <div className="card-footer">
            <div>
            <a href="#" className={classes.forgetPassword}>Or SignIn ?</a>
            </div>
            </div>
    </>)});
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
      <div>
        {this.errorMessage}
        <div className="card mx-auto" style={{width:30+'%',marginTop:1+'%',borderRadius:5+'px'}}>
          <ul className="nav nav-pills nav-justified">
                              <li className="nav-item">
                              <button className={this.state.toggleStage==1?"nav-link active":"nav-link "} 
                                  id="pills-contact-tab" 
                                  data-bs-toggle="pill" 
                                  data-bs-target="#pills-contact" 
                                  type="button" role="tab" 
                                  aria-controls="pills-contact" 
                                  aria-selected="false"
                                  onClick={() => this.toggleTab(1)}>User</button>
                              </li>

                              <li className="nav-item">
                              <button className={this.state.toggleStage==2?"nav-link active":"nav-link "} 
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
    );
  }
}

export default SignupForm;
