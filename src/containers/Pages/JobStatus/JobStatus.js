import React, { Component } from "react";

class JobStatus extends Component{
    render(){
        return(<div className="card bg-light mb-3 mx-auto" style={{maxWidth:50+"rem"}}>
        <div className="card-header">Applied Job</div>
        <div className="card-body">
        <table class="table">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Titile</th>
                    <th>Applied</th>
                    <th>Shortlist</th>
                    <th>Selected</th>
                </tr>
            </thead>
        <tbody>
          <tr>
              <td>1</td>
              <td>Software Engineer</td>
              <td>Selected</td>
              <td>Pending</td>
              <td>Pending</td>
          </tr>
        </tbody> 
        </table>
        </div>
      </div>);
    }

} 

export default JobStatus;