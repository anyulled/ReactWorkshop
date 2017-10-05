/**
 * Created by anyulled on 11/7/17.
 */
import weather from "./weatherReducer";
import {weatherActionTypes} from "./weatherActions";

describe("weather reducer", () => {
    const initialState = {
        loading: true,
        error: false,
        message: "",
        city: "",
        forecast: []

    };
    it("should return the initial state", () => {
        expect(weather(undefined, {})).toEqual(initialState);
    });
    it("should handle CLEAR WEATHER", () => {
        expect(weather({}, {
            type: weatherActionTypes.WEATHER_CLEAR
        })).toEqual(initialState);
    });
    it("should handle ERROR WEATHER", () => {
        expect(weather({}, {
            type: weatherActionTypes.WEATHER_ERROR,
            payload: "error message"
        })).toEqual({...initialState, message: "error message", error: true, loading: false});
    });
    it("should handle LOAD WEATHER", () => {
        expect(weather({}, {
            type: weatherActionTypes.WEATHER_LOAD,
            payload: {
                forecast: [1, 2, 3, 4, 5],
                city: "Valencia",
            }
        })).toEqual({
            ...initialState,
            forecast: [1, 2, 3, 4, 5],
            city: "Valencia",
            loading: false,
            error: false,
            message: ""
        });
    });
})
;