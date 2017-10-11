/**
 * Created by alrs on 11/07/2017.
 */
import {connect} from "react-redux";
import {clearData, errorData, loadWeatherDataByCityID, loadWeatherDataByLatLong} from "../store/weatherActions";
import WeatherForeCast from "../components/WeatherForecast";

const mapStateToProps = state => ({
    city: state.city,
    country: state.country,
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
        dispatch(loadWeatherDataByLatLong(latitude, longitude));
    },
    clearData: () => dispatch(clearData()),
    loadDataByCityId: (cityId) => {
        dispatch(loadWeatherDataByCityID(cityId));
    }
});

const WeatherContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherForeCast);
export default WeatherContainer;
