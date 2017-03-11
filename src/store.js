import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import allReducers from "./reducers"

const middleware = applyMiddleware(promise(), thunk, logger())



export default createStore(allReducers, middleware)
