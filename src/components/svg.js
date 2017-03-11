import React, {Component} from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import {getCurrentWeather} from '../actions/index'
import store from '../store'

class Svg extends Component {
  
  constructor(props) {
      super(props)
      this.state = {
          location: "San_Francisco",
          currentWeather: null,
          historyWeather: null
      }

      store.subscribe(() => {
          this.setState({
              currentWeather: store.getState().currentWeather,
              historyWeather: store.getState().historyWeather
          })
      })
  }

  fetchData(event) {
    console.log(6)
    store.dispatch(getCurrentWeather())
  }

  componentDidMount() {
    const WIDTH = document.documentElement.clientWidth  
    const HEIGHT = 400
    const MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }

    axios.get('http://api.wunderground.com/api/515155f28af51941/hourly/q/CA/San_Francisco.json')
      .then(function(res) {
        console.log(3, res.data)
        const data = res.data
        const data3 = [
            {"temperature": Number(data.hourly_forecast[0].temp.english),
             "time": Number(data.hourly_forecast[0].FCTTIME.hour)
            },
            {"temperature": Number(data.hourly_forecast[1].temp.english),
             "time": Number(data.hourly_forecast[1].FCTTIME.hour)
            },
            {"temperature": Number(data.hourly_forecast[2].temp.english),
             "time": Number(data.hourly_forecast[2].FCTTIME.hour)
            },
            {"temperature": Number(data.hourly_forecast[3].temp.english),
             "time": Number(data.hourly_forecast[3].FCTTIME.hour)
            },
            {"temperature": Number(data.hourly_forecast[4].temp.english),
             "time": Number(data.hourly_forecast[4].FCTTIME.hour)
            },
        ]
        const xScale = d3.scaleLinear().range([20, 480]).domain([17, 21])
        const yScale = d3.scaleLinear().range([480, 20]).domain([50, 70])
        const xAxis = d3.axisBottom().scale(xScale)
        const yAxis = d3.axisLeft().scale(yScale)
        const vis = d3.select("#visualisation")
        vis.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill","lightgrey")

        vis.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                .call(xAxis);
        vis.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                .call(yAxis);
                

        const lineGen = d3.line()
                .x(function(d) {
                    return xScale(d.time);
                })
                .y(function(d) {
                    return yScale(d.temperature);
                })
                .curve(d3.curveBasis);

        vis.append('svg:path')
              .attr('d', lineGen(data3))
              .attr('stroke', 'green')
              .attr('stroke-width', 2)
              .attr('fill', 'none');  
      })

  }

  render() {
    const WIDTH = document.documentElement.clientWidth  
    const HEIGHT = 400
    const MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }   
    return (    
      <div>
        <svg id='visualisation' width={WIDTH} height={HEIGHT}>
        </svg>
        <input type='submit' value="clickMe" onClick={this.fetchData} />
      </div>
    )
  }
}


export default Svg