import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {Alert, Col, Grid, Row} from "react-bootstrap";
import CityForm from "./CityForm";
import LocationButtonGroup from "./LocationButtonGroup";
import ForecastCardList from "./ForecastCardList";
import LoadingComponent from "./LoadingComponent";
import {WEATHER_API} from "./constants";

const WeatherForecast = ({modifyCity}) => {

    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [city, setCity] = useState(null);
    const [forecast, setForecast] = useState([]);

    const clearData = event => {
        event.preventDefault();
        setLoading(false);
        setMessage(null);
        setError(false);
        setForecast(null);
        setCity(null);
        setPosition(null);
        setSelectedCityId(null);
    };

    const onChangeHandler = event => {
        const {target: {value: cityEvent}} = event;
        if (cityEvent !== "") {
            setSelectedCityId(cityEvent);
            setPosition(null);
        }
    };

    const processResponse = response => {
        setCity(response.data.city.name);
        return response.data.list.map(weather => (
            {
                icon: weather.weather[0].icon,
                date: weather.dt,
                description: weather.weather[0].description,
                minTemp: weather.temp.min,
                maxTemp: weather.temp.max,
                humidity: weather.humidity
            }));
    };

    const currentLocationLoad = useCallback(() => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoPosition => {
                setPosition(geoPosition);
                setSelectedCityId(null);
                setLoading(false);
            }, e => {
                setLoading(false);
                setError(true);
                setMessage(e.message);
            });
        } else {
            setError(true);
            setMessage("Geo location disabled");
        }
    }, []);

    useEffect(() => {
        const loadCityById = async () => {
            if (selectedCityId != null) {
                const response = await axios("http://api.openweathermap.org/data/2.5/forecast/daily",
                    {params: {units: "metric", lang: "es", id: selectedCityId, appid: WEATHER_API}}
                );
                modifyCity(city);
                setLoading(false);
                setForecast(processResponse(response));
            }
        };
        loadCityById();
    }, [selectedCityId, modifyCity, city]);

    useEffect(() => {
        const loadCityByCoordinates = async () => {
            if (position != null) {
                const response = await axios("http://api.openweathermap.org/data/2.5/forecast/daily",
                    {
                        params:
                            {
                                units: "metric",
                                lang: "es",
                                lat: position.coords.latitude,
                                lon: position.coords.longitude,
                                appid: WEATHER_API
                            }
                    });
                setLoading(false);
                modifyCity(city);
                setForecast(processResponse(response));
            }
        };
        loadCityByCoordinates();
    }, [position, modifyCity, city]);

    return <div>
        <LoadingComponent city={city} loading={loading}/>
        <Grid>
            <Row>
                <Col xs={5}>
                    <LocationButtonGroup clearDataHandler={clearData} currentLocationHandler={currentLocationLoad}/>
                </Col>
                <Col xs={7}>
                    <CityForm value={selectedCityId} onChange={onChangeHandler}/>
                </Col>
            </Row>
        </Grid>
        <ForecastCardList forecast={forecast}/>
        {error && message && <Alert bsStyle="danger">{message}</Alert>}
    </div>;
};

WeatherForecast.propTypes = {
    modifyCity: PropTypes.func.isRequired
};

export default WeatherForecast;

