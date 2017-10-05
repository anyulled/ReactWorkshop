// @flow
/**
 * Created by alrs on 11/07/2017.
 */

export const weatherActionType: Object = {
    WEATHER_CLEAR: "weather/clear",
    WEATHER_LOAD: "weather/load",
    WEATHER_ERROR: "weather/error"
};

export type Action = {
    +type: (weatherActionType.WEATHER_CLEAR | weatherActionType.WEATHER_LOAD | weatherActionType.WEATHER_ERROR),
    +payload?: string | ForecastType
};

export type State = Array<mixed>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type PromiseAction = Promise<Action>;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type ForecastType = {
    city: string,
    forecast: Array<{
        icon: string,
        date: Date,
        description: string,
        minTemp: number,
        maxTemp: number,
        humidity: number
    }>};

    //const WEATHER_API: string = "bfc079575bff7ec0b8e4a53770e35ec7";

    const clearData = (): Action => ({
        type: weatherActionType.WEATHER_CLEAR
    });

    export const errorData = (error: string): Action => ({
        type: weatherActionType.WEATHER_ERROR,
        payload: error
    });

    const loadData = (response: Object): Action => ({
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
    return (dispatch: Function) => {
    dispatch(clearData());
    axios(`http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&lat=${
    latitude
}
&lon=$
{
    longitude
}
&appid=$
{
    WEATHER_API
}
`)
    .then(response => dispatch(loadData(response)))
    .catch(error => dispatch(errorData(error.message)));
    };
    }