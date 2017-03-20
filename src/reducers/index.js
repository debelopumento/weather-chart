import {combineReducers} from 'redux'

const LocationReducer = (state="San_Francisco", action) => {
    return state
}

const CurrentWeatherReducer = (state=null, action) => {
    switch (action.type) {
        case 'GET_CURRENT_WEATHER': {
            return action.payload
        }
    }

    return state
}

const HistoryWeatherReducer = (state=null, action) => {
    switch (action.type) {
        case 'GET_HISTORY_WEATHER': {
            return action.payload
        }
    }
    return state
}

const allReducers = combineReducers({
    location: LocationReducer,
    currentWeather: CurrentWeatherReducer,
    historyWeather: HistoryWeatherReducer
})

export default allReducers
