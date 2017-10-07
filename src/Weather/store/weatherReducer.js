//@flow
/**
 * Created by alrs on 11/07/2017.
 */
import type {State} from "../../types";
import {weatherActionTypes} from "./weatherActions";

const initialState: State = {
    loading: true,
    error: false,
    message: "",
    city: "",
    forecast: []
};
type weatherAction = { type: string, payload: { city: string, forecast: Array<any> } };

const weather = (state: State = initialState, action: weatherAction): State => {
    switch (action.type) {
        case weatherActionTypes.WEATHER_CLEAR:
            return state;
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
            return {
                ...state,
                forecast: [],
                city: "",
                loading: false,
                error: false,
                message: ""
            };
        default:
            return state;
    }
};

export default weather;