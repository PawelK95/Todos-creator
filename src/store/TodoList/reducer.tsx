import { ActionCreator } from '../actionCreator';
import { ALL } from '../../helpers/const';
import { calcProgress } from './utilis';

export type Todo = {
    id: number,
    name: string,
    is_complete: boolean,
    todo_list: number
};

export type Filter = {
    complete?: boolean,
    name: string,
};

export const initialState = {
    todoList: [],
    addName: '',
    searchName: '',
    editName: '',
    filter: {name: ALL},
    loaded: false,
    errorMessage: '',
    progress: 0,
};
export const ActionCreators = {
    FETCH_TODO_LIST: new ActionCreator<'FETCH_TODO_LIST', number>('FETCH_TODO_LIST'),
    FETCH_TODO_LIST_FULLFILED:  new ActionCreator<'FETCH_TODO_LIST_FULLFILED', any>('FETCH_TODO_LIST_FULLFILED'),
    DELETE_TODO:  new ActionCreator<'DELETE_TODO', number>('DELETE_TODO'),
    DELETE_TODO_SUCCESS:  new ActionCreator<'DELETE_TODO_SUCCESS', number>('DELETE_TODO_SUCCESS'),
    ADD_TODO:  new ActionCreator<'ADD_TODO', Todo>('ADD_TODO'),
    ADD_TODO_SUCCESS:  new ActionCreator<'ADD_TODO_SUCCESS', any>('ADD_TODO_SUCCESS'),
    SWITCH_TODO:  new ActionCreator<'SWITCH_TODO', any>('SWITCH_TODO'),
    UPDATE_TODO_NAME:  new ActionCreator<'UPDATE_TODO_NAME', any>('UPDATE_TODO_NAME'),
    UPDATE_TODO_SUCCESS:  new ActionCreator<'UPDATE_TODO_SUCCESS', any>('UPDATE_TODO_SUCCESS'),
    SET_ADD_NAME:  new ActionCreator<'SET_ADD_NAME', string >('SET_ADD_NAME'),
    SET_SEARCH_NAME:  new ActionCreator<'SET_SEARCH_NAME', string >('SET_SEARCH_NAME'),
    SET_EDIT_NAME:  new ActionCreator<'SET_EDIT_NAME', string >('SET_EDIT_NAME'),
    SET_FILTER:  new ActionCreator<'SET_FILTER', Filter >('SET_FILTER'),
    REQUEST_FAIL:  new ActionCreator<'REQUEST_FAIL', string >('REQUEST_FAIL'),
    CLEAR_LIST:  new ActionCreator<'CLEAR_LIST', {} >('CLEAR_LIST')
};

export type Action = typeof ActionCreators[keyof typeof ActionCreators];

export type State = {
    readonly todoList: Todo[],
    readonly addName: string,
    readonly searchName: string,
    readonly editName: string,
    readonly filter: Filter,
    readonly loaded: boolean,
    readonly errorMessage: string,
    readonly progress: number,
};

const reducer = (state: State = initialState, action: Action) => {
    let newTodoList;
    switch (action.type) {
        case ActionCreators.CLEAR_LIST.type:
            return {
                ...state,
                todoList: [],
                progress: 0
            };
        case ActionCreators.FETCH_TODO_LIST_FULLFILED.type:
            return {
                ...state,
                todoList: action.payload,
                loaded: true,
                progress: calcProgress(action.payload),
                errorMessage: ''
            };
        case ActionCreators.DELETE_TODO_SUCCESS.type:
            newTodoList = state.todoList.filter((todo: Todo) => todo.id !== action.payload);
            return {
                ...state,
                todoList: newTodoList,
                progress: calcProgress(newTodoList),
                errorMessage: ''
            };
        case ActionCreators.ADD_TODO_SUCCESS.type:
            newTodoList = [...state.todoList, action.payload];
            return {
                ...state,
                todoList: newTodoList,
                progress: calcProgress(newTodoList),
                errorMessage: '',
                addName: ''
            };
        case ActionCreators.SET_ADD_NAME.type:
            return {
                ...state,
                addName: action.payload
            };
        case ActionCreators.SET_SEARCH_NAME.type:
            return {
                ...state,
                searchName: action.payload
            };
        case ActionCreators.SET_EDIT_NAME.type:
            return {
                ...state,
                editName: action.payload
            };
        case ActionCreators.UPDATE_TODO_SUCCESS.type:
            newTodoList = state.todoList.map((todo: Todo) => {
                if (todo.id !== action.payload.id) { return todo; }
                return {...action.payload};
            });
            return {
                ...state,
                todoList: newTodoList,
                progress: calcProgress(newTodoList),
                errorMessage: ''
            };
        case ActionCreators.SET_FILTER.type:
            return {
                ...state,
                filter: {...action.payload}
            };
        case ActionCreators.REQUEST_FAIL.type:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default reducer;