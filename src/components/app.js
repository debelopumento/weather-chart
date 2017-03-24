import React, { Component } from 'react'
import ComparativeD3Graph from './comparativeD3Graph'
import Nav from './nav'
import SelectYear from './selectYear'
import HistoryData from './historyData'
import CurrentData from './currentData'
import reactCSS from 'reactcss'

const styles = reactCSS({
  default: {
    app: {
      	height: '100%',
      	textAlign: 'center',
      	color: 'white',
      	paddingBottom: 0,
    },
    title: {
      	paddingTop: 25,
      	marginTop: 0,
      	paddingBottom: 25,
      	borderBottom: '1 #0e4b51 solid'
    }
  }
})


const App = () => {
  
    return (
      <div style={ styles.app } className="App">
        <Nav />
        <ComparativeD3Graph />
        <SelectYear />
        <CurrentData /><HistoryData />
      </div>
    )
  
}

export default App;

