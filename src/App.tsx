import * as React from 'react';
import './App.css';
import TodoListsContainer from './cointainers/TodoListsContainer';
import TodoListContainer from './cointainers/TodoListContainer';
import { Switch, Route } from 'react-router-dom';
import {  Grid } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
        <Grid className="App">
            <Switch>
                <Route exact={true} path="/" component={TodoListsContainer}/>
                <Route exact={true} path="/todoList/:id" component={TodoListContainer}/>
            </Switch>
        </Grid>
    );
  }
}

export default App;
