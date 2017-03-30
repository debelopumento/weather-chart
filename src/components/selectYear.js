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

  validateYear = year => {
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

  gotoYear = differenceValue => () => {
    const year = this.props.historyYear + differenceValue
    const valid = this.validateYear(year)
    if (valid) {
      this.setState({historyYear: year})
      this.props.updateHistoryYear(year)
      this.props.loadHistoryData(year)
    }
  }

  render() {
    return (    
       <div>
        <span><input style={ styles.button } type="submit" value="<<<" onClick={this.gotoYear(-10)}/></span>
        <span><input style={ styles.button } type="submit" value="<" onClick={this.gotoYear(-1)}/></span>
        <span style={ styles.button }> {this.props.historyYear} </span>
        <span><input style={ styles.button } type="submit" value=">" onClick={this.gotoYear(1)}/></span>
        <span><input style={ styles.button } type="submit" value=">>>" onClick={this.gotoYear(10)}/></span>
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
    loadHistoryData: actions.getHistoryWeather,
  }
)(SelectYear) 

