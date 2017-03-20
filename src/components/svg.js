import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import * as actions from '../actions/actionIndex'

const { object, func} = PropTypes

class Svg extends PureComponent {

  static PropTypes = {
    currentData: object,
    historyData: object,
    loadCurrentData: func,
    loadHistoryData: func,
  }

  static defaultProps = {
    currentData: {},
    historyData: {},
  }

  componentWillMount() {
    this.props.loadCurrentData()
    this.props.loadHistoryData()
  }

  render() {
    const WIDTH = document.documentElement.clientWidth  
    const HEIGHT = 400
    const MARGINS = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }    

    if(this.props.currentData != null) {
        const currentData = this.props.currentData
  
        //convert raw currentData from API to currentWeatherData for display
        let currentWeatherData = []
        let index = 0
        while (index <= 23) {
          currentWeatherData.push({
            'temperature': Number(currentData.hourly_forecast[index].temp.english),
            'time': index
          })
          index++
        }
        //

        const xScale = d3.scaleLinear().range([0, WIDTH]).domain([currentWeatherData[0].time, currentWeatherData[23].time])
        const vis = d3.select("#visualisation")
        vis.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill","lightgrey")

        // stand-in x axis
        const standinXaxis = d3.axisBottom().scale(xScale).ticks(7)
        vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(50, 300)")
            .call(standinXaxis);
        //

        //draw x axis
        const now = new Date()
        let today = now
        today.setDate(now.getDate() - 0.29166666)
        today = today.toISOString().slice(0, 19)
        let tomorrow = now
        tomorrow.setDate(now.getDate() + 1)
        tomorrow = tomorrow.toISOString().slice(0, 19)
        const d3ParseScale = d3.scaleTime()
            .domain([d3.timeParse('%Y-%m-%dT%H:%M:%S')(today), d3.timeParse('%Y-%m-%dT%H:%M:%S')(tomorrow)])
            .range([50, WIDTH]);
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
              .attr('stroke-width', 2)
              .attr('fill', 'none')   

        return (    
          <div>
            <svg id='visualisation' width={WIDTH-MARGINS.right-MARGINS.left} height={HEIGHT}>
            </svg>
          </div>
        )
      } else {
          return (    
            <div>
              <svg id='visualisation' width={WIDTH-MARGINS.right-MARGINS.left} height={HEIGHT}>
              </svg>
            </div>
          )
        }
  }
}

export default connect(
  storeState => ({
    currentData: storeState.currentWeather,
    historyData: storeState.historyWeather,
  }),
  {
    loadCurrentData: actions.getCurrentWeather,
    loadHistoryData: actions.getHistoryWeather,
  }
)(Svg) 