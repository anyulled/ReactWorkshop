/**
 * Created by alrs on 11/07/2017.
 */
import React from "react";
import PropTypes from "prop-types";
import {PageHeader, Glyphicon} from "react-bootstrap";

class Header extends React.Component {
    render() {
        const {props: {city}} = this;
        return (<PageHeader><Glyphicon glyph="grain"/> {city || "Weather App" }</PageHeader>);
    }
}
Header.propTypes = {
    city: PropTypes.string
};

export default Header;