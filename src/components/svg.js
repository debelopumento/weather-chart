import React, { PureComponent, PropTypes } from 'react'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import axios from 'axios'
import {getCurrentWeather} from '../actions/actionIndex'
import store from '../store'
import * as actions from '../actions/actionIndex'

const { object, func } = PropTypes


class Svg extends PureComponent {
  

  fetchData(event) {
    console.log(6, this.state)
  }


  state = {
      location: "San_Francisco",
      currentWeather: null,
      historyWeather: null
  }



  componentWillMount() {
    
    store.subscribe(() => {
        this.setState({
            currentWeather: store.getState().currentWeather,
            historyWeather: store.getState().historyWeather
        })
    })
    console.log(8)
    store.dispatch(getCurrentWeather())
    console.log(10)
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
        const data = res.data
        /*        
        const currentWeatherData = data.hourly_forecast.map(function(localTime) {
          console.log(22, localTime)
          return {
            "temperature": Number(localTime.temp.english),
            "time": Number(localTime.FCTTIME.hour) 
          }
        })
        */
        const currentWeatherData = [
            {"temperature": Number(data.hourly_forecast[0].temp.english),
             "time": 0
            },
            {"temperature": Number(data.hourly_forecast[3].temp.english),
             "time": 3
            },
            {"temperature": Number(data.hourly_forecast[6].temp.english),
             "time": 6
            },
            {"temperature": Number(data.hourly_forecast[9].temp.english),
             "time": 9
            },
            {"temperature": Number(data.hourly_forecast[12].temp.english),
             "time": 12
            },
            {"temperature": Number(data.hourly_forecast[15].temp.english),
             "time": 15
            },
            {"temperature": Number(data.hourly_forecast[18].temp.english),
             "time": 18
            },
            {"temperature": Number(data.hourly_forecast[21].temp.english),
             "time": 21
            },
            {"temperature": Number(data.hourly_forecast[24].temp.english),
             "time": 24
            }
        ]
        console.log(21, currentWeatherData)
        const xScale = d3.scaleLinear().range([0, 550]).domain([currentWeatherData[0].time, currentWeatherData[8].time])
        
        const standinXaxis = d3.axisBottom().scale(xScale).ticks(7)
        
        const vis = d3.select("#visualisation")
        vis.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill","lightgrey")

        // stand-in x axis
        /*
        vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(50, 300)")
            .call(standinXaxis);
        */
        //

        //draw x axis
        const now = new Date()
        let today = now
        today.setDate(now.getDate() - 0.29166666)
        today = today.toISOString().slice(0, 19)
        let tomorrow = now
        tomorrow.setDate(now.getDate() + 1)
        tomorrow = tomorrow.toISOString().slice(0, 19)
        console.log(4, today, 5, tomorrow)
        const d3ParseScale = d3.scaleTime()
            .domain([d3.timeParse('%Y-%m-%dT%H:%M:%S')(today), d3.timeParse('%Y-%m-%dT%H:%M:%S')(tomorrow)])
            .range([50, 600]);

        const drawScale = function(scale, dst) {
            const xAxis = d3.axisBottom(scale);
            const scaleGroup = vis.append('svg:g')
                .attr('class', 'x axis')
                .attr("transform", "translate(0, 380)")
                .call(xAxis);
            return scaleGroup;
        }

        drawScale(d3ParseScale,[]);
        //

        //draw y axis
        const yScale = d3.scaleLinear().range([380, 20]).domain([40, 80])
        const yAxis = d3.axisLeft().scale(yScale)
        vis.append("svg:g")
              .attr("class", "y axis")
              .attr("transform", "translate(50, 0)")
              .call(yAxis);
        
        //draw path        
        const lineGen = d3.line()
              .x(function(d) {
                  return xScale(d.time);
              })
              .y(function(d) {
                  return yScale(d.temperature);
              })
              .curve(d3.curveCardinal);

        vis.append('svg:path')
              .attr('d', lineGen(currentWeatherData))
              .attr('stroke', 'black')
              .attr("transform", "translate(50, 0)")
              .attr('stroke-width', 1)
              .attr('fill', 'none')        

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
    console.log(12, this.state)
    

    return (    
      <div>
        <svg id='visualisation' width={WIDTH-MARGINS.right-MARGINS.left} height={HEIGHT}>

        </svg>

        <input type='submit' value="clickMe" onClick={this.fetchData} />
      </div>
    )
  }
}


export default Svg