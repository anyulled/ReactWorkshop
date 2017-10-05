//@flow
/**
 * Created by alrs on 11/07/2017.
 */
import axios from "axios";
const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";

export type ClearAction = { +type: "weather/clear", +payload?: any };
export type LoadAction = { +type: "weather/load", +payload?: any };
export type ErrorAction = { +type: "weather/error", +payload?: any };
export type Action = | ClearAction | LoadAction | ErrorAction;
export type State = any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type PromiseAction = Promise<Action>;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState?: GetState) => any;
export type WeatherResponse = {|
    data: {
        forecast: Array<mixed>,
        list: Array<WeatherData>,
        city: {
            name: string
        },
        loading: boolean,
        error: boolean,
        message: string
    }
|};
export type WeatherData = {
    dt: number,
    temp: {
        min: number,
        max: number
    },
    humidity: number,
    weather: Array<{ icon: string, description: string }>
};

export const weatherActionType = {
    WEATHER_CLEAR: "weather/clear",
    WEATHER_LOAD: "weather/load",
    WEATHER_ERROR: "weather/error"
};

const clearData = (): ClearAction => ({
    type: weatherActionType.WEATHER_CLEAR
});

export const errorData = (error:mixed): ErrorAction => ({
    type: weatherActionType.WEATHER_ERROR,
    payload: error
});

const loadData = (response: WeatherResponse): LoadAction => ({
    type: weatherActionType.WEATHER_LOAD,
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
    return (dispatch) => {
        dispatch(clearData());
        axios(`http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}`)
            .then(response => dispatch(loadData(response)))
            .catch(error => dispatch(errorData(error.message)));
    };
}