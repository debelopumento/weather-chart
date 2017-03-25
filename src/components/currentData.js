import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionIndex'
import reactCSS from 'reactcss'

const styles = reactCSS({
  default: {
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

const { object, func } = PropTypes

class CurrentData extends PureComponent {

  static PropTypes = {
    todaysSummary: object,
    loadTodaysSummary: func.isRequired,
  }

  static defaultProps = {
    todaysSummary: {},
  }

  componentWillMount() {
    this.props.loadTodaysSummary()
  }

  render() {
    const { todaysSummary } = this.props
    if(todaysSummary !== null) {
        
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
        const yyyy =today.getYear()
        const todaysDate = `${mm}-${dd}-${yyyy}`
      
        return (    
          <div style={ styles.currentData }>
            <div>
              <h2>{todaysDate}</h2>
              <h1 style={ styles.temperatureText }>{todaysSummary.forecast.simpleforecast.forecastday[0].high.fahrenheit}</h1>
              <h1 style={ styles.temperatureText }>{todaysSummary.forecast.simpleforecast.forecastday[0].low.fahrenheit}</h1>
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
  }),
  {
    loadTodaysSummary: actions.getTodaysSummary
  }
)(CurrentData) 

