import * as React from 'react';
import { Todo } from '../../store/TodoList/reducer';
import {  Button , Glyphicon } from 'react-bootstrap';
import './styles.css';

interface Props {
    todoListId: number;
    todo: Todo;
    deleteTodo: (payload: number) => void;
    switchTodo: (payload: Todo) => void;
    updateTodoName: (payload: Todo) => void;
}

class TodoItem extends React.Component<Props> {

    handleUpdate (e: any) {
        const {todo, updateTodoName} = this.props;
        updateTodoName({...todo, name: e.target.value});
    }
    handleOnDelete () {
        const {deleteTodo, todo} = this.props;
        deleteTodo(todo.id);
    }
    handleOnChecked (e: any) {
        /* tslint:disable-next-line */
        const is_complete = e.target.checked;
        const {switchTodo, todo} = this.props;
        switchTodo({...todo, is_complete});
    }
    render() {

        const {todo} = this.props;

        return (
            <li   className="list-group-item todoItem">
                <input
                    className="form-control"
                    type="text"
                    defaultValue={todo.name}
                    onChange={(e) => this.handleUpdate(e)}
                />
                <input type="checkbox" checked={todo.is_complete} onChange={(e) => this.handleOnChecked(e)}/>
                <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.handleOnDelete()}> <Glyphicon glyph="remove" /> </Button>
            </li>
        );
    }
}

export default TodoItem;