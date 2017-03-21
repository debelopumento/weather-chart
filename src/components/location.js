import React, { Component } from 'react';
import reactCSS from 'reactcss'

const styles = reactCSS({
  'default': {
    location: {
      	backgroundColor: 'red'
    }
  }
})


class Location extends Component {
  render() {
    return (
      <div style={ styles.location }>
        <h3>San Francisco</h3>
      </div>
    );
  }
}

export default Location;
