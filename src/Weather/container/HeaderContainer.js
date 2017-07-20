/**
 * Created by alrs on 11/07/2017.
 */
import {connect} from "react-redux";
import Header from "../components/Header";

const mapStateToProps = state => ({
    city: state.city
});

export default connect(mapStateToProps)(Header);