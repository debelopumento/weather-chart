import axios from 'axios'

const APIkey = 'c905350f371fe191'

export const GET_TODAYS_SUMMARY = 'GET_TODAYS_SUMMARY'
export const getTodaysSummary = () => {
    return function(dispatch) {
        axios.get(`http://api.wunderground.com/api/${APIkey}/forecast/q/CA/San_Francisco.json`)
        .then(function(res) {
            dispatch({
                type: GET_TODAYS_SUMMARY,
                payload: res.data
            })
        })
        .catch((e) => {console.error(413, 'Error: ', e)})
    }
}


export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER'
export const getCurrentWeather = () => {
	return function(dispatch) {
        axios.get(`http://api.wunderground.com/api/${APIkey}/hourly/q/CA/San_Francisco.json`)
      	.then(function(res) {
            dispatch({
        		type: GET_CURRENT_WEATHER,
        		payload: res.data
        	})
    	})
    	.catch((e) => {console.error(412, 'Error: ', e)})
	}
}

export const GET_HISTORY_WEATHER = 'GET_HISTORY_WEATHER'
export const getHistoryWeather = (year) => {
    return function(dispatch) {
        const todaysMonth = (new Date()).getMonth() + 1
        const todaysDate = (new Date()).getDate()
        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        const tomorrowsMonth = (new Date(tomorrow)).getMonth() + 1
        const tomorrowsDate = (new Date(tomorrow)).getDate()
        const getMonthString = (month) => {
            let formatedMonth = ''
            if (month < 10) {
                formatedMonth = '0' + month
            } else {
                formatedMonth = month.toString()
            }
            return formatedMonth
        }
        const getDateString = (date) => {
            let formatedDate = ''
            if (date < 10) {
                formatedDate = '0' + date
            } else {
                formatedDate = date.toString()
            }
            return formatedDate
        }
        //const year = '1957'        
        const todaysDateInHistory = year + getMonthString(todaysMonth) + getDateString(todaysDate)
        const tomorrowsDateInHistory = year + getMonthString(tomorrowsMonth) + getDateString(tomorrowsDate)
        axios.get(`http://api.wunderground.com/api/${APIkey}/history_${todaysDateInHistory}/q/CA/San_Francisco.json`)
        .then(function(resToday) {
            axios.get(`http://api.wunderground.com/api/${APIkey}/history_${tomorrowsDateInHistory}/q/CA/San_Francisco.json`)
            .then(function(resTomorrow) {
                const historyData = {
                    todayInHistory: resToday.data,
                    tomorrowInHistory: resTomorrow.data
                }
                dispatch({
                    type: GET_HISTORY_WEATHER,
                    payload: historyData
                })
            })
            
        })
        .catch((e) => {console.error(413, 'Error: ', e)})
    }
}


export const GO_TO_FOLLOWING_YEAR = 'GO_TO_FOLLOWING_YEAR'
export const gotoFollowingYear = (year) => {
    return function(dispatch) {
        const followingYear = year + 1
        console.log(71, followingYear)
        dispatch({
            type: GO_TO_FOLLOWING_YEAR,
            followingYear
        })
    }
}

export const GO_TO_TEN_YEARS_LATER = 'GO_TO_TEN_YEARS_LATER'
export const gotoTenYearsLater = (year) => {
    return function(dispatch) {
        const tenYearsLater = year + 10
        console.log(81, tenYearsLater)
        dispatch({
            type: GO_TO_TEN_YEARS_LATER,
            tenYearsLater
        })
    }
}
