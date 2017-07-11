import React from "react";
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.props.loadData(position.coords.latitude, position.coords.longitude);
            }, error => {
                this.props.errorData(error.message);
            });
        } else {
            this.props.errorData("Geo-location Disabled");
        }
    }

    render() {
        const {props: {loading, city, forecast, error, message}} = this;
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
    loadData: PropTypes.func.isRequired
};

export default WeatherForecast;

