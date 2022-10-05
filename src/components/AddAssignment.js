import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';



class AddAssignment extends Component {
    constructor(props) {
      super(props);
      this.state = {courseId: '', assignmentName: '', dueDate: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    };
  

    //gets values from form
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }


 
  handleSubmit(event){
      event.preventDefault();
      console.log("Adding New Assignment");
      console.log(JSON.stringify({courseId:this.state.courseId, assignmentName:this.state.assignmentName, dueDate:this.state.dueDate}));
      const token = Cookies.get('XSRF-TOKEN');
      
      //putting params in URL because I used Get Requests in backend method 
      fetch(`http://localhost:8081//assignment/createAssignment?AssignmentName=${this.state.assignmentName} 3&AssignmentDueDate=${this.state.dueDate}&CourseId=${this.state.courseId}` , 
          {  
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                       'X-XSRF-TOKEN': token }, 
            body: JSON.stringify({courseId:this.state.courseId, assignmentName:this.state.assignmentName, dueDate:this.state.dueDate})
          } )
      .then(res => {
          if (res.ok) {
            toast.success("Assignment successfully created", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            this.setState({courseId: '', assignmentName: '', dueDate: '' });
          } else {
            console.log(res.body);
            toast.error("Assignment creation failed 1", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('P http status =' + res.status);
      }})
        .catch(err => {
          toast.error("Assignment creation failed 2", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
  } 
 
  //creating form to input assignment details
  render() {
      return (
          <div align="left" >
                <h4>Create a new assignment: </h4>
                  <form onSubmit={this.handleSubmit}>
                    
                    <label>
                      Assignment Name:
                    </label>
                    <p>
                      <input type="text" name="assignmentName" value={this.state.assignmentName} onChange={this.handleChange}/>
                    </p>
                    <label>
                      Due Date:
                    </label>
                    <p>
                      <input type="text" name="dueDate" value={this.state.dueDate} onChange={this.handleChange}/>
                    </p>
                    <label>
                      Course Id:
                    </label>
                    <p>
                        {/* Might needs to find way to pull Course Id from session */}
                      <input type="text" name="courseId" value={this.state.courseId} onChange={this.handleChange}/>
                    </p>
                    <p>
                    <input type="submit" value="Submit" />
                    </p>
                    <div>
                    <ToastContainer autoClose={1500} />   
                  </div>
                  </form>
          </div>
      )
  }
}  

export default AddAssignment;