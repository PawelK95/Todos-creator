import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { Store } from '../index';
import { ActionCreators } from './reducer';
import { Observable } from 'rxjs/Observable';
import { baseUrl } from '../../helpers/baseUrl';

export const fetchTodoLists = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.FETCH_TODO_LISTS.type)
        .mergeMap((action: typeof ActionCreators.FETCH_TODO_LISTS) =>
            ajax.get(baseUrl(`todolists`))
                .mergeMap(res => Observable.of(ActionCreators.FETCH_TODO_LISTS_FULLFILED.create(res.response)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

const addTodoList = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.ADD_TODO_LIST.type)
        .mergeMap((action: typeof ActionCreators.ADD_TODO_LIST) =>
            ajax.post(baseUrl(`todolists`), {name: action.payload})
                .mergeMap(res => Observable.of(ActionCreators.ADD_TODO_LIST_SUCCESS.create(res.response)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

const deleteTodoList = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.DELETE_TODO_LIST.type)
        .mergeMap((action: typeof ActionCreators.DELETE_TODO_LIST) =>
            ajax.delete(baseUrl(`todolists/${action.payload}`))
                .mergeMap(res => Observable.of(ActionCreators.DELETE_TODO_LIST_SUCCESS.create(action.payload)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

const updateTodoList = (action$: any, store: Store) =>
    action$.ofType(ActionCreators.UPDATE_TODO_LIST.type)
        .debounceTime(750)
        .mergeMap((action: typeof ActionCreators.UPDATE_TODO_LIST) =>
            ajax.put(baseUrl(`todolists/${action.payload.id}`), {name: action.payload.name})
                .mergeMap(res => Observable.of(ActionCreators.UPDATE_TODO_LIST_SUCCESS.create(res.response)))
                .catch(err => Observable.of(ActionCreators.REQUEST_FAIL.create(err.message)) )
        );

export const epics = combineEpics(fetchTodoLists, addTodoList, deleteTodoList, updateTodoList);
