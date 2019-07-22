import {ProgressBar} from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

const LoadingComponent = ({loading, city}) => loading ? <ProgressBar active now={100}/> : <h1>City <small>{city}</small></h1>;

LoadingComponent.propTypes = {
    city: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

export default LoadingComponent;