/**
 * Created by alrs on 11/07/2017.
 */
import {connect} from "react-redux";
import {loadWeatherData, errorData} from "./weatherActions";
import WeatherForeCast from "../WeatherForecast";

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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForeCast);