import React, {useEffect, useState} from "react";
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
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [selectedCityId, setSelectedCityId] = useState("");
    const [city, setCity] = useState("");
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        if (selectedCityId == null || selectedCityId === "") {
            currentLocationLoad();
        } else {
            loadCityById(selectedCityId);
        }
    }, [selectedCityId]);

    const clearData = event => {
        event.preventDefault();
        setLoading(false);
        setMessage("");
        setError(false);
        setForecast([]);
        setCity("");
        setSelectedCityId("");
    };

    const currentLocationLoad = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                loadCityByCoordinates(position.coords.latitude, position.coords.longitude);
                setSelectedCityId("");
                setLoading(false);
            }, error => {
                setLoading(false);
                setError(true);
                setMessage(error.message);
            });
        } else {
            setError(true);
            setMessage("Geo location disabled");
        }
    };

    const onChangeHandler = event => {
        const {target: {value: city}} = event;
        if (city !== "") {
            setSelectedCityId(city);
            loadCityById(city);
        }
    };

    const loadCityByCoordinates = (latitude, longitude) => {
        axios("http://api.openweathermap.org/data/2.5/forecast/daily", {
            params:
                {
                    units: "metric",
                    lang: "es",
                    lat: latitude,
                    lon: longitude,
                    appid: WEATHER_API
                }
        })
            .then(response => {
                modifyCity(response.data.city.name);
                processResponse(response);
            })
            .catch(error => {
                setLoading(false);
                setError(true);
                setMessage(error.message);
            });
    };

    const processResponse = response => {
        setLoading(false);
        setCity(response.data.city.name);
        setForecast(response.data.list.map(weather => (
            {
                icon: weather.weather[0].icon,
                date: weather.dt,
                description: weather.weather[0].description,
                minTemp: weather.temp.min,
                maxTemp: weather.temp.max,
                humidity: weather.humidity
            }))
        );
    };

    const loadCityById = cityId => {
        axios("http://api.openweathermap.org/data/2.5/forecast/daily", {
            params: {
                units: "metric",
                lang: "es",
                id: cityId,
                appid: WEATHER_API
            }
        }).then(response => {
            modifyCity(response.data.city.name);
            processResponse(response);
        }).catch(error => {
            setError(true);
            setMessage(error.message);
        });
    };

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

