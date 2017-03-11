import {combineReducers} from 'redux'

const LocationReducer = (state="San_Francisco", action) => {
	return state
}

const StartPointReducer = (state=18, action) => {
	return state
}

const EndPointReducer = (state=22, action) => {
	return state
}

const allReducers = combineReducers({
	location: LocationReducer,
	startPoint: StartPointReducer,
	endPoint: EndPointReducer
})

export default allReducers