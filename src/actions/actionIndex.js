import axios from 'axios'


export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER'
export const getCurrentWeather = () => {
	return function(dispatch) {
        axios.get('http://api.wunderground.com/api/515155f28af51941/hourly/q/CA/San_Francisco.json')
      	.then(function(res) {
            console.log(19, res)
            dispatch({
        		type: GET_CURRENT_WEATHER,
        		payload: res.data
        	})
    	})
    	.catch((e) => {console.error(412, 'Error: ', e)})
	}
}

export const GET_HISTORY_WEATHER = 'GET_HISTORY_WEATHER'
export const getHistoryWeather = () => {
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
        const todaysDateInHistory = '1948' + getMonthString(todaysMonth) + getDateString(todaysDate)
        const tomorrowsDateInHistory = '1948' + getMonthString(tomorrowsMonth) + getDateString(tomorrowsDate)
        axios.get(`http://api.wunderground.com/api/515155f28af51941/history_${todaysDateInHistory}/q/CA/San_Francisco.json`)
        .then(function(resToday) {
            axios.get(`http://api.wunderground.com/api/515155f28af51941/history_${tomorrowsDateInHistory}/q/CA/San_Francisco.json`)
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