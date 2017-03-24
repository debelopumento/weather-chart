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

    if(this.props.todaysSummary != null) {
        
        //time, start and end point of the timeline
        const now = new Date()
        let today = now
        today.setDate(now.getDate() - 0.29166666)
        today = today.toISOString().slice(0, 19)
              
        const currentYear = '2017'
        const todaysDate = today.slice(5, 7) + '-' + today.slice(8, 10) + '-' + currentYear
      
        return (    
          <div style={ styles.currentData }>
            <div style={ styles.container }>
              <h2>{todaysDate}</h2>
              <h1 style={ styles.temperatureText }>{this.props.todaysSummary.forecast.simpleforecast.forecastday[0].high.fahrenheit}</h1>
              <h1 style={ styles.temperatureText }>{this.props.todaysSummary.forecast.simpleforecast.forecastday[0].low.fahrenheit}</h1>
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
    todaysSummary: storeState.todaysSummary,
  }),
  {
    loadTodaysSummary: actions.getTodaysSummary
  }
)(CurrentData) 

