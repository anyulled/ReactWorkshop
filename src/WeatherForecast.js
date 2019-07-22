import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {Alert, Col, Grid, ProgressBar, Row} from "react-bootstrap";
import CityForm from "./CityForm";
import LocationButtonGroup from "./LocationButtonGroup";
import {ForecastCardList} from "./ForecastCardList";

const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";

class WeatherForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            selectedCityId: "",
            message: "",
            city: "",
            forecast: []
        };
    }

    componentDidMount() {
        this.currentLocationLoad();
    }

    clearData = event => {
        event.preventDefault();
        this.setState({
            loading: false,
            forecast: [],
            city: "",
            message: "",
            error: false,
            selectedCityId: ""
        });
    };

    currentLocationLoad = () => {
        this.setState({loading: true});
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.loadCityByCoordinates(position.coords.latitude, position.coords.longitude);
                this.setState({selectedCityId: "", loading: false});
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
                message: "Geo location disabled"
            });
        }
    };

    onChangeHandler = event => {
        const {target: {value: city}} = event;
        if (city !== "") {
            this.setState({selectedCityId: city});
            this.loadCityById(city);
        }
    };

    loadCityByCoordinates = (latitude, longitude) => {
        axios("http://api.openweathermap.org/data/2.5/forecast/daily",
            {
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
                this.props.modifyCity(response.data.city.name);
                this.processResponse(response);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: true,
                    message: error.message
                });
            });
    };

    processResponse = response => {
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
    };

    loadCityById = cityId => {
        axios("http://api.openweathermap.org/data/2.5/forecast/daily", {
            params: {
                units: "metric",
                lang: "es",
                id: cityId,
                appid: WEATHER_API
            }
        }).then(response => {
            this.props.modifyCity(response.data.city.name);
            this.processResponse(response);
        })
            .catch(error => this.setState({
                error: true,
                message: error.message
            }));
    };

    render() {
        const {state: {loading, city, forecast, error, message}, currentLocationLoad, onChangeHandler} = this;
        const LoadingComponent = () => loading ? <ProgressBar active now={100}/> : <h1>City <small>{city}</small></h1>;
        return (<div>
            <LoadingComponent/>
            <Grid>
                <Row>
                    <Col xs={5}>
                        <LocationButtonGroup clearDataHandler={this.clearData} currentLocationHandler={currentLocationLoad}/>
                    </Col>
                    <Col xs={7}>
                        <CityForm value={this.state.selectedCityId} onChange={onChangeHandler}/>
                    </Col>
                </Row>
            </Grid>
            <ForecastCardList forecast={forecast} />
            {error && this.state.message && <Alert bsStyle="danger">{message}</Alert>}
        </div>);
    }
}

WeatherForecast.propTypes = {
    modifyCity: PropTypes.func.isRequired
};

export default WeatherForecast;

