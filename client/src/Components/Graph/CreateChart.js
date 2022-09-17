import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'


const CreateChart = ({data, symbol}) => {

    if(!data) return null

    //convert timestamp to string
    const toMonthName = (monthNumber) => {
      const date = new Date();
      date.setMonth(monthNumber);
      return date.toLocaleString('en-US', {
        month: 'short',
      });
    }

    const time1m = data.timestamp
    if(!time1m) return null
    
    const labels = time1m.map(time => {
      const d = new Date(time*1000)
      const year = d.getFullYear()
      return toMonthName(d.getMonth()) + " " + 
      d.getDate() + `/${year}`
    })
    const dataSet = data.close 
    const color = dataSet[0] < dataSet[dataSet.length - 1] ? 'Green' : 'Red'

    const dataPlot = {
        labels: labels,
        datasets: [
          {
            label: symbol,
            data: dataSet,
            fill: false,
            borderColor: color,
          },
        ]
      };
  return (
    <Line data={dataPlot}/>
  )
}

export default CreateChart