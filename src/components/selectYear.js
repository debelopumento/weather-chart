import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionIndex'
import reactCSS from 'reactcss'

const styles = reactCSS({
  default: {
    button: {
      color: 'orange',
      fontSize: 23,
      padding: 15,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: 0,
      paddingTop: 5,
    }
  }
})

const { object, func} = PropTypes

class SelectYear extends PureComponent {
  
  static PropTypes = {
    historyYear: object,
    goToFollowingYear: func,
    loadHistoryData: func,
  }

  static defaultProps = {
    historyYear: 1977,
  }

  state = {
    historyYear: 1977
  }

  validateYear = (year) => {
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
      this.props.updateHistoryYear(nextYear)
      this.props.loadHistoryData(nextYear)
    }
  }
  gotoTenYearsLater = () => {    
    const tenYearsLater = this.state.historyYear + 10
    const valid = this.validateYear(tenYearsLater)
    if (valid === true) {
      this.setState({historyYear: tenYearsLater})
      this.props.updateHistoryYear(tenYearsLater)
      this.props.loadHistoryData(tenYearsLater)
    }
  }
  gotoLastYear = () => {
    const lastYear = this.state.historyYear - 1
    const valid = this.validateYear(lastYear)
    if (valid === true) {
      this.setState({historyYear: lastYear})
      this.props.updateHistoryYear(lastYear)
      this.props.loadHistoryData(lastYear)
    }
  }
  gotoTenYearsAgo = () => {
    const tenYearsAgo = this.state.historyYear - 10
    const valid = this.validateYear(tenYearsAgo)
    if (valid === true) {
      this.setState({historyYear: tenYearsAgo})
      this.props.updateHistoryYear(tenYearsAgo)
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
    updateHistoryYear: actions.updateHistoryYear,
    gotoTenYearsLater: actions.gotoTenYearsLater,
    gotoLastYear: actions.gotoLastYear,
    loadHistoryData: actions.getHistoryWeather,
  }
)(SelectYear) 

