import React from "react";
import ReactDOM from "react-dom";
import WeatherCard from "./WeatherCard";

describe("WeatherCard", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<WeatherCard />, div);
    });
});

