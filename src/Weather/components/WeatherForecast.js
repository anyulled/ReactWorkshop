//@flow
import * as React from "react";
import PropTypes from "prop-types";

import WeatherCard from "./WeatherCard";
import {Alert, Col, Grid, ProgressBar, Row} from "react-bootstrap";

type Props = {
    +errorData: (message: string) => mixed,
    +loadData: (latitude: number, longitude: number) => mixed,
    +loading: boolean,
    +message: string,
    +error: boolean,
    +city: string,
    +forecast: Array<{
        icon: string,
        date: number,
        description: string,
        minTemp: number,
        maxTemp: number,
        humidity: number
    }>
};

class WeatherForecast extends React.Component<Props> {
    componentDidMount(): void {
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

    render(): React.Node {
        const {props: {loading, city, forecast, error, message}} = this;
        const LoadingComponent = (): React.Node => loading ? <ProgressBar active now={100}/> : <h1>City
            <small>{city}</small>
        </h1>;
        return (<div>
            <LoadingComponent/>
            {forecast.length > 0 && <Grid><Row>{forecast.map((date, index) => (
                <Col key={index} sm={index === 0 ? 6 : 3}><WeatherCard weather={date}/></Col>))}</Row></Grid>}
            {error && message && <Alert bsStyle="danger">{message}</Alert>}
        </div>);
    }
}

WeatherForecast.propTypes = {
    city: PropTypes.string,
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
    loading: PropTypes.bool,
    message: PropTypes.string
};

/*WeatherForecast.defaultProps = {
    loading:false,
    city:"No City",
    error:false,
    message:"",
    forecast:[]
};*/

export default WeatherForecast;

