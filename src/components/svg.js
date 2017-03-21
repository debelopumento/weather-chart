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

    if(this.props.currentData != null && this.props.historyData != null) {
        
        
        //time, start and end point of the timeline
        const now = new Date()
        let today = now
        today.setDate(now.getDate() - 0.29166666)
        today = today.toISOString().slice(0, 19)
        let tomorrow = now
        tomorrow.setDate(now.getDate() + 1)
        tomorrow = tomorrow.toISOString().slice(0, 19)
        const todayStartHour = Number(today.slice(11, 13)) + 1
        let tomorrowEndHour = 0
        if (todayStartHour >= 1) {
          tomorrowEndHour = todayStartHour - 1
        } else {
          tomorrowEndHour = 23
        }

        console.log(1, now, 2, today, 3, tomorrow, 4, todayStartHour, 5, tomorrowEndHour)
        
        //convert raw currentData from API to dataForRender for display
        let dataForRender = []
        let j = todayStartHour
        let k = 0
        for (let index=0; index <= 23; index++) {
          if (j <= 23) {
            dataForRender.push({
              'todaysTemperature': Number(this.props.currentData.hourly_forecast[index].temp.english),
              'historyTemperature': Number(this.props.historyData.todayInHistory.history.observations[j].tempi),
              'time': index
            })
            j++
          } else if (k <= tomorrowEndHour) {
            dataForRender.push({
              'todaysTemperature': Number(this.props.currentData.hourly_forecast[index].temp.english),
              'historyTemperature': Number(this.props.historyData.tomorrowInHistory.history.observations[k].tempi),
              'time': index
            })
            k++
          }

          
        }
        console.log(9, dataForRender)
        //

        //draw canvas
        const vis = d3.select("#visualisation")
        vis.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill","lightgrey")
        //

        
        const xScale = d3.scaleLinear().range([0, WIDTH-100]).domain([dataForRender[0].time, dataForRender[23].time])
        // stand-in x axis
        const standinXaxis = d3.axisBottom().scale(xScale).ticks(7)
        vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(50, 300)")
            .call(standinXaxis)
        //

        //draw x axis
        const d3ParseScale = d3.scaleTime()
            .domain([d3.timeParse('%Y-%m-%dT%H:%M:%S')(today), d3.timeParse('%Y-%m-%dT%H:%M:%S')(tomorrow)])
            .range([50, WIDTH-50]);
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
        
        //create path drawers      
        const lineGen_current = d3.line()
              .x(function(d) {
                  return xScale(d.time);
              })
              .y(function(d) {
                  return yScale(d.todaysTemperature);
              })
              .curve(d3.curveCardinal);

        const lineGen_history = d3.line()
              .x(function(d) {
                  return xScale(d.time);
              })
              .y(function(d) {
                  return yScale(d.historyTemperature);
              })
              .curve(d3.curveCardinal);

        

        //draw difference                    
        const line = d3.area()
              .x(function(d) { return xScale(d.time) })
              .y(function(d) { return yScale(d.historyTemperature) })
              .curve(d3.curveCardinal)

        const area = d3.area()
              .x(function(d) { return xScale(d.time) })
              .y1(function(d) { return yScale(d.todaysTemperature) })
              .curve(d3.curveCardinal)

        
        vis.datum(dataForRender)


        

        //draw difference
        vis.append('clipPath')
              .attr('id', 'clip-below')
              .append('path')
              .attr('d', area.y0(HEIGHT))

        vis.append('clipPath')
              .attr('id', 'clip-above')
              .append('path')
              .attr('d', area.y0(0))

        vis.append('path')
              .attr('clip-path', 'url(#clip-above)')
              .attr('d', area.y0(function(d) { return yScale(d.historyTemperature) }))
              .attr('transform', 'translate(50, 0)')
              .attr('fill', 'rgba(0, 128, 0, 0.5)')

        vis.append('path')
              .attr('clip-path', 'url(#clip-below)')
              .attr('d', area)
              .attr('transform', 'translate(50, 0)')
              .attr('fill', 'rgba(128, 0, 0, 0.5)')

        vis.append('path')
              .attr('class', 'line')
              .attr('d', line)



        vis.append('svg:path')
              .attr('d', lineGen_history(dataForRender))
              .attr('stroke', 'blue')
              .attr("transform", "translate(50, 0)")
              .attr('stroke-width', 2)
              .attr('fill', 'none')


        //draw paths
        vis.append('path')
              .attr('d', lineGen_current(dataForRender))
              .attr('stroke', 'black')
              .attr("transform", "translate(50, 0)")
              .attr('stroke-width', 2)
              .attr('fill', 'none')

        /*
        //draw area
        vis.append('path')
              .attr('class', 'line')
              .attr('d', line)
              .attr('fill', 'rgba(0, 128, 0, 0.5)')
              .attr('transform', 'translate(50, 0)')
        */


        return (    
          <div>
            <svg id='visualisation' width={WIDTH-MARGINS.right-MARGINS.left} height={HEIGHT}>
            </svg>
            <svg id='visB' width={WIDTH-MARGINS.right-MARGINS.left} height={HEIGHT}>
            </svg>
          </div>
        )
      } else {
          return (    
            <div>
              <svg id='visualisation' width={WIDTH-MARGINS.right-MARGINS.left} height={HEIGHT}>
              </svg>
              <svg id='visB' width={WIDTH-MARGINS.right-MARGINS.left} height={HEIGHT}>
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