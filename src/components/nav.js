import React from 'react'
import reactCSS from 'reactcss'

const styles = reactCSS({
  default: {
    nav: {
      	height: '100%',
      	backgroundColor: '#07263b',
      	textAlign: 'center',
      	color: 'white',
      	paddingBottom: 0,
      	paddingTop: 0,
      	
    },
    title: {
    	backgroundColor: '#0b304a',
    	paddingBottom: 15,
    	paddingTop: 15,
    	marginTop: 0,
    	borderBottom: '1px #0e4b51 solid',
      fontFamily: 'Poppins',

    },
    location: {
      fontFamily: 'Poppins',
      marginTop: 0,
      marginBottom: 0,
      fontSize: 20,
    }
  }
})


const Nav = () => {
  
    return (
      <div style={ styles.nav } className="Nav">
        <h3 style={ styles.title }>Is It Hotter Than Today In History</h3>
        <h2 style={ styles.location }>San Francisco</h2>
      </div>
    )
  
}

export default Nav
