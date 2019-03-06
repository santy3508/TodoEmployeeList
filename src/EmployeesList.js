import React, { Component } from 'react';
import ModalView from './ModalView';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
class EmployeesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [
                {id:1, name: "Santhosh ",designation: "Developer"},
                {id:2, name: "Narayanan ",designation: "Developer"},
                {id:3, name: "Yashwanth ",designation: "QA"}
            ],
            show: false,
            currentEmployee: {id: null,name: "",designation: ""},
            formText: "add"
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this); 
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    handleClose() {
        this.setState({ show: false, currentEmployee: {id: null,name: "",designation: ""} });
    }
    editEmployee(employee){
        this.setState({ show: true, currentEmployee: employee, formText: "edit"},()=>{console.log(this.state)})
    }
    handleShow() {
      this.setState({ show: true });
    }

    deleteEmployee(emp){
        let  filteredEmployees = this.state.employees.filter((employee) => {
            return employee !== emp;
        });
        this.setState({
            employees: filteredEmployees
        });
    }

    updateEmployee(id, name, designation){
        let matched = this.state.employees.map(i=> {
           if( i.id === id){
               return {id: id, name: name, designation: designation}
           }
           else{
               return i;
           }
        })
        this.setState({employees: matched})
        this.handleClose();
    }
    addEmployee(name,designation){

            let newEmployee = {
                id: this.state.employees.length + 1,
                name: name,
                designation: designation
            };
            this.setState((prevState) => {
                return{
                    employees: prevState.employees.concat(newEmployee)
                };
            });    
            this.handleClose()
            console.log(this.state.employees)  
    }

    render(){
       
        return(
                <div >
                    <div>
                      <button onClick={this.handleShow} className ="button muted-button">Add Employee</button> &nbsp;&nbsp;  
                      &nbsp;&nbsp;<Link to={ { pathname: "/tasks", state: this.state.employees } }>Tasks</Link>  
                    </div>
                    <table className="table table-light">
                        <thead cl="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.employees.length > 0 ? (
                            this.state.employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.designation}</td>
                                <td>
                                <button
                                    onClick={() => {
                                        this.editEmployee(employee)
                                    }}
                                    className="button muted-button"
                                >
                                    Edit
                                </button>
                                &nbsp;&nbsp;
                                <button
                                    onClick={() => this.deleteEmployee(employee)}
                                    className="button muted-button"
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan={3}>No Employees</td>
                            </tr>
                        )}
                        </tbody>
                    </table>  
                    <ModalView show={this.state.show} onHide={this.handleClose} currentEmployee = {this.state.currentEmployee} formText = {this.state.formText} addEmployee={this.addEmployee} updateEmployee={this.updateEmployee}/>
                </div>
        );
    }

}
export default EmployeesList;