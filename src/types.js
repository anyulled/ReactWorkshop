//@flow
//Custom types
export type ActionType<T, K> = { [T]: K };

//Redux types
export type ClearAction = {| +type: string |};
export type LoadAction = {| +type: string, +payload: ForecastType |};
export type ErrorAction = {| +type: string, +payload: string |};
export type Action = (ClearAction | LoadAction | ErrorAction);
export type State = {
    +loading: boolean,
    +error: boolean,
    +message: string,
    +city: string,
    +forecast: Array<ForecastDetail> | void
};
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type PromiseAction = Promise<Action>;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

//Forecast
export type ForecastType = {
    city: string,
    forecast: Array<ForecastDetail>
};

export type ForecastDetail = {
    icon: string,
    date: Date,
    description: string,
    minTemp: number,
    maxTemp: number,
    humidity: number
};

export type WeatherResponse = {
    data: {
        city: {
            name: string
        },
        list: Array<{
            weather: Array<{
                description: string,
                icon: string
            }>,
            dt: Date,
            humidity: number,
            temp: {
                min: number,
                max: number
            },
        }>,
    }
};