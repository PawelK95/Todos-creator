import * as React from 'react';
import { TodoList } from '../../store/TodoLists/reducer';
import { Link } from 'react-router-dom';
import {  Button, Glyphicon, Badge } from 'react-bootstrap';
import './styles.css';

interface UpdateTodo {
    name: string;
    id: number;
}

interface Props {
    todoList: TodoList;
    deleteTodoList: (payload: number) => void;
    updateTodoList: (payload: UpdateTodo) => void;
}

class TodoListItem extends React.Component<Props > {
    handleOnClick () {
        const {todoList, deleteTodoList} = this.props;
        deleteTodoList(todoList.id);
    }
    handleUpdate (e: any) {
        const {todoList, updateTodoList} = this.props;
        updateTodoList({name: e.target.value, id: todoList.id});
    }
    render() {

        const {todoList} = this.props;

        return (
            <li   className="list-group-item todoListItem">
                    <input
                        className="form-control"
                        type="text"
                        defaultValue={todoList.name}
                        onChange={(e) => this.handleUpdate(e)}
                    />
                <Badge className="count">{todoList.todos_count}</Badge>
                <Link to={`/todoList/${todoList.id}`}>
                    <Button bsSize="xsmall">
                            <Glyphicon glyph="eye-open" />
                    </Button>
                </Link>
                <Button bsSize="xsmall" bsStyle="danger" onClick={() => this.handleOnClick ()}> <Glyphicon glyph="remove" /> </Button>
            </li>
        );
    }
}

export default TodoListItem;