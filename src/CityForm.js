import {Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

const CityForm = props => <Form horizontal>
    <FormGroup controlId="formControlsSelect">
        <Col xs={3}><ControlLabel>Select City</ControlLabel></Col>
        <Col xs={9}>
            <FormControl id="citySelect" componentClass="select" placeholder="select" value={props.value} onChange={props.onChange}>
                <option value="">Select</option>
                <option value="360630">El Cairo</option>
                <option value="2643743">London</option>
                <option value="3128759">Barcelona</option>
                <option value="3646738">Caracas</option>
            </FormControl>
        </Col>
    </FormGroup>
</Form>;
export default CityForm;

CityForm.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.any.isRequired
};