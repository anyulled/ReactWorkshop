import {Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import {cities} from "./constants";

const CityForm = props => <Form horizontal>
    <FormGroup>
        <Col xs={3}><ControlLabel>Select City</ControlLabel></Col>
        <Col xs={9}>
            <FormControl id="citySelect" componentClass="select" placeholder="select" value={props.value} onChange={props.onChange}>
                <option value="">Select</option>
                {cities && cities.map(city => <option key={city.value} value={city.value}>{city.name}</option>)}
            </FormControl>
        </Col>
    </FormGroup>
</Form>;
export default CityForm;

CityForm.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.any.isRequired
};