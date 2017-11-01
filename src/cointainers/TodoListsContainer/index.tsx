import * as React from 'react';
import { RootState } from '../../store/index';
import { returntypeof } from 'react-redux-typescript';
import { connect } from 'react-redux';
import { State, ActionCreators } from '../../store/TodoLists/reducer';
import TodoListItem from '../../components/TodoListItem';
import { TodoList } from '../../store/TodoLists/reducer';
import {  ListGroup, Row, Col, Alert } from 'react-bootstrap';
import * as Loader  from 'react-loader';
import './styles.css';
import Panel from '../../components/Panel/index';

const mapStateToProps = (state: RootState) => ({
    todoLists: state.todoLists.todoLists,
    addName: state.todoLists.addName,
    searchName: state.todoLists.searchName,
    loaded: state.todoLists.loaded,
    errorMessage: state.todoLists.errorMessage,
});

const dispatchToProps = {
    fetchTodoLists: ActionCreators.FETCH_TODO_LISTS.create,
    addTodoList: ActionCreators.ADD_TODO_LIST.create,
    setAddName: ActionCreators.SET_ADD_NAME_TODO_LISTS.create,
    setSearchName: ActionCreators.SET_SEARCH_NAME_TODO_LISTS.create,
    deleteTodoList: ActionCreators.DELETE_TODO_LIST.create,
    updateTodoList: ActionCreators.UPDATE_TODO_LIST.create
};

const stateProps = returntypeof(mapStateToProps);

export type Props = typeof stateProps & typeof dispatchToProps;

class TodoListsContainer extends React.Component<Props, State> {

    componentDidMount() {
        this.props.fetchTodoLists();
        this.props.setSearchName('');
        this.props.setAddName('');
    }

    render() {
        const {
            todoLists, deleteTodoList, updateTodoList, searchName,
            addName, loaded, errorMessage, setSearchName, setAddName, addTodoList
        } = this.props;
        return (
            <Row>
                <h1> Todo lists</h1>
                {errorMessage === '' ?
                    null :
                    <Col md={8} mdOffset={2}>
                        <Alert bsStyle="danger"> {errorMessage} </Alert>
                    </Col>
                }
                <Col md={8} mdOffset={2}>
                    <Panel {...{setSearchName, setAddName, add: addTodoList , addName}}/>
                </Col>
                <Loader loaded={loaded}>
                    <Col md={8} mdOffset={2}>
                        {todoLists.length === 0 ?
                            <Alert bsStyle="warning"> List is empty </Alert>
                           :
                            <ListGroup componentClass="ul">
                                {todoLists
                                    .filter((todoList: TodoList) => todoList.name.includes(searchName))
                                    .map((todoList: TodoList) =>
                                        <TodoListItem key={todoList.id} {...{todoList, deleteTodoList, updateTodoList}}/>
                                    )}
                            </ListGroup>
                        }

                    </Col>
                </Loader>

            </Row>
        );
    }
}

export default connect(mapStateToProps, dispatchToProps)(TodoListsContainer);