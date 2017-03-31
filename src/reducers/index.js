import {combineReducers} from 'redux'

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

const HistoryYearReducer = (state=1967, action) => {
    switch (action.type) {
        case 'UPDATE_HISTORY_YEAR': {
            return action.historyYear
        }
        
        default: return state
    }
}

const allReducers = combineReducers({
    historyYear: HistoryYearReducer,
    currentWeather: CurrentWeatherReducer,
    todaysSummary: TodaysSummaryReducer,
    historyWeather: HistoryWeatherReducer
})

export default allReducers
