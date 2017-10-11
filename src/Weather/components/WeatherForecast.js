import React from "react";
import PropTypes from "prop-types";

import WeatherCard from "./WeatherCard";
import {Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, ProgressBar, Row} from "react-bootstrap";

class WeatherForecast extends React.Component {
    constructor() {
        super();
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.currentLocationLoad = this.currentLocationLoad.bind(this);
    }

    componentDidMount() {
        this.currentLocationLoad();
    }

    onChangeHandler(event) {
        this.props.loadDataByCityId(event.target.value);
    }

    currentLocationLoad() {
        const {props: {loadData, errorData}} = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                loadData(position.coords.latitude, position.coords.longitude);
            }, error => {
                errorData(error.message);
            });
        } else {
            errorData("Geo-location Disabled");
        }
    }

    render() {
        const {props: {loading, city, country, forecast, error, message, clearData}, onChangeHandler, currentLocationLoad} = this;
        const LoadingComponent = () => loading ? <ProgressBar active now={100}/> : <h1>City
            <small>{city}, {country}</small>
        </h1>;
        return (<div>
            <LoadingComponent/>
            <Grid>
                <Row>
                    <Col xs={5}>
                        <Button bsStyle="primary" type="button" onClick={clearData}>Clear data</Button>
                        <Button bsStyle="info" type="button" onClick={currentLocationLoad}>Current Location data</Button>
                    </Col>
                    <Col xs={7}>
                        <Form horizontal>
                            <FormGroup controlId="formControlsSelect">
                                <Col xs={3}><ControlLabel>Select City</ControlLabel></Col>
                                <Col xs={9}>
                                    <FormControl componentClass="select" placeholder="select" onChange={onChangeHandler}>
                                        <option value="select">select</option>
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
            {error && message && <Alert bsStyle="danger">{message}</Alert>}
        </div>);
    }
}

WeatherForecast.propTypes = {
    city: PropTypes.string,
    clearData: PropTypes.func.isRequired,
    country: PropTypes.string,
    error: PropTypes.bool,
    errorData: PropTypes.func.isRequired,
    forecast: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.number,
        description: PropTypes.string,
        humidity: PropTypes.number,
        icon: PropTypes.string,
        maxTemp: PropTypes.number,
        minTemp: PropTypes.number
    })),
    loadData: PropTypes.func.isRequired,
    loadDataByCityId: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    message: PropTypes.string
};

WeatherForecast.defaultProps = {
    loading: false,
    city: "No City",
    country: "No Country",
    error: false,
    message: "",
    forecast: []
};

export default WeatherForecast;

