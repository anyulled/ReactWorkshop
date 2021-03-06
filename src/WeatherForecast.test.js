import WeatherForecast from "./WeatherForecast";
import {configure, shallow} from "enzyme";
import sinon from "sinon";
import React from "react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Adapter from "enzyme-adapter-react-16";

describe("weather forecast", () => {
    const serviceResponse = {
        "city": {
            "id": 6295630,
            "name": "Earth",
            "coord": {
                "lon": 0,
                "lat": 0
            },
            "country": "",
            "population": 2147483647
        },
        "cod": "200",
        "message": 0.1164634,
        "cnt": 7,
        "list": [
            {
                "dt": 1508238000,
                "temp": {
                    "day": 26.19,
                    "min": 25.96,
                    "max": 26.27,
                    "night": 26.15,
                    "eve": 26.26,
                    "morn": 25.96
                },
                "pressure": 1028.15,
                "humidity": 100,
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "cielo claro",
                        "icon": "01d"
                    }
                ],
                "speed": 2.96,
                "deg": 213,
                "clouds": 0
            },
            {
                "dt": 1508324400,
                "temp": {
                    "day": 25.94,
                    "min": 25.72,
                    "max": 26.05,
                    "night": 25.72,
                    "eve": 26.05,
                    "morn": 25.97
                },
                "pressure": 1027.72,
                "humidity": 100,
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "nubes",
                        "icon": "04d"
                    }
                ],
                "speed": 5.78,
                "deg": 216,
                "clouds": 88
            },
            {
                "dt": 1508410800,
                "temp": {
                    "day": 25.87,
                    "min": 25.81,
                    "max": 26.05,
                    "night": 25.81,
                    "eve": 25.92,
                    "morn": 26.05
                },
                "pressure": 1027.73,
                "humidity": 100,
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "nubes",
                        "icon": "04d"
                    }
                ],
                "speed": 6.71,
                "deg": 218,
                "clouds": 92
            },
            {
                "dt": 1508497200,
                "temp": {
                    "day": 25.79,
                    "min": 25.56,
                    "max": 25.79,
                    "night": 25.69,
                    "eve": 25.56,
                    "morn": 25.69
                },
                "pressure": 1028.61,
                "humidity": 0,
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "lluvia ligera",
                        "icon": "10d"
                    }
                ],
                "speed": 2.38,
                "deg": 180,
                "clouds": 23,
                "rain": 2.45
            },
            {
                "dt": 1508583600,
                "temp": {
                    "day": 25.61,
                    "min": 25.61,
                    "max": 25.89,
                    "night": 25.89,
                    "eve": 25.65,
                    "morn": 25.71
                },
                "pressure": 1028.22,
                "humidity": 0,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "lluvia moderada",
                        "icon": "10d"
                    }
                ],
                "speed": 4.64,
                "deg": 157,
                "clouds": 37,
                "rain": 5.38
            },
            {
                "dt": 1508670000,
                "temp": {
                    "day": 25.93,
                    "min": 25.64,
                    "max": 26.01,
                    "night": 25.84,
                    "eve": 26.01,
                    "morn": 25.64
                },
                "pressure": 1027.93,
                "humidity": 0,
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "lluvia ligera",
                        "icon": "10d"
                    }
                ],
                "speed": 5,
                "deg": 144,
                "clouds": 37,
                "rain": 2.07
            },
            {
                "dt": 1508756400,
                "temp": {
                    "day": 25.85,
                    "min": 25.57,
                    "max": 25.85,
                    "night": 25.57,
                    "eve": 25.76,
                    "morn": 25.71
                },
                "pressure": 1026.91,
                "humidity": 0,
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "lluvia ligera",
                        "icon": "10d"
                    }
                ],
                "speed": 3.78,
                "deg": 169,
                "clouds": 21,
                "rain": 2.82
            }
        ]
    };
    const modifyCity = sinon.spy();
    const mock = new MockAdapter(axios);

    beforeAll(() => {
        configure({adapter: new Adapter()});
        mock
            .onGet("http://api.openweathermap.org/data/2.5/forecast/daily")
            .reply(200, serviceResponse);
    });

    it("should mount correctly", () => {
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        expect(wrapper.find("Grid").length).toBe(1);
    });

    it("should load a city by id", (done) => {
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        const event = {target: {name: "", value: 360630}};
        wrapper.find("#citySelect").simulate("change", event);
        setTimeout(() => {
            expect(wrapper.state("selectedCityId")).toBe(360630);
            expect(wrapper.state("forecast").length).toEqual(7);
            done();
        }, 50);
    });

    it("should display a set of forecast cards, given lat long API request", (done) => {
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        wrapper.instance().loadCityByCoordinates(0, 0);
        setTimeout(() => {
            expect(wrapper.state("forecast").length).toBe(7);
            done();
        }, 50);
    });

    it("should display an error message when load by id fails", (done) => {
        mock.reset();
        mock
            .onGet("http://api.openweathermap.org/data/2.5/forecast/daily")
            .replyOnce(500, {message: "Test"});
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        const event = {target: {name: "", value: 360630}};
        wrapper.find("#citySelect").simulate("change", event);
        setTimeout(() => {
            expect(wrapper.state("error")).toBe(true);
            expect(wrapper.state("message")).toContain("Request failed with status code 500");
            done();
        }, 500);
    });

    it("should display an error message, when Weather API fails", (done) => {
        mock.reset();
        mock
            .onGet("http://api.openweathermap.org/data/2.5/forecast/daily")
            .replyOnce(500, {message: "Test"});
        const wrapper = shallow(<WeatherForecast modifyCity={modifyCity}/>);
        wrapper.instance().loadCityByCoordinates(0, 0);
        setTimeout(() => {
            expect(wrapper.state("error")).toBe(true);
            expect(wrapper.state("message")).toContain("Request failed with status code 500");
            done();
        }, 50);
    });

});