// @flow
/**
 * Created by alrs on 11/07/2017.
 */
import axios from "axios";

type ActionType<T, K> = { [T]: K };

export const weatherActionTypes: ActionType<string, string> = {
    WEATHER_CLEAR: "weather/clear",
    WEATHER_LOAD: "weather/load",
    WEATHER_ERROR: "weather/error"
};

export type ClearAction = {|+type: string|};
export type LoadAction = {|+type: string, +payload?: ForecastType|};
export type ErrorAction = { +type: string, +payload?: string };
export type Action = ClearAction | LoadAction | ErrorAction;
export type State = Array<mixed>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type PromiseAction = Promise<Action>;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type ForecastDetail = {
    icon: string,
    date: Date,
    description: string,
    minTemp: number,
    maxTemp: number,
    humidity: number
};
type ForecastType = {
    city: string,
    forecast: Array<ForecastDetail>
};

const WEATHER_API: string = "bfc079575bff7ec0b8e4a53770e35ec7";

const clearData = (): ClearAction => ({
    type: weatherActionTypes.WEATHER_CLEAR
});

export const errorData = (error: string): ErrorAction => ({
    type: weatherActionTypes.WEATHER_ERROR,
    payload: error
});

const loadData = (response: Object): Action => ({
    type: weatherActionTypes.WEATHER_LOAD,
    payload: {
        city: response.data.city.name,
        forecast: response.data.list.map(weather => ({
            icon: weather.weather[0].icon,
            date: weather.dt,
            description: weather.weather[0].description,
            minTemp: weather.temp.min,
            maxTemp: weather.temp.max,
            humidity: weather.humidity
        }))
    }
});

export function loadWeatherData(latitude: number, longitude: number): ThunkAction {
    return (dispatch: Function) => {
        dispatch(clearData());
        axios(`http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}`)
            .then(response => dispatch(loadData(response)))
            .catch(error => dispatch(errorData(error.message)));
    };
}