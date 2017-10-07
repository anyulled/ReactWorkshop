//@flow
/**
 * Created by alrs on 11/07/2017.
 */
import axios from "axios";
import type {ActionType, ClearAction, ErrorAction, LoadAction, ThunkAction, WeatherResponse} from "../../types";

const WEATHER_API: string = "bfc079575bff7ec0b8e4a53770e35ec7";
export const weatherActionTypes: ActionType<string, string> = {
    WEATHER_CLEAR: "weather/clear",
    WEATHER_LOAD: "weather/load",
    WEATHER_ERROR: "weather/error"
};

//export type ActionType = $Keys<typeof weatherActionTypes>;

const clearData = (): ClearAction => ({
    type: weatherActionTypes.WEATHER_CLEAR
});

export const errorData = (error: string): ErrorAction => ({
    type: weatherActionTypes.WEATHER_ERROR,
    payload: error
});

const loadData = (response: WeatherResponse): LoadAction => ({
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