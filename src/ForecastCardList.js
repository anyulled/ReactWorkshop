import {Col, Grid, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import WeatherCard from "./WeatherCard";

export function ForecastCardList(props) {

    return <>{props.forecast.length > 0 && <Grid><Row>{props.forecast.map((date, index) => (
        <Col key={index} sm={index === 0 ? 6 : 3}><WeatherCard weather={date}/></Col>))}</Row></Grid>}</>;
}

ForecastCardList.propTypes = {
    forecast: PropTypes.arrayOf(PropTypes.shape(
        {date: PropTypes.object.isRequired}
    )).isRequired
};