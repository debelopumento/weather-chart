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

const WIDTH = document.documentElement.clientWidth 
const HEIGHT = 280
const MARGINS = {
  RIGHT: 0,
  LEFT: 0
}  
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
    
    const { currentData, historyData } = this.props

    if(currentData !== null && historyData !== null) {
      
        //time, start and end point of the timeline
        const now = new Date()
        let today = now
        today.setDate(now.getDate() - 0.29166666)
        today = today.toISOString().slice(0, 19)
        let tomorrow = now
        tomorrow.setDate(now.getDate() + 1)
        tomorrow = tomorrow.toISOString().slice(0, 19)
        const todayStartHour = Number(today.slice(11, 13))
        
        //convert raw currentData from API to dataForRender for display
        const indexArray = [...Array(24).keys()]
        const todayInHistoryData = historyData.todayInHistory.history
        const tomorrowInHistoryData = historyData.tomorrowInHistory.history
        const todayDataLength = 24 - todayStartHour
        const meanTemperatureDayFirst = Math.round(
            (
              Number((todayInHistoryData.dailysummary[0].maxtempi)) +
              Number((todayInHistoryData.dailysummary[0].mintempi))
            ) / 2
        )
        const meanTemperatureDaySecond = Math.round(
            (
              Number((tomorrowInHistoryData.dailysummary[0].maxtempi)) + 
              Number((tomorrowInHistoryData.dailysummary[0].mintempi))
            ) / 2
        )

        const dataForRender = indexArray.map(index => {
            let historyTemperature = 0
            if (index < todayDataLength) {
              //validate history temperature data. Sometimes the data from API is missing and sometimes the missing temperature has a value of -9999. In both case, fill it with the mean temperature of the day
              if (todayInHistoryData.observations[index] !== undefined && Number(todayInHistoryData.observations[index].tempi) > 0) {
                historyTemperature = Number(todayInHistoryData.observations[index].tempi)
              } else {
                historyTemperature = meanTemperatureDayFirst
              }
            } else if (index >= todayDataLength) {
              const followingDayHour = index - todayDataLength
              if (
                  tomorrowInHistoryData.observations[followingDayHour] !== undefined && 
                  Number(tomorrowInHistoryData.observations[followingDayHour].tempi > 0)
              ) 
              {
                historyTemperature = Number(tomorrowInHistoryData.observations[followingDayHour].tempi)
              } else {
                historyTemperature = meanTemperatureDaySecond
              }
            }
            return {
              todaysTemperature: Number(currentData.hourly_forecast[index].temp.english),
              historyTemperature: historyTemperature,
              time: index
            }
        })
        console.log(9, dataForRender)

        const vis = d3.select('#visulization')
        vis.selectAll('*').remove()
        
        //draw x axis
        const xScale = d3.scaleLinear()
              .range([-20, WIDTH-50])
              .domain([dataForRender[0].time, dataForRender[23].time])
        const d3ParseScale = d3.scaleTime()
              .domain([d3.timeParse('%Y-%m-%dT%H:%M:%S')(today), d3.timeParse('%Y-%m-%dT%H:%M:%S')(tomorrow)])
              .range([30, WIDTH])
        const drawScale = (scale, dst) => {
            const xAxis = d3.axisBottom(scale)
            vis.append('g')
              .attr('class', 'axisLine')
              .attr("transform", "translate(0, 250)")
              .attr('stroke', 'white')
              .attr('stroke-width', 1)
              .call(xAxis)
        }
        drawScale(d3ParseScale,[])

        //get lowest and highest temperature
        const minTemperature = Math.min(
            d3.min(dataForRender, data => data.todaysTemperature), 
            d3.min(dataForRender, data => data.historyTemperature)
        )
        const maxTemperature = Math.max(
            d3.max(dataForRender, data => data.todaysTemperature), 
            d3.max(dataForRender, data => data.historyTemperature)
        )

        //draw y axis
        const yScale = d3.scaleLinear().range([250, 20]).domain([minTemperature - 2, maxTemperature + 2])
        const yAxis = d3.axisLeft().scale(yScale)
        vis.append('g')
              .attr('class', 'axisLine')
              .attr('transform', 'translate(30, 0)')
              .attr('stroke', 'white')
              .attr('stroke-width', 1)
              .call(yAxis)

        //create path drawers      
        const generateCurrentTemperatureLine = d3.line()
              .x(data => {
                  return xScale(data.time)
              })
              .y(data => {
                  return yScale(data.todaysTemperature)
              })
              .curve(d3.curveCardinal)

        const generateHistoryTemperatureLine = d3.line()
              .x(data => {
                  return xScale(data.time)
              })
              .y(data => {
                  return yScale(data.historyTemperature)
              })
              .curve(d3.curveCardinal)

        //draw difference                    
        const line = d3.area()
              .x(data => {
                  return xScale(data.time)
              })
              .y(data => {
                  return yScale(data.historyTemperature)
              })
              .curve(d3.curveCardinal)

        const area = d3.area()
              .x(data => {
                  return xScale(data.time)
                })
              .y1(data => {
                  return yScale(data.todaysTemperature)
                })
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
              .attr('d', area.y0(data => 
                                  yScale(data.historyTemperature) 
                              ))
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
              .attr('d', generateCurrentTemperatureLine(dataForRender))
              .attr('class', 'currentWeatherLine')
              .attr('stroke', '#ef4856')
              .attr('transform', 'translate(50, 0)')
              .attr('stroke-width', 3)
              .attr('fill', 'none')

        ///history weather
        vis.append('path')
              .attr('d', generateHistoryTemperatureLine(dataForRender))
              .attr('stroke', '#3ed3c7')
              .attr('transform', 'translate(50, 0)')
              .attr('stroke-width', 3)
              .attr('fill', 'none')
    }
  }

  render() {   
    return (    
      <div style={ styles.svgMain } >
        <svg id="visulization" width={WIDTH-MARGINS.RIGHT-MARGINS.LEFT} height='300'>
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
    todaysSummary: storeState.todaysSummary,
  }),
  {
    loadCurrentData: actions.getCurrentWeather,
    loadHistoryData: actions.getHistoryWeather,
  }
)(ComparativeD3Graph)
