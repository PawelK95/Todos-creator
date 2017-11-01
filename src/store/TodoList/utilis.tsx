import { Todo } from './reducer';
export const calcProgress = ( todos: Todo[] ) => {
    if (todos.length === 0) { return 0; }
    let counter = 0;
    todos.forEach((todo: Todo) => {
        if (todo.is_complete) {
            counter++;
        }
    });
    return Number(((counter / todos.length) * 100).toFixed(0));
};