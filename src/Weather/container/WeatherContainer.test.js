/**
 * Created by anyulled on 15/7/17.
 */
import React from "react";
import {Provider} from "react-redux";
import {mount, configure} from "enzyme";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from "../store/weatherReducer";
import WeatherContainer from "./WeatherContainer";
import WeatherForeCast from "../components/WeatherForecast";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});
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
