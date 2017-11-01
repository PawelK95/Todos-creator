import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';

import { Store } from '../index';
import { ActionCreators } from './reducer';
import { Observable } from 'rxjs/Observable';
import { baseUrl } from '../../helpers/baseUrl';

const fetchTodoList = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.FETCH_TODO_LIST.type)
        .mergeMap((action: typeof ActionCreators.FETCH_TODO_LIST) =>
            ajax.get(baseUrl(`todolists/${action.payload}`))
                .mergeMap(res => Observable.of(ActionCreators.FETCH_TODO_LIST_FULLFILED.create(res.response)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

const deleteTodo = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.DELETE_TODO.type)
        .mergeMap((action: typeof ActionCreators.DELETE_TODO) =>
            ajax.delete(baseUrl(`todos/${action.payload}`))
                .mergeMap(res => Observable.of(ActionCreators.DELETE_TODO_SUCCESS.create(action.payload)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

const addTodo = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.ADD_TODO.type)
        .mergeMap((action: typeof ActionCreators.ADD_TODO) =>
            ajax.post(baseUrl(`todos`), action.payload)
                .mergeMap(res => Observable.of(ActionCreators.ADD_TODO_SUCCESS.create(res.response)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

const updateTodo = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.SWITCH_TODO.type)
        .mergeMap((action: typeof ActionCreators.SWITCH_TODO) =>
            ajax.put(baseUrl(`todos/${action.payload.id}`), action.payload)
                .mergeMap(res => Observable.of(ActionCreators.UPDATE_TODO_SUCCESS.create(res.response)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

const updateTodoName = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.UPDATE_TODO_NAME.type)
        .debounceTime(750)
        .mergeMap((action: typeof ActionCreators.UPDATE_TODO_NAME) =>
            ajax.put(baseUrl(`todos/${action.payload.id}`), action.payload)
                .mergeMap(res => Observable.of(ActionCreators.UPDATE_TODO_SUCCESS.create(res.response)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

export const epics = combineEpics(fetchTodoList, deleteTodo, addTodo, updateTodo, updateTodoName);
