/**
 * Created by anyulled on 11/7/17.
 */
import {errorData, loadWeatherData, weatherActionType} from "./weatherActions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";
import nock from "nock";

axios.defaults.adapter = httpAdapter;

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

    it("should clear and load a list of forecast data", () => {
        const APIResponse = {
            "city": {"name": "Valencia"},
            "list": [
                {
                    "dt": new Date().getMilliseconds(),
                    "description": "cielo claro",
                    "humidity": 47,
                    "temp": {
                        min: 12,
                        max: 34
                    },
                    "weather": [
                        {"description": "Sunny", "icon": ""}
                    ]
                }
            ]
        };
        nock("http://api.openweathermap.org")
            .get("/data/2.5/forecast/daily")
            .query(true)
            .reply(200, APIResponse);
        const expectedActions = [
            {type: weatherActionType.WEATHER_CLEAR},
            {
                type: weatherActionType.WEATHER_LOAD,
                "payload": {
                    city: APIResponse.city.name,
                    forecast: APIResponse.list.map(response => ({
                        icon: response.weather[0].icon,
                        date: response.dt,
                        description: response.weather[0].description,
                        minTemp: response.temp.min,
                        maxTemp: response.temp.max,
                        humidity: response.humidity
                    }))
                }
            }
        ];
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({state: {}});
        return store.dispatch(loadWeatherData(39.4711056, -0.3769074))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});