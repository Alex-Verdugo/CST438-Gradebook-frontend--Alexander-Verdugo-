import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
// import {DataGrid} from '@mui/x-data-grid';
// import Cookies from 'js-cookie';
// import {SERVER_URL} from '../constants.js';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class AddAssignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = { assignments: [] };
      };

    // when submit button pressed, send new assignment to back end 
    handleSubmit = ( ) => {
        console.log("AddAssignment.handleSubmit");
        const token = Cookies.get('XSRF-TOKEN');
        
        fetch(`http://localhost:8081//assignment/createAssignment?AssignmentName=${this.state.AssignmentName}&AssignmentDueDate=${this.state.AssignmentDueDate}&CourseId=${this.state.AssignmentCourseID}` , 
            {  
              method: 'POST', 
              headers: { 'Content-Type': 'application/json',
                         'X-XSRF-TOKEN': token }, 
              body: JSON.stringify({assignmentId:this.props.location.assignment.assignmentId,  assignments: this.state.assignments})
            } )
        .then(res => {
            if (res.ok) {
              toast.success("Assignment successfully Created", {
              position: toast.POSITION.BOTTOM_LEFT
              });
            
            } })
          .catch(err => {
            toast.error("Failed to Create Assignment", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
          });
     };        

    // when user has entered a new grade, update the state
    //  id    - index of row of grade change
    //  props - contains the new grade
    handleEditCellChange = ({ id, field, props }) => {
        console.log("edit cell change id:"+id+" field:"+field+" value:"+props.value);
        const newgrades = this.state.grades.map(r => {
          if (r.id === id){
            return {...r, [field]:props.value};
          } else {
            return {...r};
          }
        });
        this.setState({grades: newgrades});
      };
 
     handleCellEditCommit = (e) => {
       console.log("handleCellEditCommit "+JSON.stringify(e));
       const newgrades= this.state.grades.map(r => {
         //console.log(r.id+"   "+e.id);
         if (r.id === e.id) {
           return {...r, [e.field]:e.value};
         } else {
           return {...r};
         }
       });
       this.setState({grades: newgrades});
     };
  

    render() {
        const columns = [
         { field: 'assignmentName', headerName: 'Assignment Name', width: 250, editable:true },
         { field: 'dueDate', headerName: 'Due Date', width: 250, editable:true},
         ];
         
         const CourseId = this.props.location.CourseId;

         return(
             <div align="left" >
                <h4>Enter Assignment Feilds </h4>
               <div style={{ height: 250, width: '100%' ,margin:20}}>

               
               <div  style={{display: "flex",width: '70%',margin:20,justifyContent:"space-between"}}>
               <h5>Assignment Name: </h5>
               <input
                    type= "text"
                    id="AssignmentName"
                    onChange={this.handleChange}
                    value={this.state.AssignmentName}
                    />
                     <h5>Assignment Due Date: </h5>
               <input
                    type= "text"
                    id="AssignmentDueDate"
                    onChange={this.handleChange}
                    value={this.state.AssignmentDueDate}
                    />
                     <h5>Assignment Course ID: </h5>
               <input
                    type= "text"
                    id="AssignmentCourseID"
                    onChange={this.handleChange}
                    value={this.state.AssignmentCourseID}

                    />
                </div>
               </div>
                <Button id="CreateAssignment" variant="outlined" color="primary" onClick={this.handleSubmit} >
                    Create Assignment
                 </Button>
              
             </div>
             ); 
         }

}
export default AddAssignment;