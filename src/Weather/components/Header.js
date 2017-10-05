// @flow
/**
 * Created by alrs on 11/07/2017.
 */
import * as React from "react";
import PropTypes from "prop-types";
import {PageHeader, Glyphicon} from "react-bootstrap";

type Props = {
    city:string
};

class Header extends React.Component<Props> {
    render(): React.Node {
        const {props: {city}} = this;
        return (<PageHeader><Glyphicon glyph="grain"/> {city || "Weather App" }</PageHeader>);
    }
}
Header.propTypes = {
    city: PropTypes.string.isRequired
};

export default Header;