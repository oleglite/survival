import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createWebsocket from './middleware/websocketMiddleware';
import * as websocketActions from './actions/websocketActions';

const loggerMiddleware = createLogger();
const websocketMiddleware = createWebsocket(websocketActions);

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            loggerMiddleware,
            websocketMiddleware
        )
    );
}

const store = configureStore()
export default store
