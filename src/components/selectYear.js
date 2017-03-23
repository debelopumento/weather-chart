import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionIndex'
import reactCSS from 'reactcss'
import store from '../store'

const styles = reactCSS({
  'default': {
    button: {
      color: 'orange',
      fontSize: '16px',
      padding: '15px',
    }
  }
})

const { object, func} = PropTypes

class SelectYear extends PureComponent {

  state = {
    historyYear: 1977
  }

  static PropTypes = {
    historyYear: object,
    goToFollowingYear: func,
    loadHistoryData: func,
  }

  static defaultProps = {
    historyYear: 1977,
  }

  validateYear = (year) => {
    console.log('yea?')
    if (year > 2016) {
      alert('Please select a year prior to 2017!')
      return false
    }
    else if (year < 1949) {
      alert('Please select a year later than 1949!')
      return false
    }
    else return true
  }

  gotoNextYear = () => {    
    const nextYear = this.state.historyYear + 1
    const valid = this.validateYear(nextYear)
    if (valid === true) {
      this.setState({historyYear: nextYear})
      store.dispatch({
          type: 'UPDATE_HISTORY_YEAR',
          historyYear: nextYear
      })
      this.props.loadHistoryData(nextYear)
    }
  }
  gotoTenYearsLater = () => {    
    const tenYearsLater = this.state.historyYear + 10
    const valid = this.validateYear(tenYearsLater)
    if (valid === true) {
      this.setState({historyYear: tenYearsLater})
      store.dispatch({
          type: 'UPDATE_HISTORY_YEAR',
          historyYear: tenYearsLater
      })
      this.props.loadHistoryData(tenYearsLater)
    }
  }
  gotoLastYear = () => {
    const lastYear = this.state.historyYear - 1
    const valid = this.validateYear(lastYear)
    if (valid === true) {
      this.setState({historyYear: lastYear})
      store.dispatch({
          type: 'UPDATE_HISTORY_YEAR',
          historyYear: lastYear
      })
      this.props.loadHistoryData(lastYear)
    }
  }
  gotoTenYearsAgo = () => {
    const tenYearsAgo = this.state.historyYear - 10
    const valid = this.validateYear(tenYearsAgo)
    if (valid === true) {
      this.setState({historyYear: tenYearsAgo})
      store.dispatch({
          type: 'UPDATE_HISTORY_YEAR',
          historyYear: tenYearsAgo
      })
      this.props.loadHistoryData(tenYearsAgo)
    }
  }

  render() {

    return (    
       <div>
        <span><input style={ styles.button } type='submit' value='<<<' onClick={this.gotoTenYearsAgo}/></span>
        <span><input style={ styles.button } type='submit' value='<' onClick={this.gotoLastYear}/></span>
        <span style={ styles.button }> {this.props.historyYear} </span>
        <span><input style={ styles.button } type='submit' value='>' onClick={this.gotoNextYear}/></span>
        <span><input style={ styles.button } type='submit' value='>>>' onClick={this.gotoTenYearsLater}/></span>
      </div>
    )
      
  }
}

export default connect(
  storeState => ({
    historyYear: storeState.historyYear,
  }),
  {
    gotoFollowingYear: actions.gotoFollowingYear,
    gotoTenYearsLater: actions.gotoTenYearsLater,
    gotoLastYear: actions.gotoLastYear,
    loadHistoryData: actions.getHistoryWeather,
  }
)(SelectYear) 

