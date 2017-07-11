import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import WeatherCard from "./WeatherCard";
import {Alert, ProgressBar, Grid, Row, Col} from "react-bootstrap";

class WeatherForecast extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            error: false,
            message: "",
            city: "",
            forecast: []
        };
    }

    componentDidMount() {
        const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                axios(`http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${WEATHER_API}`)
                    .then(response => {
                        this.props.modifyCity(response.data.city.name);
                        this.setState({
                            loading: false,
                            city: response.data.city.name,
                            forecast: response.data.list.map(weather => ({
                                icon: weather.weather[0].icon,
                                date: weather.dt,
                                description: weather.weather[0].description,
                                minTemp: weather.temp.min,
                                maxTemp: weather.temp.max,
                                humidity: weather.humidity
                            }))
                        });
                    })
                    .catch(error => {
                        this.setState({
                            error: true,
                            message: error.message
                        });
                    });

            }, error => {
                this.setState({
                    loading: false,
                    error: true,
                    message: error.message
                });
            });
        } else {
            this.setState({
                error: true,
                message: "Geolocation disabled"
            });
        }
    }

    render() {
        const {state: {loading, city, forecast, error, message}} = this;
        const LoadingComponent = () => loading ? <ProgressBar active now={100}/> : <h1>City
            <small>{city}</small>
        </h1>;
        return (<div>
            <LoadingComponent/>
            {forecast.length > 0 && <Grid><Row>{forecast.map((date, index) => (
                <Col key={index} sm={index === 0 ? 6 : 3}><WeatherCard weather={date}/></Col>))}</Row></Grid>}
            {error && this.state.message && <Alert bsStyle="danger">{message}</Alert>}
        </div>);
    }
}

WeatherForecast.propTypes = {
    modifyCity: PropTypes.func.isRequired
};

export default WeatherForecast;

