/**
 * Created by alrs on 11/07/2017.
 */
import {connect} from "react-redux";
import {clearData, errorData, loadWeatherData} from "../store/weatherActions";
import WeatherForeCast from "../components/WeatherForecast";

const mapStateToProps = state => ({
    city: state.city,
    forecast: state.forecast,
    error: state.error,
    loading: state.loading,
    message: state.message
});

const mapDispatchToProps = dispatch => ({
    errorData: (error) => {
        dispatch(errorData(error));
    },
    loadData: (latitude, longitude) => {
        dispatch(loadWeatherData(latitude, longitude));
    },
    clearData: () => dispatch(clearData())
});

const WeatherContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherForeCast);
export default WeatherContainer;
