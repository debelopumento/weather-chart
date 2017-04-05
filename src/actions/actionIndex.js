import axios from 'axios';

const APIkey = 'c905350f371fe191';
//const APIkey = '4cee7476501d72b9'
//const APIkey = 'c51fd3bcf4353f9f';
const API_URL_BASE = '//api.wunderground.com/api/';
const state = 'CA';
const city = 'San_Francisco';

export const GET_TODAYS_SUMMARY = 'GET_TODAYS_SUMMARY';
export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER';

export const getCurrentWeather = () => {
    return dispatch => {
        const firstPromise = axios.get(
            `${API_URL_BASE}${APIkey}/forecast/q/${state}/${city}.json`
        );
        const secondPromise = axios.get(
            `${API_URL_BASE}${APIkey}/hourly/q/${state}/${city}.json`
        );

        Promise.all([firstPromise, secondPromise])
            .then(([res1, res2]) => {
                dispatch({
                    type: GET_CURRENT_WEATHER,
                    payload: res2.data,
                });
                dispatch({
                    type: GET_TODAYS_SUMMARY,
                    payload: res1.data,
                });
            })
            .catch(([e1, e2]) => {
                console.error(412, 'Error: ', [e1, e2]);
            });
    };
};

export const GET_HISTORY_WEATHER = 'GET_HISTORY_WEATHER';
export const getHistoryWeather = year =>
    dispatch => {
        const date = new Date();
        const todaysMonth = date.getMonth() + 1;
        const todaysDate = date.getDate();
        const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
        const tomorrowsMonth = new Date(tomorrow).getMonth() + 1;
        const tomorrowsDate = new Date(tomorrow).getDate();
        const formatDate = month => month < 10 ? `0${month}` : month.toString();
        const todaysDateInHistory = year +
            formatDate(todaysMonth) +
            formatDate(todaysDate);
        const tomorrowsDateInHistory = year +
            formatDate(tomorrowsMonth) +
            formatDate(tomorrowsDate);

        const getApiUrl = date =>
            `${API_URL_BASE}${APIkey}/history_${date}/q/${state}/${city}.json`;

        axios
            .get(getApiUrl(todaysDateInHistory))
            .then(resToday => {
                axios
                    .get(getApiUrl(tomorrowsDateInHistory))
                    .then(resTomorrow => {
                        const historyData = {
                            todayInHistory: resToday.data,
                            tomorrowInHistory: resTomorrow.data,
                        };
                        dispatch({
                            type: GET_HISTORY_WEATHER,
                            payload: historyData,
                        });
                    });
            })
            .catch(e => {
                console.error(413, 'Error: ', e);
            });
    };

export const UPDATE_HISTORY_YEAR = 'UPDATE_HISTORY_YEAR';
export const updateHistoryYear = year => ({
    type: UPDATE_HISTORY_YEAR,
    historyYear: year,
});
