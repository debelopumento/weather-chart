import React, { Component } from 'react';
import reactCSS from 'reactcss'

const styles = reactCSS({
  'default': {
    nav: {
      	height: '100%',
      	backgroundColor: '#07263b',
      	textAlign: 'center',
      	color: 'white',
      	paddingBottom: '0',
      	paddingTop: '0',
      	borderBottom: '1px #0e4b51 solid',
    },
    title: {
    	paddingTop: '25px',
    	marginTop: '0px',    	
    }
  }
})


class Nav extends Component {
  render() {
    return (
      <div style={ styles.nav } className="Nav">
        <h3 style={ styles.title }>Is It Hotter Than Today In History</h3>
        <h2>San Francisco</h2>
      </div>
    );
  }
}

export default Nav;
