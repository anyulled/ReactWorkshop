import React, {Component} from "react";
import {Col, Glyphicon, Grid, PageHeader, Row} from "react-bootstrap";
import WeatherForecast from "./WeatherForecast";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        };
    }

    modifyCity = city => {
        this.setState({
            city
        });
    };

    render() {
        return (
            <div>
                <PageHeader><Glyphicon glyph="grain"/> {this.state.city || "Weather App"}</PageHeader>
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
