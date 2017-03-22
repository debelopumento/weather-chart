import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionIndex'
import reactCSS from 'reactcss'
import store from '../store'

const styles = reactCSS({
  'default': {
    button: {
      color: 'white',
    }
  }
})

const { object, func} = PropTypes

class SelectYear extends PureComponent {

  constructor() {
    super()
    this.state = {
      historyYear: 1977
    }
    this.nextYear = this.nextYear.bind(this)
  }

  static PropTypes = {
    historyYear: object,
    goToFollowingYear: func,
  }

  static defaultProps = {
    historyYear: 1977,
  }

  componentWillMount() {
  }

  componentDidMount() {
    //this.props.goToFollowingYear(1957)
  }

  nextYear(event) {    
    console.log(40, this.state.historyYear)
    const nextYear = this.state.historyYear + 1
    store.dispatch({
        type: 'GO_TO_FOLLOWING_YEAR',
        followingYear: nextYear
    })
    
  }

  render() {

    return (    
       <div>
        <span> {this.props.historyYear} </span><span><input style={ styles.button } type='submit' value='>' onClick={this.nextYear}/></span>
      </div>
    )
      
  }
}

export default connect(
  storeState => ({
    historyYear: storeState.historyYear,
  }),
  {
    goToFollowingYear: actions.goToFollowingYear
  }
)(SelectYear) 

