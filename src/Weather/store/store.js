/**
 * Created by alrs on 11/07/2017.
 */
import {applyMiddleware, compose, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import weatherReducer from "./weatherReducer";
import {rootEpic} from "./epics/rootEpic";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();
const epicMiddleware = createEpicMiddleware(rootEpic);

export default createStore(weatherReducer, composeEnhancers(applyMiddleware(thunkMiddleware, epicMiddleware, loggerMiddleware)));