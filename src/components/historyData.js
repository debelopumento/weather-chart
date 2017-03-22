import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'

const styles = reactCSS({
  'default': {
    historyData: {
      float: 'right',
      width: '49.8%',
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

const { number, object } = PropTypes

class HistoryData extends PureComponent {

  static PropTypes = {
    historyData: object,
    historyYear: number,
  }

  static defaultProps = {
    historyData: {},
    historyYear: 1977
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
                
        const historyYear = this.props.historyYear
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
    historyYear: storeState.historyYear,
  })
)(HistoryData) 

