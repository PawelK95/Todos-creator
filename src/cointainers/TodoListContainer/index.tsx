import * as React from 'react';
import { RootState } from '../../store/index';
import { returntypeof } from 'react-redux-typescript';
import { connect } from 'react-redux';
import { State, ActionCreators } from '../../store/TodoList/reducer';
import TodoItem from '../../components/TodoItem';
import { Todo } from '../../store/TodoList/reducer';
import { ALL, COMPLETED, UNCOMPLETED } from '../../helpers/const';
import { Button, Col, ButtonGroup, ListGroup, ProgressBar, Alert, Glyphicon, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Loader  from 'react-loader';
import Panel from '../../components/Panel/index';
import './styles.css';

const mapStateToProps = (state: RootState) => ({
    todoList: state.todoList.todoList,
    addName: state.todoList.addName,
    searchName: state.todoList.searchName,
    editName: state.todoList.editName,
    filter: state.todoList.filter,
    loaded: state.todoList.loaded,
    errorMessage: state.todoList.errorMessage,
    progress: state.todoList.progress,
});

const dispatchToProps = {
    fetchTodoList: ActionCreators.FETCH_TODO_LIST.create,
    addTodo: ActionCreators.ADD_TODO.create,
    deleteTodo: ActionCreators.DELETE_TODO.create,
    switchTodo: ActionCreators.SWITCH_TODO.create,
    updateTodoName: ActionCreators.UPDATE_TODO_NAME.create,
    setAddName: ActionCreators.SET_ADD_NAME.create,
    setSearchName: ActionCreators.SET_SEARCH_NAME.create,
    setEditName: ActionCreators.SET_EDIT_NAME.create,
    setFilter: ActionCreators.SET_FILTER.create,
    clearList: ActionCreators.CLEAR_LIST.create,
};

const stateProps = returntypeof(mapStateToProps);

export type Props = typeof stateProps & typeof dispatchToProps;

class TodoListContainer extends React.Component<any, State> {

    componentWillMount() {
        this.props.clearList();
        this.props.setSearchName('');
        this.props.setAddName('');
        this.props.setFilter({name: ALL});
    }
    componentDidMount() {
        const todoListId = parseInt(this.props.match.params.id, 10);
        this.props.fetchTodoList(todoListId);
    }

    handleFilter(e: any) {
        const { setFilter } = this.props;
        const name = e.target.value;
        name === UNCOMPLETED ?
        setFilter({name, complete: false}) :
        setFilter({name, complete: true});
    }

    render() {
        const {todoList, addTodo, deleteTodo, switchTodo, match, setSearchName, errorMessage,
            setAddName, searchName, filter, addName, loaded, updateTodoName, progress} = this.props;
        const todoListId =  parseInt(match.params.id, 10);
        return (
            <Row>
                <Col md={1} mdOffset={2}>
                    <Link to={`/`}>
                        <Button className="back">
                                 <Glyphicon glyph="arrow-left" /> Back
                        </Button>
                    </Link>
                </Col>
                {errorMessage === '' ?
                    null :
                    <Col md={8} mdOffset={2}>
                        <Alert bsStyle="danger"> {errorMessage} </Alert>
                    </Col>
                }
                <Col md={8} mdOffset={2}>
                    <h1> Todo list </h1>
                    <Panel {...{setSearchName, setAddName, add: addTodo , addName, todo_list: match.params.id }}/>
                </Col>
                <Col md={4} mdOffset={2}>
                    <ButtonGroup >
                            <Button value={ALL} onClick={(e) => this.handleFilter(e)}> All </Button>
                            <Button value={COMPLETED} onClick={(e) => this.handleFilter(e)}> Complete <Glyphicon glyph="check" /></Button>
                            <Button value={UNCOMPLETED} onClick={(e) => this.handleFilter(e)}> Incomplete <Glyphicon glyph="unchecked" /></Button>
                    </ButtonGroup>
                </Col>
                <Col md={4}>
                    <ProgressBar striped={true} active={true} bsStyle="success" now={progress} label={`${progress}%`} />
                </Col>
                <Loader loaded={loaded} >
                    <Col md={8} mdOffset={2}>
                        {todoList.length === 0 ?
                            <Alert bsStyle="warning"> List is emprty </Alert>
                            :
                            <ListGroup componentClass="ul" className="list">
                                {todoList
                                    .filter((todo: Todo) => todo.is_complete === filter.complete || filter.name === ALL)
                                    .filter((todo: Todo) => todo.name.includes(searchName))
                                    .map((todo: Todo) =>
                                        <TodoItem key={todo.id} {...{todo, deleteTodo, switchTodo, updateTodoName, todoListId }}/>
                                    )}
                            </ListGroup>
                        }
                    </Col>
                </Loader>
            </Row>
        );
    }
}

export default connect(mapStateToProps, dispatchToProps)(TodoListContainer);