import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import * as actions from '../actions/actionIndex'
import reactCSS from 'reactcss'

const styles = reactCSS({
  default: {
    svgMain: {
      height: '280px',
      marginBottom: '0',
    }
  }
})

const { number, object, func} = PropTypes

class ComparativeD3Graph extends PureComponent {

  static PropTypes = {
    currentData: object,
    historyData: object,
    historyYear: number,
    loadCurrentData: func,
    loadHistoryData: func,
  }

  static defaultProps = {
    currentData: {},
    historyData: {},
    historyYear: 1997
  }

  componentWillMount() {
    this.props.loadCurrentData()
    this.props.loadHistoryData(this.props.historyYear)
  }

  componentDidUpdate() {
    
    const WIDTH = document.documentElement.clientWidth  
    const HEIGHT = 280

    if(this.props.currentData != null && this.props.historyData != null) {
      
        //time, start and end point of the timeline
        const now = new Date()
        let today = now
        today.setDate(now.getDate() - 0.29166666)
        today = today.toISOString().slice(0, 19)
        let tomorrow = now
        tomorrow.setDate(now.getDate() + 1)
        tomorrow = tomorrow.toISOString().slice(0, 19)
        const todayStartHour = Number(today.slice(11, 13))
        let tomorrowEndHour = 0
        if (todayStartHour >= 1) {
          tomorrowEndHour = todayStartHour - 1
        } else {
          tomorrowEndHour = 23
        }
        
        //convert raw currentData from API to dataForRender for display
        let dataForRender = []
        let j = todayStartHour
        let k = 0
        console.log(1, j)
        for (let index=0; index <= 23; index++) {
          if (j <= 23) {
            //validate history temperature data. if missing, replace it with the data of last element in array. If the first temperature in history is missing, replace it with the average temperature on that history day.
            let historyTemperature = 0
            if (this.props.historyData.todayInHistory.history.observations[j] === undefined) {
              
              historyTemperature = Math.round((Number((this.props.historyData.todayInHistory.history.dailysummary[0].maxtempi)) + Number((this.props.historyData.todayInHistory.history.dailysummary[0].mintempi))) / 2)
              console.log(400, index, 401, j, 402, historyTemperature, 403, this.props.historyData.todayInHistory.history.dailysummary[0].maxtempi, 404, this.props.historyData.todayInHistory.history.dailysummary[0].mintempi)
            } else {
              historyTemperature = Number(this.props.historyData.todayInHistory.history.observations[j].tempi)
            }
            if (historyTemperature < 0 && index >= 1) {
              historyTemperature = Number(dataForRender[index-1].historyTemperature)
            }
            else if (historyTemperature < 0 && index === 0) {
              historyTemperature = Math.round((Number((this.props.historyData.todayInHistory.history.dailysummary[0].maxtempi)) + Number((this.props.historyData.todayInHistory.history.dailysummary[0].mintempi))) / 2)
            }
            dataForRender.push({
              'todaysTemperature': Number(this.props.currentData.hourly_forecast[index].temp.english),
              'historyTemperature': historyTemperature,
              'time': index
            })
            j++
          } else if (k <= tomorrowEndHour) {
            let historyTemperature = 0
            if (this.props.historyData.tomorrowInHistory.history.observations[k] === undefined) {
              historyTemperature = Math.round((Number((this.props.historyData.tomorrowInHistory.history.dailysummary[0].maxtempi)) + Number((this.props.historyData.tomorrowInHistory.history.dailysummary[0].mintempi))) / 2)
            } else {
              historyTemperature = Number(this.props.historyData.tomorrowInHistory.history.observations[k].tempi)
            }
            if (historyTemperature < 0 && index >= 1) {
              historyTemperature = Number(dataForRender[index-1].historyTemperature)
            }
            else if (historyTemperature < 0 && index === 0) {
              historyTemperature = Math.round((Number((this.props.historyData.tomorrowInHistory.history.dailysummary[0].maxtempi)) + Number((this.props.historyData.tomorrowInHistory.history.dailysummary[0].mintempi))) / 2)
            }

            dataForRender.push({
              'todaysTemperature': Number(this.props.currentData.hourly_forecast[index].temp.english),
              'historyTemperature': historyTemperature,
              'time': index
            })
            k++
          }          
        }
        console.log(9, dataForRender)
        //

        const vis = d3.select('#visulization')
        vis.selectAll('*').remove()
        
        /*
        // stand-in x axis
        const standinXaxis = d3.axisBottom().scale(xScale).ticks(7)
        vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(50, 150)")
            .call(standinXaxis)
        //
        */

        //draw x axis
        const xScale = d3.scaleLinear().range([-20, WIDTH-50]).domain([dataForRender[0].time, dataForRender[23].time])
        const d3ParseScale = d3.scaleTime()
              .domain([d3.timeParse('%Y-%m-%dT%H:%M:%S')(today), d3.timeParse('%Y-%m-%dT%H:%M:%S')(tomorrow)])
              .range([30, WIDTH]);
        const drawScale = function(scale, dst) {
            const xAxis = d3.axisBottom(scale);
            vis.append('g')
              .attr('class', 'axisLine')
              .attr("transform", "translate(0, 250)")
              .attr('stroke', 'white')
              .attr('stroke-width', 1)
              .call(xAxis)
        }
        drawScale(d3ParseScale,[]);
        //


        //get lowest and highest temperature
        const minTemperature = Math.min(d3.min(dataForRender, function(d) { return d.todaysTemperature }), d3.min(dataForRender, function(d) { return d.historyTemperature }))
        const maxTemperature = Math.max(d3.max(dataForRender, function(d) { return d.todaysTemperature }), d3.max(dataForRender, function(d) { return d.historyTemperature }))

        //draw y axis
        const yScale = d3.scaleLinear().range([250, 20]).domain([minTemperature - 2, maxTemperature + 2])
        const yAxis = d3.axisLeft().scale(yScale)
        vis.append("g")
              .attr('class', 'axisLine')
              .attr("transform", "translate(30, 0)")
              .attr('stroke', 'white')
              .attr('stroke-width', 1)
              .call(yAxis)

        
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
              .attr('fill', 'rgba(78, 183, 213, 0.8)')

        vis.append('path')
              .attr('clip-path', 'url(#clip-below)')
              .attr('d', area)
              .attr('transform', 'translate(50, 0)')
              .attr('fill', 'rgba(243, 78, 84, 0.85)')

        vis.append('path')
              .attr('class', 'line')
              .attr('d', line)

        //draw paths
        ///current weather
        vis.append('path')
              .attr('d', lineGen_current(dataForRender))
              .attr('class', 'currentWeatherLine')
              .attr('stroke', '#ef4856')
              .attr("transform", "translate(50, 0)")
              .attr('stroke-width', 3)
              .attr('fill', 'none')

        ///history weather
        vis.append('path')
              .attr('d', lineGen_history(dataForRender))
              .attr('stroke', '#3ed3c7')
              .attr("transform", "translate(50, 0)")
              .attr('stroke-width', 3)
              .attr('fill', 'none')

    }
  }

  render() {
    const WIDTH = document.documentElement.clientWidth  
    const MARGINS = {
      top: 10,
      right: 0,
      bottom: 10,
      left: 0
    }    
   
    return (    
      <div style={ styles.svgMain } >
        <svg id='visulization' width={WIDTH-MARGINS.right-MARGINS.left} height='300'>
        </svg>
      </div>
    )
  }
        
}

export default connect(
  storeState => ({
    currentData: storeState.currentWeather,
    historyData: storeState.historyWeather,
    historyYear: storeState.historyYear,
  }),
  {
    loadCurrentData: actions.getCurrentWeather,
    loadHistoryData: actions.getHistoryWeather,
  }
)(ComparativeD3Graph)
