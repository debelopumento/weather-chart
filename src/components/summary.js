import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'

const styles = reactCSS({
  default: {
    historyData: {
      float: 'right',
      width: '49.8%',
      marginBottom: 0,
      backgroundColor: '#3ed3c7',
      height: 240,
    },
    currentData: {
      float: 'left',
      width: '49.8%',
      marginBottom: 0,
      backgroundColor: '#ef4856',
      height: 240,
    },
    temperatureText: {
      fontSize: 50,
      marginBottom: 10,
      marginTop: 2,
    },

  }
})

const { number, object } = PropTypes

class Summary extends PureComponent {

  static PropTypes = {
    todaysSummary: object,
    historyData: object,
    historyYear: number,
  }

  static defaultProps = {
    todaysSummary: {},
    historyData: {},
    historyYear: 1977
  }

  render() {
    
    const { type, todaysSummary, historyData, historyYear } = this.props
    const data = type === 'current' ? todaysSummary : historyData
  
    //time, start and end point of the timeline        
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    const yyyy = type === 'current' ? '2017' : historyYear
    const todaysDate = `${mm}-${dd}-${yyyy}`

    if(data !== null) {        
        const maxTemperature = type === 'history' ? 
            historyData.todayInHistory.history.dailysummary[0].maxtempi : 
            todaysSummary.forecast.simpleforecast.forecastday[0].high.fahrenheit
        const minTemperature = type === 'history' ? 
            historyData.todayInHistory.history.dailysummary[0].mintempi : 
            todaysSummary.forecast.simpleforecast.forecastday[0].low.fahrenheit
        return (    
          <div style={ type === 'current' ? styles.currentData : styles.historyData }>
            <div>
              <h2>{todaysDate}</h2>
              <h1 style={ styles.temperatureText }>{maxTemperature}</h1>
              <h1 style={ styles.temperatureText }>{minTemperature}</h1>
            </div>
          </div>
        )
      }  
      
      return (    
        <div />
      )
  }
}

export default connect(
  storeState => ({
    todaysSummary: storeState.todaysSummary,
    historyData: storeState.historyWeather,
    historyYear: storeState.historyYear,
  })
  
)(Summary) 

