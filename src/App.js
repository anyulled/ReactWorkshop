import React, {useState} from "react";
import {Col, Glyphicon, Grid, PageHeader, Row} from "react-bootstrap";
import WeatherForecast from "./WeatherForecast";

export default function App() {
    const [city, setCity] = useState("");

    const handleClick = city => setCity(city);

    return (
        <div>
            <PageHeader><Glyphicon glyph="grain"/> {city || "Weather App"}</PageHeader>
            <Grid>
                <Row>
                    <Col sm={12}>
                        <WeatherForecast modifyCity={handleClick}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}