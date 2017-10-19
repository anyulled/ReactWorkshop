import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import WeatherCard from "./WeatherCard";
import {
    Alert,
    Button,
    ButtonGroup,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Grid,
    ProgressBar,
    Row
} from "react-bootstrap";


const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";

class WeatherForecast extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            error: false,
            selectedCityId: "",
            message: "",
            city: "",
            forecast: []
        };
        this.currentLocationLoad = this.currentLocationLoad.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        this.currentLocationLoad();
    }

    clearData(event) {
        event.preventDefault();
        this.setState({
            loading: false,
            forecast: [],
            city: "",
            message: "",
            error: false,
            selectedCityId: ""
        });
    }

    currentLocationLoad() {
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
    }

    onChangeHandler(event) {
        const {target: {value: city}} = event;
        if (city !== "") {
            this.setState({selectedCityId: city});
            this.loadCityById(city);
        }
    }

    loadCityByCoordinates(latitude, longitude) {
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
    }

    processResponse(response) {
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
    }

    loadCityById(cityId) {
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
    }

    render() {
        const {state: {loading, city, forecast, error, message}, currentLocationLoad, onChangeHandler} = this;
        const LoadingComponent = () => loading ? <ProgressBar active now={100}/> : <h1>City
            <small>{city}</small>
        </h1>;
        return (<div>
            <LoadingComponent/>
            <Grid>
                <Row>
                    <Col xs={5}>
                        <ButtonGroup>
                            <Button bsStyle="primary" type="button" onClick={this.clearData}>Clear data</Button>
                            <Button bsStyle="info" type="button" onClick={currentLocationLoad}>Current Location
                                data</Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={7}>
                        <Form horizontal>
                            <FormGroup controlId="formControlsSelect">
                                <Col xs={3}><ControlLabel>Select City</ControlLabel></Col>
                                <Col xs={9}>
                                    <FormControl id="citySelect" componentClass="select" placeholder="select"
                                                 value={this.state.selectedCityId}
                                                 onChange={onChangeHandler}>
                                        <option value="">Select</option>
                                        <option value="360630">El Cairo</option>
                                        <option value="2643743">London</option>
                                        <option value="3128759">Barcelona</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
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

