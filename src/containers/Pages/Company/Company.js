import { Component } from "react";

class Company extends  Component{
    constructor(props){
        super(props);
        this.errorMessage = null;
        this.state = {
            username: localStorage.getItem('user')?localStorage.getItem('user'):null,
            company:null,
            description:null
        }
        this.Company = this.Company.bind(this);
        this.Description  = this.Description.bind(this);
        this.companydetail = this.companydetail.bind(this);
    }

    Company(event){
        this.setState({Company:event.target.value});
    }

    Description(event){
        this.setState({Description:event.target.value});
    }
    
    companydetail=(event) =>{
        event.preventDefault();
        const data = {
            username:this.state.username,
            company : this.state.name,
            description : this.state.description,
        };
     fetch('http://localhost:8000/accounts/insertHR/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
          console.log(res);
        if(res.status!=400){
          const json = res.json();
          localStorage.setItem('token', json.token);
          localStorage.setItem('user',json.username);
          this.props.history.push("/dashboard");  
        }
        else{
          this.errorMessage = (
            <div class="alert alert-primary mx-auto" role="alert" style={{width:30+'%',marginTop:5+'%',borderRadius:5+'px'}}>
              Something went wrong!!!
            </div>);
        }
      });
    }

    render(){
       
        return(
          <div>
            {this.errorMessage}
            <div className="card mx-auto" style={{width:30+'%',marginTop:10+'%',borderRadius:5+'px'}}>
                <div className="card-header">
                    <h1>Company Detail</h1>
                </div>
            <div className="card-body">
                <form method="post" onSubmit={this.companydetail}>
                <div className="form-group m-2">
                    <label htmlFor="companyname">Company Name</label>
                    <input type="text" className="form-control" id="companyname" placeholder="Enter Company Name"  onChange={e=>this.Company(e)}/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="password">Description</label>
                    <input type="text" className="form-control" id="password" placeholder="Enter Description"  onChange={e=>this.Description(e)}/>
                </div>
                <button type="submit" className="btn btn-primary">Next</button>
                </form>
            </div>
            </div>
          </div>
        )
      }
}

export default Company;