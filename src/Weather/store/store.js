//@flow
/**
 * Created by alrs on 11/07/2017.
 */
import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import weatherReducer from "./weatherReducer";

const composeEnhancers: Function = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware: mixed = createLogger();

export default createStore(weatherReducer, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));