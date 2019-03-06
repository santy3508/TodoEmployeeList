import React, { Component } from 'react';
import ModalTask from './ModalTask';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [
                {id: 1, name: "MAP Features",priority: "Low",assignee:1},
                {id: 2, name: "Strategies Generation",priority: "High",assignee:2},
                {id: 3, name: "React Concepts ",priority: "Medium",assignee:3}
            ],
            show: false,
            currentTask: { id: null,name:"",priority:"",assignee:""},
            formText: "add",
            employees: []
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
      this.setState({ show: true });
    }

    addTask(name, priority, assignee){
        let newTask = {
            id: this.state.tasks.length + 1,
            name: name,
            priority: priority,
            assignee: assignee
        };
        this.setState((prevState) => {
            return{
                tasks: prevState.tasks.concat(newTask)
            };
        });    
        this.handleClose()
        console.log(this.state.tasks)  
    }

    editTask(task){
        this.setState({ show:true, currentTask: task, formText: "edit"})
    }

    updateTask(id,name,priority,assignee){
        debugger;
        let matched = this.state.tasks.map(i=> {
            if( i.id === id){
                return {id: id, name: name, priority: priority, assignee: assignee}
            }
            else{
                return i;
            }
         })
         this.setState({tasks: matched})
         this.handleClose();
    }

    deleteTask(t){
        let  filteredTasks = this.state.tasks.filter((task) => {
            return task !== t;
        });
        this.setState({
            tasks: filteredTasks
        });
    }

    render(){
        return(
            <div >
            <div>
              <button onClick={this.handleShow} className ="button muted-button">Add Task</button>&nbsp;&nbsp;&nbsp;&nbsp;   
              <Link to="/">Employees</Link>  
            </div>
            <table className="table table-light">
                <thead cl="thead-dark">
                <tr>
                    <th scope="col">Task name</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Assignee name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.tasks.length > 0 ? (
                    this.state.tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.priority}</td>
                        <td>{this.props.location.state.map(i=> {
                                if( i.id === task.assignee){
                                    return i.name;
                                }
                             })
                            }</td>
                        <td>
                        <button onClick={() => {
                                        this.editTask(task)}} 
                        className="button muted-button">
                            Edit
                        </button>
                        &nbsp;&nbsp;
                        <button
                            onClick={() => this.deleteTask(task)}
                            className="button muted-button"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={3}>No Tasks</td>
                    </tr>
                )}
                </tbody>
            </table>  
            <ModalTask show={this.state.show} onHide = {this.handleClose} employees= {this.props.location.state} currentTask = {this.state.currentTask} formText = {this.state.formText} updateTask = {this.updateTask} addTask = {this.addTask}/>
        </div>
        );
    }
}
export default TaskList;