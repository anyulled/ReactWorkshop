/**
 * Created by alrs on 11/07/2017.
 */
import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import weatherReducer from "./weatherReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();

export default createStore(weatherReducer, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));