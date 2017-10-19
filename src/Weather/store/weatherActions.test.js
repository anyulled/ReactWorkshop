/**
 * Created by anyulled on 11/7/17.
 */
import {errorData, loadWeatherData, weatherActionType} from "./weatherActions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe('actions', () => {
    it('should create an action to display an error message', () => {
        const text = 'Error Message';
        const expectedAction = {
            type: weatherActionType.WEATHER_ERROR,
            payload: text
        };
        expect(errorData(text)).toEqual(expectedAction);
    })
});

describe("async actions", () => {
    const mock = new MockAdapter(axios);
    const apiResponse = {
        "city": {
            "id": 2509954,
            "name": "Valencia",
            "coord": {"lon": -0.3774, "lat": 39.4697},
            "country": "ES",
            "population": 814208
        },
        "cod": "200",
        "message": 0.214762,
        "cnt": 7,
        "list": [{
            "dt": 1499774400,
            "temp": {"day": 26, "min": 21.11, "max": 26, "night": 21.11, "eve": 26, "morn": 26},
            "pressure": 988.88,
            "humidity": 74,
            "weather": [{"id": 800, "main": "Clear", "description": "cielo claro", "icon": "01n"}],
            "speed": 2.06,
            "deg": 90,
            "clouds": 0
        }, {
            "dt": 1499860800,
            "temp": {"day": 36.23, "min": 20.08, "max": 37.51, "night": 20.87, "eve": 35.41, "morn": 20.08},
            "pressure": 989.25,
            "humidity": 30,
            "weather": [{"id": 800, "main": "Clear", "description": "cielo claro", "icon": "01d"}],
            "speed": 1.86,
            "deg": 168,
            "clouds": 0
        }, {
            "dt": 1499947200,
            "temp": {"day": 32.71, "min": 20.15, "max": 33.8, "night": 20.85, "eve": 30.95, "morn": 20.15},
            "pressure": 990.65,
            "humidity": 40,
            "weather": [{"id": 800, "main": "Clear", "description": "cielo claro", "icon": "01d"}],
            "speed": 3.1,
            "deg": 128,
            "clouds": 0
        }, {
            "dt": 1500033600,
            "temp": {"day": 30.28, "min": 20.59, "max": 30.85, "night": 20.59, "eve": 29.19, "morn": 20.79},
            "pressure": 990.72,
            "humidity": 47,
            "weather": [{"id": 800, "main": "Clear", "description": "cielo claro", "icon": "02d"}],
            "speed": 3.32,
            "deg": 118,
            "clouds": 8
        }, {
            "dt": 1500120000,
            "temp": {"day": 26.21, "min": 23.17, "max": 26.21, "night": 23.17, "eve": 25.77, "morn": 23.34},
            "pressure": 1014.19,
            "humidity": 0,
            "weather": [{"id": 500, "main": "Rain", "description": "lluvia ligera", "icon": "10d"}],
            "speed": 2.98,
            "deg": 62,
            "clouds": 1,
            "rain": 0.32
        }, {
            "dt": 1500206400,
            "temp": {"day": 27.16, "min": 23.29, "max": 27.16, "night": 23.69, "eve": 26.93, "morn": 23.29},
            "pressure": 1015.44,
            "humidity": 0,
            "weather": [{"id": 800, "main": "Clear", "description": "cielo claro", "icon": "01d"}],
            "speed": 1.25,
            "deg": 136,
            "clouds": 0
        }, {
            "dt": 1500292800,
            "temp": {"day": 28.1, "min": 23.52, "max": 28.1, "night": 23.88, "eve": 27.15, "morn": 23.52},
            "pressure": 1010.52,
            "humidity": 0,
            "weather": [{"id": 800, "main": "Clear", "description": "cielo claro", "icon": "01d"}],
            "speed": 3.44,
            "deg": 173,
            "clouds": 0
        }]
    };
    mock
        .onGet("http://api.openweathermap.org/data/2.5/forecast/daily")
        .reply(200, apiResponse);

    it("should clear and load a list of forecast data", () => {

        const expectedActions = [
            {type: weatherActionType.WEATHER_CLEAR},
            {type: weatherActionType.WEATHER_LOAD, body: {humidity: 50}}
        ];
        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const store = mockStore({state: {}});
        store.dispatch(loadWeatherData(39.4711056, -0.3769074));
        setTimeout(() => {
            expect(store.getActions()).toEqual(expectedActions);
        }, 10);
    });
});