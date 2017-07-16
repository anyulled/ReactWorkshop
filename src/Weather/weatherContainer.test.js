/**
 * Created by anyulled on 15/7/17.
 */
import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from "./weatherReducer";

import WeatherContainer from "./weatherContainer";
import WeatherForeCast from "../WeatherForecast";

describe("Weather Container", () => {
    let WrapperComponent,
        WrapperContainer,
        wrapper;
    const store = createStore(reducer, applyMiddleware(thunk));

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <WeatherContainer/>
            </Provider>
        );
        WrapperComponent = wrapper.find(WeatherContainer);
        WrapperContainer = WrapperComponent.find(WeatherForeCast);
    });

    it("should render Container and Component", () => {
        expect(WrapperContainer.length).toBeTruthy();
        expect(WrapperComponent.length).toBeTruthy();
    });
});
