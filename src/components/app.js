import React, { Component } from 'react'
import Svg from './svg'
import Nav from './nav'
import SelectYear from './selectYear'
import HistoryData from './historyData'
import CurrentData from './currentData'
import reactCSS from 'reactcss'

const styles = reactCSS({
  'default': {
    app: {
      	height: '100%',
      	backgroundColor: '#07263b',
      	textAlign: 'center',
      	color: 'white',
      	paddingBottom: '0',
    },
    title: {
      	paddingTop: '25px',
      	marginTop: '0px',
      	paddingBottom: '25px',
      	borderBottom: '1px #0e4b51 solid'
    }
  }
})


class App extends Component {
  render() {
    return (
      <div style={ styles.app } className="App">
        <Nav />
        <Svg />
        <SelectYear />
        <HistoryData /><CurrentData />
      </div>
    );
  }
}

export default App;

