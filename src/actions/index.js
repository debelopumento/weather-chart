import axios from 'axios'




export const UPDATE_CURRENT_WEATHER = 'UPDATE_CURRENT_WEATHER'
export const getCurrentWeather = () => {
	return function(dispatch) {
		console.log(7)
        axios.get('http://api.wunderground.com/api/515155f28af51941/hourly/q/CA/San_Francisco.json')
      	.then(function(res) {
        	console.log(3, res.data)
        	dispatch({
        		type: UPDATE_CURRENT_WEATHER,
        		payload: res.data
        	})
    	})
    	.catch((e) => {console.error('Error: ', e)})

	}
}