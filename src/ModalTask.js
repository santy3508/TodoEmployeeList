import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, ModalDialog,ModalHeader,ModalBody,ModalFooter,Form } from 'react-bootstrap';

class ModalTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: null,
            name: "",
            priority: "",
            assignee: ""
        }
        this.handleData = this.handleData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleData(e){
        e.preventDefault();
        const form = e.currentTarget.form;
        if(form.formName.value !== "" && form.formPriority.value !== ""){
            if(this.props.formText === "add"){ 
                this.props.addTask(form.formName.value,form.formPriority.value);
            }else{
                this.props.updateTask(this.state.id,this.state.name,this.state.priority,this.state.assignee);
            }
        }
    }

    handleInputChange(event){
        debugger;
        let {name, value} = event.target
        value = parseInt(value);
        this.setState({ [name]: value })
    }

    componentWillReceiveProps(nextProps){
      
        let {id, name, priority, assignee } = nextProps.currentTask
        this.setState({
            id,name,priority,assignee
        })
        
    }
    render(){
    
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formName"  >
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control placeholder="Name" name="name" onChange={this.handleInputChange} defaultValue={this.state.name}/>
                    </Form.Group>

                    <Form.Group controlId="formPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control placeholder="Priority" name="priority" onChange={this.handleInputChange} defaultValue={this.state.priority}/>
                    </Form.Group>

                    <Form.Label>Assignee</Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <select id="assignee" name="assignee" className="mdb-select md-form" onChange={this.handleInputChange} value={this.state.assignee} >
                        <option value="">Select an Assignee</option>
                    {this.props.employees.map(employee  =>{
                           return  <option value ={employee.id} >{employee.name}</option>;
                    })
                    }
                    </select><br></br><br></br>
                    
                    <Button variant="secondary" onClick={this.props.onHide}>
                          Close
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="primary" type="submit" onClick={this.handleData}>
                        Submit
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
export default ModalTask;