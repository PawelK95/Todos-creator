import { ActionCreator } from '../actionCreator';

export type TodoList = {
    id: number,
    name: string,
    todos_count: number
};

export const initialState = {
    todoLists: [],
    addName: '',
    searchName: '',
    editName: '',
    loaded: false,
    errorMessage: ''
};
export const ActionCreators = {
    FETCH_TODO_LISTS: new ActionCreator<'FETCH_TODO_LISTS', {}>('FETCH_TODO_LISTS'),
    /* tslint:disable-next-line */
    FETCH_TODO_LISTS_FULLFILED: new ActionCreator<'FETCH_TODO_LISTS_FULLFILED', TodoList[]>('FETCH_TODO_LISTS_FULLFILED'),
    ADD_TODO_LIST:  new ActionCreator<'ADD_TODO_LIST', string>('ADD_TODO_LIST'),
    ADD_TODO_LIST_SUCCESS:  new ActionCreator<'ADD_TODO_LIST_SUCCESS', TodoList>('ADD_TODO_LIST_SUCCESS'),
    DELETE_TODO_LIST:  new ActionCreator<'DELETE_TODO_LIST', number>('DELETE_TODO_LIST'),
    DELETE_TODO_LIST_SUCCESS:  new ActionCreator<'DELETE_TODO_LIST_SUCCESS', number>('DELETE_TODO_LIST_SUCCESS'),
    UPDATE_TODO_LIST:  new ActionCreator<'UPDATE_TODO_LIST', any>('UPDATE_TODO_LIST'),
    SET_ADD_NAME_TODO_LISTS:  new ActionCreator<'SET_ADD_NAME_TODO_LISTS', string >('SET_ADD_NAME_TODO_LISTS'),
    SET_SEARCH_NAME_TODO_LISTS:  new ActionCreator<'SET_SEARCH_NAME_TODO_LISTS', string >('SET_SEARCH_NAME_TODO_LISTS'),
    REQUEST_FAIL:  new ActionCreator<'REQUEST_FAIL', string >('REQUEST_FAIL'),
    UPDATE_TODO_LIST_SUCCESS:  new ActionCreator<'UPDATE_TODO_LIST_SUCCESS', any>('UPDATE_TODO_LIST_SUCCESS'),
};

export type Action = typeof ActionCreators[keyof typeof ActionCreators];

export type State = {
   readonly todoLists: TodoList[],
   readonly addName: string,
   readonly searchName: string,
   readonly loaded: boolean,
   readonly errorMessage: string,
};

export const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case ActionCreators.FETCH_TODO_LISTS_FULLFILED.type:
            return {
                ...state,
                todoLists: action.payload,
                loaded: true,
                errorMessage: ''
            };
        case ActionCreators.ADD_TODO_LIST_SUCCESS.type:
            return {
                ...state,
                todoLists: [...state.todoLists, action.payload],
                addName: '',
                errorMessage: ''
            };
        case ActionCreators.DELETE_TODO_LIST_SUCCESS.type:
            return {
                ...state,
                todoLists: state.todoLists.filter((todoList: TodoList) => todoList.id !== action.payload),
                errorMessage: ''
            };
        case ActionCreators.SET_ADD_NAME_TODO_LISTS.type:
            return {
                ...state,
                addName: action.payload
            };
        case ActionCreators.SET_SEARCH_NAME_TODO_LISTS.type:
            return {
                ...state,
                searchName: action.payload
            };
        case ActionCreators.REQUEST_FAIL.type:
            return {
                ...state,
                errorMessage: action.payload,
                loaded: true
            };
        case ActionCreators.UPDATE_TODO_LIST_SUCCESS.type:
            return {
                ...state,
                todoLists: state.todoLists.map((todo: TodoList) => {
                    if (todo.id !== action.payload.id) { return todo; }
                    return {...action.payload};
                }),
                errorMessage: ''
            };
        default:
            return state;
    }
};

export default reducer;