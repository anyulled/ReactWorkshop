import React, {Component} from "react";
import {Grid, PageHeader, Row, Col, Glyphicon} from "react-bootstrap";
import WeatherForecast from "./WeatherForecast";

class App extends Component {
    constructor() {
        super();
        this.state = {
            city: ""
        };
        this.modifyCity = this.modifyCity.bind(this);
    }

    modifyCity(city) {
        this.setState({
            city
        });
    }

    render() {
        return (
            <div>
                <PageHeader><Glyphicon glyph="grain"/> {this.state.city || "Weather App"  }</PageHeader>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <WeatherForecast modifyCity={this.modifyCity}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
