/**
 * Created by anyulled on 10/7/17.
 */
import React from "react";
import PropTypes from "prop-types";
import {Panel} from "react-bootstrap";

const WeatherCard = ({weather: {date, description, humidity, icon, maxTemp, minTemp}}) => {
    const dateRender = new Date(date * 1000);
    const title = (<span><img alt="forecast" height="32" src={`http://openweathermap.org/img/w/${icon}.png`}/>{`${dateRender.toLocaleDateString()}`}</span>);
    return <Panel header={title} bsStyle="info">
        <p><strong>Description</strong>: {`${description}`}</p>
        <p><strong>Minimum:</strong> {`${minTemp}º C`}</p>
        <p><strong>Maximum:</strong> {`${maxTemp}º C`}</p>
        <p><strong>Humidity:</strong> {`${humidity}%`}</p>
    </Panel>;
};

WeatherCard.propTypes = {
    weather: PropTypes.shape({
        icon: PropTypes.string,
        date: PropTypes.number,
        description: PropTypes.string,
        minTemp: PropTypes.number,
        maxTemp: PropTypes.number,
        humidity: PropTypes.number
    }).isRequired
};

WeatherCard.defaultProps = {
    weather: {
        icon: "",
        date: new Date(),
        description: "no description available",
        minTemp: 0,
        maxTemp: 99,
        humidity: 50
    }
};

export default WeatherCard;