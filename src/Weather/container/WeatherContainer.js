/**
 * Created by alrs on 11/07/2017.
 */
// @flow
import {connect} from "react-redux";
import {errorData, loadWeatherData} from "../store/weatherActions";
import WeatherForeCast from "../components/WeatherForecast";

const mapStateToProps: Object = state => ({
    city: state.city,
    forecast: state.forecast,
    error: state.error,
    loading: state.loading,
    message: state.message
});

const mapDispatchToProps: Function = (dispatch: Function) => ({
    errorData: (error: Object) => {
        dispatch(errorData(error));
    },
    loadData: (latitude: number, longitude: number) => {
        dispatch(loadWeatherData(latitude, longitude));
    }
});

const WeatherContainer:Function = connect(mapStateToProps, mapDispatchToProps)(WeatherForeCast);
export default WeatherContainer;
