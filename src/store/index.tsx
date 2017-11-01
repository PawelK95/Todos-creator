declare const window: Window & { devToolsExtension: any, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any };

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { epics as TodoListsEpics } from './TodoLists/epics';
import { epics as TodoListEpics } from './TodoList/epics';
import { default as todoListsReducer, State as todoListsState } from './TodoLists/reducer';
import { default as todoListReducer, State as todoListState } from './TodoList/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootState = {
    todoLists: todoListsState,
    todoList: todoListState,
};

const recoverState = (): RootState => ({} as RootState);

const rootEpic = combineEpics(
    TodoListsEpics,
    TodoListEpics
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const rootReducers = combineReducers<RootState>({
    todoLists: todoListsReducer,
    todoList: todoListReducer
});

export const store = createStore(
    rootReducers,
    recoverState(),
    composeEnhancers(applyMiddleware(epicMiddleware))
);

export type Store = { getState: () => RootState, dispatch: Function };