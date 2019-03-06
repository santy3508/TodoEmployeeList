import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, ModalDialog,ModalHeader,ModalBody,ModalFooter,Form } from 'react-bootstrap';


class ModalView extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: null,
            name: "",
            designation: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleData = this.handleData.bind(this);
    }

    handleInputChange(event){
        let {name, value} = event.target
        this.setState({ [name]: value })
    }
    handleData(e){
        e.preventDefault();
        const form = e.currentTarget.form;
        if(form.formName.value !== "" && form.formDesignation.value !== ""){
            if(this.props.formText === "add"){ 
                this.props.addEmployee(form.formName.value,form.formDesignation.value);
            }else{
                this.props.updateEmployee(this.state.id,this.state.name,this.state.designation);
            }
        }
    }

    componentWillReceiveProps(nextProps){
        let {id, name, designation} = nextProps.currentEmployee
        this.setState({ id, name, designation });
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formName"  >
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control placeholder="Name" name="name" onChange={this.handleInputChange} defaultValue={this.state.name}/>
                    </Form.Group>

                    <Form.Group controlId="formDesignation">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control placeholder="Designation" name="designation" defaultValue={this.state.designation}/>
                    </Form.Group>
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
export default ModalView;