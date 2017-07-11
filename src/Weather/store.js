/**
 * Created by alrs on 11/07/2017.
 */
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import weatherReducer from "./weatherReducer";

const loggerMiddleware = createLogger();

export default createStore(weatherReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));