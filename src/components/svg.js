import React, {Component} from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import {getCurrentWeather} from '../actions/actionIndex'
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
    console.log(6, this.state)
  }



  componentWillMount() {
    console.log(8)
    store.dispatch(getCurrentWeather())
    console.log(10)
  }

  componentDidMount() {
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
            {"temperature": parseInt(data.hourly_forecast[0].temp.english),
             "time": (data.hourly_forecast[0].FCTTIME.hour)
            },
            {"temperature": parseInt(data.hourly_forecast[1].temp.english),
             "time": (data.hourly_forecast[1].FCTTIME.hour)
            },
            {"temperature": parseInt(data.hourly_forecast[2].temp.english),
             "time": (data.hourly_forecast[2].FCTTIME.hour)
            },
            {"temperature": parseInt(data.hourly_forecast[3].temp.english),
             "time": (data.hourly_forecast[3].FCTTIME.hour)
            },
            {"temperature": parseInt(data.hourly_forecast[4].temp.english),
             "time": (data.hourly_forecast[4].FCTTIME.hour)
            }
        ]
        console.log(21, currentWeatherData)
        const xScale = d3.scaleLinear().range([20, 480]).domain([currentWeatherData[0].time, currentWeatherData[4].time])
        const yScale = d3.scaleLinear().range([480, 20]).domain([40, 70])
        //const xAxis = d3.axisBottom().scale(xScale).ticks(6)
        const yAxis = d3.axisLeft().scale(yScale)
        const vis = d3.select("#visualisation")
        vis.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill","lightgrey")

        /*
        vis.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                .call(xAxis);
        */

        
        const eachScale = 180;
        let i = 0;
        let thisScale;
        const timeFormat = d3.timeFormat('%Y-%m-%dT%H:%M:%S');
        const d3ParseScale = d3.scaleTime()
            .domain([d3.timeParse('%Y-%m-%dT%H:%M:%S')('2016-03-08T12:00:00'), d3.timeParse('%Y-%m-%dT%H:%M:%S')('2016-03-09T00:00:00')])
            .range([40, 480]);

        const explainer = function(scaleGroup, title, code, dateAssumptions, dateProduction, alert) {
            const titleNum = '<tspan>' + '#' + (i + 1) + '</tspan> ';
        };

        const drawScale = function(scale, dst) {
            const xAxis = d3.axisBottom(scale);
            const scaleGroup = vis.append('svg:g')
                .attr('class', 'x axis')
                .call(xAxis);
            return scaleGroup;
        };
        explainer(drawScale(d3ParseScale,[]));


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
              .attr('d', lineGen(currentWeatherData))
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
    console.log(12, this.state)
    

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