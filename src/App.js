import React, { Component, Fragment } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import EmployeesList from './EmployeesList';
import TaskList from './TaskList';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path="/" exact  component={EmployeesList}/>
          <Route path="/tasks" component={TaskList}/>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
