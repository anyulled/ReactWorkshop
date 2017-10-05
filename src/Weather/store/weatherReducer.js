import type {Action} from "./weatherActions";
// @flow
/**
 * Created by alrs on 11/07/2017.
 */
import {weatherActionTypes, ForecastDetail} from "./weatherActions";

type State = {
    +loading: boolean,
    +error: boolean,
    +message: string,
    +city: string,
    +forecast: Array<ForecastDetail>
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
        case weatherActionTypes.WEATHER_CLEAR:
            return initialState;
        case weatherActionTypes.WEATHER_LOAD:
            return {
                ...state,
                forecast: action.payload.forecast,
                city: action.payload.city,
                loading: false,
                error: false,
                message: ""
            };
        case weatherActionTypes.WEATHER_ERROR:
            return {...state, error: true, message: action.payload, forecast: [], city: "", loading: false};
        default:
            return state;
    }
};

export default weather;