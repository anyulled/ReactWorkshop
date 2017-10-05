// @flow
/**
 * Created by alrs on 11/07/2017.
 */
import {weatherActionType} from "./weatherActions";
import type {Action} from "./weatherActions";
type State = {
    +loading: boolean,
    +error: boolean,
    +message: string,
    +city: string,
    +forecast: Array<mixed>
};


const initialState = {
    loading: true,
    error: false,
    message: "",
    city: "",
    forecast: []
};

const weather = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case weatherActionType.WEATHER_CLEAR:
            return initialState;
        case weatherActionType.WEATHER_LOAD:
            return {
                ...state,
                forecast: action.payload.forecast,
                city: action.payload.city,
                loading: false,
                error: false,
                message: ""
            };
        case weatherActionType.WEATHER_ERROR:
            return {...state, error: true, message: action.payload, forecast: [], city: "", loading: false};
        default:
            return state;
    }
};

export default weather;