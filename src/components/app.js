import React from 'react'
import ComparativeD3Graph from './comparativeD3Graph'
import Nav from './nav'
import SelectYear from './selectYear'
import Summary from './summary'
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


const App = () => (
      <div style={ styles.app } className="App">
        <Nav />
        <ComparativeD3Graph />
        <SelectYear />
        <Summary type='current' /><Summary type='history' />
      </div>
)

export default App
