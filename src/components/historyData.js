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
    container: {
      float: 'top',
    },
    temperatureText: {
      fontSize: 50,
      marginBottom: 10,
      marginTop: 2,
    },
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

  render() {

    if(this.props.historyData !== null) {
        
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
        const yyyy = this.props.historyYear
        const todaysDateInHistory = `${mm}-${dd}-${yyyy}`
        const minTemperature = this.props.historyData.todayInHistory.history.dailysummary[0].mintempi
        const maxTemperature = this.props.historyData.todayInHistory.history.dailysummary[0].maxtempi
        return (    
          <div style={ styles.historyData }>
            <div style={ styles.container }>
              <h2>{todaysDateInHistory}</h2>
              <h1 style={ styles.temperatureText }>{maxTemperature}</h1>
              <h1 style={ styles.temperatureText }>{minTemperature}</h1>
            </div>
          </div>
        )
      }

      return (    
        <div>
          
        </div>
      )
  }
}

export default connect(
  storeState => ({
    historyData: storeState.historyWeather,
    historyYear: storeState.historyYear,
  })
)(HistoryData) 

