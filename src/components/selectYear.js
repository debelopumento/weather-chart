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

  componentWillReceiveProps() {
    console.log(300, this.props.historyYear)
    //this.props.loadHistoryData(this.props.historyYear)
  }

  gotoNextYear = () => {    
    const nextYear = this.state.historyYear + 1
    this.setState({historyYear: nextYear})
    store.dispatch({
        type: 'UPDATE_HISTORY_YEAR',
        historyYear: nextYear
    })
    this.props.loadHistoryData(nextYear)
    
  }
  gotoTenYearsLater = () => {    
    const tenYearsLater = this.state.historyYear + 10
    this.setState({historyYear: tenYearsLater})
    store.dispatch({
        type: 'UPDATE_HISTORY_YEAR',
        historyYear: tenYearsLater
    })
    this.props.loadHistoryData(tenYearsLater)
  }
  gotoLastYear = () => {
    const lastYear = this.state.historyYear - 1
    this.setState({historyYear: lastYear})
    store.dispatch({
        type: 'UPDATE_HISTORY_YEAR',
        historyYear: lastYear
    })
    this.props.loadHistoryData(lastYear)
  }
  gotoTenYearsAgo = () => {
    const tenYearsAgo = this.state.historyYear - 10
    this.setState({historyYear: tenYearsAgo})
    store.dispatch({
        type: 'UPDATE_HISTORY_YEAR',
        historyYear: tenYearsAgo
    })
    this.props.loadHistoryData(tenYearsAgo)
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

