/**
 * Created by alrs on 11/07/2017.
 */
import {connect} from "react-redux";
import Statistics from "../Statistics";

const mapReduce = (array, searchValue) => {
    return array.map(r => r.description.indexOf(searchValue) === 0 ? 1 : 0)
        .reduce((acc, current) => acc + current, 0)
};

const mapStateToProps = state => {
    console.log(mapReduce(state.forecast, "cielo claro"));
    return {
        loading: state.loading,
        error: state.error,
        sunnyDays: mapReduce(state.forecast, "cielo claro"),
        rainyDays: mapReduce(state.forecast, "lluvia ligera")
    }
};

export default connect(mapStateToProps)(Statistics);