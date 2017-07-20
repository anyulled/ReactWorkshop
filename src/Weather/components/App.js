import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import WeatherContainer from "../container/WeatherContainer";
import HeaderContainer from "../container/HeaderContainer";
import StatisticsContainer from "../container/StatisticsContainer";

class App extends Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <WeatherContainer/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} smOffset={3}>
                            <StatisticsContainer/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
