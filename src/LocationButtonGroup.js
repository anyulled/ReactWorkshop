import {Button, ButtonGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

export function LocationButtonGroup(props) {
    return <ButtonGroup>
        <Button bsStyle="primary" type="button" onClick={props.clearDataHandler}>Clear data</Button>
        <Button bsStyle="info" type="button" onClick={props.currentLocationHandler}>Current Location
            data</Button>
    </ButtonGroup>;
}

LocationButtonGroup.propTypes = {
    clearDataHandler: PropTypes.func.isRequired,
    currentLocationHandler: PropTypes.any.isRequired
};