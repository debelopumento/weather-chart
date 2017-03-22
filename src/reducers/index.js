import {combineReducers} from 'redux'

const LocationReducer = (state="San_Francisco", action) => {
    return state
}

const CurrentWeatherReducer = (state=null, action) => {
    switch (action.type) {
        case 'GET_CURRENT_WEATHER': {
            return action.payload
        }
        default: return state
    }

}

const HistoryWeatherReducer = (state=null, action) => {
    switch (action.type) {
        case 'GET_HISTORY_WEATHER': {
            return action.payload
        }
        default: return state
    }
}

const TodaysSummaryReducer = (state=null, action) => {
    switch (action.type) {
        case 'GET_TODAYS_SUMMARY': {
            return action.payload
        }
        default: return state
    }
}

const HistoryYearReducer = (state=1977, action) => {
    switch (action.type) {
        case 'GO_TO_FOLLOWING_YEAR': {
            console.log(32, action.followingYear)
            return action.followingYear
        }
        default: return state
    }
}

const allReducers = combineReducers({
    location: LocationReducer,
    historyYear: HistoryYearReducer,
    currentWeather: CurrentWeatherReducer,
    todaysSummary: TodaysSummaryReducer,
    historyWeather: HistoryWeatherReducer

})

export default allReducers
