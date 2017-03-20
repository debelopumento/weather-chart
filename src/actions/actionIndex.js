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
        console.log(8)
        axios.get('http://api.wunderground.com/api/515155f28af51941/history_19560314/q/CA/San_Francisco.json')
        .then(function(res) {
            console.log(20, res)
            dispatch({
                type: GET_HISTORY_WEATHER,
                payload: res.data
            })
        })
        .catch((e) => {console.error(413, 'Error: ', e)})

    }
}