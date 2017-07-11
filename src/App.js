import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import WeatherContainer from "./Weather/weatherContainer";
import HeaderContainer from "./Weather/HeaderContainer";

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
                </Grid>
            </div>
        );
    }
}

export default App;
