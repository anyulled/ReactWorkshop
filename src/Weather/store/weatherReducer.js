/**
 * Created by alrs on 11/07/2017.
 */
import {weatherActionType} from "./weatherActions";

const initialState = {
    loading: true,
    error: false,
    message: "",
    city: "",
    country: "",
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
                country: action.payload.country,
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