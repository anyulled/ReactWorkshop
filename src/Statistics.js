import React from "react";
import PropTypes from "prop-types";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class Statistics extends React.Component {
    render() {
        const {props: {rainyDays, sunnyDays, loading, error}} = this;
        return (!loading && !error && <ListGroup>
            <ListGroupItem bsStyle="warning"><strong>Sunny Days:</strong> {sunnyDays}</ListGroupItem>
            <ListGroupItem bsStyle="info"><strong>Rainy Days:</strong> {rainyDays}</ListGroupItem>
        </ListGroup>);
    }
}
Statistics.propTypes = {
    rainyDays: PropTypes.number,
    sunnyDays: PropTypes.number
};

Statistics.defaultProps = {
    rainyDays: 0,
    sunnyDays: 0
};

export default Statistics;