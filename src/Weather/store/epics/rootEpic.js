import {combineEpics} from "redux-observable";
import {errorData, loadData, loadedData, weatherActionType} from "../weatherActions";
import {Observable} from "rxjs";

const weatherLoadedEpic = action$ => (
    action$.ofType(weatherActionType.WEATHER_LOAD)
        .map(() => loadedData()));
const weatherFetchEpic = action$ => action$.ofType(weatherActionType.WEATHER_CLEAR)
    .switchMap(() => Observable.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&lat=10.18&lon=-70.08&appid=bfc079575bff7ec0b8e4a53770e35ec7",
        crossDomain: true,
        createXHR: function () {
            return new XMLHttpRequest();
        }
    }))
    .catch(error => errorData(error))
    .map(response => {
        console.log(response.response);//eslint-disable-line
        return loadData({data:response.response});
    })
;

export const rootEpic = combineEpics(weatherLoadedEpic, weatherFetchEpic);