import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import d3 from 'd3'


class Svg extends Component {
	render() {
		return (    
			<div>
				<svg id="visualisation" width="1000" height="500">
					<rect width="100%" height="100%" fill="pink"></rect>
				</svg>
			</div>
		)
	}
}


ReactDOM.render(
	//<App />,
	<Svg />,
  document.getElementById('root')
);
