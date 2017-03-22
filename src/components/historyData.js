import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'

const styles = reactCSS({
  'default': {
    historyData: {
      float: 'left',
      width: '49.5%',
      marginBottom: '0',
      backgroundColor: '#3ed3c7',
    },
    temperatureText: {
      fontSize: '50px',
      marginBottom: '20px',
      marginTop: '5px',
    }
  }
})

const { object } = PropTypes

class HistoryData extends PureComponent {

  static PropTypes = {
    historyData: object,
  }

  static defaultProps = {
    historyData: {},
  }

  componentWillMount() {
  }

  render() {

    if(this.props.historyData != null) {
        
        //time, start and end point of the timeline
        const now = new Date()
        let today = now
        today.setDate(now.getDate() - 0.29166666)
        today = today.toISOString().slice(0, 19)
        let tomorrow = now
        tomorrow.setDate(now.getDate() + 1)
        tomorrow = tomorrow.toISOString().slice(0, 19)
        const todayStartHour = Number(today.slice(11, 13)) + 1
        let tomorrowEndHour = 0
        if (todayStartHour >= 1) {
          tomorrowEndHour = todayStartHour - 1
        } else {
          tomorrowEndHour = 23
        }

        console.log(1, now, 2, today, 3, tomorrow, 4, todayStartHour, 5, tomorrowEndHour)
        
        const historyYear = '1957'
        const todaysDateInHistory = today.slice(5, 7) + '-' + today.slice(8, 10) + '-' + historyYear

        return (    
          <div style={ styles.historyData }>
            <h2>{todaysDateInHistory}</h2>
            <h1 style={ styles.temperatureText }>{this.props.historyData.todayInHistory.history.dailysummary[0].maxtempi}</h1>
            <h1 style={ styles.temperatureText }>{this.props.historyData.todayInHistory.history.dailysummary[0].mintempi}</h1>
          </div>
        )
      } else {
          return (    
            <div>
              
            </div>
          )
        }
  }
}

export default connect(
  storeState => ({
    historyData: storeState.historyWeather,
  })
)(HistoryData) 

