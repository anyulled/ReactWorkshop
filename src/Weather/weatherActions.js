/**
 * Created by alrs on 11/07/2017.
 */
import axios from "axios";
const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";
export const weatherActionType = {
    WEATHER_CLEAR: "weather/clear",
    WEATHER_LOAD: "weather/load",
    WEATHER_ERROR: "weather/error"
};

const clearData = () => {
    return {
        type: weatherActionType.WEATHER_CLEAR
    }
};

export const errorData = (error) => {
    return {
        type: weatherActionType.WEATHER_ERROR,
        payload: error
    }
};

const loadData = (response) => {
    return {
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
    };
};

export function loadWeatherData(latitude, longitude) {
    return (dispatch) => {
        console.info("clearing data");
        dispatch(clearData());
        console.info("loading data");
        axios(`http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}`).then(
            response => dispatch(loadData(response))
        );
    }
}