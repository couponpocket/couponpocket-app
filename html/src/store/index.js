import { createStore, applyMiddleware, compose as reduxCompose } from "redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";

import RootReducer from './reducers';

let compose = reduxCompose;
let middlewares = [
    ReduxThunk
];

// enhancer
if (process.env.NODE_ENV !== 'production') {
    compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
    middlewares.push(logger);
}

const store = createStore(
    // reducers
    RootReducer,
    // initialState
    {},
    // middleware & devtools
    compose(applyMiddleware(...middlewares))
);

export default store;
