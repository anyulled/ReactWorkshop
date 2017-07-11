/**
 * Created by alrs on 11/07/2017.
 */
import {weatherActionType} from "./weatherActions";

const initialState = {
    loading: true,
    error: false,
    message: "",
    city: "",
    forecast: []
};

const weather = (state = initialState, action) => {
    switch (action.type) {
        case weatherActionType.WEATHER_CLEAR:
            return initialState;
        case weatherActionType.WEATHER_LOAD:
            return {
                ...state,
                forecast: action.payload.forecast,
                city: action.payload.city,
                loading: false
            };
        case weatherActionType.WEATHER_ERROR:
            return {...state, error: true, message: action.payload, forecast: [], city: ""};
        default:
            return state;
    }
};

export default weather;